# Juego Programación Orientada a Objetos 🧨

La **Programación Orientada a Objetos (POO)** es un **paradigma\* de programación** que organiza el código en torno a **objetos**, los cuales representan entidades del mundo real con **propiedades** (atributos) y **comportamientos** (métodos).

> \*Un **paradigma** define cómo abordamos la solución de problemas en la programación.

Es buena idea hacer un juego con **Programación Orientada a Objetos (POO)** porque nos ayuda a organizar mejor el código y a hacer que nuestro juego sea más fácil de entender, modificar y escalar.

- Características

  1. **Modularidad** 🧩: Dividimos el código en partes más pequeñas y reutilizables. Por ejemplo, tenemos una clase Personaje y una clase Moneda, cada una con sus propias propiedades y métodos.

  2. **Reutilización** 🔄: Si en el futuro queremos hacer otro juego similar, podemos reutilizar clases sin escribir todo desde cero.

  3. **Mantenimiento más sencillo** 🔧: Si algo no funciona bien, es más fácil encontrar el problema en una clase específica en lugar de revisar un código desordenado.

  4. **Escalabilidad** 🚀: Si queremos agregar más funcionalidades (como diferentes tipos de comida en el juego o más enemigos), podemos extender nuestras clases sin modificar demasiado el código existente.

  5. **Código más limpio y entendible** 📝: En lugar de tener muchas funciones sueltas, agrupamos todo lo relacionado con un objeto en su propia clase. Esto hace que el código sea más intuitivo.

### Conceptos clave

1. **Clases** 🏗️: Son como planos o moldes para crear objetos. Definen qué atributos y métodos tendrá un objeto.
2. **Objetos** 🐶: Son instancias de una clase, es decir, “cosas concretas” basadas en un molde.
3. **Encapsulación** 🔒: Esconder los datos internos de un objeto y solo permitir acceso a ellos mediante métodos específicos.
4. **Herencia** 👪: Permite que una clase hija herede propiedades y métodos de una clase padre.
5. **Polimorfismo** 🎭: Permite que un método se comporte de diferentes formas según el objeto que lo use.

## Paso a paso:

- Vamos a crear una carpeta para un nuevo proyecto, podemos llamarlo `juego-poo`
- Dentro crearemos un archivo `index.html`, `style.css` y `main.js`

en el HTML irá algo así:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aventuras POO</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Juego POO</h1>

    <div id="game-container"></div>
    <script type="module" src="main.js"></script>
  </body>
</html>
```

El CSS:

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
  overflow: hidden;
  background-color: #b8b8b8;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}
#game-container {
  position: relative;
  width: 800px;
  height: 400px;
  margin: 20px auto;
  border: 10px solid #6d6d6d;
  background: #fff;
  overflow: hidden;
  border-radius: 30px;
}

.personaje {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #07a07c;
  border-radius: 50%;
  border: 5px solid #07a050;
}

.moneda {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: gold;
  border-radius: 50%;
  box-shadow: 0 0 10px 2px rgba(255, 223, 0, 0.8);
}
```

Hasta aquí tenemos la estructura del juego, pero no la lógica.

Para la lógica haremos uso de javascript y sus clases.

## Javascript

Esta es la estructura que iremos escribiendo línea a línea:

```jsx
class Game {}

class Personaje {}

class Moneda {}

const juego = new Game();
```

## **1. Clase `Game` (el núcleo del juego) `❤️`**

<aside>
💡

Las clases en JavaScript permiten crear objetos con propiedades y métodos asociados.

</aside>

Esta clase gestiona la lógica principal:

- crear el escenario
- detectar colisiones
- actualizar la puntuación.

```jsx
class Game {
  constructor() {}
  crearEscenario() {}
  agregarEventos() {}
  checkColisiones() {}
}
```

### Primero vamos a escribir las líneas dentro del constructor:

Se define el **constructor** de la clase Game, que es un método especial que se ejecuta automáticamente cuando se crea una nueva instancia de la clase.

