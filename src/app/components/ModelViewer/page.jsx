"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Hoodie from "./Hoodie";

const ModalViewer = ({ selectedColor, selectedLogo, logoPosition }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [3, 2, 3], fov: 25 }}
      >
        {/* Ambient Light for soft overall lighting */}
        <ambientLight intensity={0.5} />

        {/* Directional Lights for studio lighting effect */}
        <directionalLight position={[5, 10, 5]} intensity={0.8} />
        <directionalLight position={[-5, 10, 5]} intensity={0.8} />
        <directionalLight position={[0, 10, -5]} intensity={0.8} />
        <directionalLight position={[5, 10, -5]} intensity={0.8} />

        {/* Pass logoPosition to Hoodie */}
        <Hoodie 
          color={selectedColor} 
          selectedLogo={selectedLogo} 
          logoPosition={logoPosition} 
          scale={[1.8, 1.8, 1.8]} 
        />

        <OrbitControls
          target={[0, 2.5, 0]} 
          enableZoom={true} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 1.94} 
          minPolarAngle={Math.PI / 4} 
        />
      </Canvas>
    </div>
  );
};

export default ModalViewer;
