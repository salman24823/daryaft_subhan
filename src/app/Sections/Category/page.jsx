import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Category = () => {
    const categories = [
        {
          name: "Mens",
          href: "/shop?category=Men",
          image: "https://shopgroove.pk/cdn/shop/products/IMG-20221128-WA0007.jpg?v=1669639961&width=600",
        },
        {
          name: "Womens",
          href: "/shop?category=Women",
         image: "https://media.istockphoto.com/id/1293292206/photo/young-beautiful-girl-in-a-white-hoodie-posing-warm-oversized-hoodie-with-an-hood-stylish.webp?a=1&b=1&s=612x612&w=0&k=20&c=AyptsSWZPenmjbLZjDVrckXcr50Yqx2ZAW3SDi3drGg=",
        },
        {
          name: "Kids",
          href: "/shop?category=Kids",
         image: "https://plus.unsplash.com/premium_photo-1681884440024-0a147c1c617a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8S2lkcyUyMEhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          name: "Babies",
          href: "/shop?category=Men",
         image: "https://plus.unsplash.com/premium_photo-1675030735741-8899e68f9f49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJhYmllcyUyMEhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D",
        },
        // {
        //   name: "Business",
        //   href: "/category/business",
        //   image: "/placeholder.svg?height=400&width=400",
        // },
      ]
    
      return (
        <section className="main_cnt w-full">
        <div className='p-[5%] px-4 md:px-6 lg:px-8 w-full'>
          <div className="container mx-auto">
            <h2 className="heading--primary text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8 md:gap-4">
              {categories.map((category) => (
                <Link key={category.name} href={category.href} className="group flex flex-col items-center">
                  <div className="  w-52 h-52 rounded-full overflow-hidden border border-border relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      fill
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-3 text-base md:text-lg font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
          </div>
        </section>

  )
}

export default Category