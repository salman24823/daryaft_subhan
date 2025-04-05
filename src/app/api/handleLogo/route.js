import dbConnection from "@/config/dbConnection";
import logoModel from "@/models/logoModel";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    dbConnection();

    // Fetch all logos from the database
    const logo = await logoModel.find();

    console.log(logo, "logo");

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
    const { logo, logoPrice } = await req.json();

    if (!logo || !logoPrice) {
      return NextResponse.json(
        { error: "logo & price is required" },
        { status: 400 }
      );
    }

    // Save only logo; createdAt is auto-generated
    const result = new logoModel({ url: logo, logoPrice });
    await result.save();

    return NextResponse.json(
      { success: true, message: "Logo Uploaded!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading Logo:", error);
    return NextResponse.json(
      { error: "Failed to upload Logo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await dbConnection();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await logoModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Unable to delete", error);
    return NextResponse.json(
      { error: "Failed to delete Logo" },
      { status: 500 }
    );
  }
}
