import dbConnection from "@/config/dbConnection";
import ordersModel from "@/models/orderModel";
import { NextResponse } from "next/server";

export const revalidate = 0;

// GET: Fetch all orders
export async function GET() {
  try {
    await dbConnection();
    const Orders = await ordersModel.find({});
    return NextResponse.json(
      {
        Orders,
        success: true,
        message: "Checkout details fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching checkout details:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch checkout details" },
      { status: 500 }
    );
  }
}

// POST: Create new order

export async function POST(req) {
  try {
    await dbConnection();

    const contentType = req.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content-type. Expected application/json" },
        { status: 400 }
      );
    }
    

    const { name, email, phone, address, paymentMethod, cart } =
      await req.json();

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !paymentMethod ||
      !Array.isArray(cart) ||
      cart.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Default status is set to 'Processing'
    const newCheckout = new ordersModel({
      name,
      email,
      phone,
      address,
      paymentMethod,
      cart,
      status: "Processing", // Default status
    });

    await newCheckout.save();

    return NextResponse.json(
      {
        success: true,
        message: "Checkout data saved successfully",
        order: newCheckout,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving checkout data:", error.message);
    return NextResponse.json(
      { error: "Failed to save checkout data" },
      { status: 500 }
    );
  }
}
// PUT: Update order status
export async function PUT(req) {
  try {
    await dbConnection();

    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    // Validate status values (optional)
    const validStatuses = ["Processing", "Delivered"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Find the order and update status
    const updatedOrder = await ordersModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order status updated successfully",
        order: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order status:", error.message);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
