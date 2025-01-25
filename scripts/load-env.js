import { config } from 'dotenv'
import { existsSync } from 'fs'
import { join } from 'path'

console.log('CF_PAGES:', process.env.CF_PAGES)
console.log('CF_PAGES_BRANCH:', process.env.CF_PAGES_BRANCH)
console.log('CF_PAGES_COMMIT_SHA:', process.env.CF_PAGES_COMMIT_SHA)
console.log('CF_PAGES_URL:', process.env.CF_PAGES_URL)
console.log('NODE_ENV:', process.env.NODE_ENV)
/**
 * Loads environment variables from a .env file into process.env
 * @param {string} [envPath] - Optional path to .env file. Defaults to '.env' in current directory
 * @returns {Object} Object containing the loaded environment variables
 */
const envPath = join(process.cwd(), `.env.${process.env.CF_PAGES_BRANCH}`)
console.log('setting api url to deployment url for proxy')
process.env.VITE_API_URL = process.env.CF_PAGES_URL

if (existsSync(envPath)) {
  console.log('Loading environment variables from', envPath)
  try {
    const result = config({
      path: envPath,
    })
    if (result.error) {
      throw result.error
    }
    console.log('parsed env variables:', result.parsed)
    for (const k in result.parsed) {
      process.env[k] = result.parsed[k]
    }
    console.log('\nCustom Environment Variables:')
    Object.keys(process.env).forEach((key) => {
      // Filter out Node.js and system variables
      if (key.startsWith('CF_') || key.startsWith('VITE_')) {
        console.log(`${key}:`, process.env[key])
      }
    })
  } catch (error) {
    console.error('Error loading environment variables:', error)
  }
}
