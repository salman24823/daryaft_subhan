import dbConnection from "@/config/dbConnection";
import logoModel from "@/models/logoModel";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    dbConnection()

    // Fetch all logos from the database
    const logo = await logoModel.find();

    console.log(logo,"logo")

    return new NextResponse(JSON.stringify({ logo }, { message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching logos:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnection();
    const { logo } = await req.json();

    if (!logo) {
      return NextResponse.json({ error: "logo is required" }, { status: 400 });
    }

    // Save only logo; createdAt is auto-generated
    const result = new logoModel({ url : logo });
    await result.save();

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