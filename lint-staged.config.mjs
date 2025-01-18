export default {
  'src/**/*.{ts,tsx}': [
    'eslint --cache --fix',
    'prettier --write',
    () => 'tsc --noEmit',
  ],
}
