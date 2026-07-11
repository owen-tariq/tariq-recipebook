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
    
    // show player
    await page.evaluate(() => document.getElementById('music-toggle-btn').click());
    await new Promise(r => setTimeout(r, 500));
    
    // forward a little bit
    await page.evaluate(() => {
      const pb = document.getElementById('progress-bar');
      pb.dispatchEvent(new MouseEvent('click', { clientX: pb.getBoundingClientRect().left + 50 }));
    });
    await new Promise(r => setTimeout(r, 1000));
    
    // press MENU
    await page.evaluate(() => document.getElementById('menu-btn').click());
    await new Promise(r => setTimeout(r, 500));
    
    const lyricsActive = await page.evaluate(() => document.getElementById('lyrics-view').classList.contains('active'));
    console.log("Lyrics Active after MENU:", lyricsActive);
    
    await browser.close();
  } catch (e) {
    console.log("TEST SCRIPT ERROR:", e);
  } finally {
    server.close();
  }
});
