const btnStart = document.querySelector('.btn-start');
const btnEmpezar = document.querySelector('#btnEmpezar');
const celeste = document.querySelector('#celeste');
const violeta = document.querySelector('#violeta');
const naranja = document.querySelector('#naranja');
const verde = document.querySelector('#verde');
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    const self = this;
    this.inicializar = this.inicializar.bind(self);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500);
  }

  inicializar() {
    this.toggleBtnEmpezar();
    const self = this;
    this.siguienteNivel = this.siguienteNivel.bind(self);
    this.elegirColor = this.elegirColor.bind(self);
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide');
    } else {
      btnEmpezar.classList.add('hide');
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subNivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'celeste';
      case 1:
        return 'violeta';
      case 2:
        return 'naranja';
      case 3:
        return 'verde';
    }
  }
  transformarColorANumero(color) {
    switch (color) {
      case 'celeste':
        return 0;
      case 'violeta':
        return 1;
      case 'naranja':
        return 2;
      case 'verde':
        return 3;
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light');
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light');
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elegirColor);
    this.colores.violeta.addEventListener('click', this.elegirColor);
    this.colores.naranja.addEventListener('click', this.elegirColor);
    this.colores.verde.addEventListener('click', this.elegirColor);
  }

  eliminarEventoClick() {
    this.colores.celeste.removeEventListener('click', this.elegirColor);
    this.colores.violeta.removeEventListener('click', this.elegirColor);
    this.colores.naranja.removeEventListener('click', this.elegirColor);
    this.colores.verde.removeEventListener('click', this.elegirColor);
  }

  elegirColor(e) {
    const nombreColor = e.currentTarget.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subNivel]) {
      this.subNivel++;
      if (this.subNivel === this.nivel) {
        this.nivel++;
        this.eliminarEventoClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.ganoElJuego();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      this.perdioElJuego();
    }
  }
  ganoElJuego() {
    swal('Simon says 👍🏽', 'Felicitaciones, ganaste el juego!', 'success').then(
      this.inicializar
    );
  }
  perdioElJuego() {
    swal('Simon says 🥺', 'Lo siento, perdiste!', 'error').then(() => {
      this.eliminarEventoClick();
      this.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}

btnStart.addEventListener('click', empezarJuego);
