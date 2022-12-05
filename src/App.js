import React, {useRef} from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter
} from "three";
import './App.css';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });



const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      autoRotate={true}
      enableZoom={false}
    />
  );
};

function App() {

 


function SkyBox () {
  const {scene} = useThree()
  const loader = new CubeTextureLoader();

  const texture = loader.load([
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
  ]);

  scene.background= texture;
  return null
}
  function Sphere() {
    const {scene, gl} = useThree()

    const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
      format: RGBFormat,
      generateMipmaps: true,
      minFilter: LinearMipmapLinearFilter
    });

    const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
    cubeCamera.position.set(0, 0, 0);
    scene.add(cubeCamera);

    useFrame(() => cubeCamera.update(gl, scene))
    return (
    <mesh>
      <directionalLight intensity= {0.5} />
      <sphereGeometry  attach= 'geometry' args={[ 2,32, 32]}/>
      <meshBasicMaterial attach='material' color='orange' roughness={0.1} metalness={1} envMap={cubeCamera.renderTarget.texture}/>
    </mesh>
    )
}
return (
   <Canvas>
    <CameraControls />
    <Sphere />
    <SkyBox />
   </Canvas>
)
}

export default App;
