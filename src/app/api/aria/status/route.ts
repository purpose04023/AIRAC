import { NextResponse } from 'next/server';
import { ariaBrain } from '@/lib/agent/brain';

export async function GET() {
  return NextResponse.json({
    status: ariaBrain.getStatus(),
    logs: ariaBrain.getLogs(),
    visuals: ariaBrain.getVisuals(),
    mind: ariaBrain.getMind(),
    approval: ariaBrain.getApprovalState(),
  });
}

export async function POST(request: Request) {
  const { action, query } = await request.json();
  
  if (action === 'WAKE_UP') {
    ariaBrain.wakeUp();
    return NextResponse.json({ success: true });
  }

  if (action === 'APPROVE') {
    ariaBrain.approveAction();
    return NextResponse.json({ success: true });
  }

  if (action === 'REJECT') {
    ariaBrain.rejectAction();
    return NextResponse.json({ success: true });
  }

  if (action === 'RUN_MISSION') {
    // Fire and forget via background
    ariaBrain.runMission(query || 'React Developer');
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, message: 'Unknown action' });
}
