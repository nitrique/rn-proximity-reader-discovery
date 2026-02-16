# Publishing

Releases are automated via GitHub Actions using [npm trusted publishing](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions) (OIDC). No npm token or secret is required.

## Setup (one-time)

1. On **npmjs.com**, go to your package settings: `@nitrique/rn-proximity-reader-discovery` → Settings → Publishing access.
2. Under **Trusted publishing**, link your GitHub repository and set the environment name to `npm`.
3. On **GitHub**, create an environment named `npm` in your repository settings (Settings → Environments → New environment). You can optionally add protection rules (e.g. required reviewers).

## Publishing a new version

1. Make sure all changes are committed and pushed to `main`.
2. Create and push a version tag:
   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   ```
3. The workflow automatically updates `package.json` to match the tag version, builds, and publishes to npm with provenance.

## Local testing

To create a package tarball locally without publishing:

```bash
npm pack
```

Use `npm pack --dry-run` to preview included files without creating the tarball.
