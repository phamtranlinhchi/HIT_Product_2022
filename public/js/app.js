let username;
let socket = io();
do {
  username = prompt("Enter your name: ");
} while (!username);

// const res = await fetch("/api/commentBooks/fetch");
// console.log(res);

const textarea = document.querySelector("#textarea");
const submitBtn = document.querySelector("#submitBtn");
const commentBox = document.querySelector(".comment__box");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let commentBookContent = textarea.value;
  if (!commentBookContent) {
    return;
  }
  postComment(commentBookContent);
});

function postComment(commentBookContent) {
  // Append to dom
  let data = {
    users: username,
    commentBookContent,
  };
  appendToDom(data);
  textarea.value = "";
  // Broadcast
  broadcastComment(data);
  // Sync with Mongo Db
  syncWithDb(data);
}

function appendToDom(data) {
  let lTag = document.createElement("li");
  lTag.classList.add("comment", "mb-3");

  let markup = `
                        <div class="card border-light mb-3">
                            <div class="card-body">
                                <h6>${data.users}</h6>
                                <p>${data.commentBookContent}</p>
                                <div>
                                    <img src="/img/clock.png" alt="clock">
                                    <small>${moment(data.time).format(
                                      "LT"
                                    )}</small>
                                </div>
                            </div>
                        </div>
    `;
  lTag.innerHTML = markup;

  commentBox.prepend(lTag);
}

function broadcastComment(data) {
  // Socket
  socket.emit("comment", data);
}

socket.on("comment", (data) => {
  appendToDom(data);
});
let timerId = null;
function debounce(func, timer) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    func();
  }, timer);
}
let typingDiv = document.querySelector(".typing");
socket.on("typing", (data) => {
  typingDiv.innerText = `${data.username} is typing...`;
  debounce(function () {
    typingDiv.innerText = "";
  }, 1000);
});

// Event listner on textarea
textarea.addEventListener("keyup", (e) => {
  socket.emit("typing", { username });
});

// Api calls

function syncWithDb(data) {
  console.log(data);
  const headers = {
    "Content-Type": "application/json",
  };
  fetch("/api/commentBooks", {
    method: "Post",
    body: JSON.stringify(data),
    headers,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
}

function fetchComments() {
  fetch("/api/commentBooks")
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      result.forEach((commentBookContent) => {
        commentBookContent.time = commentBookContent.createdAt;
        appendToDom(commentBookContent);
      });
    });
}

window.onload = fetchComments;
