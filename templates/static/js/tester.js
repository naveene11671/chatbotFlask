const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
];

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "../static/images/bot3.jpg";
const PERSON_IMG = "../static/images/j.gif";
// const BOT_NAME = "GYaaनी";
const BOT_NAME = "Jiya";
const PERSON_NAME = "";

let count = 1;
document.getElementById("toggleBot").addEventListener("click", () => {
  count += 1;
  if (count % 2 == 0) {
    let form = document.getElementById("msger").classList.add("msgerShow");
  }
  if (count % 2 != 0) {
    let form = document.getElementById("msger").classList.remove("msgerShow");
    let form2 = document.getElementById("msger").classList.add("msgerHide");
  }
});

msgerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  var msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse(msgText);
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">

    ${
      side == "left"
        ? `<div class="msg-img" style="background-image: url(${img})"></div>`
        : ""
    }

      <div class=" msg-text">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class=${
          side == "right" ? "msgInside_right" : "msgInside_left"
        }>${text}</div>
      </div>
    </div>


    
    
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

let loaderDiv = document.getElementById("loader");

function showLoader() {
  loaderDiv.classList.remove("hideLoader");
}

function hideLoader() {
  loaderDiv.classList.add("hideLoader");
}

function botResponse(msgText) {
  const chatBotUri = "http://127.0.0.1:5000/chatbot"
  console.log("fetching...");
  (async () => {
    showLoader();
    const rawResponse = await fetch(chatBotUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_input: msgText }),
      // body: JSON.stringify({"message":msgText,"conversationId":"","currentDialogNumber":""})
    });
    hideLoader();
    console.log("hi");
    const content = await rawResponse.json();
    console.log(content);
    appendMessage(BOT_NAME, BOT_IMG, "left", content.output);
    // appendMessage(BOT_NAME, BOT_IMG, "left", content.message);
  })();
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
