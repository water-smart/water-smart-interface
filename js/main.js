
function startButton(){ 
  document.getElementById("startButton").style.display = 'none';
  document.getElementById("wsLogoL").style.display = 'none';
  document.getElementById("nextButton").style.display = 'block';
  document.getElementById("scenarioTitle").style.display = 'block';
  document.getElementById("scenarioBody").style.display = 'block';
  // audio toggle

}

function nextButton(){
  document.getElementById("wsLogoS").style.display = 'inline-block';
  document.getElementById("questions").style.display = 'block';
  document.getElementById("answers").style.display = 'block';
  document.getElementById("checkAnswers").style.display = 'block';
  document.getElementById("checker").style.display = 'block';
  document.getElementById("nextButton").style.display = 'none';
  document.getElementById("scenarioTitle").style.display = 'none';
  document.getElementById("scenarioBody").style.display = 'none';
  // document.getElementById("quiz").style.display = 'none';
  // document.getElementById("sequence").style.display = 'grid';
}
//SOUND Start
let listSound = [
  "3 beep high", // 0
  "3 beep low", // 1
  "Bell", // 2
  "Boom", // 3
  "Correct", // 4
  "Ding", // 5
  "Drop", // 6
  "Gong", // 7
  "Music Short", // 8
  "Piano Down", // 9
  "Piano Up", // 10
  "Sticks Strings", // 11
  "Synth down", // 12
  "Synth stab", // 13
  "String stab", // 14
  "robot up", // 15
  "robot down", // 16
  "robot spam", // 17
  "Loser", // 18
  "Loser slow", // 19
  "Doorbell", // 20
  "Horns", // 21
  "5 robot signals", // 22
  "long robot spam", // 23
  "4 robot signals", // 24
  "3 String stabs" // 25


];
document.querySelector('#startButton').addEventListener('click',startSound);
//Next sound below
document.querySelector('#nextButton').addEventListener('click',nextSound);



//Start / Next button sound
function startSound(){
  let track = new Audio();
  track.src = "sound/" +listSound[14] + ".wav";
  track.paused ? track.play() : track.pause();
}

function nextSound(){
  let track = new Audio();
  track.src = "sound/" +listSound[25] + ".wav";
  track.paused ? track.play() : track.pause();
}
//SOUND End

window.onload = function () {
  
    var questionArea = document.getElementsByClassName('questions')[0],
        answerArea = document.getElementsByClassName('answers')[0],
        checker = document.getElementsByClassName('checker')[0],
        current = 0,
    
       // An object that holds all the questions + possible answers.
       // In the array --> last digit gives the right answer position
        allQuestions = {
          'What is the recommended amount of water a human should drink per day?' : ['16 cups', '8 cups', '10 cups', '5 cups', 1],
          
          'How much water does the average Canadian use per day?' : ['329L', '500L' , '238L', '1239L', 0],
                  
          'Which fruit or vegetable requires the most water to produce?' : ['Blueberries', 'Olives', 'Mangos', 'Corn', 1],
          
          'How many days can a human survive without water?' : ['14 days', '6 days', '3 days', '1 day', 2],
          
          'How many cups of water do you need to make a box of Kraft Dinner?' : ['6 cups', '3 cups' , '1.5 cups', '8 cups', 0],
                  
          'What is the chemical composition of water?' : ['H2O', 'CO2', 'O2', 'H2O2', 0],
        };
        
    function loadQuestion(curr) {
    // This function loads all the question into the questionArea
    // It grabs the current question based on the 'current'-variable
    
      var question = Object.keys(allQuestions)[curr];
      
      questionArea.innerHTML = '';
      questionArea.innerHTML = question;    
      document.getElementById("sequence").style.display = 'none';
      document.getElementById("checker").style.display = 'none';

    }
    
    function loadAnswers(curr) {
    // This function loads all the possible answers of the given question
    // It grabs the needed answer-array with the help of the current-variable
    // Every answer is added with an 'onclick'-function
    
      var answers = allQuestions[Object.keys(allQuestions)[curr]];
      
      answerArea.innerHTML = '';

      
      for (var i = 0; i < answers.length -1; i += 1) {
        var createDiv = document.createElement('div'),
            text = document.createTextNode(answers[i]);
        
        createDiv.appendChild(text);      
        createDiv.addEventListener("click", checkAnswer(i, answers));
        
        
        answerArea.appendChild(createDiv);
      }
    }
    
    function checkAnswer(i, arr) {
      // This is the function that will run, when clicked on one of the answers
      // Check if givenAnswer is sams as the correct one
      // After this, check if it's the last question:
      // If it is: empty the answerArea and let them know it's done.

      
      return function () {
        var givenAnswer = i,
            correctAnswer = arr[arr.length-1];

      // below triggers screen to disappear instead of say 'Done'     
            //  wrapperArea  = document.getElementsByClassName('wrapper')[0];

        if (givenAnswer === correctAnswer) {
          addChecker(true);             
         // window.alert("wrong");
          let track = new Audio();
          track.src = "sound/" +listSound[21] + ".wav";
          track.paused ? track.play() : track.pause();

        } else {
          addChecker(false);
        //  window.alert("wrong");
          let track = new Audio();
          track.src = "sound/" +listSound[18] + ".wav";
          track.paused ? track.play() : track.pause();
                
        }
        
        if (current < Object.keys(allQuestions).length -1) {
          current += 1;
          loadQuestion(current);
          loadAnswers(current);
        } else {
          // questionArea.innerHTML = 'Done';
          answerArea.innerHTML = '';
    // below triggers screen to disappear instead of say 'Done'     
          // wrapperArea.innerHTML = '';
          document.getElementById("questions").style.display = 'none';
          document.getElementById("sequence").style.display = 'grid';
          document.getElementById("icons").style.display = 'grid';
          document.getElementById("wrapper").style.display = 'none';

        }
                                
      };
    }
    
    function addChecker(bool) {
    // This function adds a div element to the page
    // Used to see if it was correct or false
    
      var createDiv = document.createElement('div'),
          txt       = document.createTextNode(current + 1);
      
      createDiv.appendChild(txt);
      
      if (bool) {
        
        createDiv.className += 'correct';
        checker.appendChild(createDiv);
      } else {
        createDiv.className += 'false';
        checker.appendChild(createDiv);
      }
    }
    
    // Start the quiz right away
    loadQuestion(current);
    loadAnswers(current);
    
  };
