document.addEventListener("DOMContentLoaded", function () {

    const coverPage = document.getElementById("coverPage");
    const envelope = document.getElementById("envelope");
    const openButton = document.getElementById("openButton");

    let envelopeOpened = false;
    let invitationStarted = false;

    /* Блокировка скролла на 1 странице */
    document.body.style.overflow = "hidden";

    if (coverPage) {
        coverPage.addEventListener("touchmove", function (event) {
            if (!invitationStarted) {
                event.preventDefault();
            }
        }, { passive: false });
    }

    /* Клики по кнопке и конверту */
    if (openButton) {
        openButton.addEventListener("click", function (event) {
            event.stopPropagation();

            if (!envelopeOpened) {
                openEnvelope();
            } else {
                startWedding();
            }
        });
    }

    if (envelope) {
        envelope.addEventListener("click", function () {
            if (!envelopeOpened) {
                openEnvelope();
                return;
            }

            if (envelopeOpened && !invitationStarted) {
                startWedding();
            }
        });
    }

    function openEnvelope() {
        if (envelopeOpened) return;

        envelopeOpened = true;
        envelope.classList.add("open");
        if (openButton) openButton.textContent = "ОТКРЫТЬ НАШУ ИСТОРИЮ";
    }

    function startWedding() {
        if (invitationStarted) return;

        invitationStarted = true;

        /* Включаем скролл */
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";

        /* Анимация ухода первой страницы */
        if (coverPage) {
            coverPage.classList.add("hide");

            setTimeout(function () {
                coverPage.style.display = "none";
                window.scrollTo(0, 0);
            }, 1200);
        }
    }

    /* =========================================================
       ПЛАВНОЕ ПОЯВЛЕНИЕ СТРАНИЦ И ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ
       ========================================================= */

    const scrollSections = document.querySelectorAll(".scroll-section");

    const observerOptions = {
        root: null,
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    scrollSections.forEach(function (section) {
        observer.observe(section);
    });

    /* =========================================================
       ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ДО СВАДЬБЫ
       ========================================================= */
    const weddingDate = new Date(2026, 8, 5, 16, 0, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference < 0) {
            ["days", "hours", "minutes", "seconds"].forEach(type => {
                setDigit(type + "Tens", "0");
                setDigit(type + "Units", "0");
            });
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        splitAndSet("days", days);
        splitAndSet("hours", hours);
        splitAndSet("minutes", minutes);
        splitAndSet("seconds", seconds);
    }

    function splitAndSet(type, value) {
        const formatted = value < 10 ? "0" + value : String(value);
        const str = formatted.length > 2 ? formatted.slice(-2) : formatted;

        setDigit(type + "Tens", str[0]);
        setDigit(type + "Units", str[1]);
    }

    function setDigit(id, val) {
        const el = document.getElementById(id);
        if (el && el.textContent !== val) {
            el.textContent = val;

            el.classList.add("flip");
            setTimeout(() => {
                el.classList.remove("flip");
            }, 300);
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* =========================================================
       СЛАЙДЕР ПОЖЕЛАНИЙ
       ========================================================= */
    const slides = document.querySelectorAll('.wish-slide');
    const prevBtn = document.getElementById('prevWishBtn');
    const nextBtn = document.getElementById('nextWishBtn');
    const counter = document.getElementById('wishCounter');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        if (counter) {
            counter.textContent = `${index + 1} / ${totalSlides}`;
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', function () {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        });
    }

    /* =========================================================
       ИНТЕРАКТИВНОЙ КАРТОЧКА С СЕРДЕЧКАМИ
       ========================================================= */
    const coupleBtn = document.getElementById('coupleInteractive');
    const card = document.getElementById('interactiveCard');

    if (coupleBtn && card) {
        coupleBtn.addEventListener('click', (e) => {
            const hearts = ['❤️', '💖', '💕', '💗', '✨'];
            const rect = card.getBoundingClientRect();

            for (let i = 0; i < 15; i++) {
                const heart = document.createElement('span');
                heart.classList.add('burst-heart');
                heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

                heart.style.left = `${e.clientX - rect.left}px`;
                heart.style.top = `${e.clientY - rect.top}px`;

                const angle = Math.random() * Math.PI * 2;
                const distance = 80 + Math.random() * 120;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                const rot = (Math.random() - 0.5) * 60;

                heart.style.setProperty('--tx', `${tx}px`);
                heart.style.setProperty('--ty', `${ty}px`);
                heart.style.setProperty('--rot', `${rot}deg`);

                card.appendChild(heart);

                setTimeout(() => heart.remove(), 1000);
            }
        });
    }

    /* =========================================================
       ТАЙМЛАЙН И САЛЮТ
       ========================================================= */
    const timelineSection = document.getElementById('timelinePage');
    if (timelineSection) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTimeline();
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        timelineObserver.observe(timelineSection);
    }
});

function animateTimeline() {
    const progressLine = document.getElementById('timelineProgress');
    const sparklerHead = document.getElementById('sparklerHead');
    const items = document.querySelectorAll('.timeline-item');
    const track = document.querySelector('.timeline-track');

    if (!progressLine || !items.length || !track) return;

    items.forEach(item => item.classList.remove('active'));

    const trackRect = track.getBoundingClientRect();
    const trackHeight = trackRect.height;

    const itemPositions = Array.from(items).map(item => {
        const icon = item.querySelector('.timeline-icon');
        const iconRect = icon.getBoundingClientRect();
        const centerY = iconRect.top + iconRect.height / 2;
        let relativeY = centerY - trackRect.top;

        if (relativeY < 0) relativeY = 0;
        if (relativeY > trackHeight) relativeY = trackHeight;

        return {
            element: item,
            percent: relativeY / trackHeight
        };
    });

    const totalDuration = 5500;

    if (sparklerHead) sparklerHead.classList.add('active');
    progressLine.style.height = '100%';

    itemPositions.forEach((pos, index) => {
        const delay = pos.percent * totalDuration;

        setTimeout(() => {
            pos.element.classList.add('active');

            if (index === itemPositions.length - 1) {
                createFirework();
            }
        }, delay);
    });
}

function createFirework() {
    const container = document.getElementById('firework');
    const lastItem = document.querySelector('.timeline-final .timeline-icon');
    const mainContainer = document.querySelector('.timeline-container');

    if (!container || !lastItem || !mainContainer) return;

    container.innerHTML = '';

    const containerRect = mainContainer.getBoundingClientRect();
    const iconRect = lastItem.getBoundingClientRect();

    const originX = (iconRect.left + iconRect.width / 2) - containerRect.left;
    const originY = (iconRect.top + iconRect.height / 2) - containerRect.top;

    container.style.left = originX + 'px';
    container.style.top = originY + 'px';

    const particleCount = 120;
    const colors = [
        '#3b82f6', '#60a5fa', '#93c5fd', '#38bdf8', 
        '#fbbf24', '#f59e0b', '#ec4899', '#a855f7', '#ffffff'
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        const isStar = Math.random() > 0.7;
        particle.className = isStar ? 'salute-star' : 'salute-particle';

        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 150;

        const dx = Math.cos(angle) * distance + 'px';
        const dy = Math.sin(angle) * distance + 'px'; 
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = (5 + Math.random() * 6) + 'px';

        particle.style.setProperty('--dx', dx);
        particle.style.setProperty('--dy', dy);
        particle.style.width = size;
        particle.style.height = size;
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

        const duration = 0.8 + Math.random() * 0.8;
        const delay = Math.random() * 0.1;

        particle.style.animation = `saluteExplode ${duration}s cubic-bezier(0.1, 0.8, 0.3, 1) ${delay}s forwards`;

        container.appendChild(particle);
    }
}