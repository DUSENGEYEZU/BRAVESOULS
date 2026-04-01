# Deployment: custom domain & GitHub Pages

This site is published to **GitHub Pages** and served on the production domain **`bravesoulswellness.com`**.

## What only you can configure

No tool in this repository can log into **your** GitHub account or **your** domain registrar. You still need to:

1. **DNS** — Add the A and CNAME records at the company where you bought `bravesoulswellness.com`.
2. **GitHub (browser)** — Sign in as a user with admin on `DUSENGEYEZU/BRAVESOULS`, then **Settings → Pages**: choose the **`gh-pages`** branch as the source (first time), set **Custom domain**, and later **Enforce HTTPS**.
3. **(Optional)** Verify the domain under **GitHub account/org → Settings → Pages** as described in GitHub’s docs.

The workflow file automates **building and pushing** to `gh-pages`. **GitHub Actions also needs repository settings in the browser** (workflow permissions, Pages source). Those are listed in **[GitHub Actions — repository settings (required)](#github-actions--repository-settings-required)** below and in `.github/README.md`.

| Item | Value |
|------|--------|
| Repository | `DUSENGEYEZU/BRAVESOULS` on GitHub |
| Production URL | `https://bravesoulswellness.com` (and `https://www.bravesoulswellness.com` after DNS + redirects) |
| Pages host (CNAME target) | `DUSENGEYEZU.github.io` |

---

## One-time: DNS at your registrar

Point the domain to GitHub Pages. Official reference: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

### Apex (`bravesoulswellness.com`)

Create **four `A` records** for the apex (often shown as `@`):

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

(Optional IPv6: add the `AAAA` records listed in GitHub’s docs if your provider supports them.)

### `www` subdomain

Create a **`CNAME`** record:

| Host / name | Target |
|-------------|--------|
| `www` | `DUSENGEYEZU.github.io` |

The target must be **`username.github.io`** — do **not** include the repository name.

GitHub recommends configuring both apex and `www` so HTTPS and redirects behave correctly.

---

## One-time: GitHub repository settings

1. **Settings → Pages**
   - **Source:** branch that publishes the site (typically `gh-pages` when using `ng deploy`).
   - **Custom domain:** enter `bravesoulswellness.com` (or `www.bravesoulswellness.com` if you want `www` as the canonical name). Save.
   - After DNS propagates, enable **Enforce HTTPS**.

2. **(Recommended)** Verify the domain under your account or organization **Settings → Pages** so the domain cannot be attached to another user’s repository by mistake. See [Verifying your custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

GitHub recommends adding the custom domain in the repo **before** relying on DNS alone, to reduce takeover risk.

---

## GitHub Actions — repository settings (required)

The YAML workflow only defines **jobs and steps**. GitHub still needs these **Settings** on the website (they are **not** stored in the repo):

| Step | Where | What to choose |
|------|--------|----------------|
| 1 | **Repository → Settings → Actions → General** | Scroll to **Workflow permissions**. Select **Read and write permissions** (not “Read repository contents and packages permissions” only). This lets `GITHUB_TOKEN` **push** to the `gh-pages` branch. If this stays read-only, the “Deploy to gh-pages” step fails with a permission error. |
| 2 | **Same page** | Ensure **Allow GitHub Actions to create and approve pull requests** is optional for this workflow; the important part is read/write on the token. |
| 3 | **Settings → Actions → General** (top) | If **Actions permissions** is set to “Disable actions”, turn Actions **on** so workflows run. |
| 4 | **Settings → Pages** | **Build and deployment** → **Deploy from a branch** → Branch **`gh-pages`**, folder **`/`** (root). Save. |

Official reference: [Automatic token authentication](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token) and workflow permissions.

---

## GitHub Actions (what the workflow file does)

The workflow [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) runs on **every push** to **`master`** or **`main`** (and can be run manually: **Actions → Deploy to GitHub Pages → Run workflow**).

It runs `npm ci`, `npm run build-prod`, then publishes `dist/bravesouls/browser` to the **`gh-pages`** branch with a **`CNAME`** file for `bravesoulswellness.com`.

**After the [repository settings](#github-actions--repository-settings-required) above are set:**

1. Push to `master` (or run the workflow manually) so `gh-pages` updates.
2. Set **Custom domain** and **Enforce HTTPS** under **Settings → Pages** as in [One-time: GitHub repository settings](#one-time-github-repository-settings).

Short index: [`.github/README.md`](.github/README.md).

You can still deploy from your machine with `npm run deploy` if you prefer `angular-cli-ghpages` locally.

---

## Project configuration (this repo)

### `angular.json` — deploy target

The `deploy` builder (`angular-cli-ghpages`) is configured with:

- **`baseHref`:** `"/"` — required when the site is served at the **root** of the custom domain (not under `/REPO/`).
- **`dir`:** `dist/bravesouls/browser` — output folder for the built app.
- **`cname`:** `bravesoulswellness.com` — writes a `CNAME` file on the published branch so each deploy keeps the custom domain.

If the canonical hostname in GitHub is **`www.bravesoulswellness.com`**, change `cname` to that exact string so it stays in sync with **Settings → Pages**.

> **Important:** `baseHref` must always be a **URL path** (e.g. `/` or `/BRAVESOULS/`), never a bare domain name. A mistaken value breaks scripts, styles, and routing.

### `package.json` scripts

| Command | Purpose |
|---------|---------|
| `npm run deploy` | Runs `ng deploy` using the options above (`/` + `cname`). Use for **production on the custom domain**. |
| `npm run deploy:github-io` | Deploys with `--base-href=/BRAVESOULS/` for the legacy **`https://dusengeyezu.github.io/BRAVESOULS/`** URL only. |

### Runtime asset URLs

The app resolves static assets using the document `<base href>` and helpers such as `assetPathFromBase` so images and media work both locally and on Pages. Do not hardcode `/BRAVESOULS/` in templates for production when the site is served at the domain root.

---

## Deploy workflow (repeatable)

1. Ensure changes are committed and the build succeeds: `npm run build`.
2. Deploy: `npm run deploy`  
   (Requires permission to push to the remote and appropriate auth for GitHub.)
3. Wait for the Pages build to finish; confirm the site at `https://bravesoulswellness.com`.

DNS changes can take from minutes up to 24 hours to propagate globally.

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| Actions job fails when pushing to `gh-pages` (permission denied) | **Settings → Actions → General → Workflow permissions** → **Read and write permissions**. |
| Workflow does not run on push | **Settings → Actions** — ensure Actions are enabled; confirm you pushed to **`master`** or **`main`**. |
| Site loads but assets 404 | `baseHref` in `angular.json` deploy options should be `"/"` for the custom domain; run `npm run deploy` (not `deploy:github-io`) unless you intentionally use the `/BRAVESOULS/` path. |
| Custom domain drops after deploy | `cname` in `angular.json` must match the hostname in **Settings → Pages → Custom domain**. |
| Certificate / HTTPS not available yet | Wait for DNS; then enable **Enforce HTTPS** when GitHub allows it. |
| Wrong site or 404 at apex | Confirm all four **A** records for the apex; remove conflicting default records at the registrar. |

For more detail, see [Troubleshooting custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages).
