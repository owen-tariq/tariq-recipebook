'use strict';
const HF_DATA='data/hellofresh-recipes.json';
const HF_FAV='tariq-favorite-meals-v1',HF_SHOP='tariq-shopping-meals-v1';
const $=(sel,el=document)=>el.querySelector(sel);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeList=k=>{try{let x=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(x)?x:[]}catch{return []}};
const saveList=(k,arr)=>localStorage.setItem(k,JSON.stringify(arr));
const isFavorite=id=>safeList(HF_FAV).includes(Number(id));
function toggleFavorite(id){let f=safeList(HF_FAV);f=f.includes(id)?f.filter(x=>x!==id):[...f,id];saveList(HF_FAV,f);return f.includes(id)}
function photo(id){const r=allRecipes.find(x=>x.id===Number(id));return r?.photo||('/api/recipe-photo?id='+encodeURIComponent(id))}
function attachPhotos(root=document){
 root.querySelectorAll('img[data-hf-photo]').forEach(img=>{
  const id=Number(img.dataset.hfPhoto),r=allRecipes.find(x=>x.id===id);
  const tag=img.closest('.hf-card-image')?.querySelector('[data-photo-status]')||img.parentElement?.querySelector('[data-photo-status]');
  const candidates=[r?.photo,r?.photo?.replace('q_78%2Cw_960','q_100%2Cw_3840'),'/api/recipe-photo?id='+encodeURIComponent(id)].filter(Boolean);
  let attempt=0;
  const next=()=>{
   if(attempt<candidates.length){img.src=candidates[attempt++];return;}
   img.src='photo-unverified.svg';img.alt='Official HelloFresh dish photo unavailable';
   if(tag)tag.textContent='Image unavailable — official source linked';
  };
  img.addEventListener('error',next);
  img.addEventListener('load',()=>{if(!img.src.endsWith('photo-unverified.svg')&&tag)tag.textContent='Official HelloFresh photo'});
  next();
 });
}
let allRecipes=[];
function isSourceVerified(r){return !r.adapted}
function hasNutrition(r){return !r.adapted&&Number.isFinite(r.protein)&&Number.isFinite(r.kcal)}
function categoryFromName(r){return r.category||'Other'}
function imageHTML(r){return '<div class="hf-card-image"><img data-hf-photo="'+r.id+'" alt="Photo for '+esc(r.title)+' (only shown if verified; otherwise a clearly labelled placeholder)" loading="lazy"><span class="hf-card-type" data-photo-status>Official photo</span></div>'}
function cardHTML(r){return '<article class="hf-card">'+
imageHTML(r)+'<button class="hf-card-save '+(isFavorite(r.id)?'active':'')+'" type="button" data-fave="'+r.id+'" aria-label="'+(isFavorite(r.id)?'Remove from favourites':'Add to favourites')+'">♥</button>'+
'<div class="hf-card-info"><div class="hf-card-category">'+esc(categoryFromName(r))+'</div><h3><a href="meal.html?id='+r.id+'">'+esc(r.title)+'</a></h3><div class="hf-card-bottom"><span>⏱ '+esc(r.minutes)+' min</span>'+(hasNutrition(r)?'<span>'+r.protein+'g protein</span><span>'+r.kcal+' kcal</span>':'')+'</div><p class="hf-card-adaptation">'+(r.adapted?'Unverified adaptation':'HelloFresh Canada recipe · summarized steps')+'</p></div></article>'}
function initCatalogue(){const grid=$('#recipeGrid'),search=$('#search'),cat=$('#category'),sort=$('#sort'),more=$('#showMore'),count=$('#recipeCount');if(!grid)return;
let active='all',visible=12;
function render(){let term=search.value.trim().toLowerCase(),sel=cat.value;
let results=allRecipes.filter(r=>{
let catPass=sel==='all'||categoryFromName(r)===sel;
let q=(r.title+' '+r.category+' '+r.ingredients.map(x=>x.name).join(' ')).toLowerCase();
let filterPass=active==='all'||(active==='quick'&&r.minutes<=30)||(active==='protein'&&hasNutrition(r)&&r.protein>=40)||(active==='calories'&&hasNutrition(r)&&r.kcal<=650)||(active==='official'&&!r.adapted)||(active==='favorites'&&isFavorite(r.id));
return catPass&&q.includes(term)&&filterPass});
const sortby=sort.value;
if(sortby==='time')results.sort((a,b)=>a.minutes-b.minutes);
if(sortby==='protein')results.sort((a,b)=>(b.protein||-1)-(a.protein||-1));
if(sortby==='calories')results.sort((a,b)=>(a.kcal??9999)-(b.kcal??9999));
if(sortby==='az')results.sort((a,b)=>a.title.localeCompare(b.title));
count.textContent=results.length+' matching recipes';
grid.innerHTML=results.length?results.slice(0,visible).map(cardHTML).join(''):'<div class="hf-empty">No matching recipes. Try removing a filter.</div>';
more.hidden=results.length<=visible;
attachPhotos(grid);
grid.querySelectorAll('[data-fave]').forEach(btn=>btn.addEventListener('click',()=>{toggleFavorite(Number(btn.dataset.fave));render()}))
}
[search,cat,sort].forEach(x=>x.addEventListener(x===search?'input':'change',()=>{visible=12;render()}));
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.filter;visible=12;document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b===btn));render()}));
more.addEventListener('click',()=>{visible+=12;render()});render()}
function formatQty(text, factor){if(factor===1)return text;
const m=String(text).trim().match(/^(\d+(?:\.\d+)?|\d+\/\d+)\s*(.*)$/);if(!m)return text;
const p=m[1].includes('/')?m[1].split('/').map(Number).reduce((a,b)=>a/b):Number(m[1]);
const n=p*factor;const round=Math.round(n*100)/100;
const common=[[.125,'1/8'],[.25,'1/4'],[.333,'1/3'],[.375,'3/8'],[.5,'1/2'],[.666,'2/3'],[.75,'3/4'],[1,'1']];
let num=String(round);if(round<1){const h=common.find(x=>Math.abs(x[0]-round)<.01);if(h)num=h[1]}
else if(round%1!==0){const i=Math.floor(round);const rem=round-i;const h=common.find(x=>Math.abs(x[0]-rem)<.01);if(h)num=i+' '+h[1]}
return num+(m[2]?' '+m[2]:'')}
function ingredientHTML(r,portions){return r.ingredients.map((x,i)=>'<li><label><input type="checkbox" data-ing="'+i+'"> <span><strong>'+esc(formatQty(x.quantity,portions/2))+'</strong> '+esc(x.name)+'</span></label></li>').join('')}
function stepHTML(r){return r.steps.map(s=>'<li>'+esc(s)+'</li>').join('')}
function applyShoppingStatus(el,r){const planned=safeList(HF_SHOP);const btn=$('#addShopping');if(!btn)return;btn.textContent=planned.includes(r.id)?'✓ Added to shopping list':'＋ Add to shopping list';}
function initDetail(){const area=$('#recipeDetail');if(!area)return;const id=Number(new URLSearchParams(location.search).get('id'));const r=allRecipes.find(x=>x.id===id);
if(!r){area.innerHTML='<p class="hf-empty">Recipe not found. <a href="hellofresh.html">Browse recipes</a>.</p>';return}
document.title=r.title+" • Tariq's Recipe Book";
area.innerHTML='<p class="hf-breadcrumb"><a href="hellofresh.html">← All meal-kit recipes</a></p>'+
'<section class="hf-detail-hero"><div><img class="hf-detail-photo" data-hf-photo="'+r.id+'" alt="Verified meal photo or an explicit unavailable-photo placeholder"><p class="hf-card-adaptation" data-photo-status>Official HelloFresh photo</p></div>'+
'<div class="hf-detail-summary"><p class="hf-eyebrow">'+esc(r.category)+' · 2-PORTION RECIPE</p><h1>'+esc(r.title)+'</h1><p>Easy-to-follow personal home cooking card. Ingredients can be scaled for your household.</p>'+
'<div class="hf-info-pills"><span>⏱ '+r.minutes+' min</span><span>2 portions</span>'+(hasNutrition(r)?'<span>'+r.protein+'g protein/serving</span><span>'+r.kcal+' kcal/serving</span>':'')+'</div>'+
'<div class="hf-detail-actions"><a class="hf-secondary" href="plan.html?start='+r.id+'">♻ Cook Next / Reuse Ingredients</a><button class="hf-primary" id="addShopping" type="button">＋ Add to shopping list</button><button class="hf-secondary" id="favoriteDetail" type="button">♥ Favourite</button><button class="hf-secondary" id="printRecipe" type="button">Print</button></div>'+
'<div class="hf-disclosure"><strong>'+(r.adapted?'Unverified adaptation':'HelloFresh Canada ingredient list; cooking steps summarized for home use.')+'</strong> '+(r.adapted?'Unverified quantities':'Published nutrition may change with halal substitutions.')+'</div></div></section>'+
'<section class="hf-detail-cols"><div class="hf-panel"><h2>Ingredients</h2><div class="hf-serving"><strong>How many portions?</strong><select id="portions"><option value="1">1 portion</option><option value="2" selected>2 portions</option><option value="4">4 portions</option></select></div><ul id="ingredientsList">'+ingredientHTML(r,2)+'</ul><div class="hf-warning"><strong>Halal check</strong><p>'+esc(r.halal)+'</p></div></div><div class="hf-panel"><h2>Cooking steps</h2><ol class="hf-steps">'+stepHTML(r)+'</ol><p class="hf-card-adaptation">Cooking methods are personal summaries, not copied HelloFresh instructions. All quantities originally represent two portions.</p>'+(r.source?'<p><a href="'+esc(r.source)+'" target="_blank" rel="noopener noreferrer">'+(r.adapted?'Browse HelloFresh category inspiration ↗':'View matched HelloFresh recipe ↗')+'</a></p>':'')+'</div></section>';
attachPhotos(area);
$('#portions').addEventListener('change',e=>{$('#ingredientsList').innerHTML=ingredientHTML(r,Number(e.target.value))});
$('#addShopping').addEventListener('click',()=>{let x=safeList(HF_SHOP);x=x.includes(r.id)?x.filter(id=>id!==r.id):[...x,r.id];saveList(HF_SHOP,x);applyShoppingStatus(area,r)});
$('#favoriteDetail').addEventListener('click',()=>{const on=toggleFavorite(r.id);$('#favoriteDetail').textContent=on?'♥ Favourited':'♥ Favourite'});
$('#favoriteDetail').textContent=isFavorite(r.id)?'♥ Favourited':'♥ Favourite';
$('#printRecipe').addEventListener('click',()=>window.print());applyShoppingStatus(area,r)}
function initShopping(){const area=$('#shoppingArea');if(!area)return;
const render=()=>{let ids=safeList(HF_SHOP);let picks=allRecipes.filter(r=>ids.includes(r.id));
$('#shoppingCount').textContent=picks.length+' recipes selected';
if(!picks.length){area.innerHTML='<div class="hf-empty">Your shopping list is empty. Open a meal and tap <strong>Add to shopping list</strong> to start.</div>';return}
const byName=new Map();
for(const r of picks)for(const i of r.ingredients){let name=i.name.toLowerCase().trim();let key=name+' | '+i.quantity.trim().replace(/^\d+(?:\.\d+)?\s*/,'');let val=byName.get(key)||{name:i.name,units:[],recipe:[]};val.units.push(i.quantity);val.recipe.push(r.title);byName.set(key,val)}
const items=[...byName.values()].sort((a,b)=>a.name.localeCompare(b.name));
area.innerHTML='<div class="hf-panel"><h2>Grocery checklist</h2><p>Ingredients are shown for two portions of each selected recipe. Repeated items are grouped; separate package quantities are retained to avoid unreliable unit conversions.</p><ul>'+items.map((x,i)=>'<li><label><input type="checkbox" data-check="'+i+'"><span><strong>'+esc(x.name)+'</strong> — '+esc(x.units.join(' + '))+'</span></label></li>').join('')+'</ul></div><div class="hf-panel"><h2>Recipes planned</h2><ul>'+picks.map(r=>'<li><a href="meal.html?id='+r.id+'">'+esc(r.title)+'</a> <button type="button" data-remove="'+r.id+'" class="hf-secondary" style="padding:5px 10px;margin-left:8px">Remove</button></li>').join('')+'</ul></div>';
area.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{saveList(HF_SHOP,safeList(HF_SHOP).filter(id=>id!==Number(b.dataset.remove)));render()}))}
$('#clearShopping')?.addEventListener('click',()=>{if(confirm('Clear all selected recipes?')){saveList(HF_SHOP,[]);render()}});
$('#printShopping')?.addEventListener('click',()=>window.print());render()}
(async()=>{try{const response=await fetch(HF_DATA);if(!response.ok)throw new Error('Data file is unavailable');allRecipes=await response.json();if(!Array.isArray(allRecipes)||allRecipes.length===0||allRecipes.some(r=>!r.photo||!r.verifiedSource||r.adapted))throw new Error('Recipe collection incomplete');initCatalogue();initDetail();initShopping()}catch(e){const err='<div class="hf-empty">Could not load the recipe library. Please refresh or check the site deployment. '+esc(e.message)+'</div>';['#recipeGrid','#recipeDetail','#shoppingArea'].forEach(sel=>{let el=$(sel);if(el)el.innerHTML=err});console.error(e)}})();
