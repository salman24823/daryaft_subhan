import React, { useEffect } from "react";
import { useGLTF, Decal, useTexture } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

const Hoodie = ({ color, scale }) => {
  const { nodes } = useGLTF("/Hoodie.glb");

  // Create a new material instance with the selected color
  const coloredMaterial = new MeshStandardMaterial({
    color,
    roughness: 0.5, // Adjust surface reflection
    metalness: 0.1, // Makes it more fabric-like
  });

  const texture = useTexture("/product/bg.png");

  // Create an instance of MeshStandardMaterial for the decal
  const decalMaterial = new MeshStandardMaterial({
    map: texture,
    transparent: true, // Add this if your texture has transparency
    roughness: 0.5, // Adjust roughness for a softer look
    metalness: 0.1, // Keep it fabric-like
  });

  return (
    <group dispose={null}>
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={coloredMaterial}
          scale={scale}
        >
          {/* Apply the logo decal on the front */}
          <Decal
            debug
            position={[0, 0, 5]} // Adjust front position
            rotation={[0, 0, 1]} // Ensure it's facing forward
            scale={[1, 2, 4]} // Adjust logo size
          >
            <primitive
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </Decal>
          
        </mesh>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={coloredMaterial}
          scale={scale}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={coloredMaterial}
          scale={scale}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={coloredMaterial}
          scale={scale}
        />
      </group>
    </group>
  );
};

export default Hoodie;

// Preload the model
useGLTF.preload("/Hoodie.glb");
