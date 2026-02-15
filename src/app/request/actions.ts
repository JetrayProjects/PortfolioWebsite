"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendProjectBrief(data: any) {
    try {
        const {
            name,
            email,
            secondaryEmail,
            mobile,
            country,
            category,
            fonts,
            colors,
            about,
            websiteName,
            sections,
            mediaStatus
        } = data;

        const { data: result, error } = await resend.emails.send({
            from: "Portfolio Brief <onboarding@resend.dev>",
            to: ["sahiljartare@gmail.com"], // Using the email you likely signed up with
            subject: `New Project Brief: ${websiteName} from ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111;">
                    <h1 style="border-bottom: 2px solid #eee; padding-bottom: 10px;">New Project Brief</h1>
                    
                    <section style="margin-top: 20px;">
                        <h2 style="color: #666; font-size: 14px; text-transform: uppercase;">Sender Info</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Secondary Email:</strong> ${secondaryEmail || "N/A"}</p>
                        <p><strong>Mobile:</strong> ${mobile || "N/A"}</p>
                        <p><strong>Country:</strong> ${country}</p>
                    </section>

                    <section style="margin-top: 20px;">
                        <h2 style="color: #666; font-size: 14px; text-transform: uppercase;">Project Basics</h2>
                        <p><strong>Website Name:</strong> ${websiteName}</p>
                        <p><strong>Category:</strong> ${category}</p>
                        <p><strong>Sections:</strong> ${sections}</p>
                    </section>

                    <section style="margin-top: 20px;">
                        <h2 style="color: #666; font-size: 14px; text-transform: uppercase;">Vision & Style</h2>
                        <p><strong>About:</strong> ${about}</p>
                        <p><strong>Fonts:</strong> ${fonts}</p>
                        <p><strong>Color Palette:</strong> ${colors.join(", ")}</p>
                    </section>

                    <section style="margin-top: 20px;">
                        <h2 style="color: #666; font-size: 14px; text-transform: uppercase;">Media Assets</h2>
                        <p><strong>Has existing media?</strong> ${mediaStatus === "yes" ? "Yes" : "No"}</p>
                    </section>

                    <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
                        Sent from your Porfolio Brief API.
                    </footer>
                </div>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data: result };
    } catch (err: any) {
        console.error("Submission error:", err);
        return { success: false, error: err.message };
    }
}
