document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js";
  script.onload = initPlayer;
  document.head.appendChild(script);
});

function initPlayer() {
  const tracks = [
    { title: "Lofi Cooking Mix 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Lofi Cooking Mix 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Lofi Cooking Mix 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
  ];
  let currentTrackIndex = 0;
  let isPlaying = false;
  const audio = new Audio(tracks[currentTrackIndex].src);

  const playerHTML = `
    <button id="music-toggle-btn">🎵 Listen to Cooking Mix</button>
    <div id="music-player" class="hidden ipod-theme">
      <button class="player-close" id="close-player">×</button>
      <div class="ipod-screen">
        <div class="ipod-header">Now Playing</div>
        <div class="ipod-screen-content">
          <div class="ipod-now-playing">
            <img src="chicken.jpg" alt="Cover" class="ipod-album-art" id="ipod-art" onerror="this.src='https://placehold.co/100x100/333/FFF?text=Mix'">
            <div class="ipod-track-info">
              <div class="player-title" id="track-title">${tracks[currentTrackIndex].title}</div>
              <div class="player-artist" id="track-artist">Cooking Mix</div>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress-bar" id="progress-bar">
              <div class="progress-fill" id="progress-fill"></div>
            </div>
          </div>
          <div class="time-container">
            <span id="curr-time">0:00</span>
            <span id="total-time">0:00</span>
          </div>
        </div>

        <div class="ipod-lyrics-view" id="lyrics-view">
          <div class="lyrics-close-hint">Press MENU to close</div>
          <div id="lyrics-content"></div>
        </div>
      </div>

      <div class="ipod-wheel">
        <div class="wheel-btn wheel-menu" id="menu-btn">MENU</div>
        <div class="wheel-btn wheel-prev" id="prev-btn">⏮</div>
        <div class="wheel-btn wheel-next" id="next-btn">⏭</div>
        <div class="wheel-btn wheel-play" id="play-pause-btn">▶⏸</div>
        <div class="wheel-center"></div>
      </div>
    </div>
  `;
  
  if (!document.getElementById('music-toggle-btn')) {
    document.body.insertAdjacentHTML('beforeend', playerHTML);
  }

  const toggleBtn = document.getElementById('music-toggle-btn');
  const player = document.getElementById('music-player');
  const closeBtn = document.getElementById('close-player');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const menuBtn = document.getElementById('menu-btn');
  const progressBar = document.getElementById('progress-bar');
  const progressFill = document.getElementById('progress-fill');
  const currTimeEl = document.getElementById('curr-time');
  const totalTimeEl = document.getElementById('total-time');
  const titleEl = document.getElementById('track-title');
  const artistEl = document.getElementById('track-artist');
  const artEl = document.getElementById('ipod-art');
  const lyricsView = document.getElementById('lyrics-view');
  const lyricsContent = document.getElementById('lyrics-content');

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.add('hidden');
    player.classList.remove('hidden');
    playTrack();
  });

  closeBtn.addEventListener('click', () => {
    player.classList.add('hidden');
    toggleBtn.classList.remove('hidden');
  });

  menuBtn.addEventListener('click', () => {
    lyricsView.classList.toggle('active');
  });

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function loadMetadata(trackUrl) {
    titleEl.textContent = tracks[currentTrackIndex].title;
    artistEl.textContent = "Cooking Mix";
    artEl.src = "https://placehold.co/100x100/333/FFF?text=Mix";
    lyricsContent.innerHTML = '<div class="lyric-line" style="margin-top: 30px;">Loading...</div>';

    if (window.jsmediatags) {
      jsmediatags.read(trackUrl, {
        onSuccess: function(tag) {
          // Artwork
          const picture = tag.tags.picture;
          if (picture) {
            let base64String = "";
            for (let i = 0; i < picture.data.length; i++) {
                base64String += String.fromCharCode(picture.data[i]);
            }
            const base64 = btoa(base64String);
            artEl.src = "data:" + picture.format + ";base64," + base64;
          }

          // Title & Artist
          if (tag.tags.title) titleEl.textContent = tag.tags.title;
          if (tag.tags.artist) artistEl.textContent = tag.tags.artist;

          // Lyrics
          const lyricsTag = tag.tags.lyrics || tag.tags.USLT;
          lyricsContent.innerHTML = '';
          if (lyricsTag) {
            let lyricsText = lyricsTag.lyrics ? lyricsTag.lyrics : lyricsTag;
            if (typeof lyricsText === 'object') {
              lyricsText = lyricsText.text || Object.values(lyricsText).join('\n');
            }
            const lines = lyricsText.split('\n');
            lines.forEach(line => {
              if (line.trim() !== '') {
                const div = document.createElement('div');
                div.className = 'lyric-line';
                div.textContent = line;
                lyricsContent.appendChild(div);
              }
            });
          } else {
             lyricsContent.innerHTML = '<div class="lyric-line" style="margin-top: 30px;">No lyrics embedded.</div>';
          }
        },
        onError: function(error) {
          console.log("Error reading tags: ", error);
          lyricsContent.innerHTML = '<div class="lyric-line" style="margin-top: 30px;">No lyrics embedded.</div>';
        }
      });
    }
  }

  function loadTrack(index) {
    audio.src = tracks[index].src;
    loadMetadata(tracks[index].src);
    audio.load();
    if (isPlaying) audio.play();
  }

  function playTrack() {
    audio.play();
    isPlaying = true;
  }

  function pauseTrack() {
    audio.pause();
    isPlaying = false;
  }

  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) pauseTrack();
    else playTrack();
  });

  nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
  });

  prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
  });

  audio.addEventListener('timeupdate', () => {
    const curr = audio.currentTime;
    const dur = audio.duration;
    if (dur) {
      progressFill.style.width = `${(curr / dur) * 100}%`;
      currTimeEl.textContent = formatTime(curr);
      totalTimeEl.textContent = formatTime(dur);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    nextBtn.click();
  });

  progressBar.addEventListener('click', (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  });

  // Initial metadata load
  loadMetadata(tracks[currentTrackIndex].src);

  // SEAMLESS ROUTER
  document.addEventListener('click', async (e) => {
    let href = null;
    const link = e.target.closest('a');
    if (link && link.href && link.href.startsWith(window.location.origin)) {
      href = link.href;
    }
    
    const clickableDiv = e.target.closest('.recipe-card');
    if (clickableDiv) {
      const onclickStr = clickableDiv.getAttribute('onclick');
      if (onclickStr && onclickStr.includes('location.href')) {
        const match = onclickStr.match(/'([^']+)'/);
        if (match && match[1]) {
          href = new URL(match[1], window.location.href).href;
        }
      }
    }

    if (href && !href.includes('#')) {
      e.preventDefault();
      if (clickableDiv) e.stopPropagation();
      await navigateTo(href);
    }
  });

  window.addEventListener('popstate', async () => {
    await navigateTo(window.location.href, true);
  });

  async function navigateTo(url, isPopState = false) {
    try {
      const response = await fetch(url);
      const htmlText = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      
      const newContainer = doc.querySelector('.container');
      const oldContainer = document.querySelector('.container');
      
      const newBody = doc.querySelector('body');
      const recipeGlow = newBody.style.getPropertyValue('--recipe-glow');
      const recipeGlowAlt = newBody.style.getPropertyValue('--recipe-glow-alt');
      
      if (recipeGlow) document.body.style.setProperty('--recipe-glow', recipeGlow);
      if (recipeGlowAlt) document.body.style.setProperty('--recipe-glow-alt', recipeGlowAlt);
      
      document.title = doc.title;
      
      oldContainer.style.opacity = '0';
      oldContainer.style.transition = 'opacity 0.2s ease';
      
      setTimeout(() => {
        oldContainer.innerHTML = newContainer.innerHTML;
        window.scrollTo(0, 0);
        oldContainer.style.opacity = '1';
        
        if (!isPopState) {
          window.history.pushState({}, '', url);
        }
      }, 200);
      
    } catch (error) {
      window.location.href = url;
    }
  }
}
