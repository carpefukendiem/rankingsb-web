import type { SynclocalDirectoryAdapter, SynclocalSubmitResult } from "../adapter-contract"

export function scaffoldTier1Adapter(directoryName: string): SynclocalDirectoryAdapter {
  return {
    async submit(): Promise<SynclocalSubmitResult> {
      return {
        ok: false,
        scaffold: true,
        degraded: true,
        error: `TODO: Wire ${directoryName} API integration — adapter interface is frozen for SyncLocal v2+.`,
      }
    },
    async update(): Promise<SynclocalSubmitResult> {
      return {
        ok: false,
        scaffold: true,
        degraded: true,
        error: `TODO: Wire ${directoryName} update flow — scaffold only in SyncLocal v1.`,
      }
    },
  }
}
