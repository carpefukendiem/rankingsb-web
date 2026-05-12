import type { SynclocalAdapterContext, SynclocalDirectoryAdapter, SynclocalSubmitResult } from "../adapter-contract"

export const manualFormAdapter: SynclocalDirectoryAdapter = {
  async submit(ctx: SynclocalAdapterContext): Promise<SynclocalSubmitResult> {
    const url = ctx.directory.submission_url || ""
    if (!url) {
      return { ok: false, error: "This directory does not expose a SyncLocal submission URL yet." }
    }
    return {
      ok: false as const,
      manualRequired: true,
      submissionUrl: url,
      message:
        "Manual submission required. SyncLocal v1 queued the job — complete the listing in-browser, then use Mark manually submitted.",
    }
  },
  async update(ctx: SynclocalAdapterContext): Promise<SynclocalSubmitResult> {
    return manualFormAdapter.submit(ctx)
  },
}
