import dbConnection from "@/config/dbConnection";
import CustomizerModel from "@/models/customizeModel";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req) {
  try {
    await dbConnection();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { error: "Type parameter is required" },
        { status: 400 }
      );
    }

    // Find all documents with the matching title (case-insensitive)
    const customizers = await CustomizerModel.find({
      title: new RegExp(`^${type}$`, "i"),
    }).lean();

    if (!customizers.length) {
      return NextResponse.json(
        { error: "No product found for this type" },
        { status: 404 }
      );
    }

    // Combine all variants from all matched documents
    const allVariants = customizers.flatMap((doc) => doc.variants);

    console.log(allVariants,"allVariants")

    return NextResponse.json({ variations: allVariants }, { status: 200 });
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
