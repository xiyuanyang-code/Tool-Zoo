// Script for loading tool data in introduction.html using fetch API
document.addEventListener('DOMContentLoaded', function() {
  // Fetch data from JSON file
  fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
      // Get the introduction section
      const introSection = document.querySelector('.introduction');
      
      // Find the ToolZoo Lists section (h3 with text "ToolZoo Lists")
      const toolZooHeader = Array.from(introSection.querySelectorAll('h3')).find(h => h.textContent === 'ToolZoo Lists');
      
      // If we found the header, process the content after it
      if (toolZooHeader) {
        // Clear existing content after the header
        let nextElement = toolZooHeader.nextElementSibling;
        while (nextElement && nextElement.tagName !== 'H3') {
          const toRemove = nextElement;
          nextElement = nextElement.nextElementSibling;
          toRemove.remove();
        }
        
        // Add new content
        data.forEach(category => {
          if (category.category && category.tools) {
            // Create category div
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            
            // Add category title
            const titleElement = document.createElement('h4');
            titleElement.textContent = category.title;
            categoryDiv.appendChild(titleElement);
            
            // Create tools list
            const ul = document.createElement('ul');
            category.tools.forEach(tool => {
              const li = document.createElement('li');
              li.innerHTML = `<a href="${tool.url}">${tool.name}</a>: ${tool.description}`;
              ul.appendChild(li);
            });
            
            categoryDiv.appendChild(ul);
            introSection.insertBefore(categoryDiv, nextElement);
          }
        });
        
        // Handle author information
        const authorData = data.find(item => item.author);
        if (authorData && authorData.author) {
          // Find the "About the Author" header
          const authorHeader = Array.from(introSection.querySelectorAll('h3')).find(h => h.textContent === 'About the Author');
          if (authorHeader) {
            // Find the next paragraph after the header
            let nextPara = authorHeader.nextElementSibling;
            while (nextPara && nextPara.tagName !== 'P') {
              nextPara = nextPara.nextElementSibling;
            }
            
            if (nextPara) {
              // Update the author description
              nextPara.textContent = authorData.author.description;
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error loading data:', error);
    });
});