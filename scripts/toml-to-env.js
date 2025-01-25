import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'smol-toml'

// Read the wrangler.toml file
const wranglerPath = join(process.cwd(), 'wrangler.toml')
const envPath = join(process.cwd(), '.env')

// Read and parse the TOML file
const tomlContent = readFileSync(wranglerPath, 'utf-8')
const parsed = parse(tomlContent)

// Get the environment from command line args or default to 'production'
const env = process.argv[2] || 'production'

console.log(`Using environment: ${env}`)

// Get the environment variables
const envVars = parsed[`env`][`${env}`]?.vars || {}
const globalVars = parsed.vars || {}

// Combine global and environment-specific variables
// Environment-specific variables take precedence
const combinedVars = { ...globalVars, ...envVars }

// Convert to .env format
const envContent = Object.entries(combinedVars)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n')

// Write to .env file
writeFileSync(envPath, envContent)

console.log(
  `Created .env at ${envPath} with ${Object.keys(combinedVars).length} variables for environment: ${env}`
)
