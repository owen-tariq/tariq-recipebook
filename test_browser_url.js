const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
app.use(express.static('.'));
const server = app.listen(3000, async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    
    // Test pure HTML injection
    await page.setContent(`
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js"></script>
      <script>
        window.onload = function() {
          const relativeUrl = "music/Feel It - d4vd.mp3";
          const absoluteUrl = new URL(relativeUrl, "http://localhost:3000/").href;
          console.log("Absolute:", absoluteUrl);
          jsmediatags.read(absoluteUrl, {
            onSuccess: function(tag) { console.log("SUCCESS:", !!tag.tags.picture, !!tag.tags.lyrics); },
            onError: function(err) { console.log("ERROR:", err.info || err); }
          });
        }
      </script>
    `);
    
    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
  } catch (e) {
    console.log("TEST SCRIPT ERROR:", e);
  } finally {
    server.close();
  }
});
