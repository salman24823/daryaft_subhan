import dbConnection from "@/config/dbConnection";
import contactModel from "@/models/contactModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await dbConnection();

    // Fetch all contacts from the database
    const contacts = await contactModel.find({});

    // Return all contacts in an object
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    // Connect to the database
    await dbConnection();

    // Parse the request body
    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new contact document
    const newContact = new contactModel({ name, email, phone });
    await newContact.save();

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Contact created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading product:", error);
    return NextResponse.json(
      { error: "Failed to upload user information" },
      { status: 500 }
    );
  }
}
