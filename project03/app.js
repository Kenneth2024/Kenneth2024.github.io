// Fetch data from the static API using async/await or .then syntax

// Handlebars template for quiz questions
const quizTemplateSource = document.getElementById("quiz-template").innerHTML;
const quizTemplate = Handlebars.compile(quizTemplateSource);

// Handlebars template for quiz result
const resultTemplateSource = document.getElementById("result-template").innerHTML;
const resultTemplate = Handlebars.compile(resultTemplateSource);

// Logic to start the quiz
function startQuiz() {
    const name = document.getElementById("name").value;
    const selectedQuiz = document.getElementById("quiz-select").value;

    // Fetch quiz data for the selected quiz asynchronously
    fetchQuizData(selectedQuiz)
        .then(quizData => {
            // Render the quiz questions using the Handlebars template
            const quizHtml = quizTemplate(quizData);
            // Display the quiz questions in the current view
            // Add event listeners to handle user responses
        })
        .catch(error => {
            console.error("Error fetching quiz data:", error);
        });
}

// Logic to handle user responses and calculate the result
// Update the view accordingly

// Similar functions for handling quiz result and displaying the result view
