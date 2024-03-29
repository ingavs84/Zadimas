document.addEventListener('DOMContentLoaded', function() {
    const demographicForm = document.getElementById('demographicForm');
    
    demographicForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

    // Assuming there's a button with the class 'startButton' to submit the form
    /*const startButton = document.querySelector('.startButton');

    startButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission*/

        const ageInput = document.getElementById('age');
        if (!ageInput.checkValidity()) {
            // If age input is invalid, display an error message or handle it as needed
            alert("Patikrinkite, ar teisingai nurodėte amžių (skaičiai iki 130).");
            return; // Exit the function, preventing further execution
        }    

        // Collect the form data
        const demographicsData = {
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            city: document.getElementById('city').value,
            profession: document.getElementById('profession').value,
            education: document.getElementById('education').value,
            fieldOfStudy: document.getElementById('fieldOfStudy').value,
            interestInTech: document.getElementById('interestInTech').value,
            aiExperience: document.getElementById('aiExperience').value,
            attitudeTowardsAi: document.getElementById('attitudeTowardsAi').value,
        };

        // Store the collected data into localStorage
        localStorage.setItem('demographicsData', JSON.stringify(demographicsData));

        // Redirect to the quiz page or the next part of the game
        window.location.href = './select.html'; // Update this to the correct path if needed
    });
});

