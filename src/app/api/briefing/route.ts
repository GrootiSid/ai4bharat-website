import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // EmailJS Credentials
    const serviceId = 'service_nm6vrfq';
    const templateId = 'template_1xcnlaz';
    const publicKey = '_8kwKDa_kKokbR8UH';

    // Map to potential EmailJS template variable names to avoid 422 (Recipients address is empty)
    const emailValue = body.email || body.user_email || body.to_email;

    console.log(`Submitting EmailJS for: ${emailValue}`);

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: body.name || body.user_name || 'Website Inquiry',
          email: emailValue,
          user_email: emailValue, // Redundant mapping
          to_email: emailValue,    // Redundant mapping
          company: body.company || 'N/A',
          role: body.role || 'N/A',
          company_size: body.companySize || 'N/A',
          interest: body.interest || 'N/A',
          cloud_env: body.cloudStack || 'N/A',
          message: body.message || 'No additional requirements provided.'
        },
      }),
    });

    const responseText = await response.text();

    if (response.ok) {
      console.log('EmailJS REST success:', responseText);
      return NextResponse.json({ success: true });
    } else {
      console.error('EmailJS REST failure:', responseText);
      // Detailed error for common EmailJS issues
      let errorMessage = responseText;
      if (responseText.includes('template ID not found')) {
        errorMessage = 'Invalid EmailJS Template ID. Please verify in dashboard.';
      }

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: response.status || 400 }
      );
    }
  } catch (error: any) {
    console.error('Internal API Route Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
