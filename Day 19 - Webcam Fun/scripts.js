const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
var red = false;
var splitter = false;

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((localMediaStream) => {
    console.log(localMediaStream);
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  })
  .catch((error) => {
    console.error('Please allow access to your webcam', error);
  });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // Get the pixels, run effects
    if (red == true) {
      pixels = redEffect(pixels);
    }
    if (splitter == true) {
      pixels = rgbSplit(pixels);
    }
    // Put it back into the canvas element
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // play sound
  snap.currentTime = 0;
  snap.play();
  // take data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src=${data} alt="handsome photo"/>`;
  strip.insertBefore(link, strip.firstChild);
}

function toggleRed() {
  red = !red;
}

function toggleSplitter() {
  splitter = !splitter;
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = pixels.data[i] + 100; // red
    pixels.data[i+1] = pixels.data[i+1] * 0.5; // green
    pixels.data[i+2] = pixels.data[i+2] * 0.5; // blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 100] = pixels.data[i]; // red
    pixels.data[i + 200] = pixels.data[i+1]; // green
    pixels.data[i - 200] = pixels.data[i+2]; // blue
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
