 // Data
        const carouselData = [
        
            {
                title: "Talleres creativos para jóvenes",
                subtitle: "Desarrolla tu potencial con nuestros programas educativos.",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
            },
            {
                title: "Conecta con tu comunidad",
                subtitle: "Forma parte de una red de jóvenes emprendedores.",
                image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
            }
        ];

        const talleresData = [
            { title: "Taller: Propuesta de Valor", desc: "Aprende a construir propuestas que conecten con tu comunidad y proyectos.", img: "img/propuestasDevalor.png" },
            { title: "Taller: Conversación en Inglés", desc: "Práctica de conversación enfocada en situaciones reales y fluidez.", img: "img/clases de ingles.png" },
            { title: "Taller: Competencia Matemática (PAES)", desc: "Refuerzo de conceptos y estrategias para enfrentar la prueba con confianza.", img: "img/tallerPaes.png" },
            { title: "Taller: Historia y Ciencias Sociales", desc: "Preparación interactiva en contenidos históricos y sociales para jóvenes.", img: "img/historiaYciancias.png" }
        ];

        // Carousel Module - combine hero static title as first slide with carouselData
        const carousel = {
            current: 0,
            interval: null,
            slides: [],

            init() {
                const container = document.getElementById('carouselSlides');
                const controls = document.getElementById('carouselControls');

                
                const heroTitleEl = document.getElementById('heroTitle');
                const heroSubtitleEl = document.getElementById('heroSubtitle');
                if (heroTitleEl) {
                    this.slides.push({
                        title: heroTitleEl.textContent.trim(),
                        subtitle: heroSubtitleEl ? heroSubtitleEl.textContent.trim() : '',
                      
                        image: (carouselData[0] && carouselData[0].image && carouselData[0].image.indexOf('1552664730') === -1)
                            ? carouselData[0].image
                            : ( (true) ? 'img/imagenPrincipal .png' : 'img/hero.png' )
                    });
                }

                // Append the rest from carouselData
                carouselData.forEach(s => this.slides.push({ title: s.title, subtitle: s.subtitle, image: s.image }));

                // Render slides and dots from combined list
                this.slides.forEach((slide, i) => {
                    const div = document.createElement('div');
                    div.className = `carousel-slide ${i === 0 ? 'active' : ''}`;
                    div.innerHTML = `<img src="${slide.image}" alt="${slide.title}">`;
                    container.appendChild(div);

                    const dot = document.createElement('div');
                    dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
                    dot.onclick = () => this.goTo(i);
                    controls.appendChild(dot);
                });

                // Event listeners para botones de navegación
                const prevBtn = document.querySelector('.carousel-nav.prev');
                const nextBtn = document.querySelector('.carousel-nav.next');
                if (prevBtn) prevBtn.addEventListener('click', () => this.change(-1));
                if (nextBtn) nextBtn.addEventListener('click', () => this.change(1));

                // Initialize displayed text according to the first slide
                this.updateText();

                this.start();
            },

            change(dir) {
                const slides = document.querySelectorAll('.carousel-slide');
                const dots = document.querySelectorAll('.carousel-dot');

                slides[this.current].classList.remove('active');
                dots[this.current].classList.remove('active');

                this.current = (this.current + dir + this.slides.length) % this.slides.length;

                slides[this.current].classList.add('active');
                dots[this.current].classList.add('active');

                this.updateText();
                this.reset();
            },

            goTo(index) {
                const slides = document.querySelectorAll('.carousel-slide');
                const dots = document.querySelectorAll('.carousel-dot');

                slides[this.current].classList.remove('active');
                dots[this.current].classList.remove('active');

                this.current = index;

                slides[this.current].classList.add('active');
                dots[this.current].classList.add('active');

                this.updateText();
                this.reset();
            },

            updateText() {
                // Update subtitle always from combined slides
                const subtitleEl = document.getElementById('heroSubtitle');
                if (subtitleEl && this.slides[this.current]) subtitleEl.textContent = this.slides[this.current].subtitle;

                const titleEl = document.getElementById('heroTitle');
                if (titleEl && this.slides[this.current]) {
                    const slideTitle = this.slides[this.current].title || '';
                    const preservePhrase = 'Impulsamos la participación';
                    if (slideTitle.includes(preservePhrase)) {
                        titleEl.textContent = preservePhrase;
                    } else {
                        titleEl.textContent = slideTitle;
                    }
                }
            },

            start() {
                this.interval = setInterval(() => this.change(1), 5000);
            },

            reset() {
                clearInterval(this.interval);
                this.start();
            }
        };

        // Render Talleres
        function renderTalleres() {
            const container = document.getElementById('talleresContainer');
            talleresData.forEach(taller => {
                const col = document.createElement('div');
                col.className = 'col-md-6 col-lg-3';
                col.innerHTML = `
                    <div class="taller-card">
                        <div class="taller-image">
                            <img src="${taller.img}" alt="${taller.title}">
                        </div>
                        <div class="taller-body">
                            <div>
                                <h3 class="taller-title">${taller.title}</h3>
                                <p class="taller-desc">${taller.desc}</p>
                            </div>
                                        <button class="btn btn-mas-info">Más información</button>
                        </div>
                    </div>
                `;
                container.appendChild(col);
            });
        }

