import { LoginPanel } from "./LoginPanel"

export default function AdminLoginPage() {
  const configOk = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  return <LoginPanel configOk={configOk} />
}
