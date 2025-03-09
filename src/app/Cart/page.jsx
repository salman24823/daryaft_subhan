import React from 'react'
import { AiTwotoneDelete } from "react-icons/ai";


const Cart = () => {
  return (
    
        <div className="cart_drawer max-w-[500px] w-full h-[100vh] flex flex-col justify-between py-[2%]">
          <div>
          <div className="your_cart p-[2%]  border-[#c77d37] border-b-[2px]">
            <span className='font-bold text-[#c77d37] text-xl'>Your Cart</span>
            {/* <div className='h-[2px] bg-black w-[91px]'></div> */}
          </div>
          <div className="cart_cont grid grid-cols-12 p-[2%]">
            <div className="cart_image col-span-3">
              <img src="https://www.uberprints.com/assets/images/catalog/super/gisf500-default.jpg" alt="" />
            </div>
            <div className='col-span-6 py-[2%] pl-[20px] flex flex-col gap-4 '>
              <span className='font-bold'>Valentine's Special Hoodie.</span>
              <span>Size <strong>M</strong> Color <strong>White</strong></span>
            </div>
            <div className='col-span-3 p-[2%] flex flex-col items-end justify-between'>
              <span>$19.2</span>
              <AiTwotoneDelete className='text-2xl' />
              
            </div>
        </div>
        </div>
        <div className="check_btn">
          <div className='flex p-[2%] justify-between'>
            <span>Subtotal <strong>2</strong> items</span>
            <span>$9.9</span>
          </div>
          <div className='check_out_btns p-[2%] flex flex-col gap-2'>
            <button className='w-full text-center p-2 border-[#c77d37] text-[#c77d37] font-bold border'>Countinue Shopping</button>
            <button className='w-full text-center p-2 border-[#c77d37] text-white bg-[#c77d37] font-bold border'>Check Out</button>
          </div>
        </div>
        
        </div>
    
  )
}

export default Cart



 // <section className='w-full h-[100vh] p-[5%]'>
    //     <div className="cart_header w-full  grid grid-cols-3 h-[100%]">
    //         <div className='col-span-2 h-[100%] flex flex-col gap-8'>
    //             <div className="cart_heading">
    //                 <h2 className='sub_heading'>SHOPPING CART</h2>
    //             </div>
    //             <div className="carts flex flex-col gap-6">
    //                 <table className='w-full  text-gray-600'>
    //                     <thead className=' w-[100%] font-bold  border-gray-400 border-b-[2px]'>
    //                         <td>PRODUCT</td>
    //                         <td>PRICE</td>
    //                         <td>QUANTITY</td>
    //                         <td>TOTAL</td>
    //                     </thead>
    //                     <tbody className=' border-gray-400 border-b-[2px]'>
    //                         <td className='flex gap-3'>
    //                         <img className='w-[100px]' src="https://www.limelight.pk/cdn/shop/products/GRS_6333.jpg?v=1673959658"/>
    //                             <ul className=' flex flex-col justify-center gap-4'>
    //                                 <li><span>Black Flecce Trouser</span></li>
    //                                 <li><p>#004232</p></li>
    //                                 <li><span className='flex gap-6'>Size <span className='font-bold text-black '>S</span>Color<span className='font-bold text-black '>BLACK</span></span></li>
    //                             </ul>
    //                         </td>
    //                         <td>price</td>
    //                         <td>quantity</td>
    //                         <td>Total</td>
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //         <div className="col-span-1 payment info">uyer terypwert

    //         </div>
    //     </div>
    // </section>