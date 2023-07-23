// const intervalID = setInterval(myCallback, 500, "Parameter 1", "Parameter 2");

const h1 = document.getElementById("counter");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const likeButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const likes = document.querySelector(".likes");
const commentForm = document.getElementById("comment-form");
const commentsContainer = document.getElementById("list");
const submitButton = document.getElementById("submit");

plusButton.addEventListener("click", incrementCounter);
minusButton.addEventListener("click", decrementCounter);
likeButton.addEventListener("click", likeMessage);

let count = 0;
let paused = false;

// Start counter
function startCounter() {
  intervalID = setInterval(incrementCounter, 1000);
}

startCounter();

// Counter Functions
function counterValue() {
  h1.textContent = count;
}

function incrementCounter() {
  count++;
  counterValue();
}

function decrementCounter() {
  count--;
  counterValue();
}

// Likes

function likeMessage() {
  const newArr = [...likes.children];
  if (
    newArr
      .map((li) => {
        return parseInt(li.dataset.num);
      })
      .includes(count)
  ) {
    const li = document.querySelector('[data-num="' + count + '"]');
    li.children[0].textContent++;
  } else {
    const li = document.createElement("li");
    li.dataset.num = count;
    li.innerHTML = `${count} has been liked <span>1</span>  time`;
    likes.appendChild(li);
  }
}

// Pauses Counter

pauseButton.addEventListener("click", function () {
  paused = !paused;
  if (paused) {
    pauseCounter();
    plusButton.disabled = true;
    minusButton.disabled = true;
    likeButton.disabled = true;
    pauseButton.textContent = "resume";
    submitButton.disabled = true;
  } else {
    startCounter();
    plusButton.disabled = "";
    minusButton.disabled = "";
    likeButton.disabled = "";
    pauseButton.textContent = "pause";
    submitButton.disabled = "";
  }
});

function pauseCounter() {
  clearInterval(intervalID);
}

//  Comments

commentForm.addEventListener("submit", createComment);

function createComment(e) {
  e.preventDefault();
  const comment = e.target[0].value;
  const p = document.createElement("p");
  p.textContent = comment;
  commentsContainer.appendChild(p);
  commentForm.reset();
}
