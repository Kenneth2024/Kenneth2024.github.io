let view = "0";

document.addEventListener('DOMContentLoaded', function () {

    // Rendering Initial View
    const initialView = renderView({}, '#startPage');
    document.querySelector('#display-data').innerHTML = initialView;

    // Disabling the button unless there is something typed
    const submitButton = document.querySelector('#submit');
    const nameInput = document.querySelector('#name');
    submitButton.disabled = true;

    nameInput.onkeyup = () => {
        submitButton.disabled = nameInput.value.length === 0;
    };

    document.querySelector('#form').onsubmit = () => {
        // Saving the entered name
        const name = nameInput.value;

        // Choosing the type of quiz
        const quizSelection = document.querySelector('#quiz-selection');
        const quizId = quizSelection.value === "1" ? "questionsQ1" : "questionsQ2";
        const qid = 1;

        backEndRestAPI(quizId, qid);
        const quizView = renderView(1, '#quiz_view1');
        document.querySelector('#display-data').innerHTML = quizView;

        return false;
    };

});

// Rendering View and Update DOM
function renderView(model, view) {
    const source = document.querySelector(view).innerHTML;
    const template = Handlebars.compile(source);
    const html = template(model);
    return html;
}

// Asynchronous Network Request
async function backEndRestAPI(quizId, qid) {
    const apiEndpoint = `https://my-json-server.typicode.com/Kenneth2024/kenneth2024.github.io/${quizId}/${qid}`;

    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        const htmlElement = renderView(data, view);
        document.querySelector('#display-data').innerHTML = htmlElement;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
