import sys
from mutagen.mp3 import MP3
from mutagen.id3 import ID3

file = "/Users/tariq/.gemini/antigravity/scratch/tariq-recipebook/music/Feel It - d4vd.mp3"
audio = MP3(file, ID3=ID3)
print("Keys:", audio.keys())
for key in audio.keys():
    if key.startswith('APIC'):
        print(f"Found Art: {key}, size: {len(audio[key].data)}")
    elif key.startswith('USLT') or key.startswith('SYLT'):
        print(f"Found Lyrics: {key}, text preview: {audio[key].text[:50]}")
