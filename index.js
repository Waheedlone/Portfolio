 let cvBtn = document.getElementById("cvBtn");
 let submit = document.getElementById("submit");
 let bar = document.getElementById("bar");


 cvBtn.addEventListener("click", function(){
    alert("Downlode Succesfully")
 })


 
 submit.addEventListener("click", function(){
     
    let email = document.getElementById("email");
    let pass = document.getElementById("pass");

    if(email.value == "" && pass.value == ""){
        alert("Fill Detail")
    }else{
        alert("Logged IN")
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

// Carousel Functionality
let currentIndex = 0;
const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.workCard');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cardWidth = 300; // 280px card + 20px margin
const cardsPerView = 3;

// Create dots
function createDots() {
  const totalCards = cards.length;
  const dotsNeeded = Math.ceil(totalCards / cardsPerView);
  for (let i = 0; i < dotsNeeded; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Update carousel position
function updateCarousel() {
  const offset = currentIndex * cardWidth;
  track.style.transform = `translateX(-${offset}px)`;
  
  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === Math.floor(currentIndex / cardsPerView)) {
      dot.classList.add('active');
    }
  });
}

// Next slide
function nextSlide() {
  const maxIndex = cards.length - cardsPerView;
  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}

// Previous slide
function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = Math.max(0, cards.length - cardsPerView);
  }
  updateCarousel();
}

// Go to specific slide
function goToSlide(index) {
  currentIndex = index * cardsPerView;
  const maxIndex = Math.max(0, cards.length - cardsPerView);
  currentIndex = Math.min(currentIndex, maxIndex);
  updateCarousel();
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Initialize
createDots();
updateCarousel();

// Auto slide every 5 seconds (optional)
// setInterval(nextSlide, 5000);


