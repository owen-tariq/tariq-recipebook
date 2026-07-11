document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js";
  script.onload = initPlayer;
  document.head.appendChild(script);
});

function initPlayer() {
  const tracks = [
    { title: "12 to 12 - sombr", src: "music/12 to 12 - sombr.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Adventure of a Lifetime - Coldplay", src: "music/Adventure of a Lifetime - Coldplay.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Alien Boy - Oliver Tree", src: "music/Alien Boy - Oliver Tree.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Back Home - Yeat", src: "music/Back Home - Yeat.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Bandhu 2.0 (From Cocktail 2 ) - Pritam", src: "music/Bandhu 2.0 (From Cocktail 2 ) - Pritam.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Bed on Fire - G Flip", src: "music/Bed on Fire - G Flip.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Black Friday (pretty like the sun) - Lost Frequencies", src: "music/Black Friday (pretty like the sun) - Lost Frequencies.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Cinderella (feat. Ty Dolla $ign) - Mac Miller", src: "music/Cinderella (feat. Ty Dolla $ign) - Mac Miller.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Copines - Aya Nakamura", src: "music/Copines - Aya Nakamura.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Elephant - Don Diablo", src: "music/Elephant - Don Diablo.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "FREAKED OUT - Fat Papi", src: "music/FREAKED OUT - Fat Papi.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Feel It - d4vd", src: "music/Feel It - d4vd.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Fever - Buckshot", src: "music/Fever - Buckshot.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "GIRLS - The Kid LAROI", src: "music/GIRLS - The Kid LAROI.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Garden Of Eden - Lady Gaga", src: "music/Garden Of Eden - Lady Gaga.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Honeypie - JAWNY", src: "music/Honeypie - JAWNY.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "I Just Might - Bruno Mars", src: "music/I Just Might - Bruno Mars.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Inside Out - Astrality", src: "music/Inside Out - Astrality.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Janice STFU - Drake", src: "music/Janice STFU - Drake.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Kavkaz - starly", src: "music/Kavkaz - starly.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Life Goes On - Oliver Tree", src: "music/Life Goes On - Oliver Tree.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Lose My Mind (feat. Doja Cat) [From F1® The Movie] - Don Toliver", src: "music/Lose My Mind (feat. Doja Cat) [From F1® The Movie] - Don Toliver.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Love Me Not (feat. Rex Orange County) - Ravyn Lenae", src: "music/Love Me Not (feat. Rex Orange County) - Ravyn Lenae.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Love Me Not - Ravyn Lenae", src: "music/Love Me Not - Ravyn Lenae.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Lush Life - Zara Larsson", src: "music/Lush Life - Zara Larsson.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "MMG (My Mine Gueh) - Naykilla", src: "music/MMG (My Mine Gueh) - Naykilla.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Mr. Know It All - Teddy Swims", src: "music/Mr. Know It All - Teddy Swims.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "One Dance - Drake", src: "music/One Dance - Drake.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "One Of The Girls (with JENNIE, Lily Rose Depp) - The Weeknd", src: "music/One Of The Girls (with JENNIE, Lily Rose Depp) - The Weeknd.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Raindance (feat. Tems) - Dave", src: "music/Raindance (feat. Tems) - Dave.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Risk It All - Bruno Mars", src: "music/Risk It All - Bruno Mars.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "SHE DID IT AGAIN (feat. Zara Larsson) - Tyla", src: "music/SHE DID IT AGAIN (feat. Zara Larsson) - Tyla.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "SPEED DEMON - Justin Bieber", src: "music/SPEED DEMON - Justin Bieber.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "STAY (with Justin Bieber) - The Kid LAROI", src: "music/STAY (with Justin Bieber) - The Kid LAROI.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Shards - Small Town Kid", src: "music/Shards - Small Town Kid.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Stereo Hearts (feat. Adam Levine) - Gym Class Heroes", src: "music/Stereo Hearts (feat. Adam Levine) - Gym Class Heroes.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "That's What I Like - Bruno Mars", src: "music/That's What I Like - Bruno Mars.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "The Less I Know The Better - Tame Impala", src: "music/The Less I Know The Better - Tame Impala.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "The Wave - Jungle", src: "music/The Wave - Jungle.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "There's Nothing Holdin' Me Back - Shawn Mendes", src: "music/There's Nothing Holdin' Me Back - Shawn Mendes.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "This Time - Small Town Kid", src: "music/This Time - Small Town Kid.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Vertigo - Griff", src: "music/Vertigo - Griff.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Wait a Minute! - WILLOW", src: "music/Wait a Minute! - WILLOW.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "When the Feeling Is Gone - Small Town Kid", src: "music/When the Feeling Is Gone - Small Town Kid.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "Your Eyes - Small Town Kid", src: "music/Your Eyes - Small Town Kid.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "black tears - all things break", src: "music/black tears - all things break.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "crushing - sombr", src: "music/crushing - sombr.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "hate that i made you love me - Ariana Grande", src: "music/hate that i made you love me - Ariana Grande.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "she goes by. - KayArchon Remix - KayArchonn", src: "music/she goes by. - KayArchon Remix - KayArchonn.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
    { title: "sweet love - origins", src: "music/sweet love - origins.mp3", artist: "Cooking Mix", cover: "chicken.jpg" },
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
            const byteArray = new Uint8Array(picture.data);
            const blob = new Blob([byteArray], { type: picture.format });
            const src = URL.createObjectURL(blob);
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
