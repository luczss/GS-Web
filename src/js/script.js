/* ============================================
   GRAVITYSHIELD — script.js
   Funcionalidades: Slideshow | Quiz | Formulário | Tema
   ============================================ */

/* ============================================
   1. TROCA DE TEMA (cor de fundo)
   ============================================ */
const temas = {
  escuro: {
    '--bg-void':   '#0d0a14',
    '--bg-deep':   '#120f1e',
    '--bg-base':   '#1a1628',
    '--bg-raised': '#231e35',
    '--bg-card':   '#2a2440',
  },
  azul: {
    '--bg-void':   '#070d1a',
    '--bg-deep':   '#0a1228',
    '--bg-base':   '#0f1a36',
    '--bg-raised': '#152244',
    '--bg-card':   '#1a2a52',
  },
  verde: {
    '--bg-void':   '#050f0a',
    '--bg-deep':   '#081510',
    '--bg-base':   '#0c1e16',
    '--bg-raised': '#11271d',
    '--bg-card':   '#163024',
  },
};

function aplicarTema(nome) {
  const root = document.documentElement;
  const tema = temas[nome];
  if (!tema) return;
  Object.entries(tema).forEach(([prop, val]) => root.style.setProperty(prop, val));

  document.querySelectorAll('.tema-btn').forEach(btn => {
    btn.classList.toggle('tema-btn--ativo', btn.dataset.tema === nome);
  });
}

/* ============================================
   2. SLIDESHOW
   ============================================ */
let slideshowIndex = 0;
let slideshowTimer = null;

function iniciarSlideshow() {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;

  function mostrarSlide(i) {
    slides.forEach((s, idx) => {
      s.classList.toggle('slide--ativo', idx === i);
    });
    document.querySelectorAll('.slide-dot').forEach((d, idx) => {
      d.classList.toggle('slide-dot--ativo', idx === i);
    });
  }

  function avancar() {
    slideshowIndex = (slideshowIndex + 1) % slides.length;
    mostrarSlide(slideshowIndex);
  }

  function recuar() {
    slideshowIndex = (slideshowIndex - 1 + slides.length) % slides.length;
    mostrarSlide(slideshowIndex);
  }

  mostrarSlide(0);
  slideshowTimer = setInterval(avancar, 4000);

  const btnProx = document.getElementById('slide-proximo');
  const btnAnt  = document.getElementById('slide-anterior');
  if (btnProx) btnProx.addEventListener('click', () => { clearInterval(slideshowTimer); avancar(); slideshowTimer = setInterval(avancar, 4000); });
  if (btnAnt)  btnAnt.addEventListener('click',  () => { clearInterval(slideshowTimer); recuar();  slideshowTimer = setInterval(avancar, 4000); });

  document.querySelectorAll('.slide-dot').forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(slideshowTimer);
      slideshowIndex = idx;
      mostrarSlide(slideshowIndex);
      slideshowTimer = setInterval(avancar, 4000);
    });
  });
}

/* ============================================
   3. FORMULÁRIO COM VALIDAÇÃO
   ============================================ */
function iniciarFormulario() {
  const form = document.getElementById('form-contato');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valido = true;

    form.querySelectorAll('[data-campo]').forEach(campo => {
      const erro = form.querySelector(`[data-erro="${campo.dataset.campo}"]`);
      if (!campo.value.trim()) {
        if (erro) erro.style.display = 'block';
        campo.classList.add('campo--invalido');
        valido = false;
      } else {
        if (erro) erro.style.display = 'none';
        campo.classList.remove('campo--invalido');
      }
    });

    const emailCampo = form.querySelector('[data-campo="email"]');
    if (emailCampo && emailCampo.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const erroEmail = form.querySelector('[data-erro="email"]');
      if (!emailRegex.test(emailCampo.value.trim())) {
        if (erroEmail) { erroEmail.textContent = 'Insira um e-mail válido.'; erroEmail.style.display = 'block'; }
        emailCampo.classList.add('campo--invalido');
        valido = false;
      }
    }

    if (valido) {
      const sucesso = document.getElementById('form-sucesso');
      if (sucesso) sucesso.style.display = 'block';
      form.reset();
      setTimeout(() => { if (sucesso) sucesso.style.display = 'none'; }, 4000);
    }
  });

  form.querySelectorAll('[data-campo]').forEach(campo => {
    campo.addEventListener('input', function () {
      const erro = form.querySelector(`[data-erro="${this.dataset.campo}"]`);
      if (this.value.trim()) {
        if (erro) erro.style.display = 'none';
        this.classList.remove('campo--invalido');
      }
    });
  });
}

