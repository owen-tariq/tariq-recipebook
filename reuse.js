'use strict';
/* Uses the ingredient lists in data/hellofresh-recipes.json.
 * Matching uses source-listed ingredients for photo-matched HelloFresh Canada recipes.
 * No promise of exact package sizes, savings, nutrition or food safety. */
(function(){
const DATA='data/hellofresh-recipes.json';
const SHOP='tariq-shopping-meals-v1', SAVED='tariq-reuse-meal-plan-v1';
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s??'').toLowerCase().replace(/\s+/g,' ').trim();
let recipes=[],planned=[];
const byId=id=>recipes.find(r=>r.id===Number(id));
const $=selector=>document.querySelector(selector);
function ingredientInfo(name){
 const s=norm(name);let key,label,weight=1,type='pantry',caution='';
 if(/chicken broth/.test(s)){key='broth';label='Halal-certified broth';}
 else if(/chicken and peeled shrimp/.test(s)){key='mixed-chicken-shrimp';label='Chicken and shrimp';weight=8;type='protein';}
 else if(/ground chicken/.test(s)){key='ground-chicken';label='Ground chicken';weight=9;type='protein';}
 else if(/chicken/.test(s)){key='chicken';label='Boneless chicken';weight=10;type='protein';caution='Check cut: breast and thigh may require an adjustment';}
 else if(/salmon/.test(s)){key='salmon';label='Salmon';weight=11;type='protein';}
 else if(/shrimp/.test(s)){key='shrimp';label='Shrimp';weight=11;type='protein';}
 else if(/ground lamb/.test(s)){key='lamb';label='Ground lamb';weight=10;type='protein';}
 else if(/ground turkey/.test(s)){key='turkey';label='Ground turkey';weight=10;type='protein';}
 else if(/beef|steak/.test(s)){key='beef';label='Beef';weight=10;type='protein';caution='Choose ground beef or steak to suit the actual dishes';}
 else if(/green beans or broccoli/.test(s)){key='broccoli';label='Broccoli';weight=5;type='vegetable';caution='Choose broccoli instead of green beans on both cards';}
 else if(/broccoli/.test(s)){key='broccoli';label='Broccoli';weight=5;type='vegetable';}
 else if(/bell pepper/.test(s)){key='bell-peppers';label='Bell peppers';weight=5;type='vegetable';}
 else if(/bok choy/.test(s)){key='bok-choy';label='Bok choy';weight=5;type='vegetable';}
 else if(/green onion/.test(s)){key='green-onion';label='Green onions';weight=4;type='vegetable';}
 else if(/onion/.test(s)){key='onion';label='Onions';weight=5;type='vegetable';}
 else if(/carrot/.test(s)){key='carrots';label='Carrots';weight=4;type='vegetable';}
 else if(/potato/.test(s)){key='potatoes';label='Potatoes';weight=4;type='vegetable';caution=s.includes(' or ')?'Choose the same potato variety in all recipes':'';}
 else if(/zucchini/.test(s)){key='zucchini';label='Zucchini';weight=5;type='vegetable';}
 else if(/spinach/.test(s)){key='spinach';label='Spinach';weight=5;type='vegetable';}
 else if(/tomato/.test(s)&&/passata|sauce|paste/.test(s)){key='tomato-sauce';label='Tomato sauce / paste';}
 else if(/tomato/.test(s)){key='tomatoes';label='Tomatoes';weight=4;type='vegetable';}
 else if(/green peas/.test(s)){key='peas';label='Green peas';weight=3;type='vegetable';}
 else if(/green beans/.test(s)){key='green-beans';label='Green beans';weight=4;type='vegetable';}
 else if(/shredded cabbage|coleslaw/.test(s)){key='cabbage';label='Cabbage / slaw';weight=5;type='vegetable';}
 else if(/salad greens|lettuce/.test(s)){key='greens';label='Salad greens';weight=5;type='vegetable';}
 else if(/cucumber/.test(s)){key='cucumber';label='Cucumber';weight=4;type='vegetable';}
 else if(/lemon or lime juice/.test(s)){key='citrus-juice';label='Lemon or lime juice';weight=2;type='produce';caution='Choose one citrus variety';}
 else if(/lemon/.test(s)){key='lemon';label='Lemons / lemon juice';weight=3;type='produce';}
 else if(/lime/.test(s)){key='lime';label='Limes';weight=3;type='produce';}
 else if(/jasmine or basmati rice|jasmine rice|basmati rice/.test(s)){key='rice';label='Rice';weight=2;type='staple';caution='Choose one rice variety if the recipe permits';}
 else if(/couscous|pasta|noodles/.test(s)){key='grain';label='Pasta / couscous / noodles';weight=1;type='staple';caution='Different forms are not interchangeable without recipe adjustment';}
 else if(/corn tortillas/.test(s)){key='tortillas';label='Corn tortillas';weight=3;type='staple';}
 else if(/feta/.test(s)){key='feta';label='Vegetarian-rennet feta';weight=4;type='dairy';}
 else if(/greek yogurt|plain yogurt/.test(s)){key='yogurt';label='Plain yogurt';weight=4;type='dairy';}
 else if(/butter/.test(s)){key='butter';label='Butter';weight=1;type='dairy';}
 else if(/ginger/.test(s)){key='ginger';label='Ginger';weight=2;type='produce';}
 else if(/garlic/.test(s)){key='garlic';label='Garlic';weight=2;type='pantry';}
 else if(/cilantro/.test(s)){key='cilantro';label='Cilantro';weight=4;type='produce';}
 else if(/mint/.test(s)){key='mint';label='Mint';weight=4;type='produce';}
 else if(/black beans/.test(s)){key='black-beans';label='Canned black beans';weight=1;type='staple';}
 else if(/chickpeas/.test(s)){key='chickpeas';label='Chickpeas';weight=1;type='staple';}
 else if(/sesame oil/.test(s)){key='sesame-oil';label='Sesame oil';}
 else if(/cooking oil|olive oil/.test(s)){key='oil';label='Cooking oil';}
 else if(/soy sauce/.test(s)){key='soy';label='Alcohol-free soy sauce';}
 else if(/smoked paprika/.test(s)){key='paprika';label='Smoked paprika';}
 else if(/ground cumin/.test(s)){key='cumin';label='Cumin';}
 else if(/ground black pepper/.test(s)){key='black-pepper';label='Black pepper';}
 else if(/rice vinegar/.test(s)){key='vinegar';label='Rice vinegar';}
 else {key='exact:'+s;label=name;weight=1;}
 return {key,label,weight,type,caution};
}
function ingredientMap(recipe){
 const out=new Map();
 for(const ing of recipe.ingredients){
  const info=ingredientInfo(ing.name);
  if(!out.has(info.key))out.set(info.key,{...info,entries:[]});
  out.get(info.key).entries.push(ing);
 }
 return out;
}
function overlap(a,b){
 const x=ingredientMap(a),y=ingredientMap(b);
 const shared=[...x.values()].filter(v=>y.has(v.key));
 const fresh=shared.filter(i=>['protein','vegetable','dairy','produce'].includes(i.type));
 const weighted=shared.reduce((v,i)=>v+i.weight,0);
 return {shared,fresh,weighted};
}
function ranking(start,last,excluded,preferProtein){
 return recipes.filter(r=>!excluded.has(r.id)).map(r=>{
  const prev=overlap(last,r),base=overlap(start,r);
  const rawSame=prev.shared.some(i=>i.type==='protein');
  const veggie=prev.fresh.filter(i=>i.type==='vegetable').length;
  const q=ingredientMap(r),p=ingredientMap(last);
  const sim=prev.shared.length/Math.max(q.size,p.size,1);
  const hasBaseFresh=base.fresh.length>0;
  let score=prev.weighted+base.weighted*.45 + (rawSame&&preferProtein?6:0)+veggie*2+(hasBaseFresh?3:-15);
  if(sim>.85)score-=4; // exact duplicate ingredient templates are less interesting
  return {recipe:r,score,previous:prev,first:base};
 }).filter(x=>x.previous.fresh.length>0).sort((a,b)=>b.score-a.score||a.recipe.minutes-b.recipe.minutes||a.recipe.id-b.recipe.id);
}
function makePlan(start,count,prefer){
 const selected=[start];const used=new Set([start.id]);
 while(selected.length<count){
  const candidates=ranking(start,selected[selected.length-1],used,prefer);
  if(!candidates.length)break;
  selected.push(candidates[0].recipe);used.add(candidates[0].recipe.id);
 }
 return selected;
}
function rational(n){const bits=String(n).trim().match(/^(\d+(?:\.\d+)?|\d+\/\d+|\d+\s+\d+\/\d+)\s*(.*)$/);if(!bits)return null;const val=bits[1].split(' ').reduce((acc,v)=>acc+(v.includes('/')?Number(v.split('/')[0])/Number(v.split('/')[1]):Number(v)),0);if(!Number.isFinite(val))return null;const unit=(bits[2]||'pieces').toLowerCase().replace(/\.$/,'');return {value:val,unit};}
function number(n){return String(Math.round(n*100)/100)}
function shoppingTotals(plan){
 const groups=new Map();
 for(const r of plan){
  const counted=new Set();
  for(const ing of r.ingredients){
   const info=ingredientInfo(ing.name);
   const k=info.key;
   if(counted.has(k))continue; // protect against duplicate ingredient lines on a source page
   counted.add(k);
   if(!groups.has(k))groups.set(k,{...info,quantities:[],recipes:new Set()});
   groups.get(k).quantities.push({quantity:ing.quantity,raw:ing.name,recipe:r.title});
   groups.get(k).recipes.add(r.title);
  }
 }
 const ordered=[...groups.values()].sort((a,b)=>b.recipes.size-a.recipes.size||b.weight-a.weight||a.label.localeCompare(b.label));
 return ordered;
}
function totalText(group){
 const parts=group.quantities.map(q=>rational(q.quantity));
 const sameUnit=parts.every(x=>x)&&parts.every(x=>x.unit===parts[0].unit);
 const sameItem=group.quantities.every(x=>norm(x.raw)===norm(group.quantities[0].raw));
 if(sameUnit&&sameItem){const total=parts.reduce((n,p)=>n+p.value,0);return number(total)+' '+parts[0].unit;}
 // Compatible option sets may share the same actual product; still list the original quantities.
 return group.quantities.map(x=>x.quantity).join(' + ');
}
function summaryList(items){
 return items.map(g=>g.label+': '+totalText(g)+(g.caution?' ['+g.caution+']':'')+' — '+[...g.recipes].join('; ')).join('\n');
}
function updatePage(plan){
 const area=$('#planResults');if(!area)return;
 if(!plan.length){area.innerHTML='<p class="reuse-empty">Choose a first recipe to start.</p>';return}
 const primary=plan[0];
 const card=(r,i)=>{
  const related=i===0?{shared:[],fresh:[]} : overlap(plan[i-1],r);
  const joined=related.shared.filter(x=>x.type!=='pantry').slice(0,6);
  return '<article class="reuse-meal"><div class="reuse-meal-top"><img src="'+E(r.photo)+'" alt="Official HelloFresh Canada photo of '+E(r.title)+'" loading="lazy" onerror="this.onerror=null;this.src=\'photo-unverified.svg\';this.alt=\'Verified photo unavailable\'"><span class="reuse-day">Recipe '+(i+1)+'</span></div><div class="reuse-meal-body"><p class="hf-eyebrow">'+E(r.category)+' · '+E(r.minutes)+' min</p><h3><a href="meal.html?id='+r.id+'">'+E(r.title)+'</a></h3><p>'+(i===0?'Start with the meal you really want.':(related.fresh.length?'Reuse these fresh ingredients from the previous recipe:':'Some pantry ingredients overlap:'))+'</p><div class="reuse-overlap">'+(i?joined.map(x=>'<span>'+E(x.label)+'</span>').join(''):'<span>Starting recipe</span>')+'</div><div class="reuse-card-foot"><span class="reuse-matched">'+(i?related.shared.length+' shared ingredients':'2 servings')+'</span><a href="meal.html?id='+r.id+'">See recipe →</a></div></div></article>';
 };
 const groups=shoppingTotals(plan), repeated=groups.filter(x=>x.recipes.size>1);
 const mealCount=plan.length;
 const sharedHTML=repeated.map(x=>'<li><div><strong>'+E(x.label)+'</strong><small>Used in '+x.recipes.size+' of '+mealCount+' recipes'+(x.caution?' · '+E(x.caution):'')+'</small></div><span class="reuse-amount">'+E(totalText(x))+'</span></li>').join('');
 const allHTML=groups.map(x=>'<li><div><strong>'+E(x.label)+'</strong><small>'+x.recipes.size+' '+(x.recipes.size===1?'recipe':'recipes')+(x.caution?' · '+E(x.caution):'')+'</small></div><span class="reuse-amount">'+E(totalText(x))+'</span></li>').join('');
 const candidates=ranking(primary,plan[1]||primary,new Set(plan.map(x=>x.id)),true).slice(0,4);
 area.innerHTML='<div class="reuse-plan-heading"><h2>Your connected recipes</h2><p>Each card makes two portions. Matching is based on listed ingredients and a preference for fresh groceries, not just common spices.</p></div>'+
 '<div class="reuse-grid">'+plan.map(card).join('')+'</div>'+
 '<div class="reuse-actions"><button type="button" class="hf-primary" id="addPlanShopping">Add these '+mealCount+' recipes to Shopping List</button><button class="hf-secondary" type="button" id="copyPlan">Copy grocery list</button><button class="hf-secondary" type="button" id="printPlan">Print plan</button></div>'+
 '<div class="reuse-plan-panels"><section class="reuse-box"><h2>Ingredients you reuse</h2><p>These ingredients show up in at least two selected meals. Amounts are summed only when identical item names and units allow safe addition.</p><ul class="reuse-ingredients">'+(sharedHTML||'<li>No shared groceries detected. Try another starting recipe.</li>')+'</ul></section>'+
 '<section class="reuse-box"><h2>Combined shopping basket</h2><p>For '+mealCount+' recipes making two portions each. Quantities remain separate when cuts, units or alternatives differ. Check what you already own before buying.</p><ul class="reuse-ingredients">'+allHTML+'</ul></section></div>'+
 '<div class="reuse-limited">IMPORTANT: If an ingredient is listed as “broccoli or green beans”, the plan counts broccoli only if you actually choose broccoli. Recipes using different cuts of chicken or beef may need a substitution. For raw seafood or meat beyond tomorrow, freeze portions immediately and thaw safely.</div>'+
 '<section class="reuse-box"><h2>Other meals using these groceries</h2><p>Want something different? Choose an alternative second recipe and the following meal will be recalculated.</p><div class="reuse-alternatives">'+candidates.map(x=>'<div class="reuse-alt"><div><strong>'+E(x.recipe.title)+'</strong><small>'+x.previous.fresh.length+' fresh ingredients in common</small></div><button type="button" class="reuse-select-next" data-alt="'+x.recipe.id+'">Choose</button></div>').join('')+'</div></section>';
 const add=$('#addPlanShopping');if(add)add.addEventListener('click',()=>{let previous=[];try{previous=JSON.parse(localStorage.getItem(SHOP)||'[]');if(!Array.isArray(previous))previous=[]}catch{};const saved=[...new Set([...previous,...plan.map(x=>x.id)])];localStorage.setItem(SHOP,JSON.stringify(saved));add.textContent='✓ Added — open Shopping List';add.onclick=()=>{location.href='shopping.html'}});
 $('#copyPlan').addEventListener('click',async()=>{const text='COOK NEXT — '+plan.map(r=>r.title).join(' → ')+'\n\n'+summaryList(groups);try{await navigator.clipboard.writeText(text);$('#copyPlan').textContent='Copied!'}catch{window.prompt('Copy this list:',text)}});
 $('#printPlan').addEventListener('click',()=>window.print());
 area.querySelectorAll('[data-alt]').forEach(btn=>btn.addEventListener('click',()=>{const candidate=byId(btn.dataset.alt);if(!candidate)return;const size=Number($('#planSize').value);const follow=[candidate],excluded=new Set([primary.id,candidate.id]);while(follow.length<size-1){const options=ranking(primary,follow[follow.length-1],excluded,$('#sameProtein').checked);if(!options.length)break;follow.push(options[0].recipe);excluded.add(options[0].recipe.id)}planned=[primary,...follow].slice(0,size);localStorage.setItem(SAVED,JSON.stringify(planned.map(x=>x.id)));updatePage(planned);window.scrollTo({top:area.getBoundingClientRect().top+window.scrollY-20,behavior:'smooth'})}));
}
function initIngredientLookup(){
 const selector=$('#ingredientLookup'),area=$('#ingredientLookupResults');if(!selector||!area)return;
 const choices=new Map();
 for(const r of recipes){const seen=new Set();for(const ing of r.ingredients){const info=ingredientInfo(ing.name);if(seen.has(info.key))continue;seen.add(info.key);let current=choices.get(info.key);if(!current){current={...info,recipes:[]};choices.set(info.key,current)}current.recipes.push(r)}}
 const sorted=[...choices.values()].sort((a,b)=>b.recipes.length-a.recipes.length||a.label.localeCompare(b.label));
 selector.innerHTML=sorted.map(v=>'<option value="'+E(v.key)+'">'+E(v.label)+' ('+v.recipes.length+' recipes)</option>').join('');
 const first=sorted.find(v=>v.key==='rice');if(first)selector.value=first.key;
 const render=()=>{
 const found=choices.get(selector.value);if(!found)return;
 area.innerHTML='<div class="reuse-lookup-summary">'+found.recipes.length+' of '+recipes.length+' recipe cards list '+E(found.label.toLowerCase())+'</div>'+(found.caution?'<p class="reuse-limited">'+E(found.caution)+'</p>':'')+'<ul class="reuse-lookup-items">'+found.recipes.map(r=>'<li><a href="meal.html?id='+r.id+'">'+E(r.title)+'</a> <small> · <a href="plan.html?start='+r.id+'">Plan from here</a></small>'+'</li>').join('')+'</ul>';
 };
 selector.addEventListener('change',render);render();
}
async function init(){
 if(!$('#planStart'))return;
 try{const response=await fetch(DATA);if(!response.ok)throw new Error('Unable to load recipes');recipes=await response.json();if(!Array.isArray(recipes)||!recipes.length||recipes.some(r=>!r.photo||!r.verifiedSource||r.adapted))throw new Error('Recipe data is incomplete');
 initIngredientLookup(); const start=$('#planStart');start.innerHTML=recipes.map(r=>'<option value="'+r.id+'">'+E(r.title)+' ('+E(r.category)+')</option>').join('');
 let query=Number(new URLSearchParams(location.search).get('start'));let saved=null;try{saved=JSON.parse(localStorage.getItem(SAVED)||'null')}catch{}
 const initial=byId(query)||byId(Array.isArray(saved)?saved[0]:null)||byId(40)||recipes[0];start.value=initial.id;
 const draw=()=>{const head=byId(start.value);if(!head)return;planned=makePlan(head,Number($('#planSize').value),$('#sameProtein').checked);localStorage.setItem(SAVED,JSON.stringify(planned.map(x=>x.id)));updatePage(planned);$('#reuseStatus').textContent='Showing '+planned.length+' recipes with matched groceries';};
 $('#makePlan').addEventListener('click',draw);
 $('#planStart').addEventListener('change',draw);
 $('#planSize').addEventListener('change',draw);
 $('#sameProtein').addEventListener('change',draw);
 draw();
 }catch(err){const a=$('#reuseStatus');if(a)a.textContent='Could not load the meal plan: '+err.message;console.error(err)}
}
document.addEventListener('DOMContentLoaded',init);
})();