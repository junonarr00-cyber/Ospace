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
  stars.push({ element: star, x: x, y: y, speed: size * 0.05 });
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

// JUMPSCARE MECHANIKA
document.getElementById('action-btn').addEventListener('click', () => {
  alert('Jumpscare!');
  
  const overlay = document.getElementById('jumpscare-overlay');
  overlay.style.display = 'block';
  
  setTimeout(() => {
    // Generowanie dźwięku horroru
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'sawtooth'; 
    oscillator.frequency.setValueAtTime(100, audioCtx.currentTime); 
    oscillator.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 2.5); 
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime); 
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    
    // Funkcja tworzenia stabilnego Tailsa
    function spawnTails() {
      const img = document.createElement('img');
      // Nowy, stabilny link z Wikipedii, który nigdy nie zniknie
      img.src = 'Tails.jfif'; 
      img.classList.add('tails-scream');
      
      img.style.left = Math.random() * 100 + 'vw';
      img.style.top = Math.random() * 100 + 'vh';
      
      const randomSize = Math.random() * 350 + 200;
      img.style.width = randomSize + 'px';
      
      document.body.appendChild(img);
    }
    
    spawnTails();
    
    // Szybkie zalewanie ekranu
    const floodInterval = setInterval(() => {
      spawnTails();
      spawnTails();
    }, 80);
    
    // Wywalenie i reset strony (naprawia błąd pętli)
    setTimeout(() => {
      clearInterval(floodInterval);
      oscillator.stop();
      // Resetuje stronę do stanu początkowego, zamiast uciekać do Google
      window.location.reload(); 
    }, 4000);

  }, 3000);
});

