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
        threshold: 0.2 /* Срабатывает, когда 20% блока видно на экране */
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
       3. БЕНГАЛЬСКИЙ ОГОНЬ И САЛЮТ (6 СТРАНИЦА)
       ========================================================= */
    const timelinePage = document.getElementById("timelinePage");
    const timelineProgress = document.getElementById("timelineProgress");
    const sparklerHead = document.getElementById("sparklerHead");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const fireworkContainer = document.getElementById("firework");

    let animatedTimeline = false;

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedTimeline) {
                animatedTimeline = true;
                startTimelineAnimation();
            }
        });
    }, { threshold: 0.15 });

    if (timelinePage) {
        timelineObserver.observe(timelinePage);
    }

    function startTimelineAnimation() {
        const isMobile = window.innerWidth <= 850;

        // Включаем видимость бенгальского огня
        if (sparklerHead) sparklerHead.classList.add("active");

        // Запуск генерации искр во время движения линии
        const sparkInterval = setInterval(() => {
            createSparklerSparks();
        }, 30);

        // Зажигаем линию
        if (timelineProgress) {
            if (isMobile) {
                timelineProgress.style.height = "100%";
            } else {
                timelineProgress.style.width = "100%";
            }
        }

        // Подсвечиваем элементы по очереди
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add("active");
            }, (index + 1) * 650);
        });

        // Завершение движения линии и запуск салюта
        setTimeout(() => {
            clearInterval(sparkInterval);
            if (sparklerHead) sparklerHead.classList.remove("active");
            createGrandSalute();
        }, 2800);
    }

    // Функция создания искр бенгальского огня
    function createSparklerSparks() {
        if (!sparklerHead) return;

        const rect = sparklerHead.getBoundingClientRect();
        const count = 4; // Количество искр за такт

        for (let i = 0; i < count; i++) {
            const spark = document.createElement("div");
            spark.className = "sparkler-spark";

            const size = 2 + Math.random() * 4;
            spark.style.width = size + "px";
            spark.style.height = size + "px";

            // Корректный расчёт позиций с учётом скролла
            spark.style.left = (rect.left + rect.width / 2 + window.scrollX) + "px";
            spark.style.top = (rect.top + rect.height / 2 + window.scrollY) + "px";

            // Разлёт искр
            const angle = Math.random() * Math.PI * 2;
            const distance = 15 + Math.random() * 35;
            const dx = Math.cos(angle) * distance + "px";
            const dy = Math.sin(angle) * distance + "px";

            spark.style.setProperty("--dx", dx);
            spark.style.setProperty("--dy", dy);

            const duration = 0.3 + Math.random() * 0.4;
            spark.style.animation = `sparkFly ${duration}s ease-out forwards`;

            document.body.appendChild(spark);

            setTimeout(() => {
                spark.remove();
            }, duration * 1000);
        }
    }

    // Функция запуска пышного салюта
    function createGrandSalute() {
        if (!fireworkContainer) return;

        const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#ffffff", "#2563eb", "#f59e0b", "#34d399"];
        const particleCount = 70; // Пышный взрыв

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "salute-particle";

            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 110;
            const dx = Math.cos(angle) * distance + "px";
            const dy = Math.sin(angle) * distance + "px";

            particle.style.setProperty("--dx", dx);
            particle.style.setProperty("--dy", dy);

            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 12px ${color}, 0 0 20px ${color}`;

            const size = 4 + Math.random() * 6;
            particle.style.width = size + "px";
            particle.style.height = size + "px";

            const duration = 1.0 + Math.random() * 0.8;
            particle.style.animation = `saluteExplode ${duration}s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`;

            fireworkContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }
    }

})
/* =========================================================
       ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ДО СВАДЬБЫ
       ========================================================= */
    
    // Задайте здесь точную дату вашей свадьбы (Год, Месяц (0-11), День, Час, Минуты)
    // Внимание: месяцы в JS считаются с 0 (0 = Январь, 5 = Июнь, 7 = Август и т.д.)
    document.addEventListener("DOMContentLoaded", function () {
        // Дата мероприятия: 5 сентября 2026 года
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
                
                // Анимация вспышки при смене цифры
                el.classList.add("flip");
                setTimeout(() => {
                    el.classList.remove("flip");
                }, 300);
            }
        }
    
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
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
       document.addEventListener('DOMContentLoaded', () => {
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
    
                    // Начальная точка в центре кликнутой области
                    heart.style.left = `${e.clientX - rect.left}px`;
                    heart.style.top = `${e.clientY - rect.top}px`;
    
                    // Рандомный разлёт
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
    });