# Platform repository

This folder holds files used when publishing the standalone **PropertyManagementSystem** GitHub repository.

| File | Purpose |
|------|---------|
| `README.md` | Root README for the platform repo |
| `RELEASES.md` | Initial release history |
| `package.json` | Renamed to `pms-platform` |

## Publish the platform repo

The cloud agent token cannot create new GitHub repositories. Use one of:

### Option A — GitHub Actions (recommended)

1. Create a [PAT](https://github.com/settings/tokens) with `repo` and `admin:org` (if publishing under an org).
2. Add it as repository secret **`GH_PAT`** on this repo.
3. Run workflow **Publish platform repository** (Actions → workflow_dispatch).

Defaults: `Rob971/PropertyManagementSystem`, marked as template.

### Option B — Local script

```bash
GH_TOKEN=ghp_your_token ./scripts/publish-platform-repo.sh
```

Optional env vars: `GITHUB_ORG`, `GITHUB_REPO_NAME`, `MARK_AS_TEMPLATE=false`.

After publish, new customers use **Use this template** on the platform repo.