• Aquí es donde se inicializan las propiedades del objeto Game y se configuran los elementos principales del juego.

```jsx
constructor() {
		// Llamamos al id game-container para definir que ahí dentro se van a renderizar los elementos del juego
    this.container = document.getElementById("game-container");
    // Queremos tener una propiedad dentro de Game que represente al personaje, pero como todavía no hemos instanciado la clase Personaje, le ponemos null para evitar errores.
    this.personaje = null;
    //inicia vacío porque al principio no hemos atrapado monedas
    this.monedas = [];
    this.puntuacion = 0;

		//Llama a métodos que configuran la escena y los controles.
    this.crearEscenario();
    this.agregarEventos();
  }
```

Ahora vamos a definir el método `crearEscenario()`

Este método se encarga de **crear el personaje y las monedas** dentro del juego.

```jsx
crearEscenario() {
	// Crear el personaje, Ahora, this.personaje ya no es null, sino un objeto de la clase Personaje.
	this.personaje = new Personaje();
	//Con appendChild(), lo agregamos al contenedor del juego (#game-container).
	// this.personaje.element es el elemento HTML que representa al personaje (un div).
	this.container.appendChild(this.personaje.element);
	// Usamos un bucle for para crear 5 monedas
	for (let i = 0; i < 5; i++) {
	//En cada iteración del bucle, creamos una nueva moneda con new Moneda().
	//Cada moneda es una instancia de la clase Moneda, que genera un div con su propia posición y tamaño.
	const moneda = new Moneda();
	// con el método push agregamos la moneda recién creada al array monedas
	this.monedas.push(moneda);
	//igual que con personaje, con appendChild agregamos las monedas al HTML
	this.container.appendChild(moneda.element);
	}
}
```

Ahora vamos a agregar el método `agregarEventos()`

```jsx
agregarEventos() {
	// Detecta las teclas presionadas (ArrowRight, ArrowLeft, ArrowUp) y llama a mover() en el personaje.
  window.addEventListener("keydown", (e) => this.personaje.mover(e));
  //Llama a checkColisiones() para empezar a detectar colisiones.
  this.checkColisiones();
}
```

Por último de los métodos de la clase Game() agregaremos `checkColisiones()`

Este método se encarga de **verificar si el personaje ha colisionado con alguna moneda**. Si ocurre la colisión, elimina la moneda.

```jsx
checkColisiones() {
	// El código dentro de setInterval(100) se ejecutará cada 100 milisegundos, revisando las colisiones constantemente.
  setInterval(() => {
  //este es un array con las monedas del juego, el método forEach recorre el array, el parámetro index nos ayudará a eliminarla después
    this.monedas.forEach((moneda, index) => {
    //colisionaCon() función que verifica si el personaje ha colisionado con la moneda.
      if (this.personaje.colisionaCon(moneda)) {
        // Eliminar moneda en el html y actualizar puntuación
        this.container.removeChild(moneda.element);
        //splice() elimina elementos del array, index dice cual y el 1 dice cuantos
        this.monedas.splice(index, 1);
      }
    });

  }, 100);
}
```

## 2. Class `Personaje` 👶

Esta clase se usará como un **molde** para crear objetos que representen al personaje del juego.

```jsx
class Personaje {
  constructor() {}
  mover() {}
  saltar() {}
  caer() {}
  actualizarPosicion() {}
  colisionaCon() {}
}
```

Hablemos del `constructor()` , recordemos que este es un método especial que se ejecuta automáticamente cuando se crea un nuevo objeto de esta clase

```jsx
  constructor() {
  // aquí definimos las propiedades del personaje:
	  //posición horizontal, 50px desde la izquierda
    this.x = 50;
    //300px desde arriba
    this.y = 300;
    //cuantos pixeles se mueve cuando presionemos la flecha
    this.width = 50; // Se agrega tamaño del personaje
    this.height = 50;
    //avanza 10px
    this.velocidad = 10;
    //false significa que el personaje está en el suelo
    this.saltando = false;

		//Crea un nuevo elemento <div> en el documento.
    this.element = document.createElement("div");
    //Le agrega la clase CSS "personaje", para que tenga el estilo definido en el archivo CSS.
    this.element.classList.add("personaje");

		//llamamos a un método que construiremos más adelante
    this.actualizarPosicion();
  }
```

