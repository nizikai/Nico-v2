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

const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 148;
const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=1158;
canvas.height=770;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()
