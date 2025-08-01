document.addEventListener('DOMContentLoaded', function() {
    // Animate send button on contact form submit
    var contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var sendBtn = contactForm.querySelector('button[type="submit"]');
            if (sendBtn) {
                sendBtn.classList.add('sending');
                sendBtn.textContent = 'Sending...';
            }
            // Collect form data
            var name = contactForm.querySelector('input[placeholder="Your Name"]').value;
            var email = contactForm.querySelector('input[placeholder="Your Email"]').value;
            var location = contactForm.querySelector('input[placeholder="Your Location"]').value;
            var message = contactForm.querySelector('textarea[placeholder="Message"]').value;
            // Send to backend
            fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, location, message })
            })
            .then(res => res.json())
            .then(data => {
                sendBtn.classList.remove('sending');
                sendBtn.textContent = 'Send';
                alert(data.message || 'Submitted!');
                contactForm.reset();
            })
            .catch(() => {
                sendBtn.classList.remove('sending');
                sendBtn.textContent = 'Send';
                alert('Failed to send. Please try again.');
            });
        });
    }
    // Fade in hero section

    var hero = document.getElementById('home');
    if (hero) {
        hero.classList.add('fade-in');
    }
    // Add to Cart button feedback
    document.querySelectorAll('#shop button').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            btn.classList.add('clicked');
            btn.textContent = 'Added!';
            setTimeout(function() {
                btn.classList.remove('clicked');
                btn.textContent = 'Add to Cart';
            }, 1200);
        });
    });

    // Cart logic
    var cart = [];
    // Load cart from localStorage if available
    var savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }

    var shopButtons = document.querySelectorAll('#shop button');
    var cartSection = document.getElementById('cart');
    var cartItemsDiv = document.getElementById('cart-items');
    var cartTotalDiv = document.getElementById('cart-total');
    var navLinks = document.querySelectorAll('nav a');
    var mainSections = document.querySelectorAll('main > section');

    // Add to Cart functionality
    shopButtons.forEach(function(btn, idx) {
        btn.addEventListener('click', function(e) {
            var productNames = ['5L Bottle', '10L Bottle', '20L Bottle'];
            var productPrices = [2.00, 3.50, 6.00];
            cart.push({ name: productNames[idx], price: productPrices[idx] });
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });

    // Navigation logic to show/hide sections
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var target = link.getAttribute('href').replace('#', '');
            mainSections.forEach(function(sec) {
                sec.style.display = (sec.id === target) ? (target === 'cart' ? 'block' : '') : 'none';
            });
            if (target === 'cart') {
                renderCart();
            }
        });
    });

    function renderCart() {
        if (!cartItemsDiv || !cartTotalDiv) return;
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalDiv.textContent = '';
            return;
        }
        var productImages = [
            'https://img.icons8.com/ios-filled/50/ffffff/water-bottle.png',
            'https://img.icons8.com/ios-filled/50/ffffff/water-bottle.png',
            'https://img.icons8.com/ios-filled/50/ffffff/water-bottle.png'
        ];
        var html = '<ul style="list-style:none; padding:0;">';
        var total = 0;
        cart.forEach(function(item, idx) {
            var imgSrc = '';
            if (item.name === '5L Bottle') imgSrc = productImages[0];
            else if (item.name === '10L Bottle') imgSrc = productImages[1];
            else if (item.name === '20L Bottle') imgSrc = productImages[2];
            html += `<li style="margin-bottom:0.7rem; display:flex; align-items:center; gap:1rem;">
                <img src="${imgSrc}" alt="${item.name}" style="height:40px;"> 
                <span>${item.name} - $${item.price.toFixed(2)}</span>
            </li>`;
            total += item.price;
        });
        html += '</ul>';
        cartItemsDiv.innerHTML = html;
        cartTotalDiv.textContent = 'Total: $' + total.toFixed(2);
    }
    // Cart 'Contact Us to Order' button navigation
    var contactOrderBtn = document.querySelector('#cart a[href="#contact"]');
    if (contactOrderBtn) {
        contactOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mainSections.forEach(function(sec) {
                sec.style.display = (sec.id === 'contact') ? '' : 'none';
            });
        });
    }
});
