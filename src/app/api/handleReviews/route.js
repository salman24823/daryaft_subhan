import { NextResponse } from "next/server";
import ReviewModel from "@/models/ReviewModel"; // Ensure this is the correct path
import dbConnection from "@/config/dbConnection";

export const revalidate = 0; // Revalidate the data every 0 minutes

export async function GET(req) {
    await dbConnection();
  
    try {
      const { searchParams } = new URL(req.url);
      const productId = searchParams.get("productId");
  
      if (!productId) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
      }
  
      // Fetch all reviews for the specified product
      const reviews = await ReviewModel.find({ productId });
  
      console.log(reviews, "reviews");
  
      return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
      console.error("Error getting reviews:", error);
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
  }
  

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnection();

    // Parse the request body
    const { productId, rating, name, email, title, review } = await req.json();

    // Validate required fields
    if (!productId || !rating || !name || !email || !title || !review) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Create a new review object
    const newReview = new ReviewModel({
      productId,
      rating,
      name,
      email,
      title,
      review,
    });

    // Save the review to the database
    await newReview.save();

    return new NextResponse(
      JSON.stringify({ message: "Review submitted successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading review:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to upload review" }),
      { status: 500 }
    );
  }
}
