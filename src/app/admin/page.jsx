"use client";

import { Button } from "@heroui/react";
import { Eye, EyeOff, User } from "lucide-react";
import React, { useState } from "react";

export default function Admin() {
  const [isView, setIsView] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  async function submitForm(){
    console.log(formData,"formData")
  }

  return (
    <div>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-4">
                <div className="mb-8">
                  <h3 className="text-gray-800 text-3xl font-bold">Sign in</h3>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    Manage your inventory effortlessly with organized data and
                    keep your business running smoothly.
                  </p>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    User name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter user name"
                    />
                    <User className="w-5 h-5 text-gray-400 absolute right-4" />
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={isView ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter password"
                    />

                    {isView ? (
                      <EyeOff
                        onClick={() => setIsView(false)}
                        className="w-5 h-5 text-gray-400 absolute right-4 cursor-pointer"
                      />
                    ) : (
                      <Eye
                        onClick={() => setIsView(true)}
                        className="w-5 h-5 text-gray-400 absolute right-4 cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />

                    <label className="ml-3 block text-sm text-gray-800">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="!mt-8">
                  <Button
                    onPress={submitForm}
                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </div>
            <div className="max-md:mt-8">
              <img
                src="https://readymadeui.com/login-image.webp"
                className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover"
                alt="Dining Experience"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
