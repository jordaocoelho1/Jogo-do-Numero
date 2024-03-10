// Lógica do Jogo em JavaScript
let secretNumber1, secretNumber2, currentPlayer, currentPlayerNumber;

function startGame() {
  const numberInput1 = document.getElementById("numberInput1");
  const numberInput2 = document.getElementById("numberInput2");

  // Verifica se ambos os jogadores escolheram seus números
  if (!isValidGuess(numberInput1.value) || !isValidGuess(numberInput2.value)) {
    alert("Por favor, insira um número de 4 dígitos diferentes.");
    return;
  }

  // Inicia o jogo
  secretNumber1 = numberInput1.value;
  secretNumber2 = numberInput2.value;
  currentPlayer = 1;
  currentPlayerNumber = secretNumber1;

  // Oculta a entrada dos jogadores e exibe a área de jogo
  document.getElementById("player1").style.display = "none";
  document.getElementById("player2").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  // Atualiza a área de jogo
  updateGameArea();
}

function makeGuess() {
  const guessInput = document.getElementById("guessInput");
  const feedbackElement = document.getElementById("feedback");

  const guess = guessInput.value;

  // Verifica se a entrada do jogador é válida
  if (!isValidGuess(guess)) {
    alert("Por favor, insira um número de 4 dígitos diferentes.");
    return;
  }

  // Fornecer feedback ao jogador
  const feedback = getFeedback(guess);
  feedbackElement.innerText = feedback;

  // Verifica se o jogador acertou
  if (feedback === "4A0B") {
    alert(`Parabéns! Jogador ${currentPlayer} acertou o número.`);
    resetGame();
  } else {
    // Troca para o próximo jogador
    currentPlayer = 3 - currentPlayer; // Alternância entre 1 e 2
    currentPlayerNumber = currentPlayer === 1 ? secretNumber1 : secretNumber2;
    updateGameArea();
  }

  // Limpa a entrada do jogador
  guessInput.value = "";
}

function isValidGuess(guess) {
  return /^\d{4}$/.test(guess) && new Set(guess).size === 4;
}

function getFeedback(guess) {
  const secretNumber = currentPlayerNumber;

  let correctDigits = 0;
  let correctPositions = 0;

  for (let i = 0; i < 4; i++) {
    if (guess[i] === secretNumber[i]) {
      correctPositions++;
    } else if (secretNumber.includes(guess[i])) {
      correctDigits++;
    }
  }

  return `${correctPositions}A${correctDigits}B`;
}

function updateGameArea() {
  document.getElementById(
    "currentPlayer"
  ).innerText = `Jogador Atual: ${currentPlayer}`;
}

function resetGame() {
  // Exibe a entrada dos jogadores e oculta a área de jogo
  document.getElementById("player1").style.display = "block";
  document.getElementById("player2").style.display = "block";
  document.getElementById("gameArea").style.display = "none";

  // Limpa os números escolhidos
  document.getElementById("numberInput1").value = "";
  document.getElementById("numberInput2").value = "";

  // Reinicia as variáveis
  secretNumber1 = "";
  secretNumber2 = "";
  currentPlayer = 1;
  currentPlayerNumber = "";
}

// Inicia o jogo quando a página é carregada
resetGame();
