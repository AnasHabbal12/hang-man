//latters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

console.log(lettersArray);

//Select Letters Container
let lattersContainer = document.querySelector(".letters");

//Generate Letters 
lettersArray.forEach(letter => {

//Create Span
let span = document.createElement("span");
//Create Letter Terxt Node
let theLetter = document.createTextNode(letter);
//Append the letter to the span
span.appendChild(theLetter);
//Add Class To Span
span.className = 'letter-box';
//Append Sapn to The latters Container
lattersContainer.appendChild(span);

});

// Object Of Words And Categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception" , "Parasite", "Intersteller", "Whiplash", "Memento", "Coco", "Up"],
    peaple: ["Albert Einstein", "Hichcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palastine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
// Get Random Property
let allKeys = Object.keys(words);
// Get Random Number
let randomPropertyNumber = Math.floor(Math.random() * allKeys.length);
// Category
let randomPropName = allKeys[randomPropertyNumber];
// Category Words
let randomPropValue = words[randomPropName];
// Get Random Number Depend on Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length );
// Get Random Name Depend on Number
let randomValueValue = randomPropValue[randomValueNumber];
// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;


// Select Letters Guess Element
let letterGuessContainer = document.querySelector(".letters-guess");
//Convert Chosen Words To Array
let lettersAndSpace = Array.from(randomValueValue);
// Create Span Depend On Word
lettersAndSpace.forEach(letter => {
    //Create Empty Span
    let emptySpan = document.createElement("span");
    // If Letter Is Space
    if (letter == ' '){
        //Add Class To Span
        emptySpan.className = 'with-space';
    }
    //Append Span To The Guess Container 
    letterGuessContainer.appendChild(emptySpan);
});

// Select guessed spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttemps = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle CLicking on Letters
document.addEventListener("click", (e) => {
            
    // Set The Chosen Status
    let theStatus = false;

    if(e.target.className === 'letter-box')
    {
        e.target.classList.add("clicked");

        
        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        //The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        // The Chosen Word lettersAndSpace
        theChosenWord.forEach((wordLetter, wordIndex) => {
            // If The Clicked Letter Equal to Chosen Word Letter
            if(theClickedLetter == wordLetter){

                // Change the Status 
                theStatus = true;
                
                // loop on all guessed Spans
                guessSpans.forEach((span, spanIndex) => {
                    if(wordIndex === spanIndex){
                        span.innerHTML = theClickedLetter;
                    }
                })
            }
            
        });
        // Outside Loop
        console.log(theStatus);
        // If Letter Is Wrong
        if(theStatus !== true) {
            // Incease The wrong Attempts
            wrongAttemps++;
            // Add Class Wrong On The Draw Elemnt
            theDraw.classList.add(`wrong-${wrongAttemps}`);
            // Play Fail Sound
            document.getElementById("fail").play();
            if(wrongAttemps === 8) {
                endGame();
                lattersContainer.classList.add("finished");
            }
        }
        else {
            document.getElementById("success").play();
        }
    }
});

// End Game Function 
function endGame(){
    // Create Popup Div
    let div = document.createElement("div");
    // Create Text 
    let divText = document.createTextNode(`Game Over ,The Word Is ${randomValueValue}`);
    //Append Text 
    div.appendChild(divText);
    // Add Class
    div.className = "Popup";
    // Append Child To Body
    document.body.appendChild(div);
}