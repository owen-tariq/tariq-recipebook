'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const recipes=require('../data/hellofresh-recipes.json');
assert.equal(recipes.length,78,'Expected 78 cookable recipes');
assert.equal(new Set(recipes.map(r=>r.id)).size,78,'IDs must be unique');
assert.deepEqual(recipes.map(r=>r.id),Array.from({length:78},(_,i)=>i+1),'IDs must be 1–78');
let ingCount=0,stepsCount=0;
for(const r of recipes){
 assert(r.title&&r.title.length>5,'Title missing '+r.id);
 assert(r.category&&r.minutes>=5,'Category/time missing '+r.id);
 assert(Array.isArray(r.ingredients)&&r.ingredients.length>=4,'Ingredients missing '+r.id);
 assert(Array.isArray(r.steps)&&r.steps.length===6,'Cooking steps missing '+r.id);
 assert(r.source&&r.source.startsWith('https://www.hellofresh.ca/recipes/'),'Source missing '+r.id);
 for(const i of r.ingredients){
   assert(i.name&&i.quantity,'Ingredient quantity missing in '+r.id);
   assert(!/\b(pork|bacon|lard|ham)\b/i.test(i.name),'Pork ingredient in '+r.id);
 }
 ingCount+=r.ingredients.length; stepsCount+=r.steps.length;
}
assert.equal(ingCount,779,'Expected 779 measured ingredient entries');
assert.equal(stepsCount,468,'Expected 468 cooking steps');
for(const name of ['index.html','recipes.html','lunch.html','hellofresh.html','meal.html','shopping.html']){
 const c=fs.readFileSync(path.join(__dirname,'..',name),'utf8');
 for(const target of ['lunch.html','hellofresh.html','shopping.html'])assert(c.includes('href="'+target+'"'),name+' missing '+target+' navigation');
}
for(const name of ['hf.js','hf.css','photo-unverified.svg','api/recipe-photo.js'])assert(fs.existsSync(path.join(__dirname,'..',name)),name+' is missing');
assert.equal(typeof require('../api/recipe-photo.js'),'function','Image resolver invalid');
console.log('Validated '+recipes.length+' recipes, '+ingCount+' ingredients, '+stepsCount+' steps, navigation and photo resolver.');
