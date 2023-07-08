let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'data:image/jpeg;base64,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 ',
        name : 'Stay',
        artist : 'The Kid LAROI, Justin Bieber',
        music : 'music/stay.mp3'
    },
    {
        img : 'https://i1.sndcdn.com/avatars-000509807946-rc4ujh-t240x240.jpg',
        name : 'Falling Down',
        artist : 'Wid Cards',
        music : 'music/fallingdown.mp3'
    },
    {
        img : 'https://weraveyou.com/wp-content/uploads/2021/08/194375249_193877225935175_5388180865268808571_n.jpg',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'music/Faded.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/W4ZW3lzFoOI/maxresdefault.jpg',
        name : 'Rather Be',
        artist : 'Clean Bandit',
        music : 'music/Rather Be.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
