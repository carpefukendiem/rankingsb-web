-- Seed Ranking SB agency, canonical business, directory catalog, and listing rows (v1)

INSERT INTO agencies (id, name)
VALUES ('a0000000-0000-4000-8000-000000000001', 'Ranking SB')
ON CONFLICT (id) DO NOTHING;

INSERT INTO businesses (
  id,
  agency_id,
  name,
  address_line1,
  address_line2,
  city,
  state,
  zip,
  country,
  phone,
  website,
  email,
  primary_category,
  secondary_categories,
  lat,
  lng,
  description_short
)
VALUES (
  'b0000000-0000-4000-8000-000000000001',
  'a0000000-0000-4000-8000-000000000001',
  'Ranking SB',
  '10 E. Yanonali Street',
  'Suite 150',
  'Santa Barbara',
  'CA',
  '93101',
  'US',
  '+18053077600',
  'https://rankingsb.com',
  'ruben@rankingsb.com',
  'Marketing agency',
  ARRAY['SEO', 'Local SEO', 'Digital marketing'],
  34.4208,
  -119.6982,
  'Santa Barbara & Ventura County local SEO and digital marketing.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO directories (name, slug, tier, submission_url, login_url, requires_auth, automation_method, notes, active)
VALUES
  ('Google Business Profile', 'google-business-profile', 'api', 'https://business.google.com/', 'https://business.google.com/', true, 'api', 'Primary local listing.', true),
  ('Bing Places', 'bing-places', 'api', 'https://www.bingplaces.com/', 'https://www.bingplaces.com/', true, 'api', NULL, true),
  ('Apple Business Connect', 'apple-business-connect', 'api', 'https://businessconnect.apple.com/', 'https://businessconnect.apple.com/', true, 'api', NULL, true),
  ('Facebook Business', 'facebook-business', 'api', 'https://business.facebook.com/', 'https://business.facebook.com/', true, 'api', NULL, true),
  ('Yelp', 'yelp', 'api', 'https://biz.yelp.com/', 'https://biz.yelp.com/', true, 'api', NULL, true),
  ('Foursquare', 'foursquare', 'api', 'https://business.foursquare.com/', 'https://foursquare.com/login', true, 'api', NULL, true),
  ('Data Axle', 'data-axle', 'api', 'https://expressupdateusa.com/', NULL, false, 'api', 'Express Update / syndication surfaces.', true),
  ('LinkedIn Company', 'linkedin-company', 'api', 'https://www.linkedin.com/company/setup/', 'https://www.linkedin.com/login', true, 'api', NULL, true),
  ('Yellow Pages', 'yellow-pages', 'form', 'https://marketing.yellowpages.com/', 'https://www.yellowpages.com/', true, 'playwright', 'Claim / update flows vary by market.', true),
  ('Manta', 'manta', 'form', 'https://www.manta.com/', 'https://www.manta.com/login', true, 'playwright', NULL, true),
  ('MerchantCircle', 'merchantcircle', 'form', 'https://www.merchantcircle.com/', 'https://www.merchantcircle.com/login', true, 'playwright', NULL, true),
  ('Hotfrog', 'hotfrog', 'form', 'https://www.hotfrog.com/', 'https://www.hotfrog.com/login', true, 'playwright', NULL, true),
  ('Cylex', 'cylex', 'form', 'https://www.cylex.us/', NULL, false, 'playwright', NULL, true),
  ('Brownbook', 'brownbook', 'form', 'https://www.brownbook.net/', 'https://www.brownbook.net/login', true, 'playwright', NULL, true),
  ('eLocal', 'elocal', 'form', 'https://www.elocal.com/', NULL, false, 'playwright', NULL, true),
  ('Citysearch', 'citysearch', 'form', 'https://www.citysearch.com/', NULL, false, 'playwright', NULL, true),
  ('Superpages', 'superpages', 'form', 'https://www.superpages.com/', NULL, false, 'playwright', NULL, true),
  ('Chamber of Commerce', 'chamber-of-commerce', 'form', 'https://www.chamberofcommerce.com/', NULL, false, 'playwright', 'National chamber discovery surface.', true),
  ('BBB', 'bbb', 'form', 'https://www.bbb.org/', 'https://www.bbb.org/login', true, 'playwright', NULL, true),
  ('Nextdoor Business', 'nextdoor-business', 'form', 'https://business.nextdoor.com/', 'https://nextdoor.com/login', true, 'playwright', NULL, true),
  ('Santa Barbara Chamber of Commerce', 'santa-barbara-chamber-of-commerce', 'aggregator', 'https://sbchamber.org/', 'https://sbchamber.org/', false, 'manual', 'Local citation partner.', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO listings (business_id, directory_id, status)
SELECT 'b0000000-0000-4000-8000-000000000001', d.id, 'not_submitted'::synclocal_listing_status
FROM directories d
WHERE NOT EXISTS (
  SELECT 1 FROM listings l
  WHERE l.business_id = 'b0000000-0000-4000-8000-000000000001'
    AND l.directory_id = d.id
);
