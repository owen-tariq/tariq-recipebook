document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js";
  script.onload = initPlayer;
  document.head.appendChild(script);
});

function initPlayer() {
  const tracks = [
    { title: "Lofi Cooking Mix 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Lofi Cooking Mix 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Lofi Cooking Mix 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", artist: "Cooking Mix", cover: "chicken.jpg" }
  ];
  let currentTrackIndex = 0;
  let isPlaying = false;
  const audio = new Audio(tracks[currentTrackIndex].src);

  const playerHTML = `
    <button id="music-toggle-btn">🎵 Listen to Cooking Mix</button>
    <div id="music-player" class="hidden ipod-theme">
      <button class="player-close" id="close-player">×</button>
      <div class="ipod-screen">
        <div class="ipod-header">
          <div class="header-left"> Apple Music</div>
          <div class="header-center" id="ipod-clock">12:00</div>
          <div class="header-right"><span>📶</span><span>🔋</span></div>
        </div>
        
        <div class="ipod-screen-content">
          
          <!-- VIEW: NOW PLAYING -->
          <div class="ipod-view active" id="view-nowplaying">
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
            <!-- Side Menu -->
            <div class="ipod-side-menu">
              <button class="side-menu-btn" id="btn-show-lyrics" title="Lyrics">💬</button>
              <button class="side-menu-btn" id="btn-show-playlist" title="Playlist">≡</button>
              <button class="side-menu-btn" id="btn-show-search" title="Search">🔍</button>
            </div>
          </div>

          <!-- VIEW: PLAYLIST -->
          <div class="ipod-view" id="view-playlist">
            <div class="playlist-header">
              <img src="chicken.jpg" class="playlist-art" id="playlist-art-header">
              <div class="playlist-info">
                <div class="playlist-title">Cooking Mix</div>
                <div class="playlist-subtitle">R&B/Soul • 2026</div>
              </div>
            </div>
            <div class="track-list" id="playlist-container">
              <!-- Rendered via JS -->
            </div>
          </div>

          <!-- VIEW: SEARCH -->
          <div class="ipod-view" id="view-search">
            <div class="search-header">Top Results</div>
            <input type="text" class="search-input" id="search-input" placeholder="Q Search songs...">
            <div class="track-list" id="search-results-container">
               <!-- Rendered via JS -->
            </div>
          </div>

        </div>

        <!-- LYRICS OVERLAY -->
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

  // Element Refs
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
  const playlistArtHeader = document.getElementById('playlist-art-header');
  
  const viewNowPlaying = document.getElementById('view-nowplaying');
  const viewPlaylist = document.getElementById('view-playlist');
  const viewSearch = document.getElementById('view-search');
  const lyricsView = document.getElementById('lyrics-view');
  
  const btnShowLyrics = document.getElementById('btn-show-lyrics');
  const btnShowPlaylist = document.getElementById('btn-show-playlist');
  const btnShowSearch = document.getElementById('btn-show-search');
  
  const playlistContainer = document.getElementById('playlist-container');
  const searchInput = document.getElementById('search-input');
  const searchResultsContainer = document.getElementById('search-results-container');
  const lyricsContent = document.getElementById('lyrics-content');
  const clockEl = document.getElementById('ipod-clock');

  // Clock
  setInterval(() => {
    const now = new Date();
    clockEl.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }, 1000);

  // View Navigation
  function showView(viewEl) {
    [viewNowPlaying, viewPlaylist, viewSearch].forEach(v => v.classList.remove('active'));
    viewEl.classList.add('active');
  }

  btnShowPlaylist.addEventListener('click', () => { showView(viewPlaylist); renderPlaylist(); });
  btnShowSearch.addEventListener('click', () => { showView(viewSearch); renderSearch(); searchInput.focus(); });
  btnShowLyrics.addEventListener('click', () => { lyricsView.classList.add('active'); });
  
  menuBtn.addEventListener('click', () => {
    // Menu acts as back button or toggle
    if (lyricsView.classList.contains('active')) {
      lyricsView.classList.remove('active');
    } else {
      showView(viewNowPlaying);
    }
  });

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.add('hidden');
    player.classList.remove('hidden');
    playTrack();
  });
  closeBtn.addEventListener('click', () => {
    player.classList.add('hidden');
    toggleBtn.classList.remove('hidden');
  });

  // Render Lists
  function renderList(container, trackArray) {
    container.innerHTML = '';
    trackArray.forEach((t, i) => {
      // Find original index
      const realIndex = tracks.findIndex(tr => tr.src === t.src);
      const isCurrent = realIndex === currentTrackIndex;
      const el = document.createElement('div');
      el.className = `track-item ${isCurrent ? 'playing' : ''}`;
      el.innerHTML = `<div class="track-item-num">${realIndex + 1}</div><div class="track-item-title">${t.title}</div>`;
      el.addEventListener('click', () => {
        currentTrackIndex = realIndex;
        loadTrack(currentTrackIndex);
        showView(viewNowPlaying);
      });
      container.appendChild(el);
    });
  }
  function renderPlaylist() { renderList(playlistContainer, tracks); }
  function renderSearch() { 
    const q = searchInput.value.toLowerCase();
    const filtered = tracks.filter(t => t.title.toLowerCase().includes(q));
    renderList(searchResultsContainer, filtered);
  }
  searchInput.addEventListener('input', renderSearch);

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
    playlistArtHeader.src = artEl.src;
    lyricsContent.innerHTML = '<div class="lyric-line" style="margin-top: 30px;">Loading...</div>';

    if (window.jsmediatags) {
      jsmediatags.read(trackUrl, {
        onSuccess: function(tag) {
          const picture = tag.tags.picture;
          if (picture) {
            let base64String = "";
            for (let i = 0; i < picture.data.length; i++) {
                base64String += String.fromCharCode(picture.data[i]);
            }
            const base64 = btoa(base64String);
            const src = "data:" + picture.format + ";base64," + base64;
            artEl.src = src;
            playlistArtHeader.src = src;
          }

          if (tag.tags.title) titleEl.textContent = tag.tags.title;
          if (tag.tags.artist) artistEl.textContent = tag.tags.artist;

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
        onError: function() {
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
    renderPlaylist();
  }

  function playTrack() { audio.play(); isPlaying = true; }
  function pauseTrack() { audio.pause(); isPlaying = false; }

  playPauseBtn.addEventListener('click', () => { if (isPlaying) pauseTrack(); else playTrack(); });
  nextBtn.addEventListener('click', () => { currentTrackIndex = (currentTrackIndex + 1) % tracks.length; loadTrack(currentTrackIndex); });
  prevBtn.addEventListener('click', () => { currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; loadTrack(currentTrackIndex); });

  audio.addEventListener('timeupdate', () => {
    const curr = audio.currentTime;
    const dur = audio.duration;
    if (dur) {
      progressFill.style.width = `${(curr / dur) * 100}%`;
      currTimeEl.textContent = formatTime(curr);
      totalTimeEl.textContent = formatTime(dur);
    }
  });

  audio.addEventListener('loadedmetadata', () => { totalTimeEl.textContent = formatTime(audio.duration); });
  audio.addEventListener('ended', () => { nextBtn.click(); });

  progressBar.addEventListener('click', (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  });

  loadMetadata(tracks[currentTrackIndex].src);

  // SEAMLESS ROUTER (Kept as before)
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

  window.addEventListener('popstate', async () => { await navigateTo(window.location.href, true); });

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
        if (!isPopState) window.history.pushState({}, '', url);
      }, 200);
    } catch (error) {
      window.location.href = url;
    }
  }
}
