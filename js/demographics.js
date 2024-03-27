document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('demographicForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        // Collecting form data
        const demographicsData = {
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            city: document.getElementById('city').value,
            profession: document.getElementById('profession').value,
            education: document.getElementById('education').value,
            field_of_study: document.getElementById('field_of_study').value,
            interest_in_tech: document.getElementById('interest_in_tech').value,
            ai_experience: document.getElementById('ai_experience').value,
            attitude_towards_ai: document.getElementById('attitude_towards_ai').value,
        };

        // Storing the collected data in localStorage
        localStorage.setItem('demographicsData', JSON.stringify(demographicsData));

        // Redirecting to the main game page (Adjust the filename as necessary)
        window.location.href = 'quizPage.html'; // Make sure this points to your game's start page
    });
});
