import { Page } from 'playwright';

export interface PlatformConfig {
  name: string;
  baseUrl: string;
  loginUrl: string;
  jobSearchUrl: string;
}

export abstract class PlatformAdapter {
  protected page: Page;
  protected config: PlatformConfig;

  constructor(page: Page, config: PlatformConfig) {
    this.page = page;
    this.config = config;
  }

  abstract login(credentials: any): Promise<boolean>;
  abstract findJobs(query: string): Promise<any[]>;
  abstract applyForJob(jobId: string, proposal: string): Promise<boolean>;
  abstract checkMessages(): Promise<any[]>;
}

export class UpworkAdapter extends PlatformAdapter {
  async login(credentials: any): Promise<boolean> {
    await this.page.goto(this.config.loginUrl);
    // Real login would handle 2FA and cookies
    return true;
  }

  async findJobs(query: string): Promise<any[]> {
    await this.page.goto(`${this.config.jobSearchUrl}?q=${encodeURIComponent(query)}`);
    // Wait for jobs to load
    await this.page.waitForSelector('.job-tile', { timeout: 10000 });
    
    const jobs = await this.page.$$eval('.job-tile', tiles => {
      return tiles.map(tile => ({
        title: tile.querySelector('.job-title')?.textContent?.trim(),
        description: tile.querySelector('.job-description')?.textContent?.trim(),
        id: tile.getAttribute('data-job-id')
      }));
    });
    
    return jobs;
  }

  async applyForJob(jobId: string, proposal: string): Promise<boolean> {
    await this.page.goto(`https://www.upwork.com/ab/proposals/job/${jobId}/apply/`);
    
    // Fill proposal
    await this.page.fill('textarea[name="coverLetter"]', proposal);
    
    // Click submit (Safety: only in non-dry-run)
    // await this.page.click('button:has-text("Submit")');
    return true;
  }

  async checkMessages(): Promise<any[]> {
    await this.page.goto('https://www.upwork.com/messages/');
    return [];
  }
}
