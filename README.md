```txt
npm install
npm run dev
```

```txt
npm run deploy
```

## TODO

- [ ] husky and lint-staged
- [ ] add growthbook
- [ ] add GTM, other root script tags
- [ ] add env vars, figure out deployments and env vars
- [ ] add vitest
- [ ] testing, linting, type checking on prs

## Overriding environment variables on a branch for a preview deployment

create a `.env` file with the environment variables you want to override, and name it with the branch name as a suffix. For example, if you want to override the API URL on the `preview` branch, create a `.env.preview` file with the following contents:

```bash
VITE_API_URL=https://preview-api.example.com
```
