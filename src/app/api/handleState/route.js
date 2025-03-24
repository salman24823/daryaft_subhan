import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; // Ensure this is correct
import State from "@/models/State"; // Import your State model

// GET - Fetch current state
export async function GET() {
  await dbConnect();
  const state = await State.findOne();
  if (!state) return NextResponse.json({ statusState: false }, { status: 200 });

  return NextResponse.json({ statusState: state.statusState }, { status: 200 });
}

// POST - Update state
export async function POST(req) {
  await dbConnect();
  const { statusState } = await req.json();
  
  let state = await State.findOne();
  if (!state) {
    state = new State({ statusState });
  } else {
    state.statusState = statusState;
  }

  await state.save();
  return NextResponse.json({ message: "State updated successfully" }, { status: 200 });
}
