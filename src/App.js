
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter
} from "three";
import './App.css';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
xtend({ OrbitControls });

function App() {

const CameraControls = () => {
const {camera, gl :{domElement}}= useThree

const controls= useRef()

return(
  <OrbitControls ref={controls} args={[camera, domElement]}
  autoRotate={true} enable = {false}/>
)
}


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
    <Sphere />
    <SkyBox />
   </Canvas>
)
}

export default App;
