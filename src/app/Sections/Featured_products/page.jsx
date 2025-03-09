import React from 'react'
import Product from "@/../../public/product.png"
import { FaStar } from "react-icons/fa";
import Image from 'next/image'
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";
const Featured_products = () => {
  return (
    <section className='w-full'>
          <div className='p-[5%] flex flex-col items-center gap-12 bg-gray-50'>
      <h2 className='heading--primary'>Featured Products</h2>
      <div className='New_arrival w-full grid grid-cols-4 justify-between gap-6'>
      <Link href={"/"}>
          <div className='product_card h-[440px] w-[290px] '>
            <div className="card_image h-[70%] w-full">
              <Image src={Product} className='w-full h-[100%]'/>
            </div>
            <div className='card_cont w-full h-[30%] flex flex-col justify-between p-3'>
            <span className='text-gray-400'>Hoodie</span>
              <strong className='text-[1rem]'>Essential Female's Regular-Fit Black Hoodie</strong>
              <div className='flex justify-between'>
                <span className='font-bold'>$45.99</span>
                <span className='flex items-center gap-2 text-gray-400'><FaStar className='text-yellow-500'/>4.9 <span className='border-gray-400 border-l-2 px-2'>2278</span></span>
              </div>
            </div> 
            
           
          </div> 
           
          </Link>
          <Link href={"/"}>
          <div className='product_card h-[440px] w-[290px] '>
            <div className="card_image h-[70%] w-full">
              <Image src={Product} className='w-full h-[100%]'/>
            </div>
            <div className='card_cont w-full h-[30%] flex flex-col justify-between p-3'>
            <span className='text-gray-400'>Hoodie</span>
              <strong className='text-[1.1rem]'>Essential Female's Regular-Fit Black Hoodie</strong>
              <div className='flex justify-between'>
                <span className='font-bold'>$45.99</span>
                <span className='flex items-center gap-2 text-gray-400'><FaStar className='text-yellow-500'/>4.9 <span className='border-gray-400 border-l-2 px-2'>2278</span></span>
              </div>
            </div> 
           
          </div> 
           
          </Link>
          <Link href={"/"}>
          <div className='product_card h-[440px] w-[290px] '>
            <div className="card_image h-[70%] w-full">
              <Image src={Product} className='w-full h-[100%]'/>
            </div>
            <div className='card_cont w-full h-[30%] flex flex-col justify-between p-3'>
            <span className='text-gray-400'>Hoodie</span>
              <strong className='text-[1.1rem]'>Essential Female's Regular-Fit Black Hoodie</strong>
              <div className='flex justify-between'>
                <span className='font-bold'>$45.99</span>
                <span className='flex items-center gap-2 text-gray-400'><FaStar className='text-yellow-500'/>4.9 <span className='border-gray-400 border-l-2 px-2'>2278</span></span>
              </div>
            </div> 
           
          </div> 
           
          </Link>
          <Link href={"/"}>
          <div className='product_card h-[440px] w-[290px] '>
            <div className="card_image h-[70%] w-full">
              <Image src={Product} className='w-full h-[100%]'/>
            </div>
            <div className='card_cont w-full h-[30%] flex flex-col justify-between p-3'>
            <span className='text-gray-400'>Hoodie</span>
              <strong className='text-[1.1rem]'>Essential Female's Regular-Fit Black Hoodie</strong>
              <div className='flex justify-between'>
                <span className='font-bold'>$45.99</span>
                <span className='flex items-center gap-2 text-gray-400'><FaStar className='text-yellow-500'/>4.9 <span className='border-gray-400 border-l-2 px-2'>2278</span></span>
              </div>
            </div> 
           
          </div> 
           
          </Link>

      </div>
      <Link href={"/"} className='self-end'> <span className='flex items-center gap-4'>View All<FaArrowRight /></span></Link>
  </div>
    </section>
  )
}

export default Featured_products