# DOR-CTR Repository Guide

> Guard note: **README examples must correspond to committed files.**

This repository currently contains documentation only. The previously embedded source dumps have been removed and replaced with a canonical guide that reflects the checked-in tree.

## Monorepo structure

Current committed structure:

```text
.
└── README.md
```

Planned monorepo directories such as `card-platform/apps/api` or `card-platform/apps/web` are **not present in this commit**.

## Local development

Because there is no application code checked in yet, there is no install/build/test workflow to run.

Useful repository commands:

```bash
# show tracked files
git ls-files

# show working tree status
git status
```

## API/Web startup

There are currently no runnable API or web services in the committed tree, so there are no valid startup commands.

When API/web code is committed, this section should be updated with exact commands and paths (for example, workspace-specific `npm` scripts) that can be run directly from the checked-in repository.

## Domain ownership map

No domain modules are committed yet.

Expected ownership map should be added only after corresponding directories/files are present in the repository.

Suggested format once code exists:

- `apps/api/src/modules/auth` → Authentication domain owner
- `apps/api/src/modules/collection` → Collection domain owner
- `apps/api/src/modules/marketplace` → Marketplace domain owner
- `apps/api/src/modules/shared` → Shared collections domain owner
- `apps/api/src/modules/pricing` → Pricing domain owner
- `apps/api/src/modules/profile` → Profile domain owner

(Do not keep entries that do not exist in `git ls-files`.)
