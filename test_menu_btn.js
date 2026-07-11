const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
app.use(express.static('.'));
const server = app.listen(3000, async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    
    await page.goto('http://localhost:3000/recipes.html', { waitUntil: 'networkidle0' });
    
    // Click play to show player
    await page.evaluate(() => document.getElementById('music-toggle-btn').click());
    await new Promise(r => setTimeout(r, 500));
    
    // Open lyrics
    await page.evaluate(() => document.getElementById('btn-show-lyrics').click());
    await new Promise(r => setTimeout(r, 500));
    
    let isActive = await page.evaluate(() => document.getElementById('lyrics-view').classList.contains('active'));
    console.log("Lyrics Active After Open:", isActive);
    
    // Click Menu
    await page.evaluate(() => document.getElementById('menu-btn').click());
    await new Promise(r => setTimeout(r, 500));
    
    isActive = await page.evaluate(() => document.getElementById('lyrics-view').classList.contains('active'));
    console.log("Lyrics Active After Menu Click:", isActive);
    
    await browser.close();
  } catch (e) {
    console.log("TEST SCRIPT ERROR:", e);
  } finally {
    server.close();
  }
});
