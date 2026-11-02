 let cvBtn = document.getElementById("cvBtn");
 let submit = document.getElementById("submit");
 let bar = document.getElementById("bar");


 cvBtn.addEventListener("click", function(){
    alert("Downloaded Successfully")
 })



 submit.addEventListener("click", function(){

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let msg = document.getElementById("msg");

    if(name.value == "" || email.value == "" || msg.value == ""){
        alert("Please fill in all fields")
    }else{
        let subject = encodeURIComponent("Portfolio enquiry from " + name.value);
        let body = encodeURIComponent(msg.value + "\n\nFrom: " + name.value + " (" + email.value + ")");
        window.location.href = "mailto:waheedlone782@gmail.com?subject=" + subject + "&body=" + body;
    }

 })




 let ul = document.querySelector("ul");
 bar.addEventListener("click", function(){
     ul.classList.toggle("showData");

     if(ul.className == "showData"){
        bar.className="fa-solid fa-xmark"
     }else{
        bar.className="fa-solid fa-bars"

     }
 })

 // Close the mobile menu after picking a link
 ul.querySelectorAll("a").forEach(function(link){
     link.addEventListener("click", function(){
         ul.classList.remove("showData");
         bar.className="fa-solid fa-bars"
     })
 })

// Fade sections in as they scroll into view
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Carousel Functionality
let currentIndex = 0;
const container = document.querySelector('.carousel-container');
const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.workCard');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Card width + gap, measured so it stays right at every screen size
function getStep() {
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return cards[0].offsetWidth + gap;
}

function getCardsPerView() {
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return Math.max(1, Math.floor((container.clientWidth + gap) / getStep()));
}

function getMaxIndex() {
  return Math.max(0, cards.length - getCardsPerView());
}

// Create dots
function createDots() {
  dotsContainer.innerHTML = '';
  const dotsNeeded = Math.ceil(cards.length / getCardsPerView());
  for (let i = 0; i < dotsNeeded; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Update carousel position
function updateCarousel() {
  currentIndex = Math.min(currentIndex, getMaxIndex());
  track.style.transform = `translateX(-${currentIndex * getStep()}px)`;

  // Update dots
  const dots = document.querySelectorAll('.dot');
  const activeDot = currentIndex >= getMaxIndex()
    ? dots.length - 1
    : Math.floor(currentIndex / getCardsPerView());
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeDot);
  });
}

// Next slide
function nextSlide() {
  currentIndex = currentIndex < getMaxIndex() ? currentIndex + 1 : 0;
  updateCarousel();
}

// Previous slide
function prevSlide() {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : getMaxIndex();
  updateCarousel();
}

// Go to specific slide
function goToSlide(index) {
  currentIndex = index * getCardsPerView();
  updateCarousel();
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
window.addEventListener('resize', () => {
  createDots();
  updateCarousel();
});

// Initialize
createDots();
updateCarousel();

// Auto slide every 5 seconds (optional)
// setInterval(nextSlide, 5000);
