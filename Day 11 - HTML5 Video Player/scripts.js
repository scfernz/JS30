/* Elements */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Functions
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseInt(this.dataset.skip, 10);
}

function updateRange() {
  video[this.name] = this.value;
}

function updateProgress() {
  const currentProgress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${currentProgress}%`;
}

function progressClick(e) {
  const skipToTime = (e.offsetX / progress.offsetWidth) * video.duration;
  console.log(skipToTime);
  video.currentTime = skipToTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));

progress.addEventListener('click', progressClick);
