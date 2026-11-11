'use strict';
/**
 * Shared recipe discovery for Lunch Options and Pick for Me.
 * Every recipe has exactly one card; lunch shuffles without category-based ranking.
 * Loads the existing 66 HelloFresh records, plus the 10 original personal recipes.
 */
(function () {
  const DATA_URL = 'data/hellofresh-recipes.json?v=4';
  const FALLBACK_IMAGE = 'photo-unverified.svg';
  const personal = [
    { title:'Classic Gramer Murgi', category:'Chicken', minutes:70, photo:'chicken.jpg', url:'chicken.html', summary:'Village-style chicken curry with rice or roti.', ingredients:['chicken','rice','curry'], origin:'Personal recipe' },
    { title:'Chakma-Style Chicken Curry', category:'Chicken', minutes:65, photo:'chakma-chicken.webp', url:'chakma-chicken.html', summary:'A fragrant spicy chicken curry for lunch or leftovers.', ingredients:['chicken','spices'], origin:'Personal recipe' },
    { title:'Mediterranean Chickpea Salad', category:'Vegetarian', minutes:25, photo:'chickpea.avif', url:'chickpea.html', summary:'Chickpeas and vegetables for a quick lunch.', ingredients:['chickpeas','vegetables'], origin:'Personal recipe' },
    { title:'Avocado Toast', category:'Vegetarian', minutes:10, photo:'avocado.avif', url:'avocado.html', summary:'A simple, lighter lunch option.', ingredients:['avocado','bread'], origin:'Personal recipe' },
    { title:'Classic Bangladeshi Daal', category:'Vegetarian', minutes:30, photo:'daal.webp', url:'daal.html', summary:'Comforting lentils; great alongside rice.', ingredients:['lentils','rice'], origin:'Personal recipe' },
    { title:'Bengali Beef Curry', category:'Beef', minutes:65, photo:'beef.jpg', url:'beef.html', summary:'Slow-simmered beef with rice or roti.', ingredients:['beef','onion'], origin:'Personal recipe' },
    { title:'Faakibaji Fish Curry', category:'Fish', minutes:30, photo:'faakibaji.jpeg', url:'faakibaji.html', summary:'Fast fish curry for a warm lunch.', ingredients:['fish','curry'], origin:'Personal recipe' },
    { title:'Bengali Rui Fish Curry', category:'Fish', minutes:45, photo:'rui.jpg', url:'rui.html', summary:'Classic rui fish curry with steamed rice.', ingredients:['fish','rice'], origin:'Personal recipe' },
    { title:'Shorshe Ilish', category:'Fish', minutes:25, photo:'ilish.jpg', url:'ilish.html', summary:'Mustard hilsa served with rice.', ingredients:['hilsa','mustard','rice'], origin:'Personal recipe' },
    { title:'Plain Pulao (Sada Polao)', category:'Rice', minutes:35, photo:'pulao.jpg', url:'pulao.html', summary:'Fragrant rice to pair with curry.', ingredients:['rice'], origin:'Personal recipe' }
  ];
  const $ = selector => document.querySelector(selector);

  function shuffle(items) {
    const out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function validHelloFresh(recipe) {
    return recipe && Number.isInteger(recipe.id) &&
      typeof recipe.title === 'string' &&
      typeof recipe.photo === 'string' &&
      /^https:\/\/media\.hellofresh\.com\//.test(recipe.photo);
  }

  function asCard(recipe) {
    return {
      title: recipe.title,
      category: recipe.category || 'Meal',
      minutes: recipe.minutes,
      photo: recipe.photo,
      url: 'meal.html?id=' + encodeURIComponent(recipe.id),
      summary: recipe.ingredients.slice(0, 3).map(x => x.name).join(' · '),
      ingredients: recipe.ingredients.map(x => x.name),
      protein: Number.isFinite(recipe.protein) ? recipe.protein : null,
      origin: recipe.source && recipe.source.includes('hellofresh.com/') ? 'HelloFresh US' : 'HelloFresh Canada'
    };
  }

  async function loadAll() {
    try {
      const response = await fetch(DATA_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error('Recipe file unavailable');
      const records = await response.json();
      if (!Array.isArray(records) || !records.length || records.some(r => !validHelloFresh(r))) {
        throw new Error('Recipe data is incomplete');
      }
      const unique = new Set(records.map(x => x.id));
      if (unique.size !== records.length) throw new Error('Duplicate recipe IDs');
      return { items: [...personal, ...records.map(asCard)], warning: '' };
    } catch (error) {
      console.error('HelloFresh recipe load failed:', error);
      return {
        items: [...personal],
        warning: 'The HelloFresh recipes could not load right now. Your 10 personal recipes are still available. Refresh this page to retry.'
      };
    }
  }

  function create(tag, cls, value) {
    const element = document.createElement(tag);
    if (cls) element.className = cls;
    if (value != null) element.textContent = value;
    return element;
  }

  function imageFor(item) {
    const img = create('img');
    img.src = item.photo;
    img.alt = item.title + ' finished dish';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', function handleError() {
      img.removeEventListener('error', handleError);
      img.src = FALLBACK_IMAGE;
      img.alt = 'Photo unavailable for ' + item.title;
    });
    return img;
  }

  function randomItem(items, previous) {
    const candidates = previous && items.length > 1
      ? items.filter(item => item.url !== previous.url)
      : items;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  async function initLunch() {
    const grid = $('#lunchGrid');
    if (!grid) return;
    const search = $('#lunchSearch');
    const count = $('#lunchCount');
    const warning = $('#lunchWarning');
    const empty = $('#lunchEmpty');
    const shuffleButton = $('#shuffleLunch');
    const { items, warning: message } = await loadAll();
    let ordered = shuffle(items);
    if (warning) {
      warning.textContent = message;
      warning.hidden = !message;
    }

    function draw() {
      const term = search.value.trim().toLocaleLowerCase();
      const visible = ordered.filter(item =>
        [item.title, item.category, item.origin, item.summary, ...item.ingredients]
          .join(' ').toLocaleLowerCase().includes(term)
      );
      const fragment = document.createDocumentFragment();
      visible.forEach(item => {
        const link = create('a', 'lunch-card');
        link.href = item.url;
        link.appendChild(imageFor(item));
        const body = create('div', 'lunch-content');
        body.appendChild(create('span', 'lunch-tag', item.origin + ' · ' + item.category));
        body.appendChild(create('h2', '', item.title));
        body.appendChild(create('p', '', item.summary));
        const details = Number.isFinite(item.minutes) ? item.minutes + ' min' : 'See recipe';
        const protein = item.protein != null ? ' · ' + item.protein + 'g protein' : '';
        body.appendChild(create('div', 'lunch-info', details + protein));
        link.appendChild(body);
        fragment.appendChild(link);
      });
      grid.replaceChildren(fragment);
      count.textContent = visible.length + ' of ' + items.length + ' recipes';
      empty.hidden = visible.length !== 0;
    }
    search.addEventListener('input', draw);
    shuffleButton.addEventListener('click', () => {
      ordered = shuffle(items);
      draw();
    });
    draw();
  }

  async function initPick() {
    const button = $('#pickAgain');
    if (!button) return;
    const status = $('#pickStatus');
    const warning = $('#pickWarning');
    const title = $('#pickedTitle');
    const image = $('#pickedImage');
    const desc = $('#pickedDescription');
    const category = $('#pickedCategory');
    const details = $('#pickedDetails');
    const cook = $('#cookPicked');
    const source = $('#pickedSource');
    const { items, warning: message } = await loadAll();
    if (warning) {
      warning.textContent = message;
      warning.hidden = !message;
    }
    let current = null;
    function pick() {
      if (!items.length) return;
      current = randomItem(items, current);
      title.textContent = current.title;
      image.src = current.photo;
      image.alt = current.title + ' finished dish';
      desc.textContent = current.summary;
      category.textContent = current.category;
      details.textContent =
        (Number.isFinite(current.minutes) ? current.minutes + ' min' : 'See recipe')
        + (current.protein != null ? ' · ' + current.protein + 'g protein' : '');
      source.textContent = current.origin;
      cook.href = current.url;
      status.textContent = 'Picked ' + current.title + '. Want a different meal? Pick again.';
    }
    image.addEventListener('error', function () {
      if (image.src.endsWith('/' + FALLBACK_IMAGE)) return;
      image.src = FALLBACK_IMAGE;
      image.alt = 'Photo unavailable for ' + (current?.title || 'this recipe');
    });
    button.addEventListener('click', pick);
    pick();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLunch();
    initPick();
  });

  // Narrow test-only export, inert in browsers.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { shuffle, randomItem, personal, validHelloFresh };
  }
})();
