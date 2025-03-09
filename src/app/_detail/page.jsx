"use client"

import { Button } from "@heroui/react";
import React from 'react'
import { FaStar } from "react-icons/fa";
import detailimage from "@/../../public/product.png" 
import Image from 'next/image';
import { ChevronLeft, ChevronRight, FolderUp, Heart } from 'lucide-react';

const detail = () => {
  return (
    <main className='p-[9%] w-full'>
        <div className="detailpage grid gap-8 grid-cols-2 w-full r">
            <div className='detail_img p-[5%]'>
                <div className="prod_img flex">
                    <div className='w-full'>
                        <Image src={detailimage} className='w-[90%]' />
                    </div>
                    <div className="image_ico w-[10%]  flex flex-col justify-between">
                        <div>
                            <button className='rounded-md bg-[#F2F2F2]'><FolderUp className='m-3 w-5 h-5'/></button>
                            <button className='rounded-md bg-[#F2F2F2]'><Heart className='m-3  w-5 h-5'/></button>
                        </div>
                        <div>
                        <button className='rounded-md bg-[#F2F2F2]' ><ChevronRight className='m-3 w-5 h-5' /></button>
                        <button className='rounded-md bg-[#F2F2F2]'><ChevronLeft className='m-3 w-5 h-5' /></button>
                        </div>
                    </div>

                </div>
                <div className="related_images w-full">
                    <div className="related_child w-"></div>
                </div>

            </div>
            <div className='detail_cont p-[5%]'>
                <div className='card_cont w-full h-[30%] flex flex-col gap-3 '>
                    <span className='text-gray-300 font-bold text-[1rem]'>Hoodie Black</span>
                    <strong className='text-[1.7rem]'>Essential Female's Regular-Fit Black Hoodie</strong>
                    <div className='flex justify-between '>
                        <span className='font-bold text-[1.2rem]'>$45.99</span>
                        <span className='flex items-center gap-2 text-black font-bold'><FaStar className='text-yellow-500'/>4.9 <span className='border-gray-400 border-l-2 px-2'>2278</span></span>
                    </div>
                    <div className="description">
                   <span className='text-2xl font-bold'>Description</span>
                    <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, incidunt culpa? Dignissimos molestiae, dolorum fuga nobis hic accusantium omnis quaerat!</p>
                    </div>
                    <div className="select_color flex flex-col gap-3">
                        <span className='text-gray-400'>Color:<span className='text-black font-bold'>BLACK</span></span>
                        <div className="colorselector flex gap-4">
                            <button className='color_btn focus:border  focus:border-amber-700 '><div className='s bg-amber-700'></div></button>
                            <button className='color_btn focus:border   focus:border-gray-600'><div className='s bg-gray-600 0'></div></button>
                            <button className='color_btn focus:border  focus:border-purple-800'><div className='s bg-purple-800'></div></button>
                            <button className='color_btn focus:border focus:border-black'><div className='s bg-black '></div></button>
                        </div>
                        <span className='text-gray-400'>Size:<span className='text-black font-bold'>8</span></span>
                        <div className="size_selector flex gap-4">
                            <button className='size_btn'><span>6</span></button>
                            <button className='size_btn'><span>8</span></button>
                            <button className='size_btn'><span>10</span></button>
                            <button className='size_btn'><span>14</span></button>
                            <button className='size_btn'><span>18</span></button>
                            <button className='size_btn'><span>20</span></button>
                        </div>

                        <div className="detail_btn w-full flex gap-4 mt-10">
                        <Button className='w-[50%] bg-[#B4531A] text-white text-[1.1rem] font-bold border-none rounded-[5px]'>Add to Cart</Button>
                        <Button className='w-[50%] bg-transparent border-[#B4531A] border-2 text-[#B4531A] text-[1.1rem] font-bold rounded-[5px]'>Check Out</Button>
                        </div>
                    </div>
                </div>
                 

            </div>
        </div>
    </main>
  )
}

export default detail