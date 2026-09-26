# Flux Supply development instructions

This repository owns only the **flux-supply** release feed. Read this file before changing the website.

## Patch notes are part of every site update

- Before finishing a website change, update `patch-notes.json` with a short, factual release entry for this site. Keep the five historical entries and all later releases.
- Each entry must have `siteId: "flux-supply"`, a unique `id`, `version`, `title`, `summary`, `releasedAt` (ISO 8601), `commitHash` (the actual Git commit), and concise `tags`. The document-level `siteId` must match. Do not copy updates from another Payloader website into this feed.
- Read the newest recorded version before releasing. Ordinary fixes, features, content and visual changes advance the second number by one (for example, `v1.6` to `v1.7`, then through `v1.10`). A genuinely major release may move to `v2.0`. Never use a whole-number jump for routine work, reuse a version, or rename old releases just to inflate the version.
- Put newest entries first. Use the commit's date and hash for historical entries; for a new release, record the final commit hash once it exists. Do not invent shipped changes or claim a deployment before it occurs.
- The public `patch-notes.html` page reads that JSON. Check that it loads, has no empty cards, and links from the home page. Payloader Manage reads this site's JSON under its own site selector; keep `siteId` stable so histories cannot mix.
- Run this repository's existing validation/build checks after editing and preserve its deployment rules.
