# Simple new tab page

## Development

1. Add `VITE_API_KEY` variable to `.env` containing the pexels API key
2. Run with `yarn dev`
3. In your browser, go to `chrome://extensions`
4. Drag the `compiled` folder from into the browser window

You should now have the dev version of the extension installed in your browser

## Pushing Changes

1. Generate a new fine-grained github token with "read and write" Content permission on this repo
2. Paste the new token into this repo's GH_TOKEN secret
3. Push changes to the `main` branch
