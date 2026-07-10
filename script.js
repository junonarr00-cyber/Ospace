// Kod gwiazd w tle
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

// 🎬 AKCJA JUMPSCARE
document.getElementById('action-btn').addEventListener('click', () => {
  // 1. Zmieniony komunikat
  alert('Jumpscare!');
  
  // 2. Czarny ekran
  const overlay = document.getElementById('jumpscare-overlay');
  overlay.style.display = 'block';
  
  // 3. Odliczanie 3 sekundy (3000 milisekund)
  setTimeout(() => {
    // Głośny kosmiczny dźwięk/krzyk (wykorzystujemy darmowy syntezator audio z przeglądarki)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'sawtooth'; // Bardzo ostry, nieprzyjemny dźwięk
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); // Niski, groźny ton
    oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 2); // Rosnący pisk
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime); // Pełna głośność
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    
    // Funkcja tworząca atakującego Tailsa
    function spawnTails() {
      const img = document.createElement('img');
      // Link bezpośrednio do grafiki Tailsa, którą wysłałaś
      img.src = 'https://prodia.com'; 
      img.classList.add('tails-scream');
      
      // Losowa pozycja na ekranie
      img.style.left = Math.random() * 100 + 'vw';
      img.style.top = Math.random() * 100 + 'vh';
      
      // Losowy gigantyczny rozmiar dla chaosu
      const randomSize = Math.random() * 300 + 200;
      img.style.width = randomSize + 'px';
      
      document.body.appendChild(img);
    }
    
    // Pierwszy Tails pojawia się od razu
    spawnTails();
    
    // 4. Coraz więcej Tailsów (zalewanie ekranu co 100 milisekund)
    const floodInterval = setInterval(() => {
      spawnTails();
      spawnTails(); // Podwójna prędkość zalewania!
    }, 100);
    
    // 5. Wywalenie ze strony (po 4 sekundach od startu zalewania)
    setTimeout(() => {
      clearInterval(floodInterval);
      oscillator.stop();
      // "Wywalenie" ze strony przez przekierowanie na pustą stronę błędu lub Google
      window.location.href = 'https://google.com';
    }, 4000);

  }, 3000);
});

