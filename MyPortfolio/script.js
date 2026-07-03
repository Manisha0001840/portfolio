const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const revealElements = document.querySelectorAll('.reveal');
const loader = document.getElementById('loader');
const typeText = document.getElementById('typeText');
const contactForm = document.getElementById('contactForm');
const formNotice = document.getElementById('formNotice');
const heroName = document.getElementById('heroName');
const heroTitle = document.getElementById('heroTitle');
const heroSummary = document.getElementById('heroSummary');
const heroBadge = document.getElementById('heroBadge');
const heroActions = document.getElementById('heroActions');
const heroEmail = document.getElementById('heroEmail');
const heroGithub = document.getElementById('heroGithub');
const heroLinkedIn = document.getElementById('heroLinkedIn');
const heroCardBadge = document.getElementById('heroCardBadge');
const heroCardDescription = document.getElementById('heroCardDescription');

const heroData = {
	name: 'Manisha Kanwar',
	title: 'Software Engineer | AI & Machine Learning Engineer',
	summary: 'I am a Computer Science Engineering student passionate about Artificial Intelligence, Machine Learning, Computer Vision, and Full-Stack Development. I enjoy creating scalable software, AI-powered applications, and impactful projects while continuously learning emerging technologies.',
	badge: 'Available for Internships & Software Engineering Roles',
	cardBadge: 'AI & ML Engineer',
	cardDescription: 'Applying practical AI, computer vision, and software engineering to deliver robust, maintainable solutions.',
	heroCardLabels: [
		'Computer Science Student',
		'Aspiring Software Engineer',
		'AI & Machine Learning Engineer',
		'Computer Vision Developer',
		'Full-Stack Developer',
		'Open Source Learner',
		'Tech Explorer',
		'Problem Solver'
	],
	dynamicHighlights: [
		'Computer Science Student',
		'Aspiring Software Engineer',
		'AI & Machine Learning Enthusiast',
		'Computer Vision Developer',
		'Full-Stack Developer',
		'Open Source Learner',
		'Tech Explorer',
		'Problem Solver'
	],
	buttons: [
		{ text: 'View Projects', href: '#projects', type: 'primary' }
	],
	socialLinks: {
		email: 'sevawatmanisha0001@gmail.com',
		github: 'https://github.com/Manisha0001840',
		linkedin: 'https://www.linkedin.com/in/manisha-kanwar0001'
	}
};

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function renderHeroContent() {
	if (heroName) heroName.textContent = heroData.name;
	if (heroTitle) heroTitle.textContent = heroData.title;
	if (heroSummary) heroSummary.textContent = heroData.summary;
	if (heroBadge) heroBadge.textContent = heroData.badge;
	if (heroCardBadge) heroCardBadge.textContent = heroData.heroCardLabels[0] || heroData.cardBadge;
	if (heroCardDescription) heroCardDescription.textContent = heroData.cardDescription;

	if (heroActions) {
		heroActions.innerHTML = heroData.buttons
			.map((button) => `<a href="${button.href}" class="button ${button.type}">${button.text}</a>`)
			.join('');
	}

	if (heroEmail) heroEmail.href = `mailto:${heroData.socialLinks.email}`;
	if (heroGithub) heroGithub.href = heroData.socialLinks.github;
	if (heroLinkedIn) heroLinkedIn.href = heroData.socialLinks.linkedin;

}

function updateHeroCardBadge() {
	if (heroCardBadge) {
		heroCardBadge.textContent = heroData.heroCardLabels[typeIndex] || heroData.dynamicHighlights[typeIndex] || heroData.cardBadge;
	}
}

function typeEffect() {
	if (!typeText) return;

	const currentPhrase = heroData.dynamicHighlights[typeIndex];

	if (isDeleting) {
		if (charIndex > 0) {
			charIndex -= 1;
			typeText.textContent = currentPhrase.slice(0, charIndex);
			typeTimeout = setTimeout(typeEffect, 40);
			return;
		}

		isDeleting = false;
		typeIndex = (typeIndex + 1) % heroData.dynamicHighlights.length;
		updateHeroCardBadge();
		typeTimeout = setTimeout(typeEffect, 700);
		return;
	}

	if (charIndex < currentPhrase.length) {
		charIndex += 1;
		typeText.textContent = currentPhrase.slice(0, charIndex);
		typeTimeout = setTimeout(typeEffect, 90);
		return;
	}

	isDeleting = true;
	typeTimeout = setTimeout(typeEffect, 1300);
}

function startHeroTyping() {
	if (typeTimeout) {
		clearTimeout(typeTimeout);
	}
	charIndex = 0;
	isDeleting = false;
	updateHeroCardBadge();
	if (typeText) typeText.textContent = '';
	typeEffect();
}

function toggleNav() {
	const isOpen = siteNav.classList.toggle('open');
	navToggle.setAttribute('aria-expanded', isOpen);
}

function closeNavOnLink() {
	siteNav.classList.remove('open');

	navToggle.setAttribute('aria-expanded', 'false');
}

function highlightNav() {
	const scrollPosition = window.scrollY + window.innerHeight / 2;
	navLinks.forEach((link) => {
		const section = document.querySelector(link.hash);
		if (!section) return;
		const sectionTop = section.offsetTop;
		const sectionBottom = sectionTop + section.offsetHeight;
		if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
			link.classList.add('active');
		} else {
			link.classList.remove('active');
		}
	});
}

function revealOnScroll() {
	revealElements.forEach((element) => {
		const elementTop = element.getBoundingClientRect().top;
		if (elementTop < window.innerHeight - 80) {
			element.classList.add('visible');
		}
	});
}

function toggleBackToTop() {
	if (window.scrollY > 450) {
		backToTop.classList.add('visible');
	} else {
		backToTop.classList.remove('visible');
	}
}

function handleFormSubmit(event) {
	event.preventDefault();
	if (formNotice) formNotice.textContent = 'Thanks — I will get back to you soon.';
	contactForm.reset();
}

window.addEventListener('DOMContentLoaded', () => {
	renderHeroContent();
	startHeroTyping();
	revealOnScroll();
	highlightNav();
	setTimeout(() => loader && loader.classList.add('hidden'), 600);
});

window.addEventListener('scroll', () => {
	revealOnScroll();
	highlightNav();
	toggleBackToTop();
});

navToggle && navToggle.addEventListener('click', toggleNav);
navLinks.forEach((link) => {
	link.addEventListener('click', closeNavOnLink);
});
contactForm && contactForm.addEventListener('submit', handleFormSubmit);
