//FLIPBOOK

const html = document.documentElement;
const phonecanvas = document.getElementById("lbwcanvas");
const phonecontext = phonecanvas.getContext("2d");

//get frame
const frameCount = 231;
const currentFrame = index => (
  `https://raw.githubusercontent.com/nizikai/Nico-v2/master/Resources/Web/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
}; //download all frame first

const img = new Image()
img.src = currentFrame(1);
phonecanvas.width=1920;
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