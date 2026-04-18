import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const call = await client.calls.create({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/voice/webhook`,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });

    return NextResponse.json({ success: true, callSid: call.sid });
  } catch (error: any) {
    console.error('Twilio Call Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
