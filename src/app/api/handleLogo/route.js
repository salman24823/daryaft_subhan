import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    // Fetch all logos from the database
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LOGO_API_URL}/api/handleLogo`,
      {
        method: "GET", // Use GET method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );

    const data = await response.json(); // Assuming the response is in JSON format

    console.log(data, "ABCD");

    // Map through the logos and extract only the URLs
    const logoUrls = data.logos.map((logo) => logo.url);

    console.log(logoUrls,"logoUrls")

    return new NextResponse(
      JSON.stringify({ logoUrls }, { message: "Success" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching logos:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
