import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Hoodie from "./Hoodie";
import Box from "./Box";

const ModalViewer = ({ selectedColor, selectedLogo, logoP, logoS }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [3, 2, 3], fov: 25 }} // Adjust FOV
      >
        {/* Ambient Light for soft overall lighting */}
        <ambientLight intensity={0.5} />

        {/* Directional Lights for studio lighting effect */}
        <directionalLight position={[5, 10, 5]} intensity={0.8} />
        <directionalLight position={[-5, 10, 5]} intensity={0.8} />
        <directionalLight position={[0, 10, -5]} intensity={0.8} />
        <directionalLight position={[5, 10, -5]} intensity={0.8} />

        {/* Move the hoodie down by adjusting its position */}
        <Hoodie color={selectedColor} selectedLogo={selectedLogo} logoP={logoP} logoS={logoS} scale={[1.8, 1.8, 1.8]} />
        {/* <Box /> */}

        {/* <OrbitControls
          target={[0, 0, 0]} // Ensures focus remains on the hoodie
          enableZoom={true} // Zoom is disabled
          enablePan={true} // Panning is disabled (default "pan" simulated by camera position)
          maxPolarAngle={Math.PI / 1.94} // Restricts upward rotation
          minPolarAngle={Math.PI / 4} // Restricts downward rotation
        /> */}
        
        <OrbitControls
          target={[0, 2.5, 0]} // Ensures focus remains on the hoodie
          enableZoom={true} // Zoom is disabled
          enablePan={false} // Panning is disabled (default "pan" simulated by camera position)
          maxPolarAngle={Math.PI / 1.94} // Restricts upward rotation
          minPolarAngle={Math.PI / 4} // Restricts downward rotation
        />
      </Canvas>
    </div>
  );
};

export default ModalViewer;
