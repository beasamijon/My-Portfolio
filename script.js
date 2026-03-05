const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');  // show/hide menu
    hamburger.classList.toggle('open');   // animate hamburger into X
});

// Close menu when clicking a link (mobile-friendly)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
    });
});
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.project-card');
        const videoSrc = card.dataset.video; // should be YouTube embed URL

        const modal = document.getElementById('projectModal');
        const modalImg = document.getElementById('modal-img');
        const modalVideo = document.getElementById('modal-video');
        const caption = document.getElementById('modal-caption');

        caption.innerText = card.querySelector('h3').innerText;

        modalImg.style.display = 'none';
        modalVideo.style.display = 'block';

        // Attempt to load YouTube link in <video> → triggers Error 153
        modalVideo.src = videoSrc;
        modalVideo.load();
        modalVideo.play();

        modal.style.display = 'flex';
    });
});

// Close modal
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.project-card');
        const videoSrc = card.dataset.video; // YouTube embed link
        const modal = document.getElementById('projectModal');
        const modalImg = document.getElementById('modal-img');
        const modalVideo = document.getElementById('modal-video');
        const caption = document.getElementById('modal-caption');

        caption.innerText = card.querySelector('h3').innerText;

        // Hide image, show iframe
        modalImg.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.src = videoSrc;

        modal.style.display = 'flex';
    });
});

// Close modal
document.querySelector('#projectModal .close').addEventListener('click', () => {
    const modal = document.getElementById('projectModal');
    const modalVideo = document.getElementById('modal-video');
    modal.style.display = 'none';
    modalVideo.src = ''; // stop video playback
});

// Close on clicking outside
window.addEventListener('click', e => {
    const modal = document.getElementById('projectModal');
    const modalVideo = document.getElementById('modal-video');
    if (e.target === modal) {
        modal.style.display = 'none';
        modalVideo.src = '';
    }
});
