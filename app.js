class Forca {
  palavraSecreta = "";

  constructor(palavraSecreta) {
    this.palavraSecreta = palavraSecreta.toLowerCase();
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
    const palavraSecretaArray = this.palavraSecreta.split("");

    for (let i = 0; i < palavraSecretaArray.length; i++) {
      if (letra === palavraSecretaArray[i]) {
        this.dados.palavra[i] = letra;
      }
    }
  }

  buscarEstado() {
    if (this.dados.vidas === 0) {
      return "perdeu";
    }

    if (
      this.dados.palavra.join("") === this.palavraSecreta &&
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
        this.palavraSecreta.split("").includes(e.target.innerText.toLowerCase())
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
    switch (this.buscarEstado()) {
      case "ganhou":
        alert("você ganhou");
        break;
      case "perdeu":
        alert("você perdeu");
      default:
        break;
    }
  }
}

// module.exports = Forca;

const jogo = new Forca("laranja");

jogo.init();

// async function getWord() {
//   data =
// }


const startButton = document.querySelector(".start-section_start-button");

startButton.addEventListener("click", () => {
  
})
