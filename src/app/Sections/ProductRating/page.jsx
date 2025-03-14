"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

export default function ProductRating({ productId }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [averageRating, setAverageRating] = useState(4.2);
  const [totalRatings, setTotalRatings] = useState("Loading ");

  const handleRatingSubmit = async () => {
    if (
      rating &&
      name.trim() &&
      email.trim() &&
      title.trim() &&
      review.trim()
    ) {
      const newTotalRatings = totalRatings + 1;
      const newAverageRating =
        (averageRating * totalRatings + rating) / newTotalRatings;

      console.log("Review submitted:", {
        name,
        email,
        title,
        review,
        rating,
      });

      const response = await fetch("/api/handleReviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating,
          name,
          email,
          title,
          review,
        }),
      });

      if (!response.ok) {
        console.log("error in review", response);
      }

      setAverageRating(Number.parseFloat(newAverageRating.toFixed(1)));
      setTotalRatings(newTotalRatings);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch(`/api/handleReviews?productId=${productId}`);
        if (!response.ok) {
          console.log("Error in getting reviews", response);
          return;
        }
        const data = await response.json();
  
        // Calculate total ratings
        const totalRatings = data.length;
  
        // Calculate average rating
        const sumRatings = data.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 0;
  
        setTotalRatings(totalRatings);
        setAverageRating(parseFloat(averageRating)); // Ensure it's a float
  
        console.log("Fetched reviews:", data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
  
    getReviews(); // Call the function
  
  }, [productId]); // Dependency array
  

  return (
    <div className="w-full">
      <Card className="w-full shadow-none border-none">
        <CardHeader className="border-b ">
          {" "}
          {/*bg-muted/30*/}
          <CardTitle className="text-2xl">Product Ratings & Reviews</CardTitle>
          <CardDescription className="text-base">
            Share your experience and help other shoppers
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Current Ratings</h2>
              <div className="space-y-6 bg-muted/20 p-6 rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">Average Rating</h3>
                    <span className="text-sm text-muted-foreground">
                      {totalRatings} ratings
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-8 h-8 ${
                            star <= Math.round(averageRating)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-3xl font-bold">{averageRating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {!submitted ? (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Write Your Review</h2>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Your Rating</Label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-8 h-8 cursor-pointer transition-all ${
                            (hover || rating) && star <= (hover || rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(null)}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Review Title</Label>
                      <Input
                        id="title"
                        type="text"
                        required
                        placeholder="Summarize your experience"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="review">Your Review</Label>
                      <Textarea
                        id="review"
                        placeholder="Share your experience with this product"
                        rows={5}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    onClick={handleRatingSubmit}
                    disabled={
                      !rating ||
                      !name.trim() ||
                      !email.trim() ||
                      !title.trim() ||
                      !review.trim()
                    }
                    className="w-full bg-[#a16c3d] py-6 text-lg"
                  >
                    Submit Review
                  </Button>
                </div>
              ) : (
                <div className="bg-muted/30 p-8 rounded-lg text-center space-y-4">
                  <h3 className="text-xl font-semibold text-primary">
                    Thank you for your review!
                  </h3>
                  <p className="text-muted-foreground">
                    Your feedback has been submitted and will be published soon.
                  </p>
                  <Button
                    variant="outline bg-[#a16c3d] "
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                  >
                    Write Another Review
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t p-6 text-sm text-muted-foreground">
          <span>Verified Purchase</span>
          <button className="hover:underline">Report Abuse</button>
        </CardFooter>
      </Card>
    </div>
  );
}
