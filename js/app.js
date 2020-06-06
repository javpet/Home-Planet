// Story
storyTimeline = gsap.timeline();

gsap.set("section.house", {opacity: 0});
gsap.set("section.scene", {opacity: 0});
gsap.set("section.scene img", {
  x: index => {
    return index * 50 + 200 + "vh";
  }
});

storyTimeline
  .to("header", {opacity: 0, delay: 3})
  .addLabel("startScene")
  .to("section.scene", {opacity: 1}, "startScene")
  .to(
    "section.scene img",
    {x: "0vh", duration: 10, ease: "linear"},
    "startScene"
  )
  .to("section.scene", {opacity: 0})
  .to("section.house", {opacity: 1});

storyTimeline.pause();

let update;

window.addEventListener("scroll", function() {
  const pixels = window.pageYOffset;
  const currentTime = pixels / 400;

  cancelAnimationFrame(update);

  update = requestAnimationFrame(function() {
    storyTimeline.seek(currentTime);
  });
});

// Eyes movement
const eyesTimeline = gsap.timeline({
  repeat: -1
});

const eyeballs = document.querySelectorAll(
  "path#ball, path#ball_2, path#ball_3, path#ball_4, path#ball_5, path#ball_6"
);

eyesTimeline
  .set(eyeballs, {y: 0})
  .to(eyeballs, {y: 7, duration: 0.25, delay: 2, stagger: 0.25})
  .to(eyeballs, {y: 0, duration: 0.25, delay: 4});

// Hat movement
const hatTimeline = gsap.timeline({
  repeat: -1,
  repeatDelay: 4
});

const hat = document.querySelector("g#hat");

hatTimeline
  .set(hat, {y: 0})
  .to(hat, {y: -50, rotation: -10, duration: 0.25, delay: 1})
  .to(hat, {y: 0, rotation: 0, duration: 0.5, delay: 0.1});

// Arms movement
const armTimeline = gsap.timeline({
  repeat: -1,
  repeatDelay: 6
});

const leftArm = document.querySelector("g#left-arm");
const rightArm = document.querySelector("g#right-arm");

armTimeline
  .set(leftArm, {rotation: 0})
  .to(leftArm, {rotation: -35, duration: 0.5, delay: 2})
  .to(leftArm, {rotation: 0, duration: 0.5, delay: 2});

armTimeline
  .set(rightArm, {rotation: 0})
  .to(rightArm, {rotation: -35, duration: 0.5, delay: 6})
  .to(rightArm, {rotation: 0, duration: 0.5, delay: 6});

// Flickering TV

const tvTimeline = gsap.timeline({
  repeat: -1
});

const tvLight = document.querySelector("#tv-light");

tvTimeline
  .set(tvLight, {opacity: 0.75})
  .to(tvLight, {opacity: 1, duration: 1, delay: 0.5})
  .to(tvLight, {opacity: 0.75})
  .to(tvLight, {opacity: 1, duration: 0.4, delay: 0.5})
  .to(tvLight, {opacity: 0.75});

// Label
const label = document.querySelector("div.label");
const links = document.querySelectorAll("svg a");

links.forEach(link => {
  link.addEventListener("mouseenter", function() {
    label.classList.add("is-visible");
    label.innerHTML = link.getAttribute("data-label");

    gsap.to(links, {opacity: 0.25});
    gsap.to(link, {opacity: 1});
  });

  link.addEventListener("mouseleave", function() {
    label.classList.remove("is-visible");
    gsap.to(links, {opacity: 1});
  });
});

document.addEventListener("mousemove", function(event) {
  label.style.left = `${event.clientX}px`;
  label.style.top = `${event.clientY}px`;
});
