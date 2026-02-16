# Publishing

Releases are automated via GitHub Actions. To publish a new version:

1. Make sure all changes are committed and pushed to `main`.
2. Create and push a version tag:
   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   ```
3. The workflow automatically updates `package.json` to match the tag version, builds, and publishes to npm.

## Setup

Add an `NPM_TOKEN` secret in your GitHub repository settings (Settings > Secrets and variables > Actions) with a npm access token that has publish permissions for the `@nitrique` scope.
