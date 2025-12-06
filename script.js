// Kontrol Musik
const music = document.getElementById('backgroundMusic');

function startWeb() {
    // Memulai Musik setelah interaksi pengguna
    music.volume = 0.4;
    music.play().catch(error => {
        console.log("Autoplay failed, user needs interaction.");
    });
    
    // Menghapus listener setelah dijalankan
    document.removeEventListener('click', startWeb); 
    document.removeEventListener('scroll', startWeb); 
    
    // Memanggil Anniversary Counter
    updateAnniversaryCounter();
}


// =================================================
// LOGIKA 1: ANNIVERSARY COUNTER (Hitung Hari Jadian)
// =================================================
const startDate = new Date('2024-05-17'); // << GANTI DENGAN TANGGAL JADIAN ANDA (Tahun-Bulan-Tanggal)
const msPerDay = 1000 * 60 * 60 * 24;

function updateAnniversaryCounter() {
    const today = new Date();
    const difference = today.getTime() - startDate.getTime();
    const days = Math.floor(difference / msPerDay);
    
    const counterElement = document.getElementById('days-together');
    if (counterElement) {
        counterElement.textContent = days + " hari";
    }
}
updateAnniversaryCounter(); // Panggil saat awal load
setInterval(updateAnniversaryCounter, 60 * 60 * 1000); // Update setiap jam


// =================================================
// LOGIKA 2: MODAL (POP-UP) GALERI INTERAKTIF
// =================================================
function openModal(imageSrc, imageCaption) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    
    modal.style.display = "block";
    modalImage.src = imageSrc;
    captionText.innerHTML = imageCaption;
    
    fullpage_api.setAllowScrolling(false); // Nonaktifkan scroll fullPage saat modal terbuka
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
    
    fullpage_api.setAllowScrolling(true); // Aktifkan kembali scroll fullPage
}

// Menutup modal saat tombol 'x' diklik
document.querySelector('.close-button').onclick = closeModal;


// =================================================
// LOGIKA 3: INISIALISASI FULLPAGE.JS
// =================================================
new fullpage('#fullpage', {
    // ANCHOR UNTUK 4 SECTION (Opening, Form, Galeri, Penutup)
    anchors: ['opening', 'pesan-dia', 'galeri-foto', 'penutup'], 
    
    autoScrolling: false, // Wajib pencet tombol
    fitToSection: false,
    navigation: false, 
    slidesNavigation: true, // Panah dan titik di galeri
    slidesNavPosition: 'bottom', 
    verticalCentered: true, 
    // Warna latar untuk 4 section
    sectionsColor : ['#f7f0e8', '#fcf8f3', '#fcf8f3', '#e6e0d8'], 
    responsiveWidth: 900, 
    
    afterRender: function(){
        // Mulai web setelah fullPage selesai render
        startWeb();
    }
});

// Listener interaksi pengguna (untuk memulai musik)
document.addEventListener('click', startWeb, { once: true });
document.addEventListener('scroll', startWeb, { once: true });