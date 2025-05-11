// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.createElement('div');
    
    mobileMenuClose.innerHTML = '<i class="fas fa-times"></i>';
    mobileMenuClose.classList.add('mobile-menu-close');
    mobileMenu.appendChild(mobileMenuClose);
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Modal functionality
    const reportModal = document.getElementById('reportModal');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const reportButtons = document.querySelectorAll('.btn-primary[data-translate="btn_report_leak"]');
    const loginButtons = document.querySelectorAll('.btn-login');
    const signupButtons = document.querySelectorAll('.btn-signup');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    
    // Open modals
    reportButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            reportModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    loginButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    signupButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            reportModal.style.display = 'none';
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Switch between login and signup
    switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === reportModal) {
            reportModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Photo preview for leak report
    const leakPhoto = document.getElementById('leakPhoto');
    const photoPreview = document.getElementById('photoPreview');
    
    if (leakPhoto) {
        leakPhoto.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    photoPreview.innerHTML = `<img src="${event.target.result}" alt="Leak Photo">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
        
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
            
            // Close other open items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for reporting the leak! Our team will verify it soon.');
            this.reset();
            photoPreview.innerHTML = '';
            reportModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality will be implemented in the backend.');
            this.reset();
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Signup functionality will be implemented in the backend.');
            this.reset();
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    // Update all form inputs to include placeholder attribute
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.setAttribute('placeholder', ' ');
  });
});