// Noticias data (for modal and controls)
const noticiasData = [
    { title: 'Participación juvenil en talleres comunitarios', excerpt: 'El 18 de octubre tuvimos una jornada de formación y diálogo con jóvenes de distintos barrios.', meta: 'Santiago • 18 Oct', img: 'img/18oct.png', body: 'El 18 de octubre se realizó una jornada de formación y diálogo con jóvenes de distintos barrios. Allí se compartieron experiencias y se realizaron actividades participativas.' },
    { title: 'Nuevas iniciativas culturales', excerpt: 'El 21 de octubre se presentaron proyectos culturales impulsados por estudiantes locales.', meta: 'Santiago • 21 Oct', img: 'img/21oct.png', body: 'El 21 de octubre se presentaron proyectos culturales impulsados por estudiantes locales. Hubo muestras artísticas y talleres abiertos.' },
    { title: 'Encuentros de educación popular', excerpt: 'El 22 de octubre se realizó un encuentro para compartir metodologías y experiencias educativas.', meta: 'Santiago • 22 Oct', img: 'img/22otc.png', body: 'En el encuentro del 22 de octubre se compartieron metodologías y experiencias en educación popular, con mesas de trabajo y diálogos.' },
    { title: 'Talleres y participación ciudadana', excerpt: 'El 23 de octubre se realizaron talleres de formación en liderazgo juvenil.', meta: 'Santiago • 23 Oct', img: 'img/23oct.png', body: 'Los talleres del 23 de octubre se enfocaron en liderazgo juvenil y participación ciudadana, con dinámicas prácticas y orientación para proyectos locales.' }
];

// Detect portrait-oriented news images and add .portrait to their container
function fixNewsPortraitImages() {
    document.querySelectorAll('.news-media img').forEach(img => {
        const applyOrientation = () => {
            const parent = img.closest('.news-media');
            if (!parent) return;
            try {
                if (img.naturalHeight && img.naturalWidth && img.naturalHeight > img.naturalWidth) {
                    parent.classList.add('portrait');
                }
            } catch (e) {
                // ignore
            }
        };

        if (img.complete) {
            applyOrientation();
        } else {
            img.addEventListener('load', applyOrientation);
        }
    });
}

// Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

// Event Delegation for Talleres and News
document.addEventListener('click', e => {
    if (e.target.classList.contains('btn-mas-info')) {
        const title = e.target.closest('.taller-card').querySelector('.taller-title').textContent;
        alert(`${title}\n\nMás información próximamente.`);
    }
    // News 'Ver más' button
    if (e.target.classList && e.target.classList.contains('btn-ver-mas')) {
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        if (!Number.isNaN(idx) && noticiasData[idx]) showNewsModal(idx);
    }
});

        // Init
        document.addEventListener('DOMContentLoaded', () => {
            carousel.init();
            renderTalleres();
                    if (typeof initNewsControls === 'function') initNewsControls();
                    fixNewsPortraitImages();
        });

        // Navbar search handler: scroll to matching section or nav link
        document.addEventListener('DOMContentLoaded', () => {
            const searchForm = document.getElementById('navSearchForm');
            const searchInput = document.getElementById('navSearchInput');
            if (!searchForm || !searchInput) return;
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const q = searchInput.value.trim().toLowerCase();
                if (!q) return;
                // Try to find a section whose id or heading contains the query
                const sections = document.querySelectorAll('section, [id]');
                for (const s of sections) {
                    const id = (s.id || '').toLowerCase();
                    const text = (s.textContent || '').toLowerCase();
                    if (id.includes(q) || text.includes(q)) {
                        s.scrollIntoView({ behavior: 'smooth' });
                        return;
                    }
                }
                // Fallback: look through navbar links
                const links = document.querySelectorAll('.navbar-nav .nav-link');
                for (const a of links) {
                    if ((a.textContent || '').toLowerCase().includes(q)) {
                        const href = a.getAttribute('href');
                        if (href && href.startsWith('#')) {
                            const target = document.querySelector(href);
                            if (target) { target.scrollIntoView({ behavior: 'smooth' }); return; }
                        }
                    }
                }
            });
        });