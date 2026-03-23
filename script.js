document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const landingPage = document.getElementById('landing-page');
  const birthdayPage = document.getElementById('birthday-page');
  const openGiftBtn = document.getElementById('open-gift-btn');
  const bgMusic = document.getElementById('bg-music');
  const muteBtn = document.getElementById('mute-btn');
  const muteIcon = document.getElementById('mute-icon');
  
  // Apply Config
  document.getElementById('birthday-name').innerText = config.name;
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
  
  // Setup sparkles around the image
  const sparklesContainer = document.getElementById('sparkles-container');
  for(let i=0; i<30; i++) {
    const s = document.createElement('div');
    s.classList.add('sparkle');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = Math.random() * 2 + 's';
    sparklesContainer.appendChild(s);
  }
  
  // Setup tiny hearts attaching around the name
  const nameWrapper = document.querySelector('.name-wrapper');
  for(let i=0; i<6; i++) {
    const h = document.createElement('div');
    h.innerHTML = '💖';
    h.classList.add('cute-heart');
    // Random positions around the text
    h.style.left = (Math.random() * 140 - 20) + '%';
    h.style.top = (Math.random() * 140 - 20) + '%';
    h.style.animationDelay = (2 + Math.random() * 2) + 's';
    nameWrapper.appendChild(h);
  }
  
  // Infinite Element Generators
  function startAnimations() {
    createBurst(); // Fire the burst effect right at the start!
    createElements('balloon', 20, document.getElementById('balloons-container'));
    createElements('heart-float', 30, document.getElementById('floating-hearts-container'));
    
    // Add dynamically moving side photos
    if (config.floatingPhotos && config.floatingPhotos.length > 0) {
      // Reduced amount of photos to 3 ("koraiya vantha pothum")
      createElements('floating-photo', 3, document.getElementById('floating-photos-container'));
    }
    
    // Side falling colors
    createElements('falling-color', 25, document.getElementById('falling-colors-container'));
  }
  
  function createElements(className, maxCount, container) {
    const colors = ['#ff007f', '#b300ff', '#00d4ff', '#ffb3d9', '#ffcc00', '#ff3366'];
    
    // Create elements periodically
    setInterval(() => {
      // Don't overflow the DOM
      if (container.childElementCount > maxCount) return;
      
      let el;
      if (className === 'floating-photo') {
         el = document.createElement('img');
         el.src = config.floatingPhotos[Math.floor(Math.random() * config.floatingPhotos.length)];
      } else {
         el = document.createElement('div');
      }
      
      el.classList.add('floating-item');
      
      if (className === 'balloon') {
         el.classList.add('balloon');
         el.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
      } else if (className === 'heart-float') {
         el.classList.add('heart-float');
         // mix of heart types
         const heartTypes = ['❤️', '💖', '💕', '💗'];
         el.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
      } else if (className === 'floating-photo') {
         el.classList.add('floating-photo');
      } else if (className === 'falling-color') {
         el.classList.add('falling-color');
         el.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
      }
      
      // Randomize animation properties
      let startX = Math.random() * 100;
      
      // Keep photos and falling colors mainly to the sides
      if (className === 'floating-photo' || className === 'falling-color') {
         startX = Math.random() > 0.5 ? (Math.random() * 15) : (85 + Math.random() * 15);
      }
      
      const isFalling = className === 'falling-color';
      
      // Slower roll for photos, faster for falling colors
      let duration = 12 + Math.random() * 15;
      if (className === 'floating-photo') duration = 30 + Math.random() * 20; // very slow!
      if (isFalling) duration = 6 + Math.random() * 5; // faster fall
      
      const drift = (Math.random() * 100 - 50) + 'px';
      
      // Rotation
      let rot = (Math.random() * 360) + 'deg';
      if (className === 'floating-photo') {
          // Circular objects don't need much rotation but we can spin them slowly
          rot = (Math.random() * 180 - 90) + 'deg';
      }
      
      const delay = Math.random() * 2;
      
      el.style.left = startX + 'vw';
      el.style.animationDuration = duration + 's';
      el.style.animationDelay = delay + 's';
      el.style.setProperty('--drift', drift);
      el.style.setProperty('--rot', rot);
      
      // Set falling animation if needed
      if(isFalling) {
        el.style.animationName = 'fallDown';
      }
      
      // varying sizes
      if(className === 'heart-float') {
        el.style.fontSize = (1 + Math.random() * 2.5) + 'rem';
      } else if (className === 'floating-photo') {
        // dynamic photo size
        el.style.width = (100 + Math.random() * 60) + 'px';
      } else if (className === 'falling-color') {
        el.style.width = (20 + Math.random() * 40) + 'px';
        el.style.height = el.style.width;
      } else {
        const scale = 0.7 + Math.random() * 0.6;
        el.style.transform = `scale(${scale})`;
      }
      
      container.appendChild(el);
      
      // Cleanup after animation completes
      setTimeout(() => {
        if(el.parentNode) el.remove();
      }, (duration + delay) * 1000);
      
    }, 600); // Add a new element every 600ms
  }

  // Burst explosion effect
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

    const colors = ['#ff007f', '#b300ff', '#00d4ff', '#ffb3d9', '#ffcc00', '#ff3366'];
    
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.classList.add('burst-particle');
        particle.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        
        // Random throw distance and angle
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 250; // pixels
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 'px';
        
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        
        // Vary sizes and delay slightly for staggered burst
        particle.style.width = (5 + Math.random() * 10) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = (Math.random() * 0.2) + 's';
        
        burstContainer.appendChild(particle);
    }
    
    // Clean up burst container after 2 seconds
    setTimeout(() => {
        if(burstContainer.parentNode) burstContainer.remove();
    }, 2000);
  }
});
