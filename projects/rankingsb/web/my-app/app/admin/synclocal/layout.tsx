import { redirect } from "next/navigation"

import { createServerSupabase } from "@/lib/supabase/server"

export default async function SynclocalAgencyGateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createServerSupabase()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/admin/login")
  }

  const { data: memberships } = await supabase.from("agency_members").select("agency_id").eq("user_id", user.id)

  if (!memberships?.length) {
    redirect("/admin/unauthorized")
  }

  return children
}
