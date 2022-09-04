const l=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}};l();class d extends HTMLElement{connectedCallback(){const e=Math.random()*100;this.innerHTML=`
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
        `}}customElements.define("user-comment",d);class u{constructor(){this.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB,this.baseName="comment-database",this.storeName="comments",this.key="id"}connectDB(e){var t=this.indexedDB.open(this.baseName,1);t.onerror=this.logerr,t.onsuccess=function(){e(t.result)},t.onupgradeneeded=function(s){let o=s.target.result;console.log("running onupgradeneeded"),o.objectStoreNames.contains(this.storeName)||o.createObjectStore(this.storeName,{keyPath:this.key}),this.connectDB(e)}.bind(this)}getAll(e){this.connectDB(function(t){var s=[],o=t.transaction([this.storeName],"readonly").objectStore(this.storeName);o.mozGetAll?o.mozGetAll().onsuccess=function(n){e(n.target.result)}:o.openCursor().onsuccess=function(n){var r=n.target.result;r?(s.push(r.value),r.continue()):(s.sort(function(i,m){return i.timestamp<m.timestamp?1:i.timestamp>m.timestamp?-1:0}),e(s))}}.bind(this))}addOrUpdate(e,t){this.connectDB(function(s){const r=s.transaction([this.storeName],"readwrite").objectStore(this.storeName).put(e);r.onerror=function(i){console.log("Error",i.target.error.name)},r.onsuccess=function(i){console.log("Rows has been added / updated"),this.getAll(t)}.bind(this)}.bind(this))}remove(e,t){this.connectDB(function(s){var o=s.transaction([this.storeName],"readwrite"),n=o.objectStore(this.storeName),r=n.delete(e);r.onerror=function(i){console.error(i)},r.onsuccess=function(){console.log("Rows has been deleted: ",e),this.getAll(t)}.bind(this)}.bind(this))}get(e,t){this.connectDB(function(s){var o=s.transaction([this.storeName],"readonly").objectStore(this.storeName).get(e);o.onerror=function(n){console.error(n)},o.onsuccess=function(){t(o.result?o.result:-1)}}.bind(this))}}class h{constructor(){this.comments=[],this.subscribers=[],this.database=new u,this.loadComments()}loadComments(){const e=function(t){console.log(t),this.comments=t,this.notify("comments-loaded",this.comments)};this.database.getAll(e.bind(this))}addCommentToStore(e){var t=this.db.transaction(["comments"],"readwrite"),s=t.objectStore("comments");console.log(s);var o=s.add(e);o.onerror=function(n){console.log("Error",n.target.error.name)},o.onsuccess=function(n){console.log("Notify the app!")},t.oncomplete=()=>{db.close()}}setStore(e){console.log("setStore"),this.db=e;var t=this.db.transaction(["comments"],"readwrite"),s=t.objectStore("comments");console.log(s),t.oncomplete=()=>{e.close()}}addComment(e){e.id=this.comments.length+1,this.comments.push(e),console.log(this.comments),console.log("I am about to save the movie to the DB!"),this.database.addOrUpdate(e,function(){console.log("Successfully added to the database")}),this.notify("comment-added",this.comments)}notify(e,t){for(let s=0;s<this.subscribers.length;s++){const o=this.subscribers[s],n=o[0],r=o[1];e==n&&r(t)}}subscribe(e,t){this.subscribers.push([e,t])}}class b{constructor(e){e.subscribe("comment-added",this.redraw.bind(this)),e.subscribe("comments-loaded",this.redraw.bind(this)),this.redraw(e.comments)}redraw(e){document.querySelector(".comments").innerHTML="",console.log(e);for(let t=0;t<e.length;t++){let s=`
                <user-comment 
                    name="${e[t].name}" 
                    email="${e[t].email}" 
                    comment="${e[t].comment}"
                    timestamp="${e[t].timestamp}">
                </user-comment>
            `;document.querySelector(".comments").insertAdjacentHTML("afterbegin",s)}}}class f{constructor(e){this.stateManager=e;const t=`
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
        `;document.querySelector(".form-container").innerHTML=t,document.querySelector("form").addEventListener("submit",this.addComment.bind(this))}addComment(e){e.preventDefault();const t=new Date;let s=t.toLocaleDateString();s+=" "+t.toLocaleTimeString();const o={name:document.querySelector("#name").value,email:document.querySelector("#email").value,comment:document.querySelector("#comment").value,timestamp:s};console.log(o),this.stateManager.addComment(o),document.querySelector("#name").value="",document.querySelector("#email").value="",document.querySelector("#comment").value="",document.querySelector("#agree").checked=!1}}class p{constructor(e){e.subscribe("comment-added",this.redraw.bind(this)),e.subscribe("comments-loaded",this.redraw.bind(this)),this.redraw(e.comments)}redraw(e){document.querySelector(".counter-display").innerHTML=`
            <h2>This Page has ${e.length} Comment(s)</h2>
        `}greeting(){console.log("Hello world!")}}const a=new h;new p(a);new b(a);new f(a);
