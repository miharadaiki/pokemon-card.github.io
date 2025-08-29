document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('nav ul li a');

    // ハンバーガーメニューの開閉
    hamburger.addEventListener('click', function () {
        menu.classList.toggle("active");  // メニューの表示切り替え 
    });

    // リンクをクリックした後にメニューを閉じる
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menu.classList.remove('active');
        });
    });
});

// script.jsのスライドショー部分
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");
    const indicatorContainer = document.getElementById("slide-indicator");

    if (slides.length <= 1) {
        if(prevButton) prevButton.style.display = 'none';
        if(nextButton) nextButton.style.display = 'none';
        if(indicatorContainer) indicatorContainer.style.display = 'none';
        return;
    }

    let index = 0;
    let slideInterval;
    const dots = []; 

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("span");
        dot.classList.add("slide-dot");
        dot.addEventListener('click', () => {
            index = i;
            updateSlide();
            resetTimer(); 
        });
        indicatorContainer.appendChild(dot);
        dots.push(dot);
    }

    function updateSlide() {
        slider.style.transform = `translateX(-${index * (100 / slides.length)}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        const barLeftPos = dots[index].offsetLeft + 6;
        indicatorContainer.style.setProperty('--bar-left', `${barLeftPos}px`);
        indicatorContainer.classList.remove('is-animating');
        void indicatorContainer.offsetWidth; 
        indicatorContainer.classList.add('is-animating');
    }

    function showNextSlide() {
        index = (index + 1) % slides.length;
        updateSlide();
    }
    
    function showPrevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        updateSlide();
    }

    function resetTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, 5000);
    }

    nextButton.addEventListener('click', () => {
        showNextSlide();
        resetTimer();
    });

    prevButton.addEventListener('click', () => {
        showPrevSlide();
        resetTimer();
    });

    updateSlide();
    resetTimer();
});

// 監視対象となる要素をすべて取得
const targets = document.querySelectorAll('.fade-in');

// 要素が画面内に入ったかどうかを判定する処理
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
});

// 各要素の監視を開始
targets.forEach(target => {
    observer.observe(target);
});

document.addEventListener('DOMContentLoaded', () => {
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const calendarTableBody = document.querySelector('.calendar-table tbody');

    if (!currentMonthElement || !prevMonthBtn || !nextMonthBtn || !calendarTableBody) {
        return;
    }

    let currentDate = new Date(); 

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth(); 
        currentMonthElement.textContent = `${year}年${month + 1}月`;
        calendarTableBody.innerHTML = '';
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const startDayOfWeek = firstDayOfMonth.getDay();
        let dateCounter = 1;
        let nextMonthCounter = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < startDayOfWeek) {
                    const prevMonthDay = new Date(year, month, 0).getDate() - (startDayOfWeek - 1 - j);
                    cell.textContent = prevMonthDay;
                    cell.classList.add('prev-month-day');
                } else if (dateCounter > lastDayOfMonth.getDate()) {
                    cell.textContent = nextMonthCounter;
                    cell.classList.add('next-month-day');
                    nextMonthCounter++;
                } else {
                    cell.textContent = dateCounter;
                    if (month === 6 && (dateCounter === 20 || dateCounter === 21)) {
                        cell.classList.add('has-event');
                        const eventLink = document.createElement('a');
                        eventLink.href = `event-detail${dateCounter === 20 ? '1' : 'X'}.html`;
                        eventLink.textContent = dateCounter;
                        cell.innerHTML = '';
                        cell.appendChild(eventLink);
                        const eventDot = document.createElement('span');
                        eventDot.classList.add('event-dot');
                        cell.appendChild(eventDot);
                    }
                    dateCounter++;
                }
                row.appendChild(cell);
            }
            calendarTableBody.appendChild(row);
            if (dateCounter > lastDayOfMonth.getDate()) {
                break; 
            }
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
/* --- FAQアコーディオンの動き --- */
document.addEventListener('DOMContentLoaded', function() {
    // FAQのすべての質問（dt要素）を取得
    const faqQuestions = document.querySelectorAll('#faq dt');

    // 各質問に対してクリックイベントを設定
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // クリックされた質問に 'active' クラスを付けたり消したりする
            question.classList.toggle('active');

            // クリックされた質問のすぐ隣にある回答（dd要素）を取得
            const answer = question.nextElementSibling;

            // 回答にも 'active' クラスを付けたり消したりする
            if (answer && answer.tagName === 'DD') {
                answer.classList.toggle('active');
            }
        });
    });
});
