import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

const NOTIFY_TO = 'admin@supershiftlabs.com';
const NOTIFY_FROM = 'SuperShift Labs <notifications@supershiftlabs.com>';

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const fullMessage = company ? `Company: ${company}\n\n${message}` : message;

    const { error: dbError } = await supabase
      .from('contacts')
      .insert([{ name, email, message: fullMessage }]);

    if (dbError) {
      console.error('Failed to save contact submission:', dbError);
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    // Best-effort email notification - the lead is already saved above,
    // so a Resend failure here shouldn't fail the whole request.
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: NOTIFY_FROM,
            to: [NOTIFY_TO],
            reply_to: email,
            subject: `New contact form submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n${company ? `Company: ${company}\n` : ''}\nMessage:\n${message}`,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Resend notification failed:', await emailResponse.text());
        }
      } catch (emailError) {
        console.error('Resend notification error:', emailError);
      }
    } else {
      console.warn('RESEND_API_KEY not set - skipping email notification');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
