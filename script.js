// ═══════════════════════════════════════════════
// BRICK PARTY CAMPAIGN — INTERACTIVE SCRIPTS
// 500 Supporters, Message Board, Animations
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    generateSupporters();
    generateMessages();
    initCounter();
    initForm();
    initContactForm();
});

// ═══════════ NAVIGATION ═══════════
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('mobile-toggle');
    const links = document.querySelector('.nav-links');
    const voteBtn = document.querySelector('.nav-vote-btn');

    // Scroll effect
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile toggle
    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
        if (voteBtn) voteBtn.classList.toggle('active');
    });

    // Close mobile on link click
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('active');
            if (voteBtn) voteBtn.classList.remove('active');
        });
    });
}

// ═══════════ SCROLL REVEAL ═══════════
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.policy-card, .duty-card, .about-grid, .form-wrapper, .supporters-counter, .value-item'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
}

// ═══════════ 500 FAKE SUPPORTERS ═══════════
function generateSupporters() {
    const firstNames = [
        'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth',
        'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen',
        'Charles', 'Lisa', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra',
        'Donald', 'Ashley', 'Steven', 'Dorothy', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna',
        'Kenneth', 'Michelle', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Timothy', 'Deborah',
        'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia',
        'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Angela', 'Eric', 'Shirley', 'Jonathan', 'Anna',
        'Stephen', 'Brenda', 'Larry', 'Pamela', 'Justin', 'Emma', 'Scott', 'Nicole', 'Brandon', 'Helen',
        'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Raymond', 'Christine', 'Gregory', 'Debra', 'Frank', 'Rachel',
        'Alexander', 'Carolyn', 'Patrick', 'Janet', 'Jack', 'Catherine', 'Dennis', 'Maria', 'Jerry', 'Heather',
        'Tyler', 'Diane', 'Aaron', 'Ruth', 'Jose', 'Julie', 'Adam', 'Olivia', 'Nathan', 'Joyce',
        'Henry', 'Virginia', 'Douglas', 'Victoria', 'Zachary', 'Kelly', 'Peter', 'Lauren', 'Kyle', 'Christina',
        'Noah', 'Joan', 'Ethan', 'Evelyn', 'Jeremy', 'Judith', 'Walter', 'Megan', 'Christian', 'Andrea',
        'Keith', 'Cheryl', 'Roger', 'Hannah', 'Terry', 'Jacqueline', 'Austin', 'Martha', 'Sean', 'Gloria',
        'Gerald', 'Teresa', 'Carl', 'Ann', 'Harold', 'Sara', 'Dylan', 'Madison', 'Arthur', 'Frances',
        'Lawrence', 'Kathryn', 'Jordan', 'Janice', 'Jesse', 'Jean', 'Bryan', 'Abigail', 'Billy', 'Alice',
        'Bruce', 'Judy', 'Gabriel', 'Sophia', 'Joe', 'Grace', 'Logan', 'Denise', 'Albert', 'Amber',
        'Willie', 'Doris', 'Alan', 'Marilyn', 'Eugene', 'Danielle', 'Elijah', 'Beverly', 'Randy', 'Isabella',
        'Wayne', 'Theresa', 'Roy', 'Diana', 'Vincent', 'Natalie', 'Ralph', 'Brittany', 'Philip', 'Charlotte',
        'Bobby', 'Marie', 'Johnny', 'Kayla', 'Bradley', 'Alexis', 'Mason', 'Lori', 'Aiden', 'Ava',
        'Malik', 'Priya', 'Raj', 'Fatima', 'Omar', 'Yuki', 'Wei', 'Mei', 'Carlos', 'Sofia',
        'Diego', 'Valentina', 'Luis', 'Camila', 'Miguel', 'Lucia', 'Amir', 'Leila', 'Hassan', 'Noor',
        'Jamal', 'Aaliyah', 'DeShawn', 'Imani', 'Tyrone', 'Destiny', 'Marcus', 'Jasmine', 'Darius', 'Diamond',
        'Andre', 'Brianna', 'Terrell', 'Sierra', 'Isaiah', 'Autumn', 'Jayden', 'Trinity', 'Xavier', 'Harmony',
        'Kai', 'Luna', 'River', 'Sage', 'Phoenix', 'Sky', 'Atlas', 'Willow', 'Theo', 'Ivy'
    ];

    const lastNames = [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
        'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
        'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
        'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
        'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
        'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
        'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
        'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
        'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
        'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez',
        'Chen', 'Wang', 'Zhang', 'Li', 'Liu', 'Singh', 'Kumar', 'Sharma', 'Ali', 'Khan',
        'Nakamura', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Park', 'Choi', 'Kang', 'Jung', 'Cho',
        'O\'Brien', 'O\'Connor', 'McCarthy', 'Sullivan', 'Murphy', 'Fitzgerald', 'Walsh', 'Kennedy', 'Ryan', 'Burke',
        'Mueller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Wagner', 'Becker', 'Schultz', 'Hoffman', 'Schafer',
        'Petrov', 'Ivanov', 'Volkov', 'Kuznetsov', 'Popov', 'Sokolov', 'Fedorov', 'Novikov', 'Morozov', 'Kozlov',
        'Gonzales', 'Romero', 'Herrera', 'Medina', 'Vargas', 'Castro', 'Mendez', 'Guerrero', 'Ramos', 'Santos'
    ];

    const wall = document.getElementById('supporters-wall');
    const chipStyles = ['chip-style-1', 'chip-style-2', 'chip-style-3', 'chip-style-4', 'chip-style-5', 'chip-style-6'];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 500; i++) {
        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];
        const style = chipStyles[i % chipStyles.length];
        const initials = first[0] + last[0];

        const chip = document.createElement('div');
        chip.className = `supporter-chip ${style}`;
        chip.innerHTML = `<span class="chip-avatar">${initials}</span>${first} ${last}`;

        // Add slight random delay to entrance
        chip.style.animationDelay = `${Math.random() * 0.5}s`;
        fragment.appendChild(chip);
    }

    wall.appendChild(fragment);
}

