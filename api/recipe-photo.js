'use strict';
const recipes=require('../data/hellofresh-recipes.json');
const overrides={
16:'https://www.hellofresh.ca/recipes/bulgogi-inspired-steak-and-shrimp-bowls-66b126d16e2625457a71c02c',
25:'https://www.hellofresh.ca/recipes/sweet-heat-beyond-meat-r-670a1859d1dd98c148b07c05',
28:'https://www.hellofresh.ca/recipes/carb-smart-beef-kofta-curry-670ea1cfed0d969de7c04803',
33:'https://www.hellofresh.ca/recipes/cal-smart-smoky-beef-meatballs-66c0ec2d1de4c4d62e8006d3',
13:'https://www.hellofresh.ca/recipes/smart-apricot-mustard-chicken-thighs-66cb76a202090b0cfbd29ed5',
14:'https://www.hellofresh.ca/recipes/smart-smoky-mustard-chicken-thighs-669de472180815c793275660',
17:'https://www.hellofresh.ca/recipes/spicy-korean-chicken-tacos-65ef9b72d4f9506890147379',
18:'https://www.hellofresh.ca/recipes/spicy-korean-style-chicken-65fe1da73a5b3388b38642d9',
19:'https://www.hellofresh.ca/recipes/korean-style-chicken-tacos-65fe1d697b309a7a47f551d3',
21:'https://www.hellofresh.ca/recipes/spicy-chicken-thigh-bulgogi-style-bowl-66cb514e6041110ff0a4a6ab',
23:'https://www.hellofresh.ca/recipes/carb-smart-turkey-bibimbap-inspired-bowls-6693312e857799fb135257a3',
30:'https://www.hellofresh.ca/recipes/superquick-biriyani-inspired-beef-686edc16a5a49c635d8a37fe',
31:'https://www.hellofresh.ca/recipes/carb-smart-beef-and-root-veg-mash-bowl-6772e8fac7ac6d53848642cf',
37:'https://www.hellofresh.ca/recipes/beef-taco-flatbread-pizzas-66c0d4f7ef74ec2289d3a1c1',
46:'https://www.hellofresh.ca/recipes/smart-moroccan-spiced-poached-salmon-65f8d63e4690e3c090471ffd',
47:'https://www.hellofresh.ca/recipes/italian-seasoned-salmon-630493345bf47cf8a900cf93',
48:'https://www.hellofresh.ca/recipes/pesto-baked-salmon-62b17fe1828c7ddc7107e3f0',
49:'https://www.hellofresh.ca/recipes/soy-maple-glazed-salmon-65d7a1cddc1b8ee2a5df9636',
53:'https://www.hellofresh.ca/recipes/panko-crusted-baked-salmon-660c9db13f0f2e6d306d9718',
55:'https://www.hellofresh.ca/recipes/smart-golden-coconut-shrimp-66955b8e634fba9ab8079301',
58:'https://www.hellofresh.ca/recipes/sheet-pan-shrimp-tacos-66debe1946f5f8436472153b',
60:'https://www.hellofresh.ca/recipes/mexican-inspired-shrimp-tacos-67b2f7ec399c569c611fede5',
62:'https://www.hellofresh.ca/recipes/greek-shrimp-and-feta-bake-65f0a47897477827aca4c4e6',
65:'https://www.hellofresh.ca/recipes/cashew-shrimp-and-tofu-stir-fry-66a72b3472d2a210384ad327',
66:'https://www.hellofresh.ca/recipes/vietnamese-style-caramelized-ginger-shrimp-65f4e172473c4f42771cc1c6',
72:'https://www.hellofresh.ca/recipes/spicy-north-african-chicken-65f8d5dc4690e3c090471cd7'
};
const cache=new Map();
const normalize=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&amp;/g,' and ').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
const decode=s=>String(s||'').replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
function titleMatches(heading,expected){
 const a=normalize(decode(heading)),b=normalize(expected);
 if(!a||!b||a.length<6||b.length<6)return false;
 if(a===b)return true;
 if(a.length>=15&&b.includes(a)&&a.split(' ').length>=3)return true;
 if(b.length>=15&&a.includes(b)&&b.split(' ').length>=3)return true;
 const aa=new Set(a.split(' ')),bb=new Set(b.split(' '));
 const common=[...aa].filter(t=>bb.has(t)).length;
 return common>=3&&common/aa.size>=.85&&common/bb.size>=.66;
}
function attrs(tag){const a={};for(const m of tag.matchAll(/([\w-]+)\s*=\s*["']([^"']*)["']/g))a[m[1].toLowerCase()]=decode(m[2]);return a}
function hero(html,title){
 const heading=decode((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)||[])[1]||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
 if(!titleMatches(heading,title))return null;
 let u=null;
 for(const m of html.matchAll(/<meta\s+[^>]*>/gi)){
  const a=attrs(m[0]);
  if(['og:image','twitter:image'].includes(a.property||a.name)&&a.content){u=a.content;break}
 }
 if(!u)for(const m of html.matchAll(/<img\b[^>]+>/gi)){
  const a=attrs(m[0]);if(a.alt&&titleMatches(a.alt,title)&&(a.src||a['data-src'])){u=a.src||a['data-src'];break}
 }
 if(!u)return null;
 let parsed;try{parsed=new URL(u,'https://www.hellofresh.ca')}catch{return null}
 if(parsed.protocol!=='https:'||!['media.hellofresh.com','img.hellofresh.com','cdn.hellofresh.com','www.hellofresh.ca','www.hellofresh.com'].includes(parsed.hostname))return null;
 if(!/(\.png|\.jpe?g|\.webp|\/recipes\/image\/)/i.test(parsed.pathname))return null;
 return parsed.href;
}
async function html(url,ms=6500){
 const ctl=new AbortController();const timer=setTimeout(()=>ctl.abort(),ms);
 try{
  const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (compatible; TariqRecipeBook/1.0)','Accept':'text/html,*/*'},signal:ctl.signal});
  if(!r.ok||!(r.headers.get('content-type')||'').includes('text/html'))return null;
  const s=await r.text();return s.length>4500000?null:s;
 }catch{return null}finally{clearTimeout(timer)}
}
function allowed(url){
 try{const u=new URL(url);return u.protocol==='https:'&&['www.hellofresh.ca','www.hellofresh.com'].includes(u.hostname)&&/^\/recipes\/[a-z0-9-]+-[a-f0-9]{24}\/?$/.test(u.pathname)}catch{return false}
}
async function search(title){
 const q=encodeURIComponent('site:hellofresh.ca/recipes/ "'+title+'"');
 const s=await html('https://www.google.com/search?q='+q+'&num=5',4500);
 if(!s)return [];
 const parsed=s.replace(/\\u003d/g,'=').replace(/\\u0026/g,'&').replace(/&amp;/g,'&').replace(/%2F/gi,'/').replace(/%3A/gi,':');
 return [...new Set((parsed.match(/https?:\/\/(?:www\.)?hellofresh\.ca\/recipes\/[a-z0-9-]+-[a-f0-9]{24}/gi)||[]).map(x=>x.replace('http://','https://').replace('https://hellofresh.ca/','https://www.hellofresh.ca/')))].filter(allowed).slice(0,4);
}
async function resolve(recipe){
 const pages=[];
 if(allowed(recipe.source))pages.push(recipe.source);
 if(overrides[recipe.id]&&allowed(overrides[recipe.id]))pages.push(overrides[recipe.id]);
 if(!pages.length)pages.push(...await search(recipe.title));
 for(const url of [...new Set(pages)]){
  const page=await html(url);
  if(page){const img=hero(page,recipe.title);if(img)return img}
 }
 return null;
}
module.exports=async(req,res)=>{
 if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).send('Method not allowed')}
 const id=Number(req.query.id),recipe=recipes.find(x=>x.id===id);
 if(!Number.isInteger(id)||!recipe)return res.status(404).send('Unknown recipe');
 res.setHeader('X-Content-Type-Options','nosniff');
 if(recipe.photo && /^https:\/\/media\.hellofresh\.com\/q_[a-zA-Z0-9%_,]+\/recipes\/image\/[a-zA-Z0-9_.-]+$/.test(recipe.photo))return res.redirect(302,recipe.photo);
 res.setHeader('Cache-Control','public, s-maxage=86400, stale-while-revalidate=604800');
 try{
  let image=cache.get(id);
  if(image===undefined){image=await resolve(recipe);cache.set(id,image)}
  if(!image)return res.status(404).send('No verified official image');
  return res.redirect(302,image);
 }catch{return res.status(404).send('Photo lookup failed')}
};
