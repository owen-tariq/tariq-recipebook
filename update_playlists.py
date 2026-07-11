import os
import json

def get_tracks(folder_path, url_prefix):
    files = [f for f in os.listdir(folder_path) if f.endswith('.mp3')]
    files.sort()
    tracks = []
    for f in files:
        title = f.replace('.mp3', '')
        if '-' in title:
            title = title.split('-', 1)[0].strip()
        tracks.append({
            "title": title,
            "src": f"{url_prefix}/{f}",
            "artist": "Unknown Artist",
            "cover": "https://placehold.co/400x400/333/FFF?text=Music"
        })
    return tracks

playlists = [
    {
        "id": "cooking_mix",
        "name": "Cooking Mix",
        "tracks": get_tracks('/Users/tariq/.gemini/antigravity/scratch/tariq-recipebook/music/Cooking Mix', 'music/Cooking Mix')
    },
    {
        "id": "bangla",
        "name": "Bangla",
        "tracks": get_tracks('/Users/tariq/.gemini/antigravity/scratch/tariq-recipebook/music/Bangla', 'music/Bangla')
    }
]

js_file = '/Users/tariq/.gemini/antigravity/scratch/tariq-recipebook/player.js'
with open(js_file, 'r') as f:
    js = f.read()

playlists_str = "const playlists = " + json.dumps(playlists, indent=2, ensure_ascii=False) + ";\n"
replacement = playlists_str + "  let currentPlaylistIndex = 0;\n  let tracks = playlists[currentPlaylistIndex].tracks;\n"

# Find the start of const tracks
start_idx = js.find('const tracks = [')
# Find the end of const tracks (]; followed by let currentTrackIndex)
end_idx = js.find('];\n  let currentTrackIndex', start_idx) + 3

js = js[:start_idx] + replacement + js[end_idx:]

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(js)
