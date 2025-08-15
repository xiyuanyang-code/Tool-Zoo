// Script for loading tool data in index.html using fetch API
document.addEventListener('DOMContentLoaded', function() {
  // Fetch data from JSON file
  fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
      // Get the main content element
      const contentElement = document.querySelector('.content');
      
      // Clear existing content
      contentElement.innerHTML = '';
      
      // Process each category
      data.forEach(category => {
        if (category.category && category.tools) {
          // Create category container
          const categoryElement = document.createElement('div');
          categoryElement.className = 'category';
          
          // Add category title
          const titleElement = document.createElement('h3');
          titleElement.textContent = category.title;
          categoryElement.appendChild(titleElement);
          
          // Create a container for tools in this category
          const toolsContainer = document.createElement('div');
          toolsContainer.className = 'tools-container';
          toolsContainer.style.display = 'flex';
          toolsContainer.style.flexWrap = 'wrap';
          toolsContainer.style.gap = '20px';
          toolsContainer.style.marginBottom = '30px';
          
          // Add tools
          category.tools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.setAttribute('data-category', category.category);
            
            toolCard.innerHTML = `
              <div class="tag">${category.title}</div>
              <img src="${tool.imgs}" alt="${tool.name}" class="tool-image">
              <div class="tool-content">
                <h3 class="tool-title"><a href="${tool.url}">${tool.name}</a></h3>
                <p class="tool-description">${tool.description}</p>
              </div>
            `;
            
            toolsContainer.appendChild(toolCard);
          });
          
          categoryElement.appendChild(toolsContainer);
          contentElement.appendChild(categoryElement);
        }
      });
    })
    .catch(error => {
      console.error('Error loading data:', error);
    });
});