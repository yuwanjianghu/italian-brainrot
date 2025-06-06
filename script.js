document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navList = document.getElementById('navbar-list');
    const menuToggle = document.querySelector('.menu-toggle');

    // Smooth scrolling
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Only execute smooth scroll for on-page anchors, not for "#" links
            if (targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // If it's a link in the mobile menu (including dropdowns), close the menu after clicking
                    if (navList.classList.contains('active')) {
                        navList.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                        menuToggle.textContent = '☰ Menu';
                        // Also close any open sub-dropdowns
                        document.querySelectorAll('.dropdown-menu.active-dropdown').forEach(openDropdown => {
                            openDropdown.classList.remove('active-dropdown');
                            const parentToggle = openDropdown.previousElementSibling;
                            if (parentToggle && parentToggle.classList.contains('dropdown-toggle')) {
                                parentToggle.setAttribute('aria-expanded', 'false');
                            }
                        });
                    }
                }
            }
        });
    });

    // Mobile hamburger menu toggle
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = navList.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.textContent = isExpanded ? '✕ Close' : '☰ Menu';
            // When closing the hamburger menu, also close any open sub-dropdowns
            if (!isExpanded) {
                document.querySelectorAll('.dropdown-menu.active-dropdown').forEach(openDropdown => {
                    openDropdown.classList.remove('active-dropdown');
                    const parentToggle = openDropdown.previousElementSibling;
                    if (parentToggle && parentToggle.classList.contains('dropdown-toggle')) {
                        parentToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });
    }

    // Nav dropdown handling (mainly for mobile click-to-open)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only prevent default and toggle dropdown on mobile view (when hamburger is visible)
            if (window.getComputedStyle(menuToggle).display !== 'none') {
                // Prevent the main link's default jump behavior to allow the dropdown to open
                if (this.parentElement.classList.contains('dropdown')) { 
                    e.preventDefault();
                }

                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    const isSubmenuExpanded = dropdownMenu.classList.toggle('active-dropdown');
                    this.setAttribute('aria-expanded', isSubmenuExpanded);

                    // Close other open dropdowns (if only one sub-menu is allowed at a time)
                    if (isSubmenuExpanded) {
                        document.querySelectorAll('.dropdown-menu.active-dropdown').forEach(openDropdown => {
                            if (openDropdown !== dropdownMenu) {
                                openDropdown.classList.remove('active-dropdown');
                                const parentToggle = openDropdown.previousElementSibling;
                                if (parentToggle && parentToggle.classList.contains('dropdown-toggle')) {
                                    parentToggle.setAttribute('aria-expanded', 'false');
                                }
                            }
                        });
                    }
                }
            }
        });
    });

    // Game Modal Logic
    const modal = document.getElementById('game-modal');
    const modalIframe = document.getElementById('game-iframe');
    const closeModalBtn = document.querySelector('.close-modal');

    // Get all game cards that can trigger the modal
    const gameModalTriggers = document.querySelectorAll('.gallery-item[data-gamemodal-src]');

    gameModalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const gameSrc = this.dataset.gamemodalSrc;
            if (gameSrc && modal && modalIframe) {
                modalIframe.src = gameSrc; // Set iframe source
                modal.style.display = 'block'; // Show the modal
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Function to close the modal
    function closeModal() {
        if (modal && modalIframe) {
            modal.style.display = 'none'; // Hide the modal
            modalIframe.src = ''; // Clear the iframe source to stop the game
            document.body.style.overflow = 'auto'; // Restore background scrolling
        }
    }

    // Close the modal when the close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close the modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Dynamic year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // SEO tips in console
    console.log("SEO Tips:");
    console.log("- Ensure <title> and <meta name='description'> are accurate and engaging.");
    console.log("- Use H1-H6 tags to create a clear content hierarchy.");
    console.log("- Add descriptive alt attributes to all images.");
    console.log("- Create high-quality, original content relevant to 'Italian Brainrot'.");
    console.log("- Use keywords naturally in your content, avoiding stuffing.");
    console.log("- Consider an internal linking strategy to connect related content.");
    console.log("- Optimize image sizes and site loading speed.");
}); 