document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // 🚀 Código de Three.js para el reloj de arena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const canvas = document.getElementById("scene");
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Crear geometría de reloj de arena
    const geometry = new THREE.ConeGeometry(2, 4, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffcc00, wireframe: true });
    const hourglass = new THREE.Mesh(geometry, material);
    hourglass.position.y = 0;
    scene.add(hourglass);

    // Añadir luces
    const light1 = new THREE.PointLight(0x00aaff, 1.5, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffd700, 1, 100);
    light2.position.set(-5, -5, -5);
    scene.add(light2);

    camera.position.z = 10;

    // Animación de rotación continua con GSAP
    gsap.to(hourglass.rotation, { y: Math.PI * 2, duration: 5, repeat: -1, ease: "power1.inOut" });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
