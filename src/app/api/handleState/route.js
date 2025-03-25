import dbConnection from "@/config/dbConnection";
import StateModel from "@/models/stateModel";
import { NextResponse } from "next/server";

// GET - Fetch current state
export async function GET() {
  await dbConnection();

  try {
    const state = await StateModel.find();

    if (!state) {
      return NextResponse.json({ statusState: false }, { status: 200 });
    }

    console.log(state, "state");

    return NextResponse.json(
      { statusState: state.statusState },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}

// POST - Update state
// export async function POST(req) {
//   await dbConnect();
//   const { statusState } = await req.json();

//   let state = await State.findOne();
//   if (!state) {
//     state = new State({ statusState });
//   } else {
//     state.statusState = statusState;
//   }

//   await state.save();
//   return NextResponse.json({ message: "State updated successfully" }, { status: 200 });
// }
