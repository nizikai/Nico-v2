//phone video get
const phone = document.querySelector(".phone");
const video = phone.querySelector("video");

//phone video animatation
const controller = new ScrollMagic.Controller();
let scene = new ScrollMagic.Scene({
  duration: 5000,
  triggerElement: phone,
  triggerHook: 0
})
  .addIndicators() //DEBUG TRIGGER AND END
  .setPin(phone) // pinned phone video until xxxx duration
  .addTo(controller);

//animation mechanics and its delay
let moveamount = 0.5; //how long it move down after user stop scrolling 
let scrollpos = 0;
let delay = 0;

scene.on("update", e => {
  scrollpos = e.scrollPos / 1000; //divided by 1000 to get value in seconds 3000/1000 = 3 sec
});

setInterval(() => {
  delay += (scrollpos - delay) * moveamount;
  console.log(scrollpos, delay);

  video.currentTime = delay;
}, 45);
