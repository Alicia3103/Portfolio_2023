/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
	navToggle = document.getElementById('nav-toggle'),
	navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
	navToggle.addEventListener('click', () => {
		navMenu.classList.add('show-menu');
	})
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
	navClose.addEventListener('click', () => {
		navMenu.classList.remove('show-menu');
	})
}

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
	// when click on each nav__link we remove the show-menu class
	navMenu.classList.remove('show-menu');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
	tabContents = document.querySelectorAll('[data-content]');
tabs.forEach((tab) => {
	tab.addEventListener('click', () => {
		const target = document.querySelector(tab.dataset.target);
		tabContents.forEach((tabContent) => {
			tabContent.classList.remove('qualification__active');
		})
		target.classList.add('qualification__active');
		tabs.forEach((tab) => {
			tab.classList.remove('qualification__active');
		})
		tab.classList.add('qualification__active');
	})
})

/*==================== SERVICES MODAL ====================*/


/*==================== TESTIMONIAL ====================*/

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
	const scrollY = window.pageYOffset;

	sections.forEach((section) => {
		const sectionHeight = section.offsetHeight,
			sectionTop = section.offsetTop - 50,
			sectionId = section.getAttribute('id'),
			sectionsClass = document.querySelector(
				'.nav__menu a[href*=' + sectionId + ']'
			);

		if (
			sectionsClass &&
			scrollY > sectionTop &&
			scrollY <= sectionTop + sectionHeight
		) {
			sectionsClass.classList.add('active-link');
		} else if (sectionsClass) {
			sectionsClass.classList.remove('active-link');
		}
	})
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
	const nav = document.getElementById('header');
	// when the scroll is more than 80 height
	if (this.scrollY >= 80) {
		nav.classList.add('scroll-header');
	} else {
		nav.classList.remove('scroll-header');
	}
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
    function scrollTop(){
        const scrollUp=document.getElementById('scroll-up');
        //when the scroll is more than 500, adde the scroll-up class
        if (this.scrollY >= 500) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    }
    window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/
