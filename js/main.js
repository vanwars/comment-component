import '../style.css'
import StateManager from 'state-manager.js'
import CommentList from 'comment-list.js'

/*
Goal:
1. Create a new instance of the state manager
2. Create a new instance of the comment list
    * the comment list needs the data from the state manager
      so that it knows how to draw the comments.
*/

const stateManager = new StateManager();
const commentList = new CommentList(stateManager.comments);












// const addComment = ev => {
//     ev.preventDefault();

//     // get user inputs from the DOM:
//     const name = document.querySelector('#name').value;
//     const email = document.querySelector('#email').value;
//     const comment = document.querySelector('#comment').value;
    
//     // build the custom tag using template literals:
//     const template = `
//         <user-comment name="${name}" email="${email}" comment="${comment}"></user-comment>
//     `;

//     // add the new tag to the DOM:
//     document.querySelector('.comments').insertAdjacentHTML('afterbegin', template);
// };



// document.querySelector('form').addEventListener('submit', addComment);