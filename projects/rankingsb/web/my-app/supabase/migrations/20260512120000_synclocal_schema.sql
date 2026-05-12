-- SyncLocal multi-tenant citation core (Ranking SB v1 single tenant)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Region enums (prefixed for clarity)
CREATE TYPE synclocal_directory_tier AS ENUM ('api', 'form', 'aggregator');
CREATE TYPE synclocal_automation_method AS ENUM ('api', 'playwright', 'manual');
CREATE TYPE synclocal_listing_status AS ENUM (
  'not_submitted',
  'pending',
  'submitted',
  'live',
  'needs_update',
  'discrepancy',
  'rejected'
);
CREATE TYPE synclocal_job_type AS ENUM ('create', 'update', 'verify');
CREATE TYPE synclocal_job_status AS ENUM ('queued', 'running', 'succeeded', 'failed');

CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE agency_members (
  agency_id UUID NOT NULL REFERENCES agencies (id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (agency_id, user_id)
);

CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES agencies (id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  country TEXT NOT NULL DEFAULT 'US',
  phone TEXT,
  website TEXT,
  email TEXT,
  primary_category TEXT,
  secondary_categories TEXT[] NOT NULL DEFAULT '{}',
  hours JSONB,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  description_short TEXT,
  description_long TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX businesses_agency_id_idx ON businesses (agency_id);

CREATE TABLE directories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tier synclocal_directory_tier NOT NULL,
  submission_url TEXT,
  login_url TEXT,
  requires_auth BOOLEAN NOT NULL DEFAULT false,
  automation_method synclocal_automation_method NOT NULL,
  notes TEXT,
  active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX directories_active_idx ON directories (active);

CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses (id) ON DELETE CASCADE,
  directory_id UUID NOT NULL REFERENCES directories (id) ON DELETE CASCADE,
  status synclocal_listing_status NOT NULL DEFAULT 'not_submitted',
  listing_url TEXT,
  external_listing_id TEXT,
  last_submitted_at TIMESTAMPTZ,
  last_verified_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (business_id, directory_id)
);

CREATE INDEX listings_business_id_idx ON listings (business_id);
CREATE INDEX listings_directory_id_idx ON listings (directory_id);
CREATE INDEX listings_status_idx ON listings (status);

CREATE TABLE synclocal_cron_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES agencies (id) ON DELETE CASCADE,
  run_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  listings_checked INTEGER NOT NULL DEFAULT 0,
  discrepancy_count INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX synclocal_cron_batches_agency_run_idx ON synclocal_cron_batches (agency_id, run_at DESC);

CREATE TABLE verification_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings (id) ON DELETE CASCADE,
  batch_id UUID REFERENCES synclocal_cron_batches (id) ON DELETE SET NULL,
  run_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  nap_match BOOLEAN NOT NULL DEFAULT false,
  discrepancies JSONB NOT NULL DEFAULT '{}',
  scraped_data JSONB,
  error TEXT
);

CREATE INDEX verification_runs_listing_run_idx ON verification_runs (listing_id, run_at DESC);

CREATE TABLE submission_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings (id) ON DELETE CASCADE,
  job_type synclocal_job_type NOT NULL,
  status synclocal_job_status NOT NULL DEFAULT 'queued',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_log TEXT,
  payload JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX submission_jobs_listing_id_idx ON submission_jobs (listing_id);

-- updated_at maintenance
CREATE OR REPLACE FUNCTION synclocal_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER agencies_updated_at BEFORE UPDATE ON agencies
FOR EACH ROW EXECUTE PROCEDURE synclocal_set_updated_at();

CREATE TRIGGER businesses_updated_at BEFORE UPDATE ON businesses
FOR EACH ROW EXECUTE PROCEDURE synclocal_set_updated_at();

CREATE TRIGGER listings_updated_at BEFORE UPDATE ON listings
FOR EACH ROW EXECUTE PROCEDURE synclocal_set_updated_at();

-- RLS
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE directories ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE synclocal_cron_batches ENABLE ROW LEVEL SECURITY;

CREATE POLICY agency_members_select_self ON agency_members FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY agencies_select_member ON agencies FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agency_members m
      WHERE m.agency_id = agencies.id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY businesses_select_member ON businesses FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agency_members m
      WHERE m.agency_id = businesses.agency_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY businesses_insert_member ON businesses FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM agency_members m
      WHERE m.agency_id = businesses.agency_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY businesses_update_member ON businesses FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agency_members m
      WHERE m.agency_id = businesses.agency_id AND m.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM agency_members m
      WHERE m.agency_id = businesses.agency_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY businesses_delete_member ON businesses FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agency_members m
      WHERE m.agency_id = businesses.agency_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY directories_select_agency_user ON directories FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM agency_members m WHERE m.user_id = auth.uid())
  );

CREATE POLICY listings_select_member ON listings FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM businesses b
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE b.id = listings.business_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY listings_insert_member ON listings FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses b
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE b.id = listings.business_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY listings_update_member ON listings FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM businesses b
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE b.id = listings.business_id AND m.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses b
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE b.id = listings.business_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY listings_delete_member ON listings FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM businesses b
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE b.id = listings.business_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY verification_runs_select_member ON verification_runs FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM listings l
      JOIN businesses b ON b.id = l.business_id
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE l.id = verification_runs.listing_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY verification_runs_insert_member ON verification_runs FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM listings l
      JOIN businesses b ON b.id = l.business_id
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE l.id = verification_runs.listing_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY submission_jobs_select_member ON submission_jobs FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM listings l
      JOIN businesses b ON b.id = l.business_id
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE l.id = submission_jobs.listing_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY submission_jobs_insert_member ON submission_jobs FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM listings l
      JOIN businesses b ON b.id = l.business_id
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE l.id = submission_jobs.listing_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY submission_jobs_update_member ON submission_jobs FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM listings l
      JOIN businesses b ON b.id = l.business_id
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE l.id = submission_jobs.listing_id AND m.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM listings l
      JOIN businesses b ON b.id = l.business_id
      JOIN agency_members m ON m.agency_id = b.agency_id
      WHERE l.id = submission_jobs.listing_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY cron_batches_select_member ON synclocal_cron_batches FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agency_members m
      WHERE m.agency_id = synclocal_cron_batches.agency_id AND m.user_id = auth.uid()
    )
  );
