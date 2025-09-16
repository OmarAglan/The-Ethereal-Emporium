import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function isWebGLAvailable() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl') ||
            canvas.getContext('webgl2')
        ));
    } catch (e) {
        return false;
    }
}

function getWebGLErrorMessage() {
    const message = document.createElement('div');
    message.style.position = 'absolute';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(0,0,0,0.8)';
    message.style.color = '#fff';
    message.style.padding = '16px 20px';
    message.style.fontFamily = 'sans-serif';
    message.style.borderRadius = '8px';
    message.style.maxWidth = '420px';
    message.style.textAlign = 'center';
    message.textContent = 'WebGL not supported by your browser or device.';
    return message;
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(6, 4, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 10, 5);
keyLight.castShadow = true;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-6, 6, -4);
scene.add(fillLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(40, 40);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9, metalness: 0.0 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Sample "artworks"
function makePedestal(x, z) {
    const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.5, 0.6, 24),
        new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.7 })
    );
    pedestal.position.set(x, 0.3, z);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    return pedestal;
}

function makeSculpture() {
    const geo = new THREE.TorusKnotGeometry(0.5, 0.18, 128, 32);
    const mat = new THREE.MeshStandardMaterial({ color: 0xd6c27a, metalness: 0.6, roughness: 0.3 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.position.y = 1.1;
    return mesh;
}

function makePainting(texture) {
    const ratio = 1.2; // width:height
    const w = 1.4;
    const h = w / ratio;
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8, metalness: 0.0 })
    );
    // simple frame
    const frame = new THREE.Mesh(
        new THREE.PlaneGeometry(w + 0.08, h + 0.08),
        new THREE.MeshStandardMaterial({ color: 0x202020 })
    );
    frame.position.z = -0.01;
    const group = new THREE.Group();
    group.add(frame);
    group.add(plane);
    return group;
}

const textureLoader = new THREE.TextureLoader();
const checkerTex = textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');
checkerTex.colorSpace = THREE.SRGBColorSpace;

// Arrange items
const pedestal1 = makePedestal(-2.5, -1.5);
const sculpture1 = makeSculpture();
pedestal1.add(sculpture1);
scene.add(pedestal1);

const pedestal2 = makePedestal(2.2, 0.8);
const sculpture2 = makeSculpture();
sculpture2.scale.set(0.8, 0.8, 0.8);
pedestal2.add(sculpture2);
scene.add(pedestal2);

const painting1 = makePainting(checkerTex);
painting1.position.set(0, 1.6, -3.2);
scene.add(painting1);

// Resize handling
function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}
window.addEventListener('resize', onResize);

function animate() {
    requestAnimationFrame(animate);
    // idle motion for sculptures
    const t = performance.now() * 0.001;
    sculpture1.rotation.y = t * 0.4;
    sculpture2.rotation.y = -t * 0.5;
    controls.update();
    renderer.render(scene, camera);
}

if (isWebGLAvailable()) {
    animate();
} else {
    const warning = getWebGLErrorMessage();
    document.body.appendChild(warning);
}