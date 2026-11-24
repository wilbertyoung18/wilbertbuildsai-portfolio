// Launches Chromium so a check can NEVER reach the real Formspree form.
//  1. DNS: formspree.io does not resolve inside this browser.
//  2. Route: requests to it get a local mock response and are recorded.
//  3. Default deny: anything not on BASE's origin is aborted.
//  Service workers are blocked because they could bypass routing.
import { chromium } from 'playwright'

const isFormspree = (host) => host === 'formspree.io' || host.endsWith('.formspree.io')
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'POST, OPTIONS' }

export async function launchSafe(base) {
  const origin = new URL(base).origin
  if (isFormspree(new URL(base).hostname)) throw new Error('BASE must not be Formspree')
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    args: ['--host-resolver-rules=MAP formspree.io ~NOTFOUND, MAP *.formspree.io ~NOTFOUND'],
  })
  const submissions = []
  const blocked = []
  const newContext = browser.newContext.bind(browser)

  browser.newContext = async (options = {}) => {
    const context = await newContext({ ...options, serviceWorkers: 'block' })
    await context.route('**/*', (route) => {
      const request = route.request()
      const url = new URL(request.url())
      if (isFormspree(url.hostname)) {
        if (request.method() === 'POST') submissions.push({ url: request.url(), body: request.postData() ?? '' })
        return route.fulfill({ status: 200, contentType: 'application/json', headers: CORS, body: '{"ok":true,"mock":true}' })
      }
      if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) return route.continue()
      blocked.push(request.url())
      return route.abort('blockedbyclient')
    })
    return context
  }
  browser.newPage = async (options) => (await browser.newContext(options)).newPage()
  return { browser, submissions, blocked }
}
