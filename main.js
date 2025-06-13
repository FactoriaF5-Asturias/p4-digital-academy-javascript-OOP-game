class Game {
  constructor() {
    this.container = document.getElementById("game-container");
    this.puntosElement = document.getElementById("puntos");
    this.personaje = null;
    this.stars = [];
    this.puntuacion = 0;

    this.crearEscenario();
    this.agregarEventos();
  }

  crearEscenario() {
    // Create the <img> element for the background image
    const backgroundImg = document.createElement("img");
    backgroundImg.src = "./img/background-forest.png";
    backgroundImg.alt = "Background image";
    backgroundImg.id = "backgroundImg";

    this.container.appendChild(backgroundImg);

    this.personaje = new Personaje();
    this.container.appendChild(this.personaje.element);

    for (let i = 0; i < 5; i++) {
      const star = new Star();
      this.stars.push(star);
      this.container.appendChild(star.element);
    }
  }

  agregarEventos() {
    window.addEventListener("keydown", (e) => this.personaje.mover(e));
    this.checkColisiones();
  }

  checkColisiones() {
    setInterval(() => {
      this.stars.forEach((star, index) => {
        if (this.personaje.colisionaCon(star)) {
          this.container.removeChild(star.element);
          this.stars.splice(index, 1);
          this.actualizarPuntuacion(10);
        }
      });
    }, 100);
  }

  actualizarPuntuacion(puntos) {
    this.puntuacion += puntos;
    this.puntosElement.textContent = `Puntos: ${this.puntuacion}`;
  }
}

class Personaje {
  constructor() {
    this.x = 50;
    this.y = 300;
    this.width = 50;
    this.height = 50;
    this.velocidad = 10;
    this.saltando = false;

    this.element = document.createElement("div");
    this.element.classList.add("playerContainer");

    // gML: Create the <img> element for the character image
    this.characterImg = document.createElement("img");
    this.characterImg.src = "./img/redHatBoy.png";
    this.characterImg.alt = "Player red hat boy";
    this.characterImg.id = "playerImage";
    // Attach the <img> element to the character's <div>
    this.element.appendChild(this.characterImg);

    this.actualizarPosicion();
  }

  mover(evento) {
    if (evento.key === "ArrowRight" && this.x <= 730) { // SCRUM 2 (Laptop 1560px)
      this.x += this.velocidad;                           // HARDCODE!!! ;-()
    } else if (evento.key === "ArrowLeft" && this.x >= 10) {// SCRUM 2 (Laptop 1560px)
      this.x -= this.velocidad;
    } else if (evento.key === "ArrowUp" && !this.saltando) {
      this.saltar();
    }

    this.actualizarPosicion();
  }

  saltar() {
    this.saltando = true;
    let alturaMaxima = this.y - 250;

    const salto = setInterval(() => {
      if (this.y > alturaMaxima) {
        this.y -= 20;
      } else {
        clearInterval(salto);
        this.caer();
      }
      this.actualizarPosicion();
    }, 20);
  }

  caer() {
    const gravedad = setInterval(() => {
      if (this.y < 300) {
        this.y += 10;
      } else {
        clearInterval(gravedad);
        this.saltando = false;
      }
      this.actualizarPosicion();
    }, 20);
  }

  actualizarPosicion() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  colisionaCon(objeto) {
    return (
      this.x < objeto.x + objeto.width &&
      this.x + this.width > objeto.x &&
      this.y < objeto.y + objeto.height &&
      this.y + this.height > objeto.y
    );
  }
}

class Star {
  constructor() {
    this.x = Math.random() * 700 + 50;
    this.y = Math.random() * 250 + 50;
    this.width = 30;
    this.height = 30;
    this.element = document.createElement("div");
    this.element.classList.add("starContainer");

    // Create the <img> element for the star image
    const starImg = document.createElement("img");
    starImg.src = "./img/smileStar.png";
    starImg.alt = "Cute smile star";
    starImg.id = "star";

    this.element.appendChild(starImg);

    this.actualizarPosicion();
  }

  actualizarPosicion() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

const juego = new Game();
