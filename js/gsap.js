import gsap from 'gsap'

const menuBtn = document.querySelector(".menu-div");
const exitBtn = document.querySelector(".exit");
const nextBtn = document.querySelector("#myprojects");
const cont1 = document.querySelector('.container1')
const cont2 = document.querySelector('.container2')
const cont3 = document.querySelector('.container3')
const home = document.querySelector('.home')


let t1 = gsap.timeline({ paused: true });

t1.to(".menu", { opacity: 1, duration: 1.26, top: 0, ease: Power2.easeInOut });
t1.to(
	".nav",
	{
		opacity: 1,
		marginBottom: 0,
		duration: 1,
		ease: Power2.easeInOut,
		stagger: 0.14,
	},
	//".container2", { display: none },
	">-0.63"
);

menuBtn.addEventListener("click", () => {
	t1.play().timeScale(1);
	//cont1.style.setProperty("opacity", '0.7')

	//cont2.style.opacity = '0'
	//cont2.style.backgroundColor = '#7fffff00'


	cont3.style.opacity = '0'
	home.style.opacity = '0'
	cont2.style.display = 'none'
});
nextBtn.addEventListener("click", () => {
	t1.play().timeScale(1);
	//cont1.style.opacity = '0.7'

	//cont2.style.opacity = '0'
	//cont2.style.backgroundColor = '#7fffff00'

	cont3.style.opacity = '0'
	home.style.opacity = '0'
	cont2.style.display = 'none'
});

exitBtn.addEventListener("click", () => {
	t1.timeScale(2.0);
	t1.reverse();
	//cont1.style.opacity = '1'

	//cont2.style.opacity = '1'
	//cont2.style.backgroundColor = '#1e3136'
	cont3.style.opacity = '1'
	home.style.opacity = '1'
	cont2.style.display = 'block'
});