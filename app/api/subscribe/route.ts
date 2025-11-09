import { NextRequest, NextResponse } from "next/server"
import { getDatabase, collections } from "@/lib/db"
import { Resend } from "resend"
import { NOTIFICATION_EMAIL } from "@/lib/constants"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const emailLower = email.toLowerCase()
    
    // Check if email already exists
    const existing = await db.collection("emails").findOne({ email: emailLower })
    
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Email already registered",
        duplicate: true,
      })
    }

    // Insert email with timestamp
    await db.collection("emails").insertOne({
      email: emailLower,
      subscribed_at: new Date(),
      source: "website",
    })

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

    // Warn if using default Resend email (testing mode)
    if (!process.env.RESEND_FROM_EMAIL || fromEmail.includes("@resend.dev")) {
      console.warn("⚠️ WARNING: Using default Resend email (testing mode)")
      console.warn("   To send to all users, set RESEND_FROM_EMAIL to your verified domain email")
      console.warn("   Example: RESEND_FROM_EMAIL=hello@yourdomain.com")
    }

    // Send notification email to ewokwong@gmail.com
    try {
      await resend.emails.send({
        from: fromEmail,
        to: NOTIFICATION_EMAIL,
        subject: "New Subscription - re:weight.",
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
                      <tr>
                        <td style="padding: 0 0 30px 0;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; color: #000000; text-align: left; line-height: 1.2;">
                            New Subscription
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 40px 0;">
                          <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7; color: #000000; font-weight: 400;">
                            Someone has subscribed to re:weight.
                          </p>
                          <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #000000; font-weight: 400;">
                            <strong>Email:</strong> ${emailLower}
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
        text: `New Subscription - re:weight.\n\nSomeone has subscribed to re:weight.\n\nEmail: ${emailLower}`,
      })
    } catch (notificationError: any) {
      console.error("Failed to send subscription notification:", notificationError)
      
      // Check if this is a Resend domain verification error
      const errorMessage = notificationError?.message || JSON.stringify(notificationError)
      if (errorMessage.includes("testing emails") || errorMessage.includes("verify a domain")) {
        console.error("⚠️ RESEND DOMAIN VERIFICATION REQUIRED:")
        console.error("   You're in testing mode and can only send to verified email addresses.")
        console.error("   To send to all users:")
        console.error("   1. Go to https://resend.com/domains")
        console.error("   2. Add and verify your domain")
        console.error("   3. Set RESEND_FROM_EMAIL to an email on your verified domain (e.g., noreply@yourdomain.com)")
      }
    }

    // Commented out: Welcome email to subscriber (only sending notification to ewokwong@gmail.com)
    // Send welcome email to subscriber
    // try {
    //   await resend.emails.send({
    //     from: fromEmail,
    //     to: emailLower,
    //     subject: "Welcome to re:weight.",
    //     html: `
    //       <!DOCTYPE html>
    //       <html>
    //         <head>
    //           <meta charset="utf-8">
    //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //           <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    //         </head>
    //         <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    //           <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 0; margin: 0;">
    //             <tr>
    //               <td align="center" style="padding: 60px 20px;">
    //                 <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    //                   <!-- Header -->
    //                   <tr>
    //                     <td style="padding: 0 0 50px 0;">
    //                       <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; color: #000000; text-align: left; line-height: 1.2;">
    //                         re:weight.
    //                       </h1>
    //                     </td>
    //                   </tr>
    //                   
    //                   <!-- Content -->
    //                   <tr>
    //                     <td style="padding: 0 0 40px 0;">
    //                       <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.7; color: #000000; font-weight: 400;">
    //                         Thank you for joining re:weight. We're excited to have you on this journey.
    //                       </p>
    //                       
    //                       <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.7; color: #000000; font-weight: 400;">
    //                         You'll now receive exclusive audio lessons, expert tips, and actionable insights delivered straight to your inbox. Learn on the go - no reading required.
    //                       </p>
    //                       
    //                       <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #000000; font-weight: 400;">
    //                         We're here to help you not only lose the weight, but keep it off for life.
    //                       </p>
    //                     </td>
    //                   </tr>
    //                   
    //                   <!-- Divider -->
    //                   <tr>
    //                     <td style="padding: 40px 0;">
    //                       <div style="height: 1px; background-color: #000000; width: 100%;"></div>
    //                     </td>
    //                   </tr>
    //                   
    //                   <!-- Footer -->
    //                   <tr>
    //                     <td style="padding: 0 0 60px 0;">
    //                       <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #000000; font-weight: 400;">
    //                         If you have any questions, please feel free to email us at <a href="mailto:TheWeightManagementMovement@gmail.com" style="color: #000000; text-decoration: underline;">TheWeightManagementMovement@gmail.com</a>
    //                       </p>
    //                     </td>
    //                   </tr>
    //                 </table>
    //               </td>
    //             </tr>
    //           </table>
    //         </body>
    //       </html>
    //     `,
    //     text: `
    // re:weight.
    //
    // Thank you for joining re:weight. We're excited to have you on this journey.
    //
    // You'll now receive exclusive audio lessons, expert tips, and actionable insights delivered straight to your inbox. Learn on the go - no reading required.
    //
    // We're here to help you not only lose the weight, but keep it off for life.
    //
    // If you have any questions, please feel free to email us at TheWeightManagementMovement@gmail.com
    //     `,
    //   })
    // } catch (emailError: any) {
    //   // Log email error but don't fail the subscription
    //   console.error("Failed to send welcome email:", emailError)
    //   
    //   // Check if this is a Resend domain verification error
    //   const errorMessage = emailError?.message || JSON.stringify(emailError)
    //   if (errorMessage.includes("testing emails") || errorMessage.includes("verify a domain")) {
    //     console.error("⚠️ RESEND DOMAIN VERIFICATION REQUIRED:")
    //     console.error("   You're in testing mode and can only send to verified email addresses.")
    //     console.error("   To send to all users:")
    //     console.error("   1. Go to https://resend.com/domains")
    //     console.error("   2. Add and verify your domain")
    //     console.error("   3. Set RESEND_FROM_EMAIL to an email on your verified domain (e.g., noreply@yourdomain.com)")
    //   }
    //   
    //   // Continue - email is still saved
    // }

    return NextResponse.json({
      success: true,
      message: "Email saved successfully",
    })
  } catch (error) {
    console.error("Error saving email:", error)
    return NextResponse.json(
      { error: "Failed to save email" },
      { status: 500 }
    )
  }
}

