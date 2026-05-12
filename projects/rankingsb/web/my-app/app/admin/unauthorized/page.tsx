import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Access restricted</h1>
      <p className="max-w-xl text-muted-foreground">
        Your account signed in correctly, but it is not yet linked inside Supabase SyncLocal ACL. Ask an administrator to attach your user to an
        agency in the agency_members table.
      </p>
      <Link className="text-primary underline" href="/">
        ← Back to site
      </Link>
    </div>
  )
}
