// Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Hide loader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1000);
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth' });
        }

        // Counter animation
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        const countUp = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target.toLocaleString('pt-BR');
                        if (counter.getAttribute('data-target') === '98') {
                            counter.innerText = target + '%';
                        } else if (counter.getAttribute('data-target') === '150') {
                            counter.innerText = target + '+';
                        }
                    }
                };
                updateCount();
            });
        };

        // Trigger counter when visible
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUp();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const numbersSection = document.querySelector('.numbers-section');
        if (numbersSection) {
            observer.observe(numbersSection);
        }

        // Calculator functionality
        document.getElementById('calculatorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const billAmount = parseFloat(document.getElementById('billAmount').value);
            const propertyType = document.getElementById('propertyType').value;
            const state = document.getElementById('state').value;
            const roofSize = parseFloat(document.getElementById('roofSize').value);
            
            // Professional calculations
            const savingsRate = propertyType === 'industrial' ? 0.95 : propertyType === 'comercial' ? 0.92 : 0.90;
            const monthlySavings = billAmount * savingsRate;
            const annualSavings = monthlySavings * 12;
            const investmentPerWatt = propertyType === 'industrial' ? 4.5 : 5.2;
            const systemSize = roofSize * 0.15; // 150W per m²
            const investment = systemSize * investmentPerWatt * 1000;
            const roiMonths = investment / monthlySavings;
            const roiYears = (roiMonths / 12).toFixed(1);
            
            // Display results
            document.getElementById('monthlySavings').textContent = `R$ ${monthlySavings.toFixed(2)}`;
            document.getElementById('annualSavings').textContent = `R$ ${annualSavings.toFixed(2)}`;
            document.getElementById('investment').textContent = `R$ ${investment.toFixed(2)}`;
            document.getElementById('roi').textContent = `${roiYears} anos`;
            
            // Show result box
            const resultBox = document.getElementById('resultBox');
            resultBox.style.display = 'block';
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        // Contact form
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const alert = document.createElement('div');
            alert.className = 'alert alert-success alert-dismissible fade show mt-3';
            alert.innerHTML = `
                <strong><i class="fas fa-check-circle me-2"></i>Proposta enviada!</strong> Nossa equipe entrará em contato em até 24h.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            e.target.appendChild(alert);
            e.target.reset();
            
            setTimeout(() => {
                alert.remove();
            }, 5000);
        });

        // Dynamic year
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Enhanced hover effects
        document.querySelectorAll('.feature-card, .service-card, .testimonial-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
