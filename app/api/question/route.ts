import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { NOTIFICATION_EMAIL } from "@/lib/constants"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, question } = body

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      )
    }

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support." },
        { status: 500 }
      )
    }

    // Use RESEND_FROM_EMAIL if set, otherwise default to onboarding@resend.dev
    // IMPORTANT: Set RESEND_FROM_EMAIL to an email on your verified domain (e.g., hello@yourdomain.com)
    // You cannot use @gmail.com addresses as the FROM address
    let fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

    // Warn if using default Resend email (testing mode)
    if (!process.env.RESEND_FROM_EMAIL || fromEmail.includes("@resend.dev")) {
      console.warn("⚠️ WARNING: Using default Resend email (testing mode)")
      console.warn("   To send to all users, set RESEND_FROM_EMAIL to your verified domain email")
      console.warn("   Example: RESEND_FROM_EMAIL=hello@yourdomain.com")
    }

    console.log("Sending question emails:", { recipientEmail: NOTIFICATION_EMAIL, fromEmail, senderEmail: email })

    // Escape HTML to prevent XSS and template breaking
    const escapeHtml = (str: string) => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    }

    const escapedEmail = escapeHtml(email)
    const escapedQuestion = escapeHtml(question).replace(/\n/g, "<br>")

    // Prepare both email payloads
    const notificationPayload: any = {
      from: fromEmail,
      to: NOTIFICATION_EMAIL,
      subject: `New Question from ${email}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
          </head>
          <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 0; margin: 0;">
              <tr>
                <td align="center" style="padding: 60px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 0 0 30px 0;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; color: #000000; text-align: left; line-height: 1.2;">
                          New Question
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 0 0 40px 0;">
                        <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #666666; font-weight: 400;">
                          <strong style="color: #000000;">From:</strong> ${escapedEmail}
                        </p>
                        
                        <div style="margin: 0 0 30px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #000000; font-weight: 400; white-space: pre-wrap;">
                            ${escapedQuestion}
                          </p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Divider -->
                    <tr>
                      <td style="padding: 40px 0;">
                        <div style="height: 1px; background-color: #e5e5e5; width: 100%;"></div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 0 0 60px 0;">
                        <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #999999; font-weight: 400;">
                          You can reply directly to this email to respond to ${escapedEmail}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      text: `
New Question

From: ${email}

Question:
${question}

---
You can reply directly to this email to respond to ${email}
      `,
    }

    // Commented out: Confirmation email to user (only sending notification to ewokwong@gmail.com)
    // const confirmationPayload: any = {
    //   from: fromEmail,
    //   to: NOTIFICATION_EMAIL,
    //   subject: "Thanks for your question!",
    //   html: `
    //     <!DOCTYPE html>
    //     <html>
    //       <head>
    //         <meta charset="utf-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    //       </head>
    //       <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    //         <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 0; margin: 0;">
    //           <tr>
    //             <td align="center" style="padding: 60px 20px;">
    //               <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    //                 <!-- Header -->
    //                 <tr>
    //                   <td style="padding: 0 0 50px 0;">
    //                     <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; color: #000000; text-align: left; line-height: 1.2;">
    //                       re:weight.
    //                     </h1>
    //                   </td>
    //                 </tr>
    //                 
    //                 <!-- Content -->
    //                 <tr>
    //                   <td style="padding: 0 0 40px 0;">
    //                     <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.7; color: #000000; font-weight: 400;">
    //                       Thanks for your question!
    //                     </p>
    //                     
    //                     <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7; color: #000000; font-weight: 400;">
    //                       <strong>Your question:</strong>
    //                     </p>
    //                     
    //                     <div style="margin: 0 0 30px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
    //                       <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #000000; font-weight: 400; white-space: pre-wrap;">
    //                         ${escapedQuestion}
    //                       </p>
    //                     </div>
    //                     
    //                     <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #000000; font-weight: 400;">
    //                       Our team will get back to you shortly!
    //                     </p>
    //                   </td>
    //                 </tr>
    //                 
    //                 <!-- Divider -->
    //                 <tr>
    //                   <td style="padding: 40px 0;">
    //                     <div style="height: 1px; background-color: #000000; width: 100%;"></div>
    //                   </td>
    //                 </tr>
    //                 
    //                 <!-- Footer -->
    //                 <tr>
    //                   <td style="padding: 0 0 60px 0;">
    //                     <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #000000; font-weight: 400;">
    //                       If you have any other questions, please feel free to email us at <a href="mailto:TheWeightManagementMovement@gmail.com" style="color: #000000; text-decoration: underline;">TheWeightManagementMovement@gmail.com</a>
    //                     </p>
    //                   </td>
    //                 </tr>
    //               </table>
    //             </td>
    //           </tr>
    //         </table>
    //       </body>
    //     </html>
    //   `,
    //   text: `
    // re:weight.
    //
    // Thanks for your question!
    //
    // Your question:
    // ${question}
    //
    // Our team will get back to you shortly!
    //
    // ---
    // If you have any other questions, please feel free to email us at TheWeightManagementMovement@gmail.com
    //   `,
    // }

    // Send notification email only (confirmation email commented out)
    console.log("Sending notification email:")
    console.log(`Notification to: ${NOTIFICATION_EMAIL}`)

    let notificationSuccess = false
    try {
      const result = await resend.emails.send(notificationPayload)
      if (result.error) {
        console.error("❌ Notification email failed:", result.error)
        console.error("Error details:", JSON.stringify(result.error, null, 2))
      } else {
        notificationSuccess = true
        console.log("✅ Notification email sent successfully to:", NOTIFICATION_EMAIL)
      }
    } catch (error) {
      console.error("❌ Notification email promise rejected:", error)
    }

    // Commented out: Confirmation email check (only sending notification email)
    // Check confirmation email result
    // let confirmationSuccess = false
    // if (confirmationResult.status === "fulfilled") {
    //   const result = confirmationResult.value
    //   if (result.error) {
    //     console.error("❌ Confirmation email failed:", result.error)
    //     console.error("Error details:", JSON.stringify(result.error, null, 2))
    //   } else {
    //     confirmationSuccess = true
    //     console.log("✅ Confirmation email sent successfully to:", NOTIFICATION_EMAIL)
    //   }
    // } else {
    //   console.error("❌ Confirmation email promise rejected:", confirmationResult.reason)
    // }

    // Return success if notification was sent
    if (!notificationSuccess) {
      // Don't expose detailed error to user - just show generic message
      // Detailed error is already logged above
      return NextResponse.json(
        { error: "Failed to send question. Please try again later." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Question sent successfully",
    })
  } catch (error) {
    console.error("Error processing question:", error)
    // Don't expose detailed error to user
    return NextResponse.json(
      { error: "Failed to send question. Please try again later." },
      { status: 500 }
    )
  }
}

