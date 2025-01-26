```txt
npm install
npm run dev
```

```txt
npm run deploy
```

## TODO

- [ ] add growthbook
- [ ] add GTM, other root script tags
- [ ] testing, linting, type checking on prs

## Overriding environment variables on a branch for a preview deployment

create a `.env` file with the environment variables you want to override, and name it with the branch name as a suffix. For example, if you want to override the API URL on the `my-cool-feature` branch, create a `.env.my-cool-feature` file with the following contents:

```sh
VITE_API_URL=https://preview-api.example.com
```

To see the order of loading variables for the build, read through the `load-env.js` script.
