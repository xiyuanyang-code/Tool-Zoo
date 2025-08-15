// Initialize a global variable to hold the data
// This ensures it exists even before the data is fetched.
window.toolData = null;

// Fetch the data from the data.json file
fetch('./data/data.json')
        .then(response => {
            // Check if the network response was successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON data from the response
            return response.json();
        })
        .then(data => {
            // Once the data is successfully fetched and parsed,
            // assign it to the global window.toolData variable.
            window.toolData = data;
            console.log('Data successfully loaded into window.toolData:', window.toolData);

            // Now you can call other functions that depend on this data
            // For example, a function to render your UI.
            // renderToolCards(window.toolData);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch operation
            console.error('There was a problem fetching the data:', error);
        });