const gallery = document.getElementById("gallery");

const mainImage = gallery.querySelector("[data-main-image]");
const thumbs = gallery.querySelectorAll(".thumb");

// Build image list from DOM
const images = Array.from(thumbs).map(t => t.dataset.image);


let currentIndex = 0;
let inervalId = null;

// ---- Core render ----
function render(index) {
    currentIndex = index;
    mainImage.src = images[currentIndex];

    thumbs.forEach(t => t.classList.remove("active"));
    thumbs[currentIndex].classList.add("active");


    mainImage.style.opacity = 0;

    setTimeout(() => {
        mainImage.src = images[currentIndex];
        mainImage.style.opacity = 1;
    }, 150);
    console.log(images);
}

// ------ NAVIGATON ------
function next(){
    const nextIndex = (currentIndex + 1) % images.length;
    render(nextIndex);
}

function prev() {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    render(prevIndex);
}

// ---------- SLIDESHOW --------

function startSlideshow(){
    intervalId = setInterval(next, 3000);
}

function stopSlideShow(){
    clearInterval(intervalId);
}

// -------- EVENTS ---------
gallery.addEventListener("click", function (e) {
    const thumb = e.target.closest(".thumb");
    const actionBtn = e.target.closest("[data-action]");

    // Thumbnail click
    if (thumb) {
        const index = images.indexOf(thumb.dataset.image);
        render(index);
        return;
    }

    // Next / Prev
    if (actionBtn) {
        const action = actionBtn.dataset.action;

        if (action === "next") next();
        if (action === "prev") prev();

        return;
    }
});

startSlideshow();
gallery.addEventListener("mouseenter", stopSlideShow);
gallery.addEventListener("mouseleave", startSlideshow);

/* gallery.addEventListener("click", function (e) {
    const thumb = e.target.closest(".thumb");
    if (!thumb) return ;

    
    const newSrc = thumb.dataset.image;
    console.log(newSrc)
    const mainImage = gallery.querySelector("[data-main-image]");
    const allThumbs = gallery.querySelectorAll(".thumb");
    
    // Update main image
    const img = new Image();
    img.src = newSrc
    img.onload = () => {
        mainImage.src = newSrc;
    };

    mainImage.style.opacity = 0;

    setTimeout(() => {
        mainImage.src = newSrc;
        mainImage.style.opacity = 1;
    }, 150);

    // Update active state
    allThumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add('active');

}) */