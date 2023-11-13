// app.js
const apiEndpoint = 'https://my-json-server.typicode.com/Kenneth2024/project03database';

let quizData, currentQuestionIndex, correctAnswers, startTime;

document.addEventListener('DOMContentLoaded', async function () {
  try {
      const response = await fetch('https://raw.githubusercontent.com/your-username/your-repo/main/questions.json');
      const data = await response.json();
      // Process the data and initialize your application
  } catch (error) {
      console.error('Error fetching data:', error);
  }
});

function loadTemplate(templateId, data) {
  const source = $('#' + templateId).html();
  const template = Handlebars.compile(source);
  return template(data);
}

function startQuiz(name, selectedQuiz) {
    // Fetch quiz data asynchronously
    $.getJSON(`${apiEndpoint}/${selectedQuiz}`).done(data => {
        quizData = data;
        currentQuestionIndex = 0;
        correctAnswers = 0;
        startTime = new Date().getTime();
        showNextQuestion();
    });
}

function showNextQuestion() {
    if (currentQuestionIndex < quizData.questions.length) {
        const question = quizData.questions[currentQuestionIndex];
        showView('quizPage', {
            questionIndex: currentQuestionIndex + 1,
            questionText: question.text,
            isMultipleChoice: question.type === 'multiple-choice',
            options: question.options
        });
    } else {
        showEndPage();
    }
}

function showFeedback(isCorrect, correctAnswer) {
    showView('feedbackPage', { isCorrect, correctAnswer });
}

function showEndPage() {
    const elapsedSeconds = (new Date().getTime() - startTime) / 1000;
    const score = Math.round((correctAnswers / quizData.questions.length) * 100);
    const passed = score > 80;
    showView('endPage', {
        name: quizData.name,
        passed,
        elapsedSeconds,
        correctAnswers,
        totalQuestions: quizData.questions.length
    });
}

// Event handlers
$(document).on('submit', '#startForm', function (e) {
    e.preventDefault();
    const name = $('#name').val();
    const selectedQuiz = $('#quiz').val();
    showView('quizPage', { name });
    startQuiz(name, selectedQuiz);
});

$(document).on('click', '#submitAnswer', function () {
    const userAnswer = $('input[type=text]').val(); // Adjust selector based on your needs
    const question = quizData.questions[currentQuestionIndex];

    if (question.type === 'multiple-choice') {
        // Adjust the logic for multiple-choice questions
        // Check if userAnswer is equal to the correct answer
    } else {
        // Check if userAnswer is equal to the correct answer
        const isCorrect = userAnswer.toLowerCase() === question.answer.toLowerCase();
        if (isCorrect) {
            correctAnswers++;
            showFeedback(true);
            setTimeout(() => {
                currentQuestionIndex++;
                showNextQuestion();
            }, 1000);
        } else {
            showFeedback(false, question.answer);
        }
    }
});

$(document).on('click', '#gotIt', function () {
    currentQuestionIndex++;
    showNextQuestion();
});

$(document).on('click', '#restartQuiz', function () {
    showView('startPage');
});

$(document).on('click', '#goToStart', function () {
    showView('startPage');
});
