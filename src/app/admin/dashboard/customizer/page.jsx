"use client"

import React from 'react'
import {Tabs, Tab, Card, CardBody} from "@heroui/react";
import Hoodie from './Hoodie';
import Shirt from './Shirt';
import Zipper from './Zipper';


const Customizer = () => {
  return (
    <div>

      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="photos" title="Hoodie">
            
            <Hoodie />
            
          </Tab>
          <Tab key="music" title="Shirt">
            
            <Shirt />

          </Tab>
          <Tab key="videos" title="Zipper">
            
            <Zipper />
            
          </Tab>
        </Tabs>
      </div>



    </div>
  )
}

export default Customizer