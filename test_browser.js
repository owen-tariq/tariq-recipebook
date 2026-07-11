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
    
    // Click play to trigger load
    await page.evaluate(() => {
      document.getElementById('music-toggle-btn').click();
    });
    
    await new Promise(r => setTimeout(r, 2000));
    
    const lyrics = await page.evaluate(() => document.getElementById('lyrics-content').innerHTML);
    console.log("LYRICS CONTENT LENGTH:", lyrics.length);
    if(lyrics.length > 200) console.log("SUCCESS! Lyrics loaded!");
    
    await browser.close();
  } catch (e) {
    console.log("TEST SCRIPT ERROR:", e);
  } finally {
    server.close();
  }
});
