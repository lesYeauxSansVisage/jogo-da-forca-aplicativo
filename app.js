class Forca {
  palavraSecreta = "";

  constructor(palavraSecreta) {
    this.palavraSecreta = palavraSecreta.split("");

    console.log(this.palavraSecreta);
    this.dados.palavra = "_".repeat(palavraSecreta.length).split("");
  }

  init() {
    this.createButtons();
    this.renderDisplay();
  }

  dados = {
    letrasChutadas: [],
    vidas: 6,
    palavra: [],
  };

  chutar(letra) {
    letra = letra.toLowerCase();

    if (this.validarChute(letra)) {
      this.dados.letrasChutadas.push(letra);

      if (this.palavraSecreta.includes(letra)) {
        this.preencherLetras(letra);
      } else {
        this.dados.vidas -= 1;
      }
    }
  }

  validarChute(chute) {
    return (
      chute.length === 1 &&
      !this.dados.letrasChutadas.includes(chute) &&
      /[a-zA-Z]/.test(chute)
    );
  }

  preencherLetras(letra) {
    // const palavraSecretaArray = this.palavraSecreta.split("");

    // console.log(palavraSecretaArray);

    for (let i = 0; i < this.palavraSecreta.length; i++) {
      if (letra === this.palavraSecreta[i]) {
        this.dados.palavra[i] = letra;
      }
    }
  }

  buscarEstado() {
    if (this.dados.vidas === 0) {
      return "perdeu";
    }

    if (
      this.dados.palavra.join("") === this.palavraSecreta.join("") &&
      this.dados.vidas > 0
    ) {
      return "ganhou";
    }

    return "aguardando chute";
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
    return {
      letrasChutadas: this.dados.letrasChutadas, // Deve conter todas as letras chutadas
      vidas: this.dados.vidas, // Quantidade de vidas restantes
      palavra: this.dados.palavra, // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
    };
  }

  renderDisplay() {
    const display = document.querySelector(".game-section__display");
    const vidasEl = document.querySelector(".vidas");

    vidasEl.innerHTML = "";
    display.innerHTML = "";

    const displayLetters = this.dados.palavra;

    for (let x = 0; x < this.dados.vidas; x++) {
      vidasEl.innerHTML += '<i class="fa-solid fa-heart-circle-bolt"></i>';
    }

    displayLetters.forEach((letter) => {
      const displayWord = document.createElement("div");
      displayWord.innerText = letter.toUpperCase();
      display.append(displayWord);
    });
  }

  createButtons() {
    const gameLettersDiv = document.querySelector(".game-letters");

    const handleClick = (e) => {
      if (e.target.classList.contains("letter-button")) {
        this.palavraSecreta.includes(e.target.innerText.toLowerCase())
          ? e.target.classList.add("correct")
          : e.target.classList.add("wrong");

        this.chutar(e.target.innerText);
        this.renderDisplay();
        e.target.disabled = true;
        this.avaliarResultados();
      }
    };

    gameLettersDiv.innerHTML = "";

    for (let i = 65; i <= 90; i++) {
      const button = document.createElement("button");
      button.classList.add("letter-button");
      button.innerText = String.fromCharCode(i);
      button.addEventListener("click", handleClick);
      gameLettersDiv.append(button);
    }
  }

  avaliarResultados() {
    const revealWord = document.querySelector(".reveal-word");
    const endSection = document.querySelector(".end-section");

    switch (this.buscarEstado()) {
      case "ganhou":
        revealWord.innerText = this.palavraSecreta.join("");
        endSection.classList.remove("hide");
        break;
      case "perdeu":
        revealWord.innerText = this.palavraSecreta.join("");
        revealWord.parentElement.parentElement.classList.remove("hide");
      default:
        break;
    }
  }

  endGame(result) {}
}

// module.exports = Forca;

async function getWord() {
  const response = await fetch("https://api.dicionario-aberto.net/random");

  const data = await response.json();

  return data;
}

const startButton = document.querySelector("#start-button");
const endButton = document.querySelector("#end-button");

startButton.addEventListener("click", (e) => {
  startGame(e);
});

endButton.addEventListener("click", (e) => {
  startGame(e);
});

async function startGame(e) {
  const { word } = await getWord();

  const jogo = new Forca(word.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

  jogo.init();

  e.target.parentElement.classList.add("hide");
}
