const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); 
    hamburger.classList.toggle('open');  
});

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

// Add click listener to all project cards
document.querySelectorAll('.project-card').forEach(card => {
    const btn = card.querySelector('.view-btn');
    btn.addEventListener('click', () => {
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

// Show media in modal
function showMedia(index) {
    const media = currentMedia[index];
    if (!media) return;

    if (media.type === 'img') {
        modalVideo.style.display = 'none';
        modalVideo.src = ''; // stop YouTube
        modalImg.style.display = 'block';
        modalImg.src = media.src;
    } else if (media.type === 'video') {
        modalImg.style.display = 'none';
        modalImg.src = '';
        modalVideo.style.display = 'block';
        modalVideo.src = media.src + '?autoplay=1&rel=0';
    }
}

// Navigation buttons
nextBtn.addEventListener('click', () => {
    if (!currentMedia.length) return;
    currentIndex = (currentIndex + 1) % currentMedia.length;
    showMedia(currentIndex);
});

prevBtn.addEventListener('click', () => {
    if (!currentMedia.length) return;
    currentIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
    showMedia(currentIndex);
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalVideo.src = ''; // stop video
});

// Close modal when clicking outside
window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalVideo.src = ''; // stop video
    }
});
