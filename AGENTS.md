# Flux Supply development instructions

This repository owns only the **flux-supply** release feed. Read this file before changing the website.

## Patch notes are part of every site update

- Before finishing a website change, update `patch-notes.json` with a short, factual release entry for this site. Keep the five historical entries and all later releases.
- Each entry must have `siteId: "flux-supply"`, a unique `id`, `version`, `title`, `summary`, `releasedAt` (ISO 8601), `commitHash` (the actual Git commit), and concise `tags`. The document-level `siteId` must match. Do not copy updates from another Payloader website into this feed.
- Version sequence: Every commit note in this site feed must have its own unique version. Start the retained history at v1.0 for the oldest commit and assign labels in source commit-date order. Small and medium changes advance the minor number by 0.1; reserve a whole-number major jump such as v2.0 for a large release with several substantial capabilities or a major new feature. Never repeat or reorder version labels. Correct historical labels when needed to restore this rule; do not inflate versions.
- Put newest entries first, with version numbers descending in the same displayed order. Use the commit's date and hash for historical entries; for a new release, record the final commit hash once it exists. Do not invent shipped changes or claim a deployment before it occurs.
- Patch notes are displayed only in Payloader Manage. Do not ship a patch-notes.html page or add visible patch-note links or buttons to this site. Keep the site-specific patch-notes.json feed, with its stable siteId, so Manage can display each history separately.
- When the Payloader Manage fallback contains one of this site's notes, keep its version aligned by `commitHash`.
- Run this repository's existing validation/build checks after editing and preserve its deployment rules.
