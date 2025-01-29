class Game {
  constructor() {
    this.container = document.getElementById("game-container");
    this.puntosElement = document.getElementById("puntos");
    this.personaje = null;
    this.monedas = [];
    this.puntuacion = 0;

    this.crearEscenario();
    this.agregarEventos();
  }

  crearEscenario() {
    // Crear el personaje
    this.personaje = new Personaje();
    this.container.appendChild(this.personaje.element);

    // Generar monedas
    for (let i = 0; i < 5; i++) {
      const moneda = new Moneda();
      this.monedas.push(moneda);
      this.container.appendChild(moneda.element);
    }
  }

  agregarEventos() {
    window.addEventListener("keydown", (e) => this.personaje.mover(e));
    this.checkColisiones();
  }

  checkColisiones() {
    setInterval(() => {
      this.monedas.forEach((moneda, index) => {
        if (this.personaje.colisionaCon(moneda)) {
          // Eliminar moneda y actualizar puntuación
          this.container.removeChild(moneda.element);
          this.monedas.splice(index, 1);
          this.actualizarPuntuacion(10); // Cada moneda vale 10 puntos
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
    this.element.style.position = "absolute";
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = "#07a07c";
    this.element.style.borderRadius = "50%";
    this.element.style.border = "5px solid #07a050";
  }

  mover(evento) {
    switch (evento.key) {
      case "ArrowRight":
        this.x += this.velocidad;
        break;
      case "ArrowLeft":
        this.x -= this.velocidad;
        break;
      case "ArrowUp":
        if (!this.saltando) {
          this.saltar();
        }
        break;
    }
    this.actualizarPosicion();
  }

  saltar() {
    this.saltando = true;
    let alturaMaxima = this.y - 300;

    const salto = setInterval(() => {
      if (this.y > alturaMaxima) {
        this.y -= 5;
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
        this.y += 5;
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

class Moneda {
  constructor() {
    this.x = Math.random() * 700 + 50;
    this.y = Math.random() * 250 + 50;
    this.width = 30;
    this.height = 30;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = "gold";
    this.element.style.borderRadius = "50%";
    this.element.style.boxShadow = "0 0 10px 2px rgba(255, 223, 0, 0.8)";
  }
}

const juego = new Game();
