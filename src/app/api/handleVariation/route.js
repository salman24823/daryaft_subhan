import dbConnection from "@/config/dbConnection";
import CustomizerModel from "@/models/customizeModel";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    await dbConnection();

    const variations = await CustomizerModel.find().lean(); // Fetch all variations
    return NextResponse.json({ status: 200, variations });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    await dbConnection();
    
    const { formData } = await request.json(); // Ensure correct data extraction
    console.log(formData, "data from web");

    const { title, imageUrl, stuffType, color, colorCode, price } = formData;

    const result = await CustomizerModel.create({
      title, // Ensure title is stored correctly
      variants: [
        {
          stuffType,
          image: imageUrl,
          color,
          colorCode,
          price,
        },
      ],
    });

    console.log(result, "saved data");

    return NextResponse.json({ status: 201, result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
