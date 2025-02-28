document.addEventListener("DOMContentLoaded", () => {


    
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    menuBtn.addEventListener("click", () => navMenu.classList.toggle("active"));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene"), alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const group = new THREE.Group();

    const geometry = new THREE.ConeGeometry(2, 4, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1, roughness: 0.3 });

    const upperCone = new THREE.Mesh(geometry, material);
    const lowerCone = new THREE.Mesh(geometry, material);
    lowerCone.rotation.x = Math.PI;
    lowerCone.position.y = -4;

    group.add(upperCone, lowerCone);
    scene.add(group);

    const light = new THREE.PointLight(0x00aaff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.z = 12;

    window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        gsap.to(group.rotation, { x: y * 2, y: x * 2, duration: 1 });
    });

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const speed = 2 + scrollY / 200;
        gsap.to(group.rotation, { y: `+=${0.05 * speed}`, overwrite: "auto" });
    });

    function animate() {
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
