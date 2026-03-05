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
// Modal functionality
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modal-img');
const modalVideo = document.getElementById('modal-video');
const closeBtn = modal.querySelector('.close');
const nextBtn = modal.querySelector('.next-btn');
const prevBtn = modal.querySelector('.prev-btn');
const caption = document.getElementById('modal-caption');

let currentMedia = []; // {type: 'img'|'video', src: '...'}
let currentIndex = 0;

document.querySelectorAll('.view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.project-card');

        // Gather media
        const images = card.dataset.images ? card.dataset.images.split(',') : [];
        const video = card.dataset.video ? [card.dataset.video] : [];

        currentMedia = [];
        images.forEach(src => currentMedia.push({type: 'img', src: src}));
        video.forEach(src => currentMedia.push({type: 'video', src: src}));

        currentIndex = 0;
        showMedia(currentIndex);
        modal.style.display = 'flex';
        caption.innerText = card.querySelector('h3').innerText;
    });
});

// Show media function
function showMedia(index) {
    const media = currentMedia[index];
    if (!media) return;

    if (media.type === 'img') {
        modalVideo.style.display = 'none';
        modalVideo.pause();
        modalImg.style.display = 'block';
        modalImg.src = media.src;
    } else if (media.type === 'video') {
        modalImg.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.src = media.src;
        modalVideo.load();
        modalVideo.play();
    }
}

// Next button
nextBtn.addEventListener('click', () => {
    if (currentMedia.length === 0) return;
    currentIndex = (currentIndex + 1) % currentMedia.length;
    showMedia(currentIndex);
});

// Prev button
prevBtn.addEventListener('click', () => {
    if (currentMedia.length === 0) return;
    currentIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
    showMedia(currentIndex);
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalVideo.pause();
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalVideo.pause();
    }
});
document.querySelectorAll('.project-card').forEach(card => {
    card.querySelector('.view-btn').addEventListener('click', () => {
        const videoLink = card.getAttribute('data-video');
        // open modal overlay
        const modal = document.getElementById('videoModal'); // your modal div
        const modalLink = document.getElementById('videoLink'); // link inside modal
        modal.style.display = 'flex';
        modalLink.href = videoLink;
    });
});