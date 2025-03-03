document.addEventListener("DOMContentLoaded", function () {
    
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active"); // 🔹 Activa o desactiva el menú
    });
});

// Verificar que Three.js se cargue correctamente
console.log("Iniciando Three.js...");

// Configuración de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene"), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creación del reloj de arena
const geometry = new THREE.ConeGeometry(2, 4, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffcc00, wireframe: true });
const hourglass = new THREE.Mesh(geometry, material);
hourglass.position.y = 1;
scene.add(hourglass);

// Luces de neón
const light1 = new THREE.PointLight(0x00aaff, 1.5, 100);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0xffd700, 1, 100);
light2.position.set(-5, -5, -5);
scene.add(light2);

camera.position.z = 10;

// Animación con GSAP (rotación continua)
gsap.to(hourglass.rotation, { y: Math.PI * 2, duration: 5, repeat: -1, ease: "power1.inOut" });

// Función para animar la escena
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Ajuste de tamaño cuando se redimensiona la ventana
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
