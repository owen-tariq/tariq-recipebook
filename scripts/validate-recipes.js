'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const recipes = require('../data/hellofresh-recipes.json');

const projectRoot = path.resolve(__dirname, '..');
const idSet = new Set();
const sourceSet = new Set();
let ingredientCount = 0;
let stepCount = 0;
let canadaCount = 0;
let usCount = 0;

assert(Array.isArray(recipes) && recipes.length > 0, 'Recipe library must not be empty');

for (const recipe of recipes) {
  const id = recipe.id;
  assert(Number.isSafeInteger(id) && id > 0, 'Invalid recipe ID: ' + id);
  assert(!idSet.has(id), 'Duplicate recipe ID: ' + id);
  idSet.add(id);

  assert(typeof recipe.title === 'string' && recipe.title.trim().length > 5,
    'Title missing for recipe ' + id);
  assert(typeof recipe.category === 'string' && recipe.category.trim(),
    'Category missing for recipe ' + id);
  assert(Number.isFinite(recipe.minutes) && recipe.minutes >= 5,
    'Cooking time invalid for recipe ' + id);
  assert(recipe.adapted === false && recipe.verifiedSource === true,
    'Only verified HelloFresh recipes belong in this collection: ' + id);
  assert(typeof recipe.halal === 'string' && recipe.halal.trim(),
    'Halal ingredient caution missing for recipe ' + id);

  assert(typeof recipe.source === 'string', 'Source URL missing for recipe ' + id);
  const source = new URL(recipe.source);
  assert(source.protocol === 'https:' &&
    ['www.hellofresh.ca', 'www.hellofresh.com'].includes(source.hostname) &&
    /^\/recipes\/[a-z0-9-]+-[0-9a-f]{24}\/?$/.test(source.pathname),
    'Expected exact HelloFresh Canada/US recipe page for ' + id);
  assert(!sourceSet.has(source.href), 'Duplicate recipe source URL for ' + id);
  sourceSet.add(source.href);
  if (source.hostname === 'www.hellofresh.ca') canadaCount++;
  else usCount++;

  assert(typeof recipe.photo === 'string', 'Photo URL missing for recipe ' + id);
  const photo = new URL(recipe.photo);
  assert(photo.protocol === 'https:' &&
    ['media.hellofresh.com', 'img.hellofresh.com', 'cdn.hellofresh.com'].includes(photo.hostname) &&
    /\/recipes\/image\//.test(photo.pathname),
    'Official HelloFresh photo URL missing or invalid for recipe ' + id);

  assert(Array.isArray(recipe.ingredients) && recipe.ingredients.length >= 4,
    'Ingredient list incomplete for recipe ' + id);
  assert(Array.isArray(recipe.steps) && recipe.steps.length === 6,
    'Expected six cooking steps for recipe ' + id);

  for (const ingredient of recipe.ingredients) {
    assert(ingredient && typeof ingredient.name === 'string' && ingredient.name.trim() &&
      typeof ingredient.quantity === 'string' && ingredient.quantity.trim(),
      'Ingredient quantity or name missing for recipe ' + id);
    assert(!/\b(pork|bacon|lard|ham)\b/i.test(ingredient.name),
      'Pork ingredient found in recipe ' + id);
  }
  for (const step of recipe.steps) {
    assert(typeof step === 'string' && step.trim().length >= 10,
      'Cooking step incomplete in recipe ' + id);
  }
  ingredientCount += recipe.ingredients.length;
  stepCount += recipe.steps.length;
}

// URLs, ingredient entries, and IDs are validated individually rather than
// frozen to a previous collection of 78 recipe IDs. New real recipes can
// safely be added without making the pipeline fail for the wrong reason.
const navPages = [
  'index.html', 'recipes.html', 'lunch.html', 'hellofresh.html',
  'meal.html', 'shopping.html', 'plan.html', 'pick.html'
];
const navigationTargets = [
  'lunch.html', 'hellofresh.html', 'shopping.html', 'plan.html', 'pick.html'
];
for (const page of navPages) {
  const html = fs.readFileSync(path.join(projectRoot, page), 'utf8');
  for (const target of navigationTargets) {
    assert(html.includes('href="' + target + '"'),
      page + ' is missing navigation to ' + target);
  }
}

for (const asset of [
  'hf.js', 'hf.css', 'reuse.js', 'discovery.js',
  'photo-unverified.svg', 'api/recipe-photo.js'
]) {
  assert(fs.existsSync(path.join(projectRoot, asset)), asset + ' is missing');
}
assert.equal(typeof require('../api/recipe-photo.js'), 'function',
  'Photo API must export a handler');

console.log('Validated ' + recipes.length + ' unique HelloFresh recipes (' +
  canadaCount + ' Canada, ' + usCount + ' US), ' + ingredientCount +
  ' ingredients, ' + stepCount + ' cooking steps, photo URLs and 8 page navigation menus.');
