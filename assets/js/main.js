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

const modalBtns=document.querySelectorAll('.services__button');

	modalBtns.forEach((modalBtn,i) =>
	modalBtn.addEventListener('click', (e) => {
		const buttonId= e.currentTarget.getAttribute('id')
		const modal=document.querySelector('.'+buttonId)
		modal.classList.add('active-modal');
		
		const modalClose= modal.querySelector('.services__modal-close')
		modalClose.addEventListener('click', (e) => {
			modal.classList.remove('active-modal');
		})
		
		const modalActive=document.querySelector('.active-modal')

		document.addEventListener('keyup',(e)=>{
			if (modalActive && e.key === 'Escape') {
				modal.classList.remove('active-modal');
			}

		})
	})
)
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
	const scrollY = window.pageYOffset;

	sections.forEach((section) => {
		const sectionHeight = section.offsetHeight,
			sectionTop = section.offsetTop - 100,
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

/*==================== Send message ====================*/
//select the form
const form = document.querySelector('form')
//select the form error container to display the message
const statusTxt= form.querySelector('.form-erreur')


form.onsubmit= (e)=>{
    e.preventDefault()
    //execute the google recaptcha with site key (here demo)a
    grecaptcha.ready(function() {
        grecaptcha.execute('6LeJxdMjAAAAAFboYB3Clr3E34JseM2ZAwvYFfKL', {action: 'contact'}).then(function(token) {
            console.log('hello')
            console.log(token)
            let recaptchaResponse = document.getElementById("recaptchaResponse")
            recaptchaResponse.value = token // Set the recaptcha response
			
    //display the error message block and message
    statusTxt.style.display ="block"
    statusTxt.innerText="Envoi du message ..."
console.log('ici')	
// creating new xml object
let xhr = new XMLHttpRequest()

// sending post request to message.php
xhr.open("POST","assets/php/message.php",true)
//once ajax loaded
xhr.onload =()=>{
    // if ajxa ok (status 200 ok and readystate 4)
    if(xhr.readyState ==4 && xhr.status == 200){
        
        //storing ajax response
        let response = xhr.response
        //display the response from the message.php file
        statusTxt.innerText=response

        //change the color of the error message in red if error
        if(response.indexOf('Veuillez rentrer votre numéro sous la forme 0123456789')!= -1 ||response.indexOf('veuillez remplir un email valide')!= -1 ||response.indexOf('Vous devez remplir les champs *') !=-1||response.indexOf("Désolé l'email n'a pas pu être envoyé. Veuillez réessayer plus tard") !=-1 ){
            statusTxt.style.color='red'
        //change the color of the error message in blue if no error
        }else if(response.indexOf("L'email a bien été envoyé.")!= -1){
            statusTxt.style.color='Blue'
            form.reset()
           
        }
        
    }
}

let formData = new FormData(form)
xhr.send(formData)
    });
      });
    }