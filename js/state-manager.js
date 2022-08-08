/*
The job of the state manager is to: 
    1. + organize the data.
    2. update the data when a component notifies the state manager.
    3. let other components know when the data has changed.


Each comment has:
    1. Name of the person
    2. Email
    3. Comment
    4. Timestamp
*/

export default class StateManager {
    // 1. constructor method: 
    //      sets up the datastore (this.comments array) and
    //      sets up the subscribers (this.subscribers array)
    constructor() {
        this.comments = [
            {
                name: "Julius",
                email: "julius@gmail.com",
                comment: "Here is my comment!",
                timestamp: "7/29/2022 3:15:13PM"
            },
            {
                name: "Adwaina",
                email: "adwaina@gmail.com",
                comment: "text text text text text text text text text text ",
                timestamp: "8/3/2022 3:15:13PM"
            },
            {
                name: "Monique",
                email: "mo@gmail.com",
                comment: "text text text text text text text text text text ",
                timestamp: "8/4/2022 3:15:13PM"
            }
        ]

        // mailing list.
        this.subscribers = [];
    }

    // 2. Method to add a new comment and to update
    // subscribers who are listening to the 
    // "comment-added" event:
    addComment(newComment){
        // "push" method of an array appends an item to the bottom
        this.comments.push(newComment); 
        console.log(this.comments);

        // I need to notify everyone that a 'comments-updated' event has just 
        // happened! 
        // Q: Who do I notify?
        // A: My subscribers!!! (which are stored in this.subscribers (an array))
        // 
        // Q: How do I notify them?
        // A: I trigger the function they told me to trigger.
        for(let i = 0; i < this.subscribers.length; i++) {
            const subscriber = this.subscribers[i];
            const eventName = subscriber[0];
            const f = subscriber[1];
            if (eventName === 'comment-added') {
                console.log('notifying my subscriber');
                f(this.comments);
            }
        }
    }

    // 3. method that allows other components to subscribe 
    // to specific events, and which functions to invoke
    // when those events are triggered:
    subscribe(theEvent, theResponse) {
        this.subscribers.push([
            theEvent, theResponse
        ])
    }
}