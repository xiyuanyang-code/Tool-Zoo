document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');

    const title = document.createElement('h2');
    title.textContent = 'Developing Projects';
    content.appendChild(title);

    const projectsContainer = document.createElement('div');
    projectsContainer.classList.add('projects-container');
    content.appendChild(projectsContainer);

    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            const developingSection = data.find(item => item.developing);
            if (developingSection) {
                const projects = developingSection.developing;
                projects.forEach(project => {
                    const projectContainer = document.createElement('div');
                    projectContainer.classList.add('introduction');

                    const projectName = document.createElement('h2');
                    projectName.textContent = project.name;

                    const projectDescription = document.createElement('p');
                    projectDescription.textContent = project.description;

                    const detailContainer = document.createElement('div');
                    detailContainer.classList.add('detail-container');

                    fetch(`./data/dev/${project.detail_path}`)
                        .then(response => response.text())
                        .then(text => {
                            detailContainer.innerHTML = marked.parse(text);
                        });

                    projectContainer.appendChild(projectName);
                    projectContainer.appendChild(projectDescription);
                    projectContainer.appendChild(detailContainer);
                    projectsContainer.appendChild(projectContainer);
                });
            }
        });
});