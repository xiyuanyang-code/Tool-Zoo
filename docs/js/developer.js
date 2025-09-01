document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');

    const title = document.createElement('h2');
    title.textContent = 'Developing Projects';
    content.appendChild(title);

    const projectsContainer = document.createElement('div');
    projectsContainer.classList.add('projects-container');
    content.appendChild(projectsContainer);

    console.log('Fetching main data from /Tool-Zoo/data/data.json...');
    fetch('/Tool-Zoo/data/data.json')
        .then(response => {
            console.log('Main data fetch response received.');
            if (!response.ok) {
                console.error(`Error: HTTP status ${response.status} for ./data/data.json`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Main data loaded successfully:', data);
            const developingSection = data.find(item => item.developing);
            if (developingSection) {
                console.log('Found "developing" section.');
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

                    const detailPath = `/Tool-Zoo/data/dev/${project.detail_path}`;
                    console.log(`Fetching project detail for "${project.name}" from ${detailPath}...`);
                    fetch(detailPath)
                        .then(response => {
                            console.log(`Detail fetch response received for "${project.name}".`);
                            if (!response.ok) {
                                console.error(`Error: HTTP status ${response.status} for ${detailPath}`);
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(text => {
                            console.log(`Detail for "${project.name}" loaded successfully.`);
                            detailContainer.innerHTML = marked.parse(text);
                        })
                        .catch(error => {
                            console.error(`Could not fetch project detail for "${project.name}":`, error);
                            detailContainer.innerHTML = '<p>Error loading project details.</p>';
                        });

                    projectContainer.appendChild(projectName);
                    projectContainer.appendChild(projectDescription);
                    projectContainer.appendChild(detailContainer);
                    projectsContainer.appendChild(projectContainer);
                });
            } else {
                console.warn('No "developing" section found in the data.');
            }
        })
        .catch(error => {
            console.error('Could not fetch main data:', error);
            content.innerHTML = '<h2>Error Loading Projects</h2><p>Please check the console for more details.</p>';
        });
});