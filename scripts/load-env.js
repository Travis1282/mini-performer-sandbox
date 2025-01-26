/**
 * Environment Variable Configuration Script for Cloudflare Pages
 *
 * This script manages environment variable configuration for the application:
 * - Logs current Cloudflare Pages environment variables that are available to the build (CF_PAGES, CF_PAGES_BRANCH, etc.)
 * - Supports branch-specific environment overrides via .env.[branch-name] files
 * - Sets up VITE_API_URL for proxy configuration based on CF_PAGES_URL
 * - Processes and merges environment variables from multiple sources:
 *   1. Cloudflare Pages environment variables
 *   2. Branch-specific .env files
 *   3. wrangler.toml configuration
 *   4. Specific varables that are managed as secrets in pages dashboard
 */

import { config } from 'dotenv'
import { existsSync } from 'fs'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'smol-toml'

console.log('\nCF vars:')
console.log('CF_PAGES:', process.env.CF_PAGES)
console.log('CF_PAGES_BRANCH:', process.env.CF_PAGES_BRANCH)
console.log('CF_PAGES_COMMIT_SHA:', process.env.CF_PAGES_COMMIT_SHA)
console.log('CF_PAGES_URL:', process.env.CF_PAGES_URL)

// see if there is a branch env file for override
const envPath = join(process.cwd(), `.env.${process.env.CF_PAGES_BRANCH}`)
console.log('setting VITE_API_URL to CF_PAGES_URL for proxy')
process.env.VITE_API_URL = process.env.CF_PAGES_URL

let parsedEnv = {
  VITE_API_URL: process.env.CF_PAGES_URL,
  VITE_BASE_PATH: process.env.CF_PAGES_URL,
  VITE_PAGES_COMMIT_SHA: process.env.CF_PAGES_COMMIT_SHA,
}

if (existsSync(envPath)) {
  console.log('Loading environment variables from', envPath)
  try {
    const result = config({
      path: envPath,
    })
    if (result.error) {
      throw result.error
    }
    console.log('\nParsed env variables:', result.parsed)
    parsedEnv = { ...parsedEnv, ...result.parsed }
  } catch (error) {
    console.error('Error loading environment variables:', error)
  }
}

// check for API_CLIENT_ID and API_CLIENT_SECRET for cloudflare access headers
const secrets = {
  VITE_API_CLIENT_ID: process.env.VITE_API_CLIENT_ID,
  VITE_API_CLIENT_SECRET: process.env.VITE_API_CLIENT_SECRET,
}

// parse wrangler.toml for environment variables
// Read the wrangler.toml file
const wranglerPath = join(process.cwd(), 'wrangler.toml')
const envFilePath = join(process.cwd(), '.env')

// Read and parse the TOML file
const tomlContent = readFileSync(wranglerPath, 'utf-8')
const parsed = parse(tomlContent)

// Get the environment from command line args or default to 'production'
const env = process.env.CF_PAGES_BRANCH === 'main' ? 'production' : 'preview'

console.log(`Using environment for toml file: ${env}`)

// Get the environment variables
const envVars = parsed[`env`][`${env}`]?.vars || {}
const globalVars = parsed.vars || {}

// Combine global and environment-specific variables
// Environment-specific variables take precedence
const combinedVars = { ...globalVars, ...envVars, ...secrets, ...parsedEnv }

// Convert to .env format
const envContent = Object.entries(combinedVars)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n')

// Write to .env file
writeFileSync(envFilePath, envContent)

console.log(`Created .env at ${envFilePath} for environment: ${env}`)

console.log('\nEnvironment Variables being loaded for the build:')
Object.entries(combinedVars).forEach(([key, value]) => {
  console.log(`${key}=${value}`)
})
