import puppeteer, { Browser, LaunchOptions } from 'puppeteer';
import fs from 'fs';

let globalBrowser: Browser | null = null;
let browserPromise: Promise<Browser> | null = null;

function findSystemChrome(): string | undefined {
  const possiblePaths = [
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean) as string[];

  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        return p;
      }
    } catch {
      // ignore
    }
  }
  return undefined;
}

export async function getBrowser(): Promise<Browser> {
  if (globalBrowser && globalBrowser.connected) {
    return globalBrowser;
  }

  if (browserPromise) {
    return browserPromise;
  }

  const systemChrome = findSystemChrome();

  const launchOptions: LaunchOptions = {
    headless: true,
    ...(systemChrome ? { executablePath: systemChrome } : {}),
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--hide-scrollbars',
      '--mute-audio',
    ],
  };

  browserPromise = puppeteer.launch(launchOptions);

  try {
    globalBrowser = await browserPromise;
    browserPromise = null;

    globalBrowser.on('disconnected', () => {
      globalBrowser = null;
      browserPromise = null;
    });

    return globalBrowser;
  } catch (error) {
    browserPromise = null;
    throw error;
  }
}

export async function closeBrowser(): Promise<void> {
  if (globalBrowser) {
    await globalBrowser.close();
    globalBrowser = null;
  }
}
