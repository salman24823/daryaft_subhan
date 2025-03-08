<Canvas
shadows
gl={{ preserveDrawingBuffer: true }}
camera={{
    fov: 25,
    position: [0, 5, 20],
}}
>
<Suspense fallback={<Spinner />}>
    {/* Lighting */}
    <hemisphereLight groundColor={"#111"} intensity={0.5} />
    <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

    {/* 3D Tshirt */}

    {/* Orbit Controls */}
    <OrbitControls
        target={[0, 0.4, 0]}
        maxDistance={30}
        minDistance={8}
        maxPolarAngle={Math.PI / 1.94}
        minPolarAngle={Math.PI / 4}
        enablePan={false}
    />
</Suspense>
</Canvas>

///////////////////

<group {...props} dispose={null}>
<group rotation={[-Math.PI / 2, 0, 0]}>
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Object_2.geometry}
    material={materials['Material238904.005']}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Object_3.geometry}
    material={materials['Material238904.005']}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Object_4.geometry}
    material={materials['Material238904.005']}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Object_5.geometry}
    material={materials['Material238904.005']}
  />
</group>
</group>


/////

<Canvas
shadows
gl={{ preserveDrawingBuffer: true }}
camera={{
    fov: 25,
    position: [0, 5, 20],
}}
>
    <Suspense fallback={<Spinner />}>
        {/* Lighting */}
        <hemisphereLight groundColor={"#111"} intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        {/* 3D Tshirt */}
        <Tshirt color={selectedColor} />

        {/* Orbit Controls */}
        {/* <OrbitControls
            target={[0, 0.4, 0]}
            maxDistance={30}
            minDistance={8}
            maxPolarAngle={Math.PI / 1.94}
            minPolarAngle={Math.PI / 4}
            enablePan={false}
        /> */}
    </Suspense>
</Canvas>