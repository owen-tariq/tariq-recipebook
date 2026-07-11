const jsmediatags = require("jsmediatags");

jsmediatags.read("/Users/tariq/.gemini/antigravity/scratch/tariq-recipebook/music/Feel It - d4vd.mp3", {
  onSuccess: function(tag) {
    console.log("Picture keys:", tag.tags.picture ? Object.keys(tag.tags.picture) : "None");
    console.log("Picture format:", tag.tags.picture ? tag.tags.picture.format : "N/A");
    console.log("Lyrics keys:", tag.tags.lyrics ? Object.keys(tag.tags.lyrics) : "None");
    console.log("USLT keys:", tag.tags.USLT ? Object.keys(tag.tags.USLT) : "None");
    if (tag.tags.lyrics) console.log("Lyrics type:", typeof tag.tags.lyrics);
    if (tag.tags.USLT) console.log("USLT data:", typeof tag.tags.USLT, tag.tags.USLT.data ? "has data" : tag.tags.USLT);
  },
  onError: function(error) {
    console.log("Error:", error);
  }
});
