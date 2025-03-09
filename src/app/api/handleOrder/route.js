import dbConnection from "@/config/dbConnection";
import ordersModel from "@/models/orderModel";
import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Connect to the database
//     await dbConnection();

//     // Fetch all checkout details from the database
//     const checkoutDetails = await checkOutModel.find({});

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Checkout details fetched successfully",
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching checkout details:", error.message);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch checkout details" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnection();
    // Parse the request body
    const { name, email, phone, address, paymentMethod } = await req.json();
    if (!name || !email || !phone || !address || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const newcheckout = new ordersModel({
      name,
      email,
      phone,
      address,
      paymentMethod,
    });

    await newcheckout.save();
    return NextResponse.json(
      {
        success: true,
        message: "Check data saved successfully",
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
