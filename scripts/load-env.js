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
console.log('setting api url to deployment url for proxy')
process.env.VITE_API_URL = process.env.CF_PAGES_URL

let parsedEnv = {
  VITE_API_URL: process.env.CF_PAGES_URL,
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

// parse wrangler.toml for environment variables
// Read the wrangler.toml file
const wranglerPath = join(process.cwd(), 'wrangler.toml')
const envFilePath = join(process.cwd(), '.env')

// Read and parse the TOML file
const tomlContent = readFileSync(wranglerPath, 'utf-8')
const parsed = parse(tomlContent)

// Get the environment from command line args or default to 'production'
const env = process.env.CF_PAGES_BRANCH === 'main' ? 'production' : 'preview'

console.log(`Using environment: ${env}`)

// Get the environment variables
const envVars = parsed[`env`][`${env}`]?.vars || {}
const globalVars = parsed.vars || {}

// Combine global and environment-specific variables
// Environment-specific variables take precedence
const combinedVars = { ...globalVars, ...envVars, ...parsedEnv }

// Convert to .env format
const envContent = Object.entries(combinedVars)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n')

// Write to .env file
writeFileSync(envFilePath, envContent)

console.log(
  `Created .env at ${envFilePath} with ${Object.keys(combinedVars).length} variables for environment: ${env}`
)

console.log('\nCustom Environment Variables:')
Object.entries(combinedVars).forEach(([key, value]) => {
  console.log(`${key}=${value}`)
})
