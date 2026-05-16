document.addEventListener('DOMContentLoaded', () => {
    // === Variables & Elements ===
    
    // Filtering Elements
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const overlay = document.getElementById('lightbox-overlay');
    const downloadBtn = document.getElementById('lightbox-download');

    // State
    let currentImages = []; // Array of currently visible image elements
    let currentIndex = 0;   // Index of the currently viewed image in the lightbox

    // === Filtering Logic ===

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                // Reset animations
                item.classList.remove('show', 'hide');
                
                // We use a small timeout to allow display:block to apply before animating opacity
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    // Trigger reflow
                    void item.offsetWidth;
                    item.classList.add('show');
                } else {
                    item.classList.add('hide');
                }
            });

            // Update the state array of currently visible images for lightbox navigation
            updateCurrentImages();
        });
    });

    function updateCurrentImages() {
        // Find all gallery items that are not hidden
        currentImages = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
    }

    // Initialize the current images array
    updateCurrentImages();

    // === Lightbox Logic ===

    function openLightbox(index) {
        if (currentImages.length === 0) return;
        
        currentIndex = index;
        const item = currentImages[currentIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('.item-overlay h3').textContent;
        const category = item.querySelector('.item-overlay span').textContent;

        // High quality Unsplash URLs don't need much modification, but we can ensure quality
        // For this demo we just take the src directly
        const imgSrc = img.getAttribute('src');

        // Set image and text
        lightboxImg.src = imgSrc;
        lightboxImg.alt = title;
        lightboxCaption.innerHTML = `<strong>${title}</strong> &mdash; ${category}`;
        
        // Update Download button
        downloadBtn.href = imgSrc;
        downloadBtn.download = title.replace(/\s+/g, '_').toLowerCase() + '.jpg';

        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind lightbox
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Wait for transition before clearing src
        setTimeout(() => {
            if(!lightbox.classList.contains('active')) {
                lightboxImg.src = '';
            }
        }, 300);
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        openLightbox(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        openLightbox(currentIndex);
    }

    // Event Listeners for opening lightbox and 3D Tilt Effect
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Only open if it's currently visible
            if(!item.classList.contains('hide')) {
                const index = currentImages.indexOf(item);
                if(index !== -1) openLightbox(index);
            }
        });

        // 3D Tilt Effect
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max rotation 10deg
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });

    // Event Listeners for lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });
});
