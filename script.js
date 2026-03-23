document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const landingPage = document.getElementById('landing-page');
  const birthdayPage = document.getElementById('birthday-page');
  const openGiftBtn = document.getElementById('open-gift-btn');
  const bgMusic = document.getElementById('bg-music');
  const muteBtn = document.getElementById('mute-btn');
  const muteIcon = document.getElementById('mute-icon');
  
  // Apply Config
  if (document.getElementById('birthday-name')) {
    document.getElementById('birthday-name').innerText = config.name || "Happy Birthday!";
  }
  document.getElementById('birthday-photo').src = config.photoUrl;
  bgMusic.src = config.songUrl;
  
  // Navigation
  openGiftBtn.addEventListener('click', () => {
    // Start Audio exactly at the song's lyric point
    bgMusic.volume = 0.5;
    bgMusic.currentTime = config.songStartTime || 0;
    bgMusic.play().catch(e => console.log('Audio autoplay blocked', e));
    
    // Switch Pages
    landingPage.classList.remove('active');
    setTimeout(() => {
      birthdayPage.classList.add('active');
      startAnimations();
    }, 1500); // Wait for transition
  });
  
  // Mute Control
  let isMuted = false;
  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    muteIcon.innerText = isMuted ? '🔇' : '🔊';
  });
  
  // Setup sparkles around the main central image
  const sparklesContainer = document.getElementById('sparkles-container');
  for(let i=0; i<40; i++) {
    const s = document.createElement('div');
    s.classList.add('sparkle');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = Math.random() * 3 + 's';
    sparklesContainer.appendChild(s);
  }
  
  function startAnimations() {
    createBurst(); // Fireworks-like burst right at the start
    if (document.getElementById('balloons-container')) {
      createElements('balloon', 15, document.getElementById('balloons-container'));
      createElements('heart-float', 25, document.getElementById('floating-hearts-container'));
    }
  }

  function createElements(className, maxCount, container) {
    const colors = ['#ff007f', '#b300ff', '#00d4ff', '#ffb3d9', '#ffcc00', '#ff3366'];
    setInterval(() => {
      if (container.childElementCount > maxCount) return;
      const el = document.createElement('div');
      el.classList.add('floating-item');
      if (className === 'balloon') {
         el.classList.add('balloon');
         el.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
      } else if (className === 'heart-float') {
         el.classList.add('heart-float');
         const heartTypes = ['❤️', '💖', '💕'];
         el.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
      }
      const startX = Math.random() * 100;
      const duration = 20 + Math.random() * 20; // Very slow moving!
      const drift = (Math.random() * 200 - 100) + 'px';
      const rot = (Math.random() * 360) + 'deg';
      const delay = Math.random() * 2;
      el.style.left = startX + 'vw';
      el.style.animationDuration = duration + 's';
      el.style.animationDelay = delay + 's';
      el.style.setProperty('--drift', drift);
      el.style.setProperty('--rot', rot);
      if(className === 'heart-float') {
        el.style.fontSize = (0.8 + Math.random() * 1) + 'rem'; // smaller hearts
      } else {
        const scale = 0.5 + Math.random() * 0.4;
        el.style.transform = `scale(${scale})`; // smaller balloon
      }
      container.appendChild(el);
      setTimeout(() => { if(el.parentNode) el.remove(); }, (duration + delay) * 1000);
    }, 800);
  }
  
  // Burst explosion effect (Fireworks)
  function createBurst() {
    const burstContainer = document.createElement('div');
    burstContainer.style.position = 'absolute';
    burstContainer.style.top = '0';
    burstContainer.style.left = '0';
    burstContainer.style.width = '100vw';
    burstContainer.style.height = '100vh';
    burstContainer.style.pointerEvents = 'none';
    burstContainer.style.zIndex = '150';
    document.getElementById('birthday-page').appendChild(burstContainer);

    // Firework colors (Gold, Red, Silver, Neon Blue, Orange)
    const colors = ['#ffd700', '#ff3300', '#ffffff', '#00ffff', '#ff9900'];
    
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.classList.add('burst-particle');
        particle.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        
        // Random throw distance and angle (full 360 burst)
        const angle = Math.random() * Math.PI * 2;
        const velocity = 80 + Math.random() * 400; // farther reach
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 'px';
        
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        
        // Vary sizes and delay slightly for staggered burst
        particle.style.width = (4 + Math.random() * 10) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = (Math.random() * 0.3) + 's';
        
        burstContainer.appendChild(particle);
    }
    
    // Clean up burst container after 3 seconds
    setTimeout(() => {
        if(burstContainer.parentNode) burstContainer.remove();
    }, 3000);
  }
});
