import './style.css'


document.querySelector('form').addEventListener('submit', ev => {
    ev.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const comment = document.querySelector('#comment').value;
    const template = `
        <user-comment name="${name}" email="${email}" comment="${comment}"></user-comment>
    `;
    document.querySelector('.comments').insertAdjacentHTML('afterbegin', template);
})