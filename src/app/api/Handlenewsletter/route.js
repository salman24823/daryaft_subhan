import dbConnection from "@/config/dbConnection";
import newsletterModel from "@/models/newsletterModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnection();
    // Parse the request body
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Missing required field" },
        { status: 400 }
      );
    }
    // Create a new newsletter document
    const newnewsletter = new newsletterModel({ email });
    // Save the newsletter to the database
    await newnewsletter.save();
    // Return success response
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error uploading Newsletter:", error);
    return NextResponse.json(
      { error: "Failed to upload Newsletter" },
      { status: 500 }
    );
  }
}

export async function GET(){
    try {
        
    } catch (error) {
        
    }
}