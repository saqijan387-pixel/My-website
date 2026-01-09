document.addEventListener('DOMContentLoaded', () => {
	// Animate skills bars on scroll
	const skillBars = document.querySelectorAll('.skill-bar > div');
	skillBars.forEach(bar => {
		const width = bar.style.width;
		bar.style.setProperty('--bar-width', width);
		bar.style.width = '0';
	});
	const skillsSection = document.getElementById('skills');
	let skillsAnimated = false;
	function animateSkills() {
		if (!skillsAnimated && skillsSection.getBoundingClientRect().top < window.innerHeight - 80) {
			skillBars.forEach(bar => {
				bar.style.width = bar.style.getPropertyValue('--bar-width');
			});
			skillsAnimated = true;
		}
	}
	window.addEventListener('scroll', animateSkills);
	animateSkills();

	// Reveal projects on scroll
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('revealed');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	document.querySelectorAll('.project[data-reveal]').forEach(el => observer.observe(el));

	// Optionally: Animate background shapes (parallax)
	document.addEventListener('mousemove', e => {
		const x = e.clientX / window.innerWidth;
		const y = e.clientY / window.innerHeight;
		document.querySelectorAll('.bg-shape').forEach((shape, i) => {
			shape.style.transform = `translate(${(x-0.5)*40*(i+1)}px, ${(y-0.5)*40*(i+1)}px)`;
		});
	});

	// ...existing code...
});
document.addEventListener('DOMContentLoaded', () => {
	// Smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', (e) => {
			const href = a.getAttribute('href');
			if (href.length > 1) {
				e.preventDefault();
				document.querySelector(href)?.scrollIntoView({behavior: 'smooth'});
			}
		});
	});

	// Theme toggle (simple dark data-attr)
	const themeToggle = document.getElementById('themeToggle');
	const root = document.documentElement;
	const saved = localStorage.getItem('theme');
	if (saved === 'dark') root.setAttribute('data-theme','dark');
	themeToggle?.addEventListener('click', () => {
		const current = root.getAttribute('data-theme');
		if (current === 'dark'){
			root.removeAttribute('data-theme');
			localStorage.removeItem('theme');
			themeToggle.textContent = '🌙';
		} else {
			root.setAttribute('data-theme','dark');
			localStorage.setItem('theme','dark');
			themeToggle.textContent = '☀️';
		}
	});

	// Project filtering
	const filters = document.querySelectorAll('.filter');
	const projects = document.querySelectorAll('.project');
	filters.forEach(f => f.addEventListener('click', () => {
		filters.forEach(x=>x.classList.remove('active'));
		f.classList.add('active');
		const filter = f.dataset.filter;
		projects.forEach(p=>{
			if (filter === 'all' || p.dataset.type === filter) p.style.display = '';
			else p.style.display = 'none';
		});
	}));

	// Project modal (dynamic content)
	const projectModal = document.getElementById('projectModal');
	const projTitle = document.getElementById('projTitle');
	const projDesc = document.getElementById('projDesc');
	const projTech = document.getElementById('projTech');
	const projClose = document.getElementById('projClose');
	const projCloseBtn = projectModal?.querySelector('.modal-close');
	let lastFocus = null;

	function openProjectModal(data){
		lastFocus = document.activeElement;
		projTitle.textContent = data.title || 'Project';
		projDesc.textContent = data.desc || '';
		projTech.textContent = data.tech ? 'Tech: ' + data.tech.join(', ') : '';
		projectModal?.setAttribute('aria-hidden','false');
		document.body.style.overflow = 'hidden';
		projClose?.focus();
	}
	function closeProjectModal(){
		projectModal?.setAttribute('aria-hidden','true');
		document.body.style.overflow = ''; if (lastFocus) lastFocus.focus();
	}
	document.querySelectorAll('.project .btn').forEach(btn => {
		btn.addEventListener('click', ()=>{
			const raw = btn.dataset.project;
			try{ const data = JSON.parse(raw); openProjectModal(data);}catch(e){openProjectModal({title:'Project', desc:'No data'})}
		});
	});
	projClose?.addEventListener('click', closeProjectModal);
	projCloseBtn?.addEventListener('click', closeProjectModal);
	projectModal?.addEventListener('click', (e)=>{ if (e.target === projectModal) closeProjectModal(); });
	document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && projectModal?.getAttribute('aria-hidden') === 'false') closeProjectModal(); });

	// Floating action button (scroll to top)
	const fab = document.getElementById('fab');
	fab?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

	// Contact form
	const form = document.getElementById('contactForm');
	form?.addEventListener('submit', (e)=>{
		e.preventDefault();
		const name = document.getElementById('name')?.value.trim();
		const email = document.getElementById('email')?.value.trim();
		const message = document.getElementById('message')?.value.trim();
		if (!name || !email || !message) { showToast('Please complete all fields'); return; }
		showToast('Thanks — I will reach out soon!');
		form.reset();
	});

	// Resume download (demo behaviour)
	document.getElementById('downloadResume')?.addEventListener('click',(e)=>{
		e.preventDefault();
		showToast('Resume download starting...');
		window.open('https://example.com/resume.pdf','_blank');
	});

	// Toast utility
	const toastEl = document.getElementById('toast');
	let toastTimeout = null;
	function showToast(text, ms = 2200){
		toastEl.textContent = text; toastEl.classList.add('show'); clearTimeout(toastTimeout);
		toastTimeout = setTimeout(()=> toastEl.classList.remove('show'), ms);
	}

	// Scroll reveal
	const observer = new IntersectionObserver(entries=>{
		entries.forEach(entry=>{ if (entry.isIntersecting){ entry.target.classList.add('revealed'); observer.unobserve(entry.target); } });
	},{threshold:0.12});
	document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));

});

