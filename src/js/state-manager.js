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

import Database from "./database.js";

export default class StateManager {
  // 1. constructor method:
  //      sets up the datastore (this.comments array) and
  //      sets up the subscribers (this.subscribers array)
  constructor() {
    this.comments = [];
    this.subscribers = [];
    this.database = new Database();
    this.loadComments();
  }
  loadComments() {
    // 1. create a callback function that will fire after the
    // favorites loaded:
    const callbackFunction = function (commentList) {
      console.log(commentList);
      this.comments = commentList;
      this.notify("comments-loaded", this.comments);
    };

    // 2. Invoke the "getAll" method, with the callback function
    // as an argument. When getAll finishes loading the favorites,
    // it will fire the callback function with the favorites.
    this.database.getAll(callbackFunction.bind(this));
  }
  addCommentToStore(comment) {
    var transaction = this.db.transaction(["comments"], "readwrite");
    var comments = transaction.objectStore("comments");
    console.log(comments);
    var request = comments.add(comment);

    request.onerror = function (e) {
      console.log("Error", e.target.error.name);
    };
    request.onsuccess = function (e) {
      console.log("Notify the app!");
    };

    // Commit: close connection
    transaction.oncomplete = () => {
      db.close();
    };
  }
  setStore(db) {
    console.log("setStore");
    this.db = db;
    // console.log(this.db);
    var transaction = this.db.transaction(["comments"], "readwrite");
    var comments = transaction.objectStore("comments");
    console.log(comments);
    transaction.oncomplete = () => {
      db.close();
    };
  }

  // 2. Method to add a new comment and to update
  // subscribers who are listening to the
  // "comment-added" event:
  addComment(newComment) {
    // "push" method of an array appends an item to the bottom
    newComment.id = this.comments.length + 1;
    this.comments.push(newComment);
    console.log(this.comments);
    console.log("I am about to save the movie to the DB!");
    this.database.addOrUpdate(newComment, function () {
      console.log("Successfully added to the database");
    });
    this.notify("comment-added", this.comments);
  }

  notify(eventName, data) {
    // loops through all of the subscribers
    // and invokes the subscriber's function if they're interested
    // in the particular event.
    for (let i = 0; i < this.subscribers.length; i++) {
      const subscriber = this.subscribers[i];

      const subscriberEvent = subscriber[0];
      const callbackFunction = subscriber[1];

      // is the event that was just fired something that
      // the subscriber is interested in?
      if (eventName == subscriberEvent) {
        callbackFunction(data);
      }
    }
  }

  // 3. method that allows other components to subscribe
  // to specific events, and which functions to invoke
  // when those events are triggered:
  subscribe(theEvent, theResponse) {
    this.subscribers.push([theEvent, theResponse]);
  }
}
