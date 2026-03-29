import { chromium, Browser, Page, BrowserContext } from 'playwright';

export interface AutomationResult {
  success: boolean;
  message?: string;
  data?: any;
}

export class AriaBrowser {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  async initialize(headless: boolean = true): Promise<AutomationResult> {
    try {
      this.browser = await chromium.launch({
        headless,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-blink-features=AutomationControlled',
        ],
      });

      this.context = await this.browser.newContext({
        viewport: { width: 1280, height: 800 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });

      // Stealth evasion: Redefine webdriver property
      await this.context.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
      });

      this.page = await this.context.newPage();
      return { success: true, message: 'AriaBrowser Initialized' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async navigateTo(url: string): Promise<AutomationResult> {
    if (!this.page) return { success: false, message: 'Browser not initialized' };
    try {
      await this.page.goto(url, { waitUntil: 'networkidle' });
      return { success: true, message: `Navigated to ${url}` };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getVisualState(): Promise<{ screenshot: string; url: string; title: string }> {
    if (!this.page) throw new Error('Browser not initialized');
    
    // Capture screenshot as base64 for LLM processing
    const screenshot = await this.page.screenshot({ type: 'jpeg', quality: 80 });
    return {
      screenshot: screenshot.toString('base64'),
      url: this.page.url(),
      title: await this.page.title(),
    };
  }

  async humanMove(x: number, y: number): Promise<void> {
    if (!this.page) return;
    // Simulate non-linear mouse movement
    await this.page.mouse.move(x, y, { steps: 10 });
    await this.page.mouse.click(x, y);
  }

  async close() {
    if (this.browser) await this.browser.close();
  }

  getPage() {
    return this.page;
  }
}

export const ariaBrowser = new AriaBrowser();
