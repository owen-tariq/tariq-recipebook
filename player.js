document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js";
  script.onload = initPlayer;
  document.head.appendChild(script);
});

function initPlayer() {
  const tracks = [
    { title: "34+35", src: "music/34+35 - Ariana Grande.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Annihilate (Spider", src: "music/Annihilate (Spider-Man Across the Spider-Verse) (Metro Boomin & Swae Lee, Lil Wayne, Offset) - Metro Boomin.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "As It Was", src: "music/As It Was - Harry Styles.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "As Long As You Love Me", src: "music/As Long As You Love Me - Justin Bieber.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Babydoll", src: "music/Babydoll - Dominic Fike.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Borderline", src: "music/Borderline - Tame Impala.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Bound 2", src: "music/Bound 2 - Kanye West.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Chanel", src: "music/Chanel - Frank Ocean.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Cheri Cheri Lady", src: "music/Cheri Cheri Lady - Modern Talking.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Dancing In The Flames", src: "music/Dancing In The Flames - The Weeknd.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Espresso", src: "music/Espresso - Sabrina Carpenter.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "For Cryin' Out Loud!", src: "music/For Cryin' Out Loud! - FINNEAS.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Girl You Loud", src: "music/Girl You Loud - Chris Brown.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Heartbeat", src: "music/Heartbeat - Childish Gambino.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Hummer", src: "music/Hummer - Tame Impala.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "I Just Might", src: "music/I Just Might - Bruno Mars.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "I KNOW", src: "music/I KNOW - Travis Scott.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "In My Room", src: "music/In My Room - Frank Ocean.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Kiss Me More (feat. SZA)", src: "music/Kiss Me More (feat. SZA) - Doja Cat.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Lady Of Namek", src: "music/Lady Of Namek - Tory Lanez.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Les", src: "music/Les - Childish Gambino.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Life Is Good (feat. Drake)", src: "music/Life Is Good (feat. Drake) - Future.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Locked out of Heaven", src: "music/Locked out of Heaven - Bruno Mars.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Lost in the Fire (feat. The Weeknd)", src: "music/Lost in the Fire (feat. The Weeknd) - Gesaffelstein.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Maps", src: "music/Maps - Maroon 5.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Moth To A Flame (with The Weeknd)", src: "music/Moth To A Flame (with The Weeknd) - Swedish House Mafia.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Mount Everest", src: "music/Mount Everest - Labrinth.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "My Old Ways", src: "music/My Old Ways - Tame Impala.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "NIGHTS LIKE THIS", src: "music/NIGHTS LIKE THIS - The Kid LAROI.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Neverender", src: "music/Neverender - Justice.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "No Idea", src: "music/No Idea - Don Toliver.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "No Pole", src: "music/No Pole - Don Toliver.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "One Of The Girls (with JENNIE, Lily Rose Depp)", src: "music/One Of The Girls (with JENNIE, Lily Rose Depp) - The Weeknd.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Oxytocin", src: "music/Oxytocin - Billie Eilish.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Paint The Town Red", src: "music/Paint The Town Red - Doja Cat.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Passionfruit", src: "music/Passionfruit - Drake.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Risk It All", src: "music/Risk It All - Bruno Mars.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "SLOW DANCING IN THE DARK", src: "music/SLOW DANCING IN THE DARK - Joji.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Strangers", src: "music/Strangers - Kenya Grace.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Swang", src: "music/Swang - Rae Sremmurd.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Swimming Pools (Drank)", src: "music/Swimming Pools (Drank) - Kendrick Lamar.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "São Paulo (feat. Anitta)", src: "music/São Paulo (feat. Anitta) - The Weeknd.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "The Machine", src: "music/The Machine - Reed Wonder.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "They Don't Care About Us", src: "music/They Don't Care About Us - Michael Jackson.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Watermelon Sugar", src: "music/Watermelon Sugar - Harry Styles.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "We Are The People", src: "music/We Are The People - Empire Of The Sun.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "When Did You Get Hot", src: "music/When Did You Get Hot - Sabrina Carpenter.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "Which One (feat. Central Cee)", src: "music/Which One (feat. Central Cee) - Drake.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "bloodline", src: "music/bloodline - Ariana Grande.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
    { title: "seaside_demo", src: "music/seaside_demo - SEB.mp3", artist: "Unknown Artist", cover: "https://placehold.co/400x400/333/FFF?text=Music" },
  ];
  let currentTrackIndex = 0;
  let isPlaying = false;
  let parsedLyrics = [];
  let currentLyricIndex = -1;
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
  btnShowLyrics.addEventListener('click', () => { 
    lyricsView.classList.add('active'); 
    if (currentLyricIndex !== -1) {
      const activeEl = document.getElementById('lyric-' + currentLyricIndex);
      if (activeEl) setTimeout(() => activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  });
  
  menuBtn.addEventListener('click', () => {
    // Menu acts as back button or toggle
    if (lyricsView.classList.contains('active')) {
      lyricsView.classList.remove('active');
    } else {
      showView(viewNowPlaying);
    }
    // Force reset screen scroll just in case
    document.querySelector('.ipod-screen').scrollTop = 0;
  });

  const closeHint = document.querySelector('.lyrics-close-hint');
  if (closeHint) {
    closeHint.style.cursor = 'pointer';
    closeHint.addEventListener('click', () => {
      lyricsView.classList.remove('active');
      document.querySelector('.ipod-screen').scrollTop = 0;
    });
  }

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
    try {
      titleEl.textContent = tracks[currentTrackIndex].title;
      artistEl.textContent = "Cooking Mix";
      artEl.src = "https://placehold.co/100x100/333/FFF?text=Mix";
      playlistArtHeader.src = artEl.src;
      lyricsContent.innerHTML = '<div class="lyric-line" style="margin-top: 30px;">Loading...</div>';

      if (window.jsmediatags) {
        const absoluteUrl = new URL(trackUrl, window.location.href).href;
        jsmediatags.read(absoluteUrl, {
          onSuccess: function(tag) {
            try {
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
              parsedLyrics = [];
              currentLyricIndex = -1;
              if (lyricsTag) {
                let lyricsText = lyricsTag.lyrics ? lyricsTag.lyrics : lyricsTag;
                if (typeof lyricsText === 'object') {
                  lyricsText = lyricsText.text || Object.values(lyricsText).join('\n');
                }
                const lines = lyricsText.split('\n');
                lines.forEach(line => {
                  const lrcMatch = line.match(/\[(\d{2}):(\d{2}(?:\.\d{2,3})?)\](.*)/);
                  if (lrcMatch) {
                    const minutes = parseInt(lrcMatch[1]);
                    const seconds = parseFloat(lrcMatch[2]);
                    const time = minutes * 60 + seconds;
                    const text = lrcMatch[3].trim();
                    parsedLyrics.push({ time, text, index: parsedLyrics.length });
                    
                    const div = document.createElement('div');
                    div.className = 'lyric-line';
                    div.id = 'lyric-' + (parsedLyrics.length - 1);
                    div.textContent = text || '♪';
                    lyricsContent.appendChild(div);
                  } else if (line.trim() !== '' && !line.startsWith('[')) {
                    const div = document.createElement('div');
                    div.className = 'lyric-line';
                    div.textContent = line;
                    lyricsContent.appendChild(div);
                  }
                });
                if(parsedLyrics.length === 0 && lyricsContent.innerHTML === '') {
                   lyricsContent.innerHTML = '<div class="lyric-line" style="margin-top: 30px;">No lyrics embedded.</div>';
                }
              } else {
                 lyricsContent.innerHTML = '<div class="lyric-line" style="margin-top: 30px;">No lyrics embedded.</div>';
              }
            } catch (innerErr) {
              console.error(innerErr);
              lyricsContent.innerHTML = '<div class="lyric-line" style="margin-top: 30px;">No lyrics embedded.</div>';
            }
          },
          onError: function(err) {
            console.error("jsmediatags error:", err);
            lyricsContent.innerHTML = '<div class="lyric-line" style="margin-top: 30px;">No lyrics embedded.</div>';
          }
        });
      }
    } catch (e) {
      console.error("loadMetadata error:", e);
      lyricsContent.innerHTML = '<div class="lyric-line" style="margin-top: 30px;">No lyrics embedded.</div>';
    }
  }

  function loadTrack(index) {
    audio.src = tracks[index].src;
    try {
      loadMetadata(tracks[index].src);
    } catch (e) {
      console.error(e);
    }
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
    
    // Sync lyrics
    if (parsedLyrics.length > 0) {
      let activeIndex = -1;
      for (let i = 0; i < parsedLyrics.length; i++) {
        if (curr >= parsedLyrics[i].time) {
          activeIndex = i;
        } else {
          break;
        }
      }
      
      if (activeIndex !== -1 && activeIndex !== currentLyricIndex) {
        if (currentLyricIndex !== -1) {
          const oldEl = document.getElementById('lyric-' + currentLyricIndex);
          if (oldEl) oldEl.classList.remove('active-lyric');
        }
        currentLyricIndex = activeIndex;
        const newEl = document.getElementById('lyric-' + activeIndex);
        if (newEl) {
          newEl.classList.add('active-lyric');
          if (lyricsView.classList.contains('active')) {
            newEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
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