/* ============================================
   4. QUIZ — 10 perguntas sobre espaço / GravityShield
   ============================================ */
const perguntas = [
  {
    texto: 'Qual síndrome afeta a visão dos astronautas por aumento de pressão intracraniana?',
    opcoes: ['Síndrome SANS', 'Síndrome de Coriolis', 'Hipóxia espacial', 'Síndrome de Laika'],
    correta: 0,
  },
  {
    texto: 'Em quanto tempo um astronauta pode perder até 20% da massa muscular em microgravidade?',
    opcoes: ['1 mês', '3 meses', '6 meses', '1 ano'],
    correta: 2,
  },
  {
    texto: 'O GravityShield utiliza qual combinação de tecnologias para proteger o astronauta?',
    opcoes: ['Robótica + realidade aumentada', 'Sensores vestíveis + IA + controle gravitacional', 'Exoesqueleto + GPS + blockchain', 'Câmeras + drones + satélites'],
    correta: 1,
  },
  {
    texto: 'Com quantas horas de antecedência a IA do GravityShield consegue prever riscos fisiológicos?',
    opcoes: ['12 horas', '24 horas', '48 horas', '72 horas'],
    correta: 3,
  },
  {
    texto: 'Qual é a porcentagem de densidade óssea que pode ser perdida por mês em microgravidade?',
    opcoes: ['0,2%', '0,5%', '1%', '5%'],
    correta: 2,
  },
  {
    texto: 'Qual sigla identifica a estação espacial internacional onde os sensores GravityShield operariam?',
    opcoes: ['NASA', 'ISS', 'ESA', 'SpaceX'],
    correta: 1,
  },
  {
    texto: 'Para qual destino o GravityShield visa viabilizar missões de 2 ou mais anos?',
    opcoes: ['Lua', 'Júpiter', 'Marte', 'Vênus'],
    correta: 2,
  },
  {
    texto: 'Qual área da medicina terrestre poderia se beneficiar dos algoritmos do GravityShield?',
    opcoes: ['Cardiologia e diabetes', 'Sarcopenia e osteoporose', 'Oncologia e neurologia', 'Pediatria e neonatologia'],
    correta: 1,
  },
  {
    texto: 'O que o sistema faz automaticamente quando detecta queda óssea acumulada?',
    opcoes: ['Administra medicamento', 'Emite alerta e recomenda ajuste gravitacional', 'Acorda o astronauta', 'Encerra a missão'],
    correta: 1,
  },
  {
    texto: 'Qual das opções NÃO é um público-alvo do GravityShield?',
    opcoes: ['Astronautas', 'Médicos de missão', 'Turistas espaciais comuns', 'Engenheiros de sistemas'],
    correta: 2,
  },
];

let quizRespostas = new Array(perguntas.length).fill(null);
let quizPerguntaAtual = 0;

function renderizarQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const p = perguntas[quizPerguntaAtual];
  const respondida = quizRespostas[quizPerguntaAtual] !== null;
  const respostaDada = quizRespostas[quizPerguntaAtual];

  container.innerHTML = `
    <div class="quiz-progresso">
      <span class="quiz-num">Pergunta ${quizPerguntaAtual + 1} de ${perguntas.length}</span>
      <div class="quiz-barra"><div class="quiz-barra__fill" style="width:${((quizPerguntaAtual + 1) / perguntas.length) * 100}%"></div></div>
    </div>
    <p class="quiz-pergunta">${p.texto}</p>
    <ul class="quiz-opcoes">
      ${p.opcoes.map((op, i) => {
        let cls = 'quiz-op';
        if (respondida) {
          if (i === p.correta) cls += ' quiz-op--certa';
          else if (i === respostaDada) cls += ' quiz-op--errada';
        }
        return `<li>
          <button class="quiz-op ${cls}" data-idx="${i}" ${respondida ? 'disabled' : ''}>
            <span class="quiz-op__letra">${String.fromCharCode(65 + i)}</span>
            ${op}
          </button>
        </li>`;
      }).join('')}
    </ul>
    <div class="quiz-nav">
      <button id="quiz-ant" class="quiz-btn" ${quizPerguntaAtual === 0 ? 'disabled' : ''}>← Anterior</button>
      ${quizPerguntaAtual < perguntas.length - 1
        ? `<button id="quiz-prox" class="quiz-btn quiz-btn--primary">Próxima →</button>`
        : `<button id="quiz-resultado" class="quiz-btn quiz-btn--primary">Ver Resultado ★</button>`
      }
    </div>
  `;

  container.querySelectorAll('.quiz-op').forEach(btn => {
    if (!respondida) {
      btn.addEventListener('click', function () {
        quizRespostas[quizPerguntaAtual] = parseInt(this.dataset.idx);
        renderizarQuiz();
      });
    }
  });

  const btnAnt = container.querySelector('#quiz-ant');
  if (btnAnt) btnAnt.addEventListener('click', () => { quizPerguntaAtual--; renderizarQuiz(); });

  const btnProx = container.querySelector('#quiz-prox');
  if (btnProx) btnProx.addEventListener('click', () => { quizPerguntaAtual++; renderizarQuiz(); });

  const btnResultado = container.querySelector('#quiz-resultado');
  if (btnResultado) btnResultado.addEventListener('click', mostrarResultado);
}

function mostrarResultado() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const acertos = quizRespostas.filter((r, i) => r === perguntas[i].correta).length;
  const total = perguntas.length;
  const pct = Math.round((acertos / total) * 100);

  let mensagem = '';
  let cls = '';
  if (pct >= 80) { mensagem = '🚀 Excelente! Você está pronto para a missão!'; cls = 'resultado--otimo'; }
  else if (pct >= 50) { mensagem = '🛸 Bom trabalho! Mais um pouco de treinamento.'; cls = 'resultado--bom'; }
  else { mensagem = '🌍 Continue estudando — o espaço espera por você!'; cls = 'resultado--fraco'; }

  container.innerHTML = `
    <div class="quiz-resultado ${cls}">
      <p class="resultado__placar">${acertos}<span>/${total}</span></p>
      <p class="resultado__pct">${pct}% de acerto</p>
      <p class="resultado__msg">${mensagem}</p>
      <div class="resultado__revisao">
        ${perguntas.map((p, i) => {
          const certa = quizRespostas[i] === p.correta;
          return `<div class="revisao-item ${certa ? 'revisao-item--certa' : 'revisao-item--errada'}">
            <span>${certa ? '✓' : '✗'}</span>
            <span>${p.texto}</span>
          </div>`;
        }).join('')}
      </div>
      <button class="quiz-btn quiz-btn--primary" id="quiz-reiniciar">Tentar Novamente</button>
    </div>
  `;

  container.querySelector('#quiz-reiniciar').addEventListener('click', () => {
    quizRespostas = new Array(perguntas.length).fill(null);
    quizPerguntaAtual = 0;
    renderizarQuiz();
  });
}

/* ============================================
   5. INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Tema
  document.querySelectorAll('.tema-btn').forEach(btn => {
    btn.addEventListener('click', () => aplicarTema(btn.dataset.tema));
  });
  aplicarTema('escuro');

  // Slideshow
  iniciarSlideshow();

  // Formulário
  iniciarFormulario();

  // Quiz
  renderizarQuiz();
});