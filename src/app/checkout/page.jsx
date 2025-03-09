"use client";
import { useState } from "react";

import Footer from "../components/Footer/page";

const CheckOut = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/handelOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, address, paymentMethod }),
      });
      if (!response.ok) {
        toast.error("Somethign went wrong!");
        setLoading(false)
      } 

      toast.setAddress("Order Placed Successfully")
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPaymentMethod("cod");
      setLoading(false)
    } catch (error) {
      console.error(error);
      toast.error("Somethign went wrong! in Catch");
    }
  };


  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">

        
      <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
          Secure Checkout
          <span className="mt-2 block h-1 w-10 bg-[#c77d37] sm:w-20"></span>
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col space-y-4">
      {/* Name */}
      <div>
        <label className="text-xs font-semibold text-gray-500">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Usman Khan"
          required
          className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#c77d37]"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="text-xs font-semibold text-gray-500">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+92 300 1234567"
          required
          className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#c77d37]"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-xs font-semibold text-gray-500">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usman@example.com"
          required
          className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#c77d37]"
        />
      </div>

      {/* Address */}
      <div>
        <label className="text-xs font-semibold text-gray-500">Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Street, City, Country"
          required
          className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#c77d37]"
        />
      </div>

      {/* Payment Method (Radio Button) */}
      <div>
        <label className="text-xs font-semibold text-gray-500">Payment Method</label>
        <div className="mt-2 flex items-center space-x-3">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="cod" className="text-sm font-medium text-gray-600">
            Cash on Delivery
          </label>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        type="submit"
        className="mt-4 inline-flex w-full justify-center rounded bg-[#c77d37] py-2.5 px-4 text-base font-semibold text-white hover:text-opacity-100 focus:ring-2 focus:ring-[#c77d37]"
      >
        Place Order
      </button>
    </form>

        <p className="mt-10 text-center text-sm font-semibold text-gray-500">
          By placing this order you agree to the{" "}
          <a href="#" className="text-[#c77d37] underline hover:text-[#8f5a28]">
            Terms and Conditions
          </a>
        </p>
      </div>
    </div>



        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-[#815832] via-[#8f5a28] to-[#c77d37] opacity-95"></div>
          </div>
          <div className="relative">
            <ul className="space-y-5">
              <li className="flex justify-between">
                <div className="inline-flex">
                  <img
                    src="https://www.uberprints.com/content/products/flat/800x800/gisf500_1_blk.jpg"
                    alt=""
                    className="max-h-16"
                  />
                  <div className="ml-3">
                    <p className="text-base font-semibold text-white">
                      Black Hoodie
                    </p>
                    <p className="text-sm font-medium text-white text-opacity-80">
                      S-Medium
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">$30.00</p>
              </li>
              <li className="flex justify-between">
                <div className="inline-flex">
                  <img
                    src="https://www.uberprints.com/content/products/flat/800x800/itss4500z_1_mrn.jpg"
                    alt=""
                    className="max-h-16"
                  />
                  <div className="ml-3">
                    <p className="text-base font-semibold text-white">
                      Zipper Hoddie Maroon-4
                    </p>
                    <p className="text-sm font-medium text-white text-opacity-80">
                      S-Medium
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">$50.00</p>
              </li>
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white">
                <span>Total price:</span>
                <span>$80.00</span>
              </p>
              <p className="flex justify-between text-sm font-medium text-white">
                <span>Vat: 10%</span>
                <span>$2.00</span>
              </p>
            </div>
          </div>
          <div className="relative mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Support</h3>
            <p className="text-sm font-semibold">
              +01 653 235 211{" "}
              <span className="font-light">(International)</span>
            </p>
            <p className="mt-1 text-sm font-semibold">
              support@Daryaft.com <span className="font-light">(Email)</span>
            </p>
            <p className="mt-2 text-xs font-medium">
              Call us now for payment related issues
            </p>
          </div>
          <div className="relative mt-10 flex">
            <p className="flex flex-col">
              <span className="text-sm font-bold text-white">
                Money Back Guarantee
              </span>
              <span className="text-xs font-medium text-white">
                within 30 days of purchase
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
