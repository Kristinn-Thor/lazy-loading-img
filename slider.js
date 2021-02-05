const slider = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));

const isDragging = false;
const start = 0;
const currentTranslate = 0;
const prevTranslate = 0;
const animationID = 0;
const currentIndex = 0;

const handleTouchStart = (index) => (event) => { console.info('start'); };
const handleTouchEnd = () => console.info('end');
const handleTouchMove = () => console.info('move');

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  slideImage.addEventListener('dragstart', (e) => e.preventDefault());

  // Touch events
  slide.addEventListener('touchstart', handleTouchStart(index));
  slide.addEventListener('touchend', handleTouchEnd);
  slide.addEventListener('touchmove', handleTouchMove);
  // Mouse events
  slide.addEventListener('mousedown', handleTouchStart(index));
  slide.addEventListener('mouseup', handleTouchEnd);
  slide.addEventListener('mouseleave', handleTouchEnd);
  slide.addEventListener('mousemove', handleTouchMove);
});


