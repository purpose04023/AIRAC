import { ariaBrowser } from '../automation/browser';
import { UpworkAdapter } from '../automation/platforms';
import { llmProvider } from '../ai/llm';
import { defaultProfile } from './profile';

export class AriaBrain {
  private active: boolean = false;
  private logs: string[] = [];
  private currentVisuals: { screenshot: string | null; url: string } = { screenshot: null, url: 'offline' };
  private currentMind: { thought: string; action: string } = { thought: 'Standing by...', action: 'IDLE' };
  private approvalRequired: { type: string; data: string; active: boolean } = { type: '', data: '', active: false };

  constructor() {
    this.addLog('Brain offline. Ready for initialization.');
  }

  async wakeUp() {
    this.active = true;
    this.addLog('ARIA is waking up...');
    
    const init = await ariaBrowser.initialize(true);
    if (!init.success) {
      this.addLog(`Initialization failed: ${init.message}`);
      return;
    }

    this.addLog('Browser initialized. Establishing platform connections...');
    
    // Start the visual sync loop
    this.syncVisuals();
  }

  private async syncVisuals() {
    while (this.active) {
      try {
        const state = await ariaBrowser.getVisualState();
        this.currentVisuals = state;
      } catch (e) {
        // Silent fail if page is changing
      }
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  async runMission(query: string) {
    if (!this.active) await this.wakeUp();
    
    this.addLog(`Starting Mission: "${query}"`);
    
    // Core Reasoning Loop
    let interactions = 0;
    while (interactions < 10) { // Safety limit
      try {
        const visualState = await ariaBrowser.getVisualState();
        this.currentVisuals = visualState;
        
        this.addLog("Analyzing screen visuals...");
        const result = await llmProvider.analyzeScreen(
          visualState.screenshot, 
          `Working on mission: ${query}. My profile: ${JSON.stringify(defaultProfile)}`
        );
        
        this.currentMind = {
          thought: result.thought,
          action: `${result.action.type.toUpperCase()}${result.action.target ? `: ${result.action.target}` : ''}`
        };

        this.addLog(`Action Logic: ${result.thought}`);
        
        if (result.action.type && result.action.coordinates) {
          // If it's a critical action, ask for approval
          if ((result.action.type as string) === 'submit' || (result.action.type as string) === 'click') {
            this.approvalRequired = { type: result.action.type, data: result.action.target || 'Coordinates', active: true };
            this.addLog("Awaiting Human Approval for critical action...");
            while (this.approvalRequired.active) {
                await new Promise(r => setTimeout(r, 1000));
            }
          }
          await ariaBrowser.humanMove(result.action.coordinates.x, result.action.coordinates.y);
        } else if (result.action.type === 'click' && result.action.target) {
            const page = ariaBrowser.getPage();
            if (page) await page.click(result.action.target);
        }
        
        interactions++;
        await new Promise(r => setTimeout(r, 2000));
      } catch (e: any) {
        this.addLog(`Error in reasoning loop: ${e.message}`);
        break;
      }
    }
    
    this.addLog('Mission completed or maximum interactions reached.');
  }

  private addLog(msg: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push(`[${timestamp}] ${msg}`);
    console.log(`[ARIA] ${msg}`);
  }

  getLogs() {
    return this.logs;
  }

  getVisuals() {
    return this.currentVisuals;
  }

  getMind() {
    return this.currentMind;
  }

  getApprovalState() {
    return this.approvalRequired;
  }

  approveAction() {
    this.addLog("Human approved action. Proceeding...");
    this.approvalRequired.active = false;
  }

  rejectAction() {
    this.addLog("Human rejected action. Abortion mission.");
    this.approvalRequired.active = false;
    this.active = false;
  }

  getStatus() {
    return {
      active: this.active,
      lastCheck: new Date().toISOString(),
      health: 'OPTIMAL',
    };
  }
}

export const ariaBrain = new AriaBrain();
