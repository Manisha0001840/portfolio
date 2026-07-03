const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const revealElements = document.querySelectorAll('.reveal');
const loader = document.getElementById('loader');
const typeText = document.getElementById('typeText');
const contactForm = document.getElementById('contactForm');
const formNotice = document.getElementById('formNotice');

const heroData = {
  name: 'Manisha Kanwar',
  role: 'Computer Science Engineering Student | AI & Machine Learning Enthusiast',
  description: 'Passionate about creating intelligent, scalable applications in AI, computer vision, and full-stack development to solve real-world problems.',
  badge: 'Available for Internships & Software Engineering Roles',
  cardLabels: [
    'Computer Science Student',
    'Aspiring Software Engineer',
    'AI & Machine Learning Engineer',
    'Computer Vision Developer',
    'Full-Stack Developer',
    'Open Source Learner',
    'Tech Explorer',
    'Problem Solver'
  ],
  highlights: [
    'Computer Science Student',
    'Aspiring Software Engineer',
    'AI & Machine Learning Enthusiast',
    'Computer Vision Developer',
    'Full-Stack Developer',
    'Open Source Learner',
    'Tech Explorer',
    'Problem Solver'
  ],
  actions: [
    { text: 'View Projects', href: '#projects', type: 'primary' }
  ],
  socials: {
    email: 'sevawatmanisha0001@gmail.com',
    github: 'https://github.com/Manisha0001840',
    linkedin: 'https://www.linkedin.com/in/manisha-kanwar0001'
  }
};

const heroCardBadge = document.querySelector('.hero-card .hero-badge');
const typePhrases = heroData.highlights;
let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;

function renderHero() {
  const heroTitle = document.querySelector('.hero-title');
  const heroDescription = document.querySelector('.hero-description');
  const heroBadge = document.querySelector('.hero-badge');
  const heroActions = document.getElementById('heroActions');
  const emailLink = document.getElementById('heroEmailLink');
  const githubLink = document.getElementById('heroGitHubLink');
  const linkedinLink = document.getElementById('heroLinkedInLink');

  if (heroTitle) heroTitle.textContent = heroData.role;
  if (heroDescription) heroDescription.textContent = heroData.description;
  if (heroBadge) heroBadge.textContent = heroData.badge;
  if (heroCardBadge) heroCardBadge.textContent = heroData.cardLabels[0] || heroData.highlights[0] || heroData.badge;

  if (heroActions) {
    heroActions.innerHTML = heroData.actions
      .map(
        (action) => `<a href="${action.href}" class="button ${action.type}" aria-label="${action.text}">${action.text}</a>`
      )
      .join('');
  }

  if (emailLink) emailLink.href = `mailto:${heroData.socials.email}`;
  if (githubLink) githubLink.href = heroData.socials.github;
  if (linkedinLink) linkedinLink.href = heroData.socials.linkedin;
}

function updateHeroCardBadge() {
  if (heroCardBadge) {
    heroCardBadge.textContent = heroData.cardLabels[typeIndex] || heroData.highlights[typeIndex] || heroData.badge;
  }
}

function typeEffect() {
  if (!typeText) return;

  const currentPhrase = typePhrases[typeIndex];

  if (isDeleting) {
    if (charIndex > 0) {
      charIndex -= 1;
      typeText.textContent = currentPhrase.slice(0, charIndex);
      setTimeout(typeEffect, 40);
      return;
    }

    isDeleting = false;
    typeIndex = (typeIndex + 1) % typePhrases.length;
    updateHeroCardBadge();
    setTimeout(typeEffect, 700);
    return;
  }

  if (charIndex < currentPhrase.length) {
    charIndex += 1;
    typeText.textContent = currentPhrase.slice(0, charIndex);
    setTimeout(typeEffect, 90);
    return;
  }

  isDeleting = true;
  setTimeout(typeEffect, 1300);
}

function startHeroTyping() {
  if (typeText) typeText.textContent = '';
  charIndex = 0;
  isDeleting = false;
  updateHeroCardBadge();
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
	renderHero();
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
