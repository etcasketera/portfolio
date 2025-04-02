document.addEventListener('DOMContentLoaded', function() {
    // Highlight active section in sidebar based on scroll position
    const sections = document.querySelectorAll('.resume-section');
    const sidebarLinks = document.querySelectorAll('.resume-sidebar ul li a');
    
    if (sections.length > 0 && sidebarLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -70% 0px',
            threshold: 0
        };
        
        const highlightSidebarLink = (id) => {
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    highlightSidebarLink(entry.target.id);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // Add active class to sidebar links and handle mobile behavior
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Handle mobile sidebar if needed
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                const sidebar = document.querySelector('.resume-sidebar');
                if (sidebar && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });

    // Make sidebar sticky on desktop, but not on mobile
    function handleStickyBehavior() {
        const sidebar = document.querySelector('.resume-sidebar');
        const content = document.querySelector('.resume-content');
        
        if (!sidebar || !content) return;
        
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Remove sticky behavior on mobile
            sidebar.style.position = 'static';
            sidebar.style.top = 'auto';
            sidebar.style.height = 'auto';
        } else {
            // Apply sticky behavior on desktop
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const footerOffset = document.querySelector('footer').offsetTop;
            
            const handleScroll = () => {
                const scrollY = window.scrollY;
                const sidebarHeight = sidebar.offsetHeight;
                const viewportHeight = window.innerHeight;
                const contentBottom = content.offsetTop + content.offsetHeight;
                
                // If sidebar is shorter than viewport
                if (sidebarHeight < viewportHeight - headerHeight) {
                    sidebar.style.position = 'sticky';
                    sidebar.style.top = `${headerHeight}px`;
                } else {
                    // If sidebar is taller than viewport, we need more complex logic
                    const maxTranslate = sidebarHeight - viewportHeight + headerHeight;
                    const bottomReached = scrollY + viewportHeight >= contentBottom;
                    
                    if (bottomReached) {
                        sidebar.style.position = 'absolute';
                        sidebar.style.top = `${contentBottom - sidebarHeight}px`;
                    } else {
                        sidebar.style.position = 'sticky';
                        sidebar.style.top = `${headerHeight}px`;
                    }
                }
                
                // Prevent sidebar from going below footer
                const sidebarBottom = sidebar.offsetTop + sidebarHeight;
                if (sidebarBottom > footerOffset) {
                    sidebar.style.position = 'absolute';
                    sidebar.style.top = `${footerOffset - sidebarHeight}px`;
                }
            };
            
            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial call to set position
        }
    }
    
    // Toggle mobile sidebar if needed
    function setupMobileSidebar() {
        const mobileToggle = document.querySelector('.mobile-sidebar-toggle');
        const sidebar = document.querySelector('.resume-sidebar');
        
        if (mobileToggle && sidebar) {
            mobileToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    }
    
    // Run setup functions
    handleStickyBehavior();
    setupMobileSidebar();
    
    // Recalculate on resize
    window.addEventListener('resize', function() {
        handleStickyBehavior();
    });
});
