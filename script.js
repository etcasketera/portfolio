document.addEventListener('DOMContentLoaded', function() {
    // Progress bar functionality
    const progressBar = document.getElementById('resumeProgress');
    const sectionLinks = document.querySelectorAll('.section-link');
    const resumeSections = document.querySelectorAll('.resume-section');
    
    // Set initial progress
    updateProgress(0);
    
    // Handle section link clicks
    sectionLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active section link
            sectionLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section content
            resumeSections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(this.getAttribute('data-section'));
            targetSection.classList.add('active');
            
            // Update progress bar
            const progress = (index / (sectionLinks.length - 1)) * 100;
            updateProgress(progress);
        });
    });
    
    // Progress bar update function
    function updateProgress(percentage) {
        progressBar.style.width = percentage + '%';
    }
    
    // Handle section visibility on scroll
    window.addEventListener('scroll', function() {
        // This is a simplified implementation
        // In a real implementation, you would check which section is visible
        // and update both the progress bar and active links accordingly
    });
    
    // Add smooth scrolling for section links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
