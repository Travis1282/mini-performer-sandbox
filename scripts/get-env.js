console.log("Environment Variables:");
console.log("==================");

// Built-in Cloudflare Pages variables
console.log("Cloudflare Pages Built-in Variables:");
console.log("CF_PAGES:", process.env.CF_PAGES);
console.log("CF_PAGES_BRANCH:", process.env.CF_PAGES_BRANCH);
console.log("CF_PAGES_COMMIT_SHA:", process.env.CF_PAGES_COMMIT_SHA);
console.log("CF_PAGES_URL:", process.env.CF_PAGES_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

// Custom environment variables
console.log("\nCustom Environment Variables:");
Object.keys(process.env).forEach((key) => {
  // Filter out Node.js and system variables
  if (
    !key.startsWith("npm_") &&
    !key.startsWith("_") &&
    !key.startsWith("CF_")
  ) {
    console.log(`${key}:`, process.env[key]);
  }
});
