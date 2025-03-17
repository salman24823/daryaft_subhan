"use client"

import { Button } from '@heroui/react'
import React, { useState } from 'react'

const Page = () => {

  // State to manage editing mode and usernames
  const [data, setData] = useState([
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' },
  ])


  const [editingId, setEditingId] = useState("")
  const [tempUsername, setTempUsername] = useState('')

  // Function to handle edit button click
  const handleEditClick = (id, username) => {
    setEditingId(id)
    setTempUsername(username)
  }

  // Function to handle save button click
  const handleSaveClick = (id) => {
    const updatedData = data.map((product) =>
      product.id === id ? { ...product, username: tempUsername } : product
    )
    setData(updatedData)
    setEditingId(null)
  }

  // Function to handle input change
  const handleInputChange = (e) => {
    setTempUsername(e.target.value)
  }

  return (
    <div className='min-h-screen flex products-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-center text-gray-900'>User Profiles</h2>
        <div className='space-y-6'>
          {data.map((product , index) => (
            <div key={product.id} className='space-y-2'>
                    {/* <p>
                       id : {product.id} | editing id :  {editingId || "no id"}
                    </p> */}
              <p className='text-sm font-medium text-gray-700'>Username</p>



              {editingId === product.id ? (












                <div className='flex products-center space-x-2'>
                  <input
                    type='text'
                    value={tempUsername}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
                  />
                  <Button
                    onPress={() => handleSaveClick(product.id)}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200'
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className='flex products-center space-x-2'>
                  <p> {product.username} </p>
                  <Button
                    onPress={() => handleEditClick(product.id, product.username)}
                    className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200'
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))}




        </div>
      </div>
    </div>
  )
}

export default Page