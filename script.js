let songs = [
    { name: "Let Me Love You", artist: "Justin Bieber", filePath: "music/1.mp3" },
    { name: "Thumbi Vaa", artist: "Ilayaraja", filePath: "music/2.mp3" },
    { name: "Song 3", artist: "Ilayaraja", filePath: "music/3.mp3" },
    { name: "Song 4", artist: "A R Rahman", filePath: "music/4.mp3" },
    { name: "Song 5", artist: "Mohd.Rafi", filePath: "music/5.mp3" },
    { name: "Song 6", artist: "One Direction", filePath: "music/6.mp3" },
    { name: "Song 7", artist: "Pritam", filePath: "music/7.mp3" }
];


let audioElement = new Audio(songs[0].filePath);
let currentSongIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let timeStamp = document.getElementById('timeStamp');

// Play/Pause main button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updatePlayUI(true);
    } else {
        audioElement.pause();
        updatePlayUI(false);
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    let current = formatTime(audioElement.currentTime);
    let total = formatTime(audioElement.duration);
    timeStamp.innerText = `${current} / ${total}`;
});

// Seek
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Format time helper
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

// Update play/pause button and gif
function updatePlayUI(isPlaying) {
    if (isPlaying) {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}

// Song item click
document.querySelectorAll('.songitem').forEach((item) => {
    item.addEventListener('click', (e) => {
        currentSongIndex = parseInt(item.getAttribute('data-index'));
        audioElement.src = songs[currentSongIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        updatePlayUI(true);
    });
});
let nextBtn = document.getElementById('next');

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // loop back to first song
    audioElement.src = songs[currentSongIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    
    currentSongName.innerText = `${songs[currentSongIndex].name} - ${songs[currentSongIndex].artist}`;
});

let prevBtn = document.getElementById('prev');

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // go back, loop if first song
    audioElement.src = songs[currentSongIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    
    currentSongName.innerText = `${songs[currentSongIndex].name} - ${songs[currentSongIndex].artist}`;
});
