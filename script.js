// Ambil elemen-elemen yang dibutuhkan
const hamburgerMenu = document.getElementById('hamburger-menu');
const navbar = document.querySelector('.navbar');

// Menambahkan event listener pada klik hamburger
hamburgerMenu.addEventListener('click', () => {
    navbar.classList.toggle('active'); // Toggle class untuk navbar
    hamburgerMenu.classList.toggle('active'); // Toggle class untuk hamburger
});
