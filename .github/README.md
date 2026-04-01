---
noteId: "4a4960102dd611f1b2200537094d70b3"
tags: []

---

# GitHub configuration for this repository

The **workflow file** lives at [workflows/deploy-github-pages.yml](workflows/deploy-github-pages.yml). It is only **half** of the setup: it tells GitHub *what* to run. Several **repository settings** must be turned on in the browser — they cannot be committed in YAML.

| Location in GitHub | What to set | Why |
|--------------------|-------------|-----|
| **Settings → Actions → General → Workflow permissions** | **Read and write permissions** | The deploy step must **push** to the `gh-pages` branch. The default “Read repository contents” only **blocks** that push. |
| **Settings → Actions → General** | Actions enabled (default on public repos) | If Actions are disabled, workflows never run. |
| **Settings → Pages → Build and deployment** | **Deploy from a branch** → Branch **`gh-pages`**, folder **`/`** | Tells Pages which branch to serve as the website. |
| **Settings → Pages → Custom domain** | `bravesoulswellness.com` (or your chosen hostname) | Matches the `CNAME` written by the workflow. |

Full DNS steps, HTTPS, and troubleshooting: **[../DEPLOYMENT.md](../DEPLOYMENT.md)**.

## What the workflow does (in code)

- **Trigger:** push to `master` or `main`, or manual **Run workflow** under **Actions**.
- **Steps:** `npm ci` → `npm run build-prod` → publish `dist/bravesouls/browser` to **`gh-pages`** with **`CNAME`** → `bravesoulswellness.com`.

**No one else can “log into your GitHub” from this repo** — you (or an admin) must open **Settings** and apply the table above once.
