document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active"); // 🔹 Activa o desactiva el menú
    });
});
