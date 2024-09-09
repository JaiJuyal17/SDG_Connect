// TYPEWRITING ANIMATION -----------------------------------------------------------------
var msgs = [
    "SDG Connect",
    
  ];
  
  // Typewriting Program
  var msgIdx = -1;
  function nextMsg (){
    msgIdx = (msgIdx+1)%msgs.length;
    return Array.from(msgs[msgIdx]);
  }
  
  var stkVisible = [];
  var stkInvisible = nextMsg().reverse();
  var forward = true;
  
  function typeNextIn(time){
    var txt = document.getElementById("txt");
    txt.innerHTML = stkVisible.join("");
    setTimeout( ()=>{
      if(forward){
        stkVisible.push(stkInvisible.pop());
        if(stkInvisible.length === 0){
          typeNextIn(800);
          forward = false;
        }
        else{
          typeNextIn(250); 
        }
      }
      else{
        stkInvisible.push(stkVisible.pop());
        if(stkVisible.length == 0){
          forward = true;
          stkInvisible = nextMsg().reverse();
          typeNextIn(1000);
        }
        else{
          typeNextIn(100); 
        }
      }
    }, time);
  };
  
  function blinkCursor(){
    setInterval(
      () => {
        toggleVisiblity();
      },
    350);
  }
  
  function toggleVisiblity(){
    var cursor  = document.getElementById("cursor");
        cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden': 'visible';
  }
  
  typeNextIn(0);
  blinkCursor();











  document.addEventListener('DOMContentLoaded', () => {
    const countdown = document.getElementById('countdown');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const targetDate = new Date('October 5, 2024 00:00:00').getTime();
        const now = new Date().getTime();
        const timeDifference = targetDate - now;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;

        if (timeDifference < 0) {
            clearInterval(countdownInterval);
            countdown.innerHTML = "The event has started!";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display immediately
});




// script.js

document.getElementById("chatbot-send").addEventListener("click", function() {
  const userMessage = document.getElementById("chatbot-input").value;
  if (userMessage.trim() === "") return;

  // Display the user's message in the chat window
  displayMessage(userMessage, 'user');

  // Clear the input field
  document.getElementById("chatbot-input").value = "";

  // Fetch the chatbot response from an API
  fetchChatbotResponse(userMessage);
});

function displayMessage(message, sender) {
  const messageContainer = document.createElement("div");
  messageContainer.className = `message ${sender}`;
  messageContainer.textContent = message;
  document.getElementById("chatbot-messages").appendChild(messageContainer);
}

async function fetchChatbotResponse(userMessage) {
  const response = await fetch('https://api.example.com/chatbot', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();
  displayMessage(data.reply, 'bot');
}
