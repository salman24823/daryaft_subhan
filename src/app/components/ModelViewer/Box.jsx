import { Decal, useTexture } from "@react-three/drei";
import React from "react";

const Box = () => {
  const texture = useTexture("/product/1.png");

  return (
    <mesh>
      <boxGeometry />
      <meshNormalMaterial />

      <Decal
        debug
        position={[0, 0, 0.5]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <meshBasicMaterial
          transparent
          map={texture}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </Decal>
    </mesh>
  );
};

export default Box;
