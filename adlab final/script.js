// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');

function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        document.body.removeAttribute('data-theme');
        themeToggle.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = 'Light Mode';
} else {
    document.body.removeAttribute('data-theme');
    themeToggle.textContent = 'Dark Mode';
}

themeToggle.addEventListener('click', toggleTheme);

// Mobile Menu
const menuBars = document.getElementById('menu-bars');
const navbar = document.querySelector('.navbar');

menuBars.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuBars.contains(e.target)) {
        navbar.classList.remove('active');
    }
});

// User Authentication System
let users = JSON.parse(localStorage.getItem('users')) || [];

// Register Function
document.getElementById('register-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (username && password) {
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert('Username already exists. Please choose another.');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        }
    } else {
        alert('Please fill in all fields.');
    }
});

// Login Function
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password.');
    }
});

// Logout Function
function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
}

// Update Menu Bar Based on Login Status
function updateMenuBar() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navbar = document.querySelector('.navbar');

    if (loggedInUser) {
        navbar.innerHTML = `
            <a href="#home">Home</a>
            <a href="#events">Events</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
            <a href="#" class="logout-btn" onclick="logout()">Logout</a>
        `;
    } else {
        navbar.innerHTML = `
            <a href="#home">Home</a>
            <a href="#events">Events</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
            <a href="login.html" class="login-btn">Login</a>
        `;
    }
}

// Call updateMenuBar on page load
updateMenuBar();

// Event Filtering
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const dateFilter = document.getElementById('date-filter');
const eventContainer = document.querySelector('.event-container');

function filterEvents() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedDate = dateFilter.value;

    eventContainer.querySelectorAll('.event-card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.dataset.category;
        const date = card.dataset.date;

        const matchesSearch = title.includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
        const matchesDate = !selectedDate || date === selectedDate;

        card.style.display = (matchesSearch && matchesCategory && matchesDate) 
            ? 'block' 
            : 'none';
    });
}

searchInput.addEventListener('input', filterEvents);
categoryFilter.addEventListener('change', filterEvents);
dateFilter.addEventListener('change', filterEvents);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Event Booking
document.querySelectorAll('.event-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const eventCard = this.closest('.event-card');
        const eventTitle = eventCard.querySelector('h3').textContent;
        const eventDate = eventCard.querySelector('.date').textContent;
        const eventLocation = eventCard.querySelector('.location').textContent;

        alert(`You have successfully booked:\n\n${eventTitle}\n${eventDate}\n${eventLocation}`);
    });
});
// Contact Form Submission
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Message sent successfully!');
        // Clear form
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});
// Clear Filters
document.getElementById('clear-filters')?.addEventListener('click', function() {
    searchInput.value = '';
    categoryFilter.value = 'all';
    dateFilter.value = '';
    filterEvents(); 
});
// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});