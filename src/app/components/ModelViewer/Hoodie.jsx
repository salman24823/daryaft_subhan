import React, { useMemo, useState, useEffect } from "react";
import { useGLTF, Decal, useTexture } from "@react-three/drei";
import { MeshPhysicalMaterial, MeshBasicMaterial } from "three";
import { degToRad } from "three/src/math/MathUtils";

const Hoodie = ({ scale, color, selectedLogo, logoPosition }) => {
  const [logoP, setLogoP] = useState(0.12);

  useEffect(() => {
    if (logoPosition === "right") {
      setLogoP(0.12);
    } else if (logoPosition === "center") {
      setLogoP(0);
    } else {
      setLogoP(-0.1);
    }
  }, [logoPosition]);

  const { nodes } = useGLTF("/Hoodie.glb");

  // Check if selectedLogo is valid (i.e., not undefined or null)
  const logo = useTexture(selectedLogo); // Only load texture if selectedLogo exists

  // Optimize material creation for the hoodie (non-transparent)
  const coloredMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color,
        roughness: 0.5,
        transparent: false,
        metalness: 0.1,
      }),
    [color]
  );

  // Material for the decal to avoid transparency
  const decalMaterial = useMemo(() => new MeshBasicMaterial({ map: logo, transparent: false }), [logo]);

  return (
    <group dispose={null}>
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} scale={scale} material={coloredMaterial}>
          {/* Only render logo if it is valid */}
          {logo && selectedLogo && (
            <Decal
              position={[0.1, logoP, 1.5]} // Adjusted dynamically based on logoPosition
              rotation={[0, degToRad(90), degToRad(90)]}
              scale={[0.1, 0.1, 0.3]}
              map={logo}
              material={decalMaterial}
            />
          )}
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} scale={scale} material={coloredMaterial} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} scale={scale} material={coloredMaterial} />
        <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} scale={scale} material={coloredMaterial} />
      </group>
    </group>
  );
};

export default Hoodie;

// Preload assets
useGLTF.preload("/Hoodie.glb");
