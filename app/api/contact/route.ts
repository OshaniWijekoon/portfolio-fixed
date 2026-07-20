import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, message } = await request.json();

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: "oshaniwijekoon28@gmail.com",
      replyTo: email,
      subject: `New message from ${firstName} ${lastName ?? ""} via portfolio`.trim(),
      text: message,
      html: `
        <p><strong>From:</strong> ${firstName} ${lastName ?? ""} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}