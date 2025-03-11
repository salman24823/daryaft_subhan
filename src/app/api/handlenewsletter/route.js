import dbConnection from "@/config/dbConnection";
import newsletterModel from "@/models/newsletterModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnection();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Save only email; createdAt is auto-generated
    const newNewsletter = new newsletterModel({ email });
    await newNewsletter.save();

    return NextResponse.json(
      { success: true, message: "Newsletter subscribed!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading Newsletter:", error);
    return NextResponse.json(
      { error: "Failed to upload Newsletter" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnection();

    // Fetch newsletters sorted by newest first
    const newsletters = await newsletterModel.find({}).sort({ createdAt: -1 });

    return NextResponse.json(newsletters);
  } catch (error) {
    console.error("Error Fetching Newsletter:", error);
    return NextResponse.json(
      { error: "Failed to fetch Newsletter" },
      { status: 500 }
    );
  }
}
