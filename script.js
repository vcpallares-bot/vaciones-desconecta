document.querySelector('.menu-button').addEventListener('click', () => {
  const nav = document.querySelector('.site-header nav');
  nav.classList.toggle('open');
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => document.querySelector('.site-header nav').classList.remove('open'));
});

const bookingForm = document.querySelector('#booking-form');

if (bookingForm) {
  bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = event.currentTarget.querySelector('.form-message');
    message.textContent = 'Gracias. Hemos recibido tu consulta y te responderemos muy pronto.';
    event.currentTarget.reset();
  });
}

const reviewsCarousel = document.querySelector('.reviews-carousel');

if (reviewsCarousel) {
  const demoReviews = [
    { text: 'Me encantó volveré.', author: 'Ana Delphi', rating: 5, date: 'hace 2 meses' },
    { text: 'Muy buena experiencia. Ideal para desconectar.', author: 'Jorge Moreno Fuentes', rating: 5, date: 'hace 3 meses' },
    { text: 'Tuve una experiencia muy por encima de mis expectativas.', author: 'M. Emilia Pavón', rating: 5, date: 'hace 4 meses' },
    { text: 'El lugar idóneo para pasar unas vacaciones diferentes.', author: 'Rafa Bayarri', rating: 5, date: 'hace 5 meses' },
    { text: 'Me encantó disfrutar de una opción de vacaciones diferente, con actividades y autonomía.', author: 'Nati Palacios', rating: 5, date: 'hace 6 meses' }
  ];

  const track = reviewsCarousel.querySelector('.reviews-track');
  const dots = document.querySelector('.review-dots');
  let currentReview = 0;

  track.innerHTML = demoReviews.map((review, index) => `<article class="review-card${index === 0 ? ' is-active' : ''}" aria-hidden="${index === 0 ? 'false' : 'true'}"><div><span class="google-review-label">Google</span><span class="review-stars">${'★'.repeat(review.rating)}</span><blockquote>“${review.text}”</blockquote></div><footer><strong>${review.author}</strong><span>${review.date}</span></footer></article>`).join('');
  dots.innerHTML = demoReviews.map((_, index) => `<button type="button" aria-label="Ver reseña ${index + 1}"${index === 0 ? ' class="is-active"' : ''}></button>`).join('');

  const cards = [...track.children];
  const dotButtons = [...dots.children];

  const showReview = index => {
    currentReview = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${currentReview * 100}%)`;
    cards.forEach((card, cardIndex) => card.setAttribute('aria-hidden', cardIndex === currentReview ? 'false' : 'true'));
    dotButtons.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === currentReview));
  };

  reviewsCarousel.querySelector('.review-prev').addEventListener('click', () => showReview(currentReview - 1));
  reviewsCarousel.querySelector('.review-next').addEventListener('click', () => showReview(currentReview + 1));
  dotButtons.forEach((dot, index) => dot.addEventListener('click', () => showReview(index)));
  let autoplay = setInterval(() => showReview(currentReview + 1), 5500);
  reviewsCarousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  reviewsCarousel.addEventListener('mouseleave', () => { autoplay = setInterval(() => showReview(currentReview + 1), 5500); });
}
