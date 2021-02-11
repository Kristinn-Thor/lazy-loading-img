// Fix for ios mobile browser-bottom-navigation-bar
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const slider = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));
const leftArrow = document.querySelector('#left');
leftArrow.classList.add('notVisible');
const rightArrow = document.querySelector('#right');

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

function endOfSlide() {
  switch (currentIndex) {
    case 0: leftArrow.classList.add('notVisible');
      break;
    case (slides.length - 1): rightArrow.classList.add('notVisible');
      break;
    default:
      if (leftArrow.classList.contains('notVisible')) {
        leftArrow.classList.remove('notVisible');
      }
      if (rightArrow.classList.contains('notVisible')) {
        rightArrow.classList.remove('notVisible');
      }
  }
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

const getPositionX = (event) => (event.type.includes('mouse') ? event.pageX : event.touches[0].clientX);

const animation = () => {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
};

const touchMove = (event) => {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
};

const touchStart = (index) => (event) => {
  isDragging = true;
  currentIndex = index;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  slider.classList.add('grabbing');
  slides[index].addEventListener('mousemove', touchMove);
};

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

const touchEnd = (index) => () => {
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
  slides[index].removeEventListener('mousemove', touchMove);
  endOfSlide();
};

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  slideImage.addEventListener('dragstart', (e) => e.preventDefault());

  // Touch events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd(index));
  slide.addEventListener('touchmove', touchMove);
  // Mouse events
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd(index));
  slide.addEventListener('mouseleave', touchEnd(index));
});

leftArrow.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    setPositionByIndex();
    endOfSlide();
  }
});

rightArrow.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex += 1;
    setPositionByIndex();
    endOfSlide();
  }
});
