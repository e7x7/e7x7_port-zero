//import { gsap } from "gsap";
const menuBtn = document.querySelector(".menu-div");
const exitBtn = document.querySelector(".exit");
const nextBtn = document.querySelector("#whatsnext");

let t1 = gsap.timeline({ paused: true });

t1.to(".menu", { opacity: 1, duration: 1.05, top: 0, ease: Power2.easeInOut });
t1.to(
	".nav",
	{
		opacity: 0.77,
		marginBottom: 0,
		duration: 1,
		ease: Power2.easeInOut,
		stagger: 0.1,
	},
	">-0.5"
);

menuBtn.addEventListener("click", () => {
	t1.play().timeScale(1);
});
nextBtn.addEventListener("click", () => {
	t1.play().timeScale(1);
});

exitBtn.addEventListener("click", () => {
	t1.timeScale(2.0);
	t1.reverse();
});