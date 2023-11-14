let currentQuestion = undefined;
let currentModel = undefined;
let totalCorrectAnswers = 0;
let totalQuestions = 0;
let takerName = undefined;

function renderView(model, view, callback) {
    currentModel = model;

    let source = document.querySelector(view).innerHTML;
    let template = Handlebars.compile(source);
    let html = template(model);
    document.querySelector('#display-data').innerHTML = html;

    if (callback) {
        callback();
    }
};

function renderQuiz(quiz, question) {
    fetch(`https://my-json-server.typicode.com/Kenneth2024/kenneth2024.github.io/${quiz}/${question}`).then(v => v.json()).then(body => {
        renderView({
            ...body,
            totalCorrectAnswers,
        }, `#${body.type}`);

        document.querySelector("#form").onsubmit = (event) => {
            totalQuestions++;
            if (currentModel.type === "multipleChoice") {
                const answer = event.target.elements.choice.options.selectedIndex;
                if (answer === currentModel.correctChoice) {
                    totalCorrectAnswers++;
                    renderView({}, "#correctAnswer", () => {
                        document.querySelector("#form").onsubmit = () => {
                            renderQuiz(quiz, question + 1);
                            return false;
                        }
                    });
                } else {
                    const correctAnswer = currentModel.choices[currentModel.correctChoice];
                    renderView({ ...currentModel, correctAnswer }, "#incorrectAnswer", () => {
                        document.querySelector("#form").onsubmit = () => {
                            renderQuiz(quiz, question + 1);
                            return false;
                        }
                    });
                }
            } else if (currentModel.type === "narrative") {
                console.log(event.target.elements.answer);
                const answer = event.target.elements.answer.value;
                if (answer === currentModel.correctAnswer) {
                    totalCorrectAnswers++;
                    renderView({}, "#correctAnswer", () => {
                        document.querySelector("#form").onsubmit = () => {
                            renderQuiz(quiz, question + 1);
                            return false;
                        }
                    });
                } else {
                    const correctAnswer = currentModel.correctAnswer;
                    renderView({ ...currentModel, correctAnswer }, "#incorrectAnswer", () => {
                        document.querySelector("#form").onsubmit = () => {
                            renderQuiz(quiz, question + 1);
                            return false;
                        }
                    });
                }
            } else if(currentModel.type === "image") {
                console.log(event.target.elements.answer);

                let answer;
                for(let i = 0; i < event.target.elements.answer.length; i++) {
                    if(event.target.elements.answer[i].checked) {
                        answer = i;
                    }
                }

                if (answer === currentModel.correctChoice) {
                    totalCorrectAnswers++;
                    renderView({}, "#correctAnswer", () => {
                        document.querySelector("#form").onsubmit = () => {
                            renderQuiz(quiz, question + 1);
                            return false;
                        }
                    });
                } else {
                    const correctAnswer = currentModel.choices[currentModel.correctChoice];
                    renderView({ ...currentModel, correctAnswer }, "#incorrectAnswer", () => {
                        document.querySelector("#form").onsubmit = () => {
                            renderQuiz(quiz, question + 1);
                            return false;
                        }
                    });
                }
            }
            return false;
        }
    }).catch(e => {
        console.log(totalCorrectAnswers);
        console.log(totalQuestions);
        console.log(totalCorrectAnswers / totalQuestions);
        renderView({ passed: totalCorrectAnswers / totalQuestions >= 0.8, takerName }, "#finalScreen");
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    fetch("https://my-json-server.typicode.com/Kenneth2024/kenneth2024.github.io/quizDetails").then(v => v.json()).then(body => {
        renderView({
            quizDetails: body
        }, '#initialScreen');

        document.querySelector('#submit').disabled = true;
        document.querySelector('#name').onkeyup = () => {
            document.querySelector("#submit").disabled = document.querySelector('#name').value.length === 0;
        };

        document.querySelector('#form').onsubmit = () => {
            takerName = document.querySelector("#name").value;

            let quiz = document.querySelector('#quiz-selection').value === "1" ? "questionsQ1" : "questionsQ2";
            let question = document.querySelector('#quiz-selection').value === "1" ? 1 : 2;
            currentQuestion = question;
            renderQuiz(quiz, question);
            return false;
        }

    });
});