Ahora hablaremos del método `mover()` que como su nombre indica, maneja el movimiento del personaje.

Este método se ejecutará cuando el usuario presione una tecla de dirección (ArrowRight, ArrowLeft, ArrowUp).

```
  //Recibe un evento como parámetro, que representa la tecla que se presionó
  mover(evento) {
	  // condicional, Verificamos si la tecla presionada es "ArrowRight"
    if (evento.key === "ArrowRight") {
	    //Si el usuario presiona la tecla de flecha derecha, sumamos this.velocidad a this.x, moviendo el personaje a la derecha.
      this.x += this.velocidad;
      //si la tecla es "Arrowleft" restamos this.velocidad a this.x, moviéndolo hacia la izquierda.
    } else if (evento.key === "ArrowLeft") {
      this.x -= this.velocidad;
      //verificamos si es "ArrowUp" y si es así llamamos al método saltar()
    } else if (evento.key === "ArrowUp") {
      this.saltar();
    }

		//llamamos a un método que construiremos más adelante
    this.actualizarPosicion();
  }
```

`saltar()` Mueve al personaje hacia arriba hasta una altura máxima

```jsx
  saltar() {
	  //arriba lo inicializamos en false pero aquí lo activamos
    this.saltando = true;
    //definimos la altura máxima en pixeles que va a brincar
    let alturaMaxima = this.y - 100;

		// el método setInterval(20) se utiliza para que salte en 2 segundos (20milisegundos)
      const salto = setInterval(() => {
      //aqui revisa que si this.y es mayor a la altura máxima, activa la gravedad a 10, para mover al personaje hacia arriba
      if (this.y > alturaMaxima) {
        this.y -= 10;
      } else {
      //Cuando llega a la altura máxima, se detiene el intervalo de salto y se llama a this.caer(); para que el personaje vuelva a bajar.
        clearInterval(salto);
        this.caer();
      }
      //Se actualiza la posición del personaje en la pantalla.
      this.actualizarPosicion();
    }, 20);
  }
```

**Función `caer()` Simula la gravedad y lo hace bajar hasta el suelo.**

```jsx
caer() {
	//como en el anterior, nos fija un tiempo de ejecución
	//dentro de setInterval(20) escribimos el 20 de 20 milisegundos
	const gravedad = setInterval(() => {
		// Mientras no haya tocado el suelo, aumenta a 10 el peso de la gravedad para hacer que el personaje caiga.
		if (this.y < 300) {
			this.y += 10;
		} else {
		//Si y = 300 (el suelo), se detiene la caída y this.saltando se pone en false para permitir un nuevo salto.
			clearInterval(gravedad);
	}

	this.actualizarPosicion();
	}, 20);
}
```

**Método `actualizarPosicion()` Cambia la posición en pantalla.**

**Este se llama cada vez que el personaje se mueve, salta o cae.**

```jsx
actualizarPosicion() {
		//Cambia la posición horizontal del personaje en la pantalla en pixeles.
    this.element.style.left = `${this.x}px`;
    //Cambia la posición vertical del personaje.
    this.element.style.top = `${this.y}px`;
}
```

**Método `colisionaCon(objeto)` Detecta colisiones con otros elementos** (como una moneda).

Aquí el parámetro le ponemos “objeto”, podríamos ponerle “moneda” pero si más adelante queremos escalar el juego, sería confuso, por eso se sugiere el uso de una palabra genérica para los objetos con los que puede colisionar nuestro personaje.

