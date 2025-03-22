import dbConnection from "@/config/dbConnection";
import stuffModel from "@/models/stuffModel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnection();

  try {
    const stuff = await stuffModel.find();
    return NextResponse.json({ message: "Stuff Fetched successfully", stuff });
  } catch (error) {
    console.error("Error fetching stuff:", error);
    return NextResponse.json({ error: "Failed to fetch stuff" }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnection();

  try {
    const { stuffName } = await request.json();

    if (!stuffName) {
      return NextResponse.json({ error: "Stuff name is required" }, { status: 400 });
    }

    const newStuff = new stuffModel({ stuffName });
    await newStuff.save();

    return NextResponse.json({ message: "Stuff saved successfully", stuff: newStuff }, { status: 201 });
  } catch (error) {
    console.error("Error saving stuff:", error);
    return NextResponse.json({ error: "Failed to save stuff" }, { status: 500 });
  }
}
