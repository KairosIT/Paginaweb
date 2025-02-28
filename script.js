document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const canvas = document.getElementById("scene");
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // 🔥 Fondo de estrellas o partículas
    const particles = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < 500; i++) {
        positions.push((Math.random() - 0.5) * 50);
        positions.push((Math.random() - 0.5) * 50);
        positions.push((Math.random() - 0.5) * 50);
    }
    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({ color: 0x00aaff, size: 0.1 });
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // 🔥 Reloj de arena real (dos conos)
    const coneGeometry = new THREE.ConeGeometry(2, 4, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffcc00, metalness: 1, roughness: 0.2 });

    const upperCone = new THREE.Mesh(coneGeometry, material);
    upperCone.position.y = 2;
    const lowerCone = new THREE.Mesh(coneGeometry, material);
    lowerCone.rotation.x = Math.PI; // Volteado
    lowerCone.position.y = -2;

    const hourglassGroup = new THREE.Group();
    hourglassGroup.add(upperCone);
    hourglassGroup.add(lowerCone);
    scene.add(hourglassGroup);

    // 🔥 Luces mejoradas
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x00aaff, 1);
    blueLight.position.set(-5, -5, -5);
    scene.add(blueLight);

    camera.position.z = 15;

    // 🔥 Animación de rotación
    gsap.to(hourglassGroup.rotation, { y: Math.PI * 2, duration: 10, repeat: -1, ease: "power1.inOut" });

    function animate() {
        particleSystem.rotation.y += 0.001; // Gira el fondo
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});