```jsx
colisionaCon(objeto) {
    return (
    //Comprueba si las áreas de los objetos (personaje y moneda) se superponen
	    //Detección de colisiones rectangular
      this.x < objeto.x + objeto.width &&
      this.x + this.width > objeto.x &&
      this.y < objeto.y + objeto.height &&
      this.y + this.height > objeto.y
    );
}
```

## 3. Clase `Moneda` 🪙

Por último crearemos las monedas del juego.

```jsx
class Moneda {
  constructor() {}

  actualizarPosicion() {}
}
```

```jsx
  constructor() {
	  //Aquí utilizamos el objeto por defecto de javascript Math y llamamos a su método random()
	  //Multiplicamos ese número por 700 para obtener un valor entre 0 y 700.
		//Luego, le sumamos 50, de modo que la posición de la moneda nunca esté en los márgenes extremos del área visible (de esta forma, la moneda aparece un poco dentro del área en vez de estar en los bordes).
    this.x = Math.random() * 700 + 50;
    this.y = Math.random() * 250 + 50;
		//Creamos un nuevo elemento HTML de tipo div con el método document.createElement("div"). Este div representará visualmente a la moneda en la interfaz del juego.
    this.width = 30; // Se agrega tamaño de la moneda
    this.height = 30;
    this.element = document.createElement("div");
    // Agregar clase CSS
    this.element.classList.add("moneda");

    this.actualizarPosicion();
  }
```

Y por último creamos el método `actualizarPosicion()` que tiene las mismas características que el que definimos para la clase `Personaje()`, y sirve para actualizar la **posición visual** del div que representa a la moneda.

```jsx
  actualizarPosicion() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
```

La última línea que escribimos en el archivo `main.js` es:

```jsx
const juego = new Game();
```

**Crea una instancia de la clase Game y ejecuta su constructor y en consecuencia creando los objetos y poniendo todo en marcha.**
Si no pones `new Game();`, la clase existe en la memoria, pero **nada del juego se ejecutará en la página** porque nadie está usando esa clase.

---

## Día 2

- Mejorar el salto (opcional)
  ### Arreglemos el problema del salto:
  En la `class Personaje` en el método `mover()` cambiar esta línea:
  ```jsx
  else if (evento.key === "ArrowUp" && !this.saltando)
  ```
  Si la tecla es "ArrowUp" y el personaje **no está saltando**, entonces llamamos a `this.saltar();`.
  Pero ahora no llega hasta arriba nuestro personaje y no alcanza a todas las monedas, hay que darle más pixeles a la altura del salto:
  En el método `saltar()` le cambiamos a - 300 en esta línea:
  ```jsx
  let alturaMaxima = this.y - 300;
  ```
  Agregar la línea comentada:
  ```jsx
    caer() {
      const gravedad = setInterval(() => {
        if (this.y < 300) {
          this.y += 10;
        } else {
          clearInterval(gravedad);
          //this.saltando = false;
        }
        this.actualizarPosicion();
      }, 20);
    }
  ```

### Agreguemos el contador de monedas:

en html, debajo del h1:

```html
<div id="puntos">Puntos: 0</div>
```

en CSS:

```css
#puntos {
  font-size: 20px;
  text-align: center;
  margin: 10px 0;
}
```

en JS, dentro de la class Game

```jsx
class Game {
	//agregar dentro del constructor, para agregar en el HTML el puntaje:
	    this.puntosElement = document.getElementById("puntos");

	//agregar dentro de checkColisiones() abajo de this.monedas.splice(index, 1);
        this.actualizarPuntuacion(10);

  //agregar hasta abajo después de checkColisiones
	actualizarPuntuacion(puntos) {
    this.puntuacion += puntos;
    this.puntosElement.textContent = `Puntos: ${this.puntuacion}`;
  }
}
```

---

## Día 3

Explicamos los 4 principios con el código que desarrollamos:

**🎯 1. Encapsulamiento**

**Definición:** Es la capacidad de agrupar datos y métodos dentro de una clase, ocultando su implementación y exponiendo solo lo necesario.

📌 **Ejemplo en tu código:**

