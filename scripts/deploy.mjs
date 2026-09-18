/**
 * Build the deck without presenter notes and deploy it to Azure Static Web Apps.
 *
 *   npm run deploy
 *
 * The deployment token is read from `.env` (DEPLOYMENT_TOKEN), which is
 * gitignored, and handed to the SWA CLI through the environment — never as a
 * command-line argument, which would land in shell history and process lists.
 *
 * `presenter: dev` only gates the /presenter/ route; the note text is still
 * compiled into the slide chunks. `--without-notes` is what keeps the stage
 * script out of the public bundle.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = resolve(root, '.env')

const bin = name =>
  resolve(root, 'node_modules', '.bin', process.platform === 'win32' ? `${name}.cmd` : name)

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

function readToken() {
  if (!existsSync(envPath))
    fail(`${envPath} not found. Create it with one line:  DEPLOYMENT_TOKEN=<token>`)
  const line = readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .find(l => /^\s*DEPLOYMENT_TOKEN\s*=/.test(l))
  if (!line)
    fail(`${envPath} has no DEPLOYMENT_TOKEN= line`)
  const value = line.slice(line.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '')
  if (!value)
    fail('DEPLOYMENT_TOKEN is empty')
  return value
}

function run(command, args, env) {
  console.log(`\n▸ ${command} ${args.join(' ')}`)
  execFileSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, ...env },
  })
}

const token = readToken()
for (const tool of ['slidev', 'swa']) {
  if (!existsSync(bin(tool)))
    fail(`${tool} is not installed. Run "npm install" in ${root}.`)
}

run(bin('slidev'), ['build', '--without-notes'])
run(bin('swa'), ['deploy', 'dist', '--env', 'production'], { SWA_CLI_DEPLOYMENT_TOKEN: token })
console.log('\n✓ deck published\n')
