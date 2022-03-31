// //phone video get
// const phone = document.querySelector(".phone");
// const video = phone.querySelector("video");

// //phone video animatation
// const controller = new ScrollMagic.Controller();
// let scene = new ScrollMagic.Scene({
//   duration: 5000,
//   triggerElement: phone,
//   triggerHook: 0
// })
//   .addIndicators() //DEBUG TRIGGER AND END
//   .setPin(phone) // pinned phone video until xxxx duration
//   .addTo(controller);

// //animation mechanics and its delay
// let moveamount = 0.5; //how long it move down after user stop scrolling 
// let scrollpos = 0;
// let delay = 0;

// scene.on("update", e => {
//   scrollpos = e.scrollPos / 1000; //divided by 1000 to get value in seconds 3000/1000 = 3 sec
// });

// setInterval(() => {
//   delay += (scrollpos - delay) * moveamount;
//   console.log(scrollpos, delay);

//   video.currentTime = delay;
// }, 60);



//FLIPBOOK

const html = document.documentElement;
const phonecanvas = document.getElementById("phonecanvas");
const phonecontext = phonecanvas.getContext("2d");

//get frame
const frameCount = 160;
const currentFrame = index => (
  `https://raw.githubusercontent.com/nizikai/Nico-v2/master/Resources/Phone/${index.toString().padStart(4, '0')}.jpg`
  // `https://nicoprasetyo.me/Resources/Phone/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
}; //download all frame first

const img = new Image()
img.src = currentFrame(1);
phonecanvas.width=2340;
phonecanvas.height=1080;
img.onload=function(){
  phonecontext.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight; //max scroll or end
  const scrollFraction = scrollTop / maxScrollTop; //scroll progress
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  ); //not allowing to scroll exceeds frame amount
  
  requestAnimationFrame(() => updateImage(frameIndex + 1)) //allows smooth animation and +1 bcs calculation starts from 0
});

const updateImage = index => {
  img.src = currentFrame(index);
  phonecontext.drawImage(img, 0, 0);
}

preloadImages()
