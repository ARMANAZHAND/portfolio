import { projects } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Populate projects
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && projects.length > 0) {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card fade-in';
            
            const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            
            card.innerHTML = `
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tags">${tagsHTML}</div>
                <p class="project-desc">${project.description}</p>
                <div class="project-links">
                    ${project.repoLink ? `<a href="${project.repoLink}" target="_blank" rel="noopener noreferrer">Code &rarr;</a>` : ''}
                    ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" rel="noopener noreferrer">Live Demo &rarr;</a>` : ''}
                </div>
            `;
            
            projectsGrid.appendChild(card);
        });
    }

    // Intersection Observer for scroll animations (fade-in)
    // We select fade-in elements here as well as those dynamically created above
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // only animate once
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    }, 100);
});
