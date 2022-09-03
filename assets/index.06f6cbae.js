const c=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&n(m)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}};c();class a extends HTMLElement{connectedCallback(){const e=Math.random()*100;this.innerHTML=`
        <section class="comment">
          <div class="user-info">
            <img src="https://picsum.photos/100?num=${e}" alt="Your avatar!" class="avatar" />
            <div>
              <p>${this.getAttribute("name")}</p>
              <p>${this.getAttribute("email")}</p>
            </div>
          </div>
          <p class="comment-text">${this.getAttribute("comment")}</p>
          <p>${this.getAttribute("timestamp")}</p>
          
        </section>
        `}}customElements.define("user-comment",a);class l{constructor(){this.comments=[{name:"Julius",email:"julius@gmail.com",comment:"Here is my comment!",timestamp:"7/29/2022 3:15:13PM"},{name:"Adwaina",email:"adwaina@gmail.com",comment:"text text text text text text text text text text ",timestamp:"8/3/2022 3:15:13PM"},{name:"Monique",email:"mo@gmail.com",comment:"text text text text text text text text text text ",timestamp:"8/4/2022 3:15:13PM"}],this.subscribers=[]}addCommentToStore(e){var t=this.db.transaction(["comments"],"readwrite"),n=t.objectStore("comments");console.log(n);var o=n.add(e);o.onerror=function(r){console.log("Error",r.target.error.name)},o.onsuccess=function(r){console.log("Notify the app!")},t.oncomplete=()=>{db.close()}}setStore(e){console.log("setStore"),this.db=e;var t=this.db.transaction(["comments"],"readwrite"),n=t.objectStore("comments");console.log(n),t.oncomplete=()=>{e.close()}}addComment(e){this.comments.push(e),console.log(this.comments);for(let t=0;t<this.subscribers.length;t++){const n=this.subscribers[t],o=n[0],r=n[1];o==="comment-added"&&(console.log("notifying my subscriber"),r(this.comments))}}subscribe(e,t){this.subscribers.push([e,t])}}class d{constructor(e){e.subscribe("comment-added",this.redraw.bind(this)),this.redraw(e.comments)}redraw(e){document.querySelector(".comments").innerHTML="",console.log(e);for(let t=0;t<e.length;t++){let n=`
                <user-comment 
                    name="${e[t].name}" 
                    email="${e[t].email}" 
                    comment="${e[t].comment}"
                    timestamp="${e[t].timestamp}">
                </user-comment>
            `;document.querySelector(".comments").insertAdjacentHTML("afterbegin",n)}}}class u{constructor(e){this.stateManager=e;const t=`
        <form action="#">
            <h2>Add New Comment</h2>
            <div class="row">
                <label for="name">Name:</label>
                <input type="text" id="name" placeholder="Your name" required />
            </div>
            <div class="row">
                <label for="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Your email address"
                    required
                />
            </div>
            <div class="row">
                <label for="comment">Comment:</label>
                <textarea id="comment" required></textarea>
            </div>
            <div class="row">
                <label for="agree">I agree</label>
                <input
                    type="checkbox"
                    id="agree"
                    placeholder="I agree"
                    required
                />
            </div>
        
            <div class="row">
                <button type="submit">Add Comment</button>
            </div>
        </form>
        `;document.querySelector(".form-container").innerHTML=t,document.querySelector("form").addEventListener("submit",this.addComment.bind(this))}addComment(e){e.preventDefault();const t=new Date;let n=t.toLocaleDateString();n+=" "+t.toLocaleTimeString();const o={name:document.querySelector("#name").value,email:document.querySelector("#email").value,comment:document.querySelector("#comment").value,timestamp:n};console.log(o),this.stateManager.addComment(o),document.querySelector("#name").value="",document.querySelector("#email").value="",document.querySelector("#comment").value="",document.querySelector("#agree").checked=!1}}class h{constructor(e){e.subscribe("comment-added",this.redraw.bind(this)),this.redraw(e.comments)}redraw(e){document.querySelector(".counter-display").innerHTML=`
            <h2>This Page has ${e.length} Comment(s)</h2>
        `}greeting(){console.log("Hello world!")}}const i=new l;new h(i);new d(i);new u(i);
