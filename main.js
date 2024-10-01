

const html = document.querySelector('html')
const FocoBt = document.querySelector('.app__card-button--foco');
const DescansoCurtoBt = document.querySelector('.app__card-button--curto')
const DescansoLongoBt = document.querySelector('.app__card-button--longo')
const imgFundo = document.querySelector('.app__image')
const texto = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoButton = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const startPauseBT = document.querySelector('#start-pause')
let tempoDecorridoEmSegundos = 5
musica.loop = true
let intervaloID = null

musicaFocoButton.addEventListener('change', () => {
  if (musica.paused) {
    musica.play()
  }
  else {
    musica.pause()
  }
})

FocoBt.addEventListener('click', () => {
  alterarContexto('foco');
  FocoBt.classList.add('active');
})
DescansoCurtoBt.addEventListener('click', () => {
  alterarContexto('descanso-curto');
  DescansoCurtoBt.classList.add('active');
});

DescansoLongoBt.addEventListener('click', () => {
  alterarContexto('descanso-longo');
  DescansoLongoBt.classList.add('active');
})

function alterarContexto(contexto) {
  html.setAttribute('data-contexto', contexto);
  imgFundo.setAttribute('src', `/imagens/${contexto}.png`);
  botoes.forEach(function (botao) {
    botao.classList.remove('active');
  })
  switch (contexto) {
    case "foco":
      texto.innerHTML = `
          Otimize sua produtividade,<br>
              <strong class="app__title-strong">mergulhe no que importa.</strong>
          `
      break;
    case "descanso-curto":
      texto.innerHTML = `
          Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
          `
      break;
    case "descanso-longo":
      texto.innerHTML = `
          Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
          `
    default:
      break;
  }


}
const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos > 0) {
    tempoDecorridoEmSegundos--;
    console.log('Temporizador: ' + tempoDecorridoEmSegundos);
  } else {
    console.log('TEMPO ESGOTADO!!!!!');
    pararContagem(); 
  }
};

function iniciarContagem() {
  if (!intervaloID) {
    intervaloID = setInterval(contagemRegressiva, 1000);
  }
}

function pararContagem() {
  if (intervaloID) {
    clearInterval(intervaloID);
    intervaloID = null;
  }
}

// Função para iniciar ou pausar com base no estado atual
function iniciarOuPausar() {
  if (intervaloID) {
    pararContagem();
  } else {
    iniciarContagem();
  }
}

startPauseBT.addEventListener('click', iniciarOuPausar);
