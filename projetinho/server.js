const formAcc = document.getElementById('creat-acc');
const mensagem = document.getElementById('mensagem');


if (formAcc) {
    formAcc.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome-user')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const senha = document.getElementById('senha')?.value || '';

        const user = {
            nome: nome,
            email: email,
            senha: senha
        };

        localStorage.setItem(email, JSON.stringify(user));

        if (mensagem) {
            mensagem.style.color = 'pink';
            mensagem.textContent = 'pabens crio a conta';
        }

        formAcc.reset();
    });
}



// Lista de cards
const participantes = [
    { nome: "Sakura", grupo: "LE SSERAFIM", foto: "imagens/lesserafim.sakura.jpg" },
    { nome: "Chaewon", grupo: "LE SSERAFIM", foto: "imagens/lesserafim.chaewon.jpg" },
    { nome: "Yunjin", grupo: "LE SSERAFIM", foto: "imagens/lesserafim.yunjin.jpg" },
    { nome: "Kazuha", grupo: "LE SSERAFIM", foto: "imagens/lesserafim.kazuha.jpg" },
    { nome: "Eunchae", grupo: "LE SSERAFIM", foto: "imagens/lesserafim.eunchae.jpg" },
    { nome: "Yeji", grupo: "ITZY", foto: "imagens/itzy.yeji.jpeg" },
    { nome: "Lia", grupo: "ITZY", foto: "imagens/itzy.lia.jpeg" },
    { nome: "Ryujin", grupo: "ITZY", foto: "imagens/itzy.ryujin.jpeg" },
    { nome: "Chaeryeong", grupo: "ITZY", foto: "imagens/itzy.chaeryeong.jpeg" },
    { nome: "Yuna", grupo: "ITZY", foto: "imagens/itzy.yuna.jpeg" },
    { nome: "Gaeul", grupo: "IVE", foto: "imagens/ive.gaeul.jpeg" },
    { nome: "Yujin", grupo: "IVE", foto: "imagens/ive.yujin.jpeg" },
    { nome: "Wonyoung", grupo: "IVE", foto: "imagens/ive.wonyoung.jpeg" },
    { nome: "Liz", grupo: "IVE", foto: "imagens/ive.liz.jpeg" },
    { nome: "Rei", grupo: "IVE", foto: "imagens/ive.rei.jpeg" },
    { nome: "Leeseo", grupo: "IVE", foto: "imagens/ive.leeseo.jpeg" },
    { nome: "Karina", grupo: "aespa", foto: "imagens/aespa.karina.jpeg" },
    { nome: "Winter", grupo: "aespa", foto: "imagens/aespa.winter.jpeg" },
    { nome: "Giselle", grupo: "aespa", foto: "imagens/aespa.giselle.jpeg" },
    { nome: "Ningning", grupo: "aespa", foto: "imagens/aespa.ning.jpeg" }
];

// Guarda qual grupo está sendo visualizado (null = tela de grupos)
let grupoSelecionado = null;
 
// Capas dos grupos 
const capasGrupos = {
    "LE SSERAFIM": "imagens/lesserafim.sakura.jpg",
    "ITZY": "imagens/itzy.jpeg",
    "IVE": "imagens/ive.jpeg",
    "aespa": "imagens/aespa.jpeg"
};
 
// Função do HTML
function sortear() {
    const indiceAleatorio = Math.floor(Math.random() * participantes.length);
    const ganhador = participantes[indiceAleatorio];
 
    document.getElementById("foto-ganhador").src = ganhador.foto;
    document.getElementById("nome-ganhador").innerText = ganhador.nome;
 
    salvarNaColecao(ganhador);
    renderizarColecao(); // atualiza a coleção na tela após sortear
}
 
function salvarNaColecao(ganhador) {
    const colecao = JSON.parse(localStorage.getItem('colecao')) || [];
    colecao.push(ganhador);
    localStorage.setItem('colecao', JSON.stringify(colecao));
}
 
// Agrupa os cards por grupo
function agruparEContar(cards) {
    const porGrupo = {};
 
    cards.forEach(card => {
        if (!porGrupo[card.grupo]) porGrupo[card.grupo] = {};
 
        const membros = porGrupo[card.grupo];
        if (!membros[card.nome]) {
            membros[card.nome] = { qtd: 0, foto: card.foto };
        }
        membros[card.nome].qtd += 1;
    });
 
    return porGrupo;
}
 
function renderizarColecao() {
    const colecao = JSON.parse(localStorage.getItem('colecao')) || [];
    const porGrupo = agruparEContar(colecao);
 
    const container = document.getElementById("colecao");
    if (!container) return;
 
    container.innerHTML = "";
 
    if (grupoSelecionado === null) {
        renderizarListaDeGrupos(porGrupo, container);
    } else {
        renderizarCardsDoGrupo(porGrupo, grupoSelecionado, container);
    }
}
 
// Mostra uma capa clicável para cada grupo que já tem cartas
function renderizarListaDeGrupos(porGrupo, container) {
    const grid = document.createElement("div");
    grid.className = "grid-grupos";
 
    Object.keys(porGrupo).forEach(nomeGrupo => {
        const totalCartas = Object.values(porGrupo[nomeGrupo])
            .reduce((soma, dados) => soma + dados.qtd, 0);
 
        const el = document.createElement("div");
        el.className = "capa-grupo";
        el.innerHTML = `
            <img src="${capasGrupos[nomeGrupo] || ''}" alt="${nomeGrupo}">
            <p>${nomeGrupo}</p>
            <span>${totalCartas} carta${totalCartas > 1 ? 's' : ''}</span>
        `;
        el.addEventListener("click", () => {
            grupoSelecionado = nomeGrupo;
            renderizarColecao();
        });
 
        grid.appendChild(el);
    });
 
    container.appendChild(grid);
}
 
// Mostra os cards de membros só daquele grupo, com botão de voltar
function renderizarCardsDoGrupo(porGrupo, nomeGrupo, container) {
    const voltar = document.createElement("button");
    voltar.textContent = "← Voltar";
    voltar.addEventListener("click", () => {
        grupoSelecionado = null;
        renderizarColecao();
    });
    container.appendChild(voltar);
 
    const titulo = document.createElement("h2");
    titulo.textContent = nomeGrupo;
    container.appendChild(titulo);
 
    const grid = document.createElement("div");
    grid.className = "grid-cards";
 
    const membros = porGrupo[nomeGrupo] || {};
    Object.entries(membros).forEach(([nomeMembro, dados]) => {
        const el = document.createElement("div");
        el.className = "card";
        el.innerHTML = `
            <img src="${dados.foto}" alt="${nomeMembro}">
            <p>${dados.qtd > 1 ? `${nomeMembro} x${dados.qtd}` : nomeMembro}</p>
        `;
        grid.appendChild(el);
    });
 
    container.appendChild(grid);
}
 
document.addEventListener("DOMContentLoaded", renderizarColecao);
 
