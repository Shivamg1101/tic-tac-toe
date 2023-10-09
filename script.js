const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//create a fucn to initialize
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //ui se hatao
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //boxes css properties initialise
        box.classList = `box box${index + 1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swap() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    }
    else {
        currentPlayer = "X"
    }
    //gameinfo update

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {

        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) &&
            (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check who is winner
            if (gameGrid[position[0]] === "X") {
                answer = "x";
            }
            else {
                answer = "O";
            }

            //disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //change background colour of winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //check for tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    })

    //board is filled ,game tie
    if (fillCount === 9) {
        gameInfo.innerText = `Game Tied!`;
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap kro
        swap();
        //check kro koi jeeta to ni
        checkGameOver();
    }
}

boxes.forEach((box, index) => {

    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);