La clase Personaje contiene propiedades (x, y, width, etc.) y métodos (mover(), saltar(), actualizarPosicion()).

El objeto controla su propio estado sin que otros objetos accedan directamente a sus variables internas.

```jsx
class Personaje {
  constructor() {
    this.x = 50;
    this.y = 300;
    this.width = 50;
    this.height = 50;
    this.velocidad = 10;
    this.saltando = false;
  }
}
```

✅ El personaje maneja su posición y movimiento internamente.
❌ Si accediéramos directamente a personaje.x = 200 desde fuera, estaríamos rompiendo el encapsulamiento. Lo correcto es hacerlo a través de métodos, como mover().

**🎯 2. Abstracción**

**Definición:** Es simplificar la realidad ocultando detalles innecesarios y exponiendo solo lo esencial.

📌 **Ejemplo en tu código:**

El método mover(evento) abstrae la lógica de movimiento del personaje, permitiendo que el usuario solo presione teclas sin preocuparse de los cálculos internos.

```jsx
mover(evento) {
  if (evento.key === "ArrowRight") {
    this.x += this.velocidad;
  } else if (evento.key === "ArrowLeft") {
    this.x -= this.velocidad;
  } else if (evento.key === "ArrowUp" && !this.saltando) {
    this.saltar();
  }
  this.actualizarPosicion();
}

```

✅ Para el usuario, solo importa que el personaje se mueve al presionar teclas.
✅ No necesita saber cómo internamente se modifican x y y, ni cómo se actualiza la posición en el DOM.

**🎯 3. Herencia (No aplicada en tu código, pero sería útil)**

**Definición:** Es la capacidad de una clase de heredar atributos y métodos de otra.

🚀 **¿Cómo podríamos aplicarla en tu código?**

Podríamos crear una clase Entidad para que Personaje y Moneda hereden de ella, ya que ambas tienen x, y, width, height y actualizarPosicion().

📌 **Ejemplo:**

```jsx
class Entidad {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.element = document.createElement("div");
  }

  actualizarPosicion() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

class Personaje extends Entidad {
  constructor() {
    super(50, 300, 50, 50);
    this.velocidad = 10;
    this.saltando = false;
    this.element.classList.add("personaje");
  }
}

class Moneda extends Entidad {
  constructor() {
    super(Math.random() * 700 + 50, Math.random() * 250 + 50, 30, 30);
    this.element.classList.add("moneda");
  }
}
```

✅ Evitamos repetir código en Personaje y Moneda.
✅ Entidad maneja propiedades comunes y actualizarPosicion().

**🎯 4. Polimorfismo**

**Definición:** Es la capacidad de que los métodos tengan diferentes comportamientos dependiendo de la clase que los implemente.

📌 **Ejemplo en tu código:**

La función colisionaCon(objeto) se podría reescribir en Entidad y personalizar en Personaje y Moneda.

🚀 **Ejemplo de polimorfismo:**

```jsx
class Entidad {
  colisionaCon(otraEntidad) {
    return (
      this.x < otraEntidad.x + otraEntidad.width &&
      this.x + this.width > otraEntidad.x &&
      this.y < otraEntidad.y + otraEntidad.height &&
      this.y + this.height > otraEntidad.y
    );
  }
}

class Personaje extends Entidad {
  colisionaCon(otraEntidad) {
    if (otraEntidad instanceof Moneda) {
      console.log("¡Has recogido una moneda!");
    }
    return super.colisionaCon(otraEntidad);
  }
}
```

✅ colisionaCon() en Personaje tiene un comportamiento especial para monedas.
✅ super.colisionaCon(otraEntidad) reutiliza la lógica base de Entidad.

**🔥 Conclusión**

Nuestro código aplica **encapsulamiento y abstracción** correctamente.

Si agregamos **herencia y polimorfismo**, podríamos hacerlo más modular y reutilizable.

---

## Extras:

- Hacer responsivo el juego
- Agregarle una descripción
- Modificar el personaje y las monedas
- Agregarle herencia y polimorfismo
