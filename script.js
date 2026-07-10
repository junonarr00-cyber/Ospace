const container = document.getElementById('stars-container');
const starCount = 60;
const stars = [];
for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 3 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  star.style.opacity = Math.random();
  container.appendChild(star);
  stars.push({
    element: star,
    x: x,
    y: y,
    speed: size * 0.05
  });
}
window.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  stars.forEach(star => {
    const moveX = (mouseX - window.innerWidth / 2) * star.speed;
    const moveY = (mouseY - window.innerHeight / 2) * star.speed;
    star.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
document.getElementById('action-btn').addEventListener('click', () => {
  alert('Wyruszamy w nieznane! Kod działa poprawnie.');
});
