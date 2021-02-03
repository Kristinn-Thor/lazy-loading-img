const targets = document.querySelectorAll('img');

const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      console.info('😍');

      if (entry.isIntersecting) {
        console.info('👀');
        const img = entry.target;
        const src = img.getAttribute('data-lazy');

        img.setAttribute('src', src);
        img.classList.add('fade-in');

        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

targets.forEach(lazyLoad);
