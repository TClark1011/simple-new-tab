# Simple new tab page

## Development

1. Add `VITE_API_KEY` variable to `.env` containing the pexels API key
2. Run with `yarn dev`
3. In your browser, go to `chrome://extensions`
4. Drag the `compiled` folder from into the browser window

You should now have the dev version of the extension installed in your browser

**Hot Reload:** Hot reload will work, however it will also cause the extensions popup menu to close due to chrome's behaviour. To fix this, just open the popup, then right click in it and press inspect. As long as the inspect window is open, the popup will not close.

## Pushing Changes

1. Generate a new fine-grained github token with "read and write" Content permission on this repo
2. Paste the new token into this repo's GH_TOKEN secret
3. Push changes to the `main` branch

### Fixing A Broken Release

If you follow the steps above, but something causes the CI to fail, then a proper github release for that version won't be created, but re-running the CI still won't do it since most likely the new version tag was created so the `semantic-release` CLI will believe a release has already been made and won't retry it.

To solve this, we will release a build from our local machine.

1. Delete the tag that was created from the origin `git push --delete origin v(VERSION)`\* replace (VERSION) with the version that failed to release correctly
2. Delete the tag locally `git tag -d v(VERSION)`
3. Get the Github token you created before (if you can't retrieve its value, just create another one), then run `GH_TOKEN=(YOUR_GITHUB_TOKEN) yarn release --no-ci`
