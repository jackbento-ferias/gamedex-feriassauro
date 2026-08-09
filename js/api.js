/* ==========================================
   GAMEDEX API
========================================== */

const SHEET_ID = "1NH9mXn09mJYgRZ0PqN14WQ5xIuuZYV_Tt7dqt4aVs5g";
const SHEET_NAME = "Jogos";

const SHEET_URL =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_NAME}`;

/* ==========================================
   LOAD GAMES
========================================== */

async function loadGames() {

    try {

        const response = await fetch(SHEET_URL);
        const text = await response.text();

        const json = JSON.parse(
            text.substring(47).slice(0, -2)
        );

        const rows = json.table.rows;

        console.log(rows[0].c[7]);

       const games = rows.map(row => ({

    id: row.c[0]?.v ?? null,
    jogo: row.c[1]?.v ?? null,
    slug: row.c[2]?.v ?? null,
    franquia: row.c[3]?.v ?? null,
    plataforma: row.c[4]?.v ?? null,
    genero: row.c[5]?.v ?? null,

    dataInicio: row.c[6]?.v ?? null,
    dataInicioTexto: row.c[6]?.f ?? null,

    dataFim: row.c[7]?.v ?? null,
    dataFimTexto: row.c[7]?.f ?? null,

    ano: row.c[8]?.v ?? null,
    status: row.c[9]?.v ?? null,
    platina: row.c[10]?.v ?? null,
    dificuldade: row.c[11]?.v ?? null

}));

games.sort((a, b) => b.dataFim - a.dataFim);

console.log("Games carregados:", games);

console.log(games[0].dataFim);
console.log(typeof games[0].dataFim);

return games;

    } catch (error) {

        console.error("Erro ao carregar a planilha:", error);

        return [];

    }

}