// ═══════════ MESSAGE BOARD ═══════════
function generateMessages() {
    const messages = [
        { name: 'Emma Thompson', msg: 'The Brick Party actually cares about students! 🧱 Affordable college is the future.', time: '2 min ago', emoji: '🎓' },
        { name: 'Marcus Johnson', msg: 'Arnav has my vote! His policies on healthcare are exactly what we need. Everyone deserves coverage.', time: '5 min ago', emoji: '🏥' },
        { name: 'Sophia Chen', msg: 'Finally someone who takes the environment seriously! Electric vehicles and nuclear fusion? YES! 🌍', time: '8 min ago', emoji: '🌱' },
        { name: 'Jayden Williams', msg: 'The economy and jobs plan is fire 🔥 Raising minimum wage by 50% would change so many lives.', time: '12 min ago', emoji: '💼' },
        { name: 'Aaliyah Garcia', msg: 'Body cameras for all police is just common sense! More accountability = safer communities. 💪', time: '15 min ago', emoji: '📹' },
        { name: 'Tyler Rodriguez', msg: 'Protecting People, Creating Borders — that\'s a slogan I can get behind! Let\'s goooo 🇺🇸', time: '18 min ago', emoji: '🏛️' },
        { name: 'Isabella Martinez', msg: 'Arnav is so smart! A+++ in math says it all. We need someone with brains running things! 🧠', time: '22 min ago', emoji: '📚' },
        { name: 'Noah Kim', msg: 'The gun control policy is balanced and reasonable. Safety first, rights respected. 👍', time: '25 min ago', emoji: '🛡️' },
        { name: 'Mia Patel', msg: 'Just registered to support the Brick Party! Who\'s with me?? 🧱🧱🧱', time: '28 min ago', emoji: '✊' },
        { name: 'Ethan O\'Brien', msg: 'Love the education policy. My older sister has $60K in student debt. This NEEDS to change.', time: '31 min ago', emoji: '📖' },
        { name: 'Ava Hernandez', msg: 'Carbon caps and higher taxes for polluters? That\'s how you save the planet! Go Brick Party! 🌎', time: '35 min ago', emoji: '♻️' },
        { name: 'Liam Washington', msg: 'Everything about the Brick Party platform makes sense. Arnav for president! Just saying 😄', time: '38 min ago', emoji: '🏆' },
        { name: 'Charlotte Davis', msg: 'The commitment to helping people in poverty is what separates the Brick Party. Real compassion! ❤️', time: '42 min ago', emoji: '🤝' },
        { name: 'Mason Clark', msg: 'Government jobs in military, teaching, and first responders? That\'s investing in PEOPLE. 💯', time: '45 min ago', emoji: '🎖️' },
        { name: 'Amara Lewis', msg: 'Just brought 10 friends to support the Brick Party! The movement is REAL!! 🧱💙🤎', time: '48 min ago', emoji: '👥' },
        { name: 'Caleb Taylor', msg: 'Ethanol fuel AND electric aircraft research? The Brick Party is living in the future! 🚀', time: '52 min ago', emoji: '⚡' },
        { name: 'Harper Moore', msg: 'Arnav understands civics better than most adults tbh. He gets what it takes. 📜', time: '55 min ago', emoji: '🗽' },
        { name: 'Oliver Singh', msg: 'Healthcare benefits for those who need them most. This is what leadership looks like! 🏥💙', time: '1 hr ago', emoji: '💚' },
        { name: 'Zoe Anderson', msg: 'My whole family is behind the Brick Party! Let\'s build something great together! 🧱', time: '1 hr ago', emoji: '🏗️' },
        { name: 'Elijah Brown', msg: 'Strict background checks including mental health screening? RESPONSIBLE gun policy! ✅', time: '1 hr ago', emoji: '✔️' },
        { name: 'Luna Reyes', msg: 'Vote for Arnav Gupta!! He actually cares about students and regular people! 🗳️', time: '1.5 hr ago', emoji: '🌟' },
        { name: 'Aiden Cooper', msg: 'The Brick Party stands for everything I believe in. Proud supporter here! 🤎💙', time: '1.5 hr ago', emoji: '🎯' },
        { name: 'Scarlett Murphy', msg: 'Nuclear fusion energy research! That\'s the kind of forward thinking our country needs! ⚛️', time: '2 hr ago', emoji: '🔬' },
        { name: 'Kai Nakamura', msg: 'From education to environment, every policy just makes SENSE. Brick Party all the way! 🧱', time: '2 hr ago', emoji: '💎' },
        { name: 'Riley Foster', msg: 'Police body cameras = transparency. Transparency = trust. Simple as that. 💪', time: '2 hr ago', emoji: '📷' },
        { name: 'Grace Mitchell', msg: 'Shared the website with my whole class! Everyone loves the platform! 🎉', time: '2.5 hr ago', emoji: '🌈' },
        { name: 'Darius Hall', msg: 'Minimum wage needs to go UP. The Brick Party gets it. Working families matter! 👨‍👩‍👧‍👦', time: '2.5 hr ago', emoji: '💵' },
        { name: 'Aria Scott', msg: 'Arnav Gupta — a leader for ALL people. Not just some. ALL. That\'s why I support him. 🙌', time: '3 hr ago', emoji: '🤗' },
        { name: 'Xavier Torres', msg: 'The Brick Party isn\'t just about promises. Look at this platform! These are PLANS! 📋', time: '3 hr ago', emoji: '📊' },
        { name: 'Willow Flores', msg: 'My favorite policy? ALL OF THEM! But if I had to pick… affordable college for sure! 🎓💙', time: '3 hr ago', emoji: '❤️‍🔥' },
    ];

    const grid = document.getElementById('messages-grid');
    const avatarColors = ['#1565C0', '#5D4037', '#C62828', '#00695C', '#7B1FA2', '#F57C00', '#2E7D32', '#283593'];
    let visibleCount = 9;

    function renderMessages(count) {
        grid.innerHTML = '';
        const toShow = messages.slice(0, count);
        toShow.forEach((m, i) => {
            const color = avatarColors[i % avatarColors.length];
            const initials = m.name.split(' ').map(w => w[0]).join('');
            const likes = Math.floor(Math.random() * 50) + 5;
            const hearts = Math.floor(Math.random() * 30) + 2;

            const card = document.createElement('div');
            card.className = 'message-card';
            card.innerHTML = `
                <div class="message-header">
                    <div class="message-avatar" style="background:${color}">${initials}</div>
                    <div>
                        <div class="message-author">${m.name}</div>
                        <div class="message-time">${m.time}</div>
                    </div>
                </div>
                <p class="message-text">${m.msg}</p>
                <div class="message-reactions">
                    <span class="reaction">👍 ${likes}</span>
                    <span class="reaction">❤️ ${hearts}</span>
                    <span class="reaction">${m.emoji}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    renderMessages(visibleCount);

    const loadBtn = document.getElementById('load-more-messages');
    loadBtn.addEventListener('click', () => {
        visibleCount = Math.min(visibleCount + 6, messages.length);
        renderMessages(visibleCount);
        if (visibleCount >= messages.length) {
            loadBtn.style.display = 'none';
        }
    });
}

// ═══════════ COUNTER ANIMATION ═══════════
function initCounter() {
    const counter = document.getElementById('animated-counter');
    const target = 500;
    let current = 0;
    let started = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                animateCounter();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(counter);

    function animateCounter() {
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(eased * target);
            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }
}

// ═══════════ FORM HANDLING ═══════════
function initForm() {
    const form = document.getElementById('signup-form');
    const success = document.getElementById('form-success');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const grade = document.getElementById('grade').value;
        const reason = document.getElementById('reason').value.trim();

        // Animate submit button
        const btn = document.getElementById('submit-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
        btn.disabled = true;

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, grade, reason })
            });

            const data = await res.json();

            if (data.success) {
                // Hide form, show success
                form.style.display = 'none';
                success.style.display = 'block';
                success.querySelector('h3').textContent = `Welcome, ${firstName}!`;

                // Add to supporters wall
                const wall = document.getElementById('supporters-wall');
                const chip = document.createElement('div');
                chip.className = 'supporter-chip chip-style-3';
                chip.style.animation = 'fadeInUp 0.5s ease';
                chip.innerHTML = `<span class="chip-avatar">${firstName[0]}${lastName[0]}</span>${firstName} ${lastName} ⭐`;
                wall.prepend(chip);

                // Update counter
                const counterEl = document.getElementById('animated-counter');
                const supporterCount = document.getElementById('supporter-count');
                const newCount = parseInt(counterEl.textContent) + 1;
                counterEl.textContent = newCount;
                if (supporterCount) supporterCount.textContent = newCount;
            } else {
                alert(data.message || 'Registration failed. Please try again.');
                btn.innerHTML = '<i class="fas fa-rocket"></i> Join the Movement';
                btn.disabled = false;
            }
        } catch (err) {
            alert('Could not connect to server. Please try again.');
            btn.innerHTML = '<i class="fas fa-rocket"></i> Join the Movement';
            btn.disabled = false;
        }
    });
}

// ═══════════ SMOOTH SCROLL FOR ALL ANCHOR LINKS ═══════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ═══════════ CONTACT FORM ═══════════
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const success = document.getElementById('contact-success');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        const btn = document.getElementById('contact-submit-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });

            const data = await res.json();

            if (data.success) {
                form.style.display = 'none';
                success.style.display = 'block';
            } else {
                alert(data.message || 'Failed to send message. Please try again.');
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                btn.disabled = false;
            }
        } catch (err) {
            alert('Could not connect to server. Please try again.');
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.disabled = false;
        }
    });
}

// Global reset function for the contact form
function resetContactForm() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('contact-success');
    const btn = document.getElementById('contact-submit-btn');

    form.reset();
    form.style.display = '';
    success.style.display = 'none';
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
}

