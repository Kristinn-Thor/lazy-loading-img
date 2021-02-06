const slider = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

// Disable context menu
window.oncontextmenu = (event) => {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

const getPositionX = (event) => (event.type.includes('mouse') ? event.pageX : event.touches[0].clientX);

const animation = () => {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
};

const touchStart = (index) => (event) => {
  isDragging = true;
  currentIndex = index;
  startPos = getPositionX(event);
  console.info(startPos);
  animationID = requestAnimationFrame(animation);
  slider.classList.add('grabbing');
};

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

const touchEnd = () => {
  isDragging = false;
  cancelAnimationFrame(animationID);
  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100 && currentIndex < slides.length - 1) {
    currentIndex += 1;
  }
  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }
  setPositionByIndex();
  slider.classList.remove('grabbing');
};

const touchMove = (event) => {
  console.info('move');
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
};

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  slideImage.addEventListener('dragstart', (e) => e.preventDefault());

  // Touch events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);
  // Mouse events
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
  slide.addEventListener('mousemove', touchMove);
});
