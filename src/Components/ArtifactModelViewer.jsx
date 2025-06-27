import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";

const ArtifactModelViewer = ({ modelPath }) => {
  return (
    <div className="w-full h-64 md:h-96 bg-amber-50 rounded-xl overflow-hidden border-2 border-amber-200">
      <Canvas>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#B45309" />
          </mesh>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={true} autoRotate />
      </Canvas>
    </div>
  );
};

export default ArtifactModelViewer;