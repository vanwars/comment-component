import './style.css'

const addComment = ev => {
    ev.preventDefault();

    // get user inputs from the DOM:
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const comment = document.querySelector('#comment').value;
    
    // build the custom tag using template literals:
    const template = `
        <user-comment name="${name}" email="${email}" comment="${comment}"></user-comment>
    `;

    // add the new tag to the DOM:
    document.querySelector('.comments').insertAdjacentHTML('afterbegin', template);
};



document.querySelector('form').addEventListener('submit', addComment);