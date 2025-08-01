// order.js
// This script uses EmailJS to send order details to the seller's email.
// You must sign up at https://www.emailjs.com/, create a service, template, and get your user ID.
// Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' below.

// Load EmailJS SDK
(function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.emailjs.com/dist/email.min.js';
    script.onload = function() {
        emailjs.init('YOUR_USER_ID'); // Replace with your EmailJS user ID
    };
    document.head.appendChild(script);
})();

// Attach to contact form
window.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.querySelector('#contact form');
    if (!contactForm) return;
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        var email = contactForm.querySelector('input[placeholder="Your Email"]').value;
        var location = contactForm.querySelector('input[placeholder="Your Location"]').value;
        var message = contactForm.querySelector('textarea[placeholder="Message"]').value;
        // Get cart details from window.cart if available
        var cart = window.cart || [];
        fetch('http://localhost:5000/send-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, location, message, cart })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.success) {
                alert('Order sent successfully!');
                contactForm.reset();
            } else {
                alert('Failed to send order: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(function(err) {
            alert('Failed to send order. Please try again.');
        });
    });
});
