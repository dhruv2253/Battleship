import createGame from "./DOM";


const content = createGame();

const newGameButton = document.querySelector('.new-game')

content.createAiBoard();
content.createUserBoard();

newGameButton.addEventListener('click', () => {
    content.startGame();
})



