import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { 
      secret: 'Next.js is cool!',
      message: 'Successfully authenticated',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  
  return NextResponse.json(
    {
      message: 'Data received successfully',
      received: body,
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
