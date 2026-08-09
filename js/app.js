/* ==================================================
   GAMEDex
   Feriassauro
================================================== */


/* ==================================================
   HELPERS
================================================== */

// Funções auxiliares serão adicionadas aqui.

function getPlatformSlug(platform) {

    return platform
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}


function renderDifficulty(level) {

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= 5; i++) {
        const icon = document.createElement("img");

        icon.src =
          "assets/images/branding/icons/difficulty.svg";

        icon.alt = "Dificuldade";

        icon.classList.add("difficulty-icon");

    if (i <= level) {

     icon.classList.add("difficulty-active");

} else {

     icon.classList.add("difficulty-inactive");

    }

    fragment.appendChild(icon);

}

console.log(fragment.childNodes.length);

return fragment;

}


function renderAchievement(achievement) {

    console.log(achievement);

    if (achievement === "Não") {

        return null;

    }

    const badge = document.createElement("img");

    if (achievement === "Platina") {

        badge.src =
    "assets/images/branding/icons/platinum.svg";

}

    if (achievement === "100%") {

    badge.src =
        "assets/images/branding/icons/completed-100.svg";

}

    badge.alt = achievement;

    badge.classList.add(
    "achievement-badge"
);

console.log(badge);

return badge;

}


function parseDate(dateString) {

    const [day, month, year] = 
    dateString.split("/");

    return new Date(
    year,
    month - 1,
    day
);

}


function renderDates(game) {

    if (!game.dataFim) {

    return "Em andamento";

}

    if (!game.dataInicio) {

    return `Finalizado em ${game.dataFimTexto}`;

}

return `${game.dataInicioTexto} → ${game.dataFimTexto}`;

}


// Converte datas da API do Google
// "Date(2025,7,15)" para timestamp.


function parseGoogleDate(dateString) {

    if (!dateString) {

        return 0;

    }

    const match = dateString.match(
        /Date\((\d+),(\d+),(\d+)\)/
    );

    if (!match) {

        return 0;

    }

    return new Date(
        Number(match[1]),
        Number(match[2]),
        Number(match[3])
    ).getTime();

}

const PLATFORM_GROUPS = {

    // PlayStation
    "PlayStation 5": "playstation",
    "PlayStation 4": "playstation",
    "PlayStation 3": "playstation",
    "PlayStation 2": "playstation",
    "PlayStation": "playstation",

    // Nintendo
    "Nintendo Switch 2": "nintendo",
    "Nintendo Switch": "nintendo",
    "Wii U": "nintendo",
    "Wii": "nintendo",
    "GameCube": "nintendo",
    "Nintendo 64": "nintendo",
    "Super Nintendo": "nintendo",
    "NES": "nintendo",
    "Nintendo 3DS": "nintendo",
    "Nintendo DS": "nintendo",
    "Game Boy Advance": "nintendo",

    // Microsoft
    "Xbox": "microsoft",
    "Xbox 360": "microsoft",
    "Xbox One": "microsoft",
    "Xbox Series X": "microsoft",
    "Xbox Series S": "microsoft",

    // SEGA
    "Master System": "sega",
    "Mega Drive": "sega",
    "SEGA Saturn": "sega",
    "Dreamcast": "sega",

    // PC
    "Steam": "pc",
    "PC": "pc",

};

function getPlatformGroup(platform) {

    return PLATFORM_GROUPS[platform] ?? "";

}


/* ==================================================
   JOURNEY
================================================== */

function updateJourneyCounter(totalGames) {

    const counter = document.getElementById("games-completed");

    animateCounter(counter, totalGames);

}

function updateJourney(games) {

    const totalCompleted = games.filter(game =>
        game.status === "Zerado"
    ).length;

    updateJourneyCounter(totalCompleted);

}

function updateCurrentAdventure(game) {

    if (!game) return;

    const cover = document.getElementById("current-game-cover");
    const title = document.getElementById("current-game-title");
    const platform = document.getElementById("current-game-platform");

    const platformLogo = document.getElementById(
    "current-game-platform-logo"
);

const platformSlug = getPlatformSlug(
    game.plataforma
);

    cover.src =
        `assets/images/games/covers/${game.slug}-cover.png`;

    cover.alt = game.jogo;

    title.textContent = game.jogo;

platformLogo.src =
    `assets/images/platforms/${platformSlug}-logo.png`;

platformLogo.alt =
    game.plataforma;

}

function updateNextAdventure(game) {

    if (!game) return;

    const cover = document.getElementById("next-game-cover");
    const title = document.getElementById("next-game-title");
    const platformLogo = document.getElementById(
        "next-game-platform-logo"
    );

    const platformSlug = getPlatformSlug(
     game.plataforma
);

    cover.src =
        `assets/images/games/covers/${game.slug}-cover.png`;

    cover.alt = game.jogo;

    title.textContent = game.jogo;

    platformLogo.src =
        `assets/images/platforms/${platformSlug}-logo.png`;

    platformLogo.alt =
        game.plataforma;


}

function updateLongestAdventure(games) {

 const completedGames = games.filter(game =>
    game.status === "Zerado"
);

    const franchises = {};

    completedGames.forEach(game => {

        const franchise = game.franquia;

        if (!franchise) return;

        franchises[franchise] = (franchises[franchise] || 0) + 1;

    });

    let longestFranchise = "";
    let totalGames = 0;

    Object.entries(franchises).forEach(([franchise, total]) => {

        if (total > totalGames) {

            longestFranchise = franchise;
            totalGames = total;

        }

        /* Proteção caso não exista nenhuma franquia */

if (!longestFranchise) {

    document.getElementById("longest-franchise").textContent = "-";

    document.getElementById("longest-franchise-total").textContent =
        "Nenhum jogo concluído";

    return;

}

    });

    document.getElementById("longest-franchise").textContent =
        longestFranchise.toUpperCase();

   const subtitle =
    totalGames === 1
        ? "jogo concluído"
        : "jogos concluídos";

document.getElementById("longest-franchise-total").textContent =
    `${totalGames} ${subtitle}`;
}

/* ==================================================
   ADVENTURES
================================================== */

// Renderização da lista de aventuras.

function renderAdventure(game, container) {

    console.table(game);

    const template = document.getElementById(
        "adventure-card-template"
    );

    const clone = template.content.cloneNode(true);

    const title = clone.querySelector(
        ".adventure-title"
    );

    const cover = clone.querySelector(
    ".adventure-cover-image"
);

    cover.src =
    `assets/images/games/covers/${game.slug}-cover.png`;

    cover.alt = game.jogo;

    title.textContent = game.jogo;

    const platformLogo = clone.querySelector(
    ".adventure-platform-logo"
);

const dates = clone.querySelector(
    ".adventure-dates"
);

const platformSlug = getPlatformSlug(
    game.plataforma
);

        dates.textContent = renderDates(game);

    platformLogo.src =
    `assets/images/platforms/${platformSlug}-logo.png`;

platformLogo.alt = game.plataforma;


const difficulty = clone.querySelector(
    ".adventure-difficulty-icons"
);

console.log(game.dificuldade);

difficulty.appendChild(
    renderDifficulty(game.dificuldade)
);

const achievement = clone.querySelector(
    ".adventure-achievement"
);

const badge = renderAchievement(
    game.platina
);

if (badge) {

    achievement.appendChild(badge);

    console.log(achievement.innerHTML);

}

    console.log(difficulty.innerHTML);

    console.log(clone);

    container.appendChild(clone);

}

function updateYearToggle(toggle, isOpen) {

    toggle.textContent = isOpen ? "▼" : "▶";

}

function renderAdventures(games) {

    const adventureList = document.querySelector(
    ".adventure-list"
);

    const counter = document.querySelector(
    ".adventure-filter-counter"
);

    const platformFilter = document.querySelector(
    "#platform-filter"
);

    const selectedPlatform =
    platformFilter.value;

    const filteredGames = games.filter(game => {

    if (game.status !== "Zerado") {

        return false;

    }

    if (selectedPlatform === "all") {

        return true;

    }


    return getPlatformGroup(game.plataforma) === selectedPlatform;

});




   counter.textContent =
`${filteredGames.length} ${
    filteredGames.length === 1
        ? "Aventura"
        : "Aventuras"
}`;

adventureList.innerHTML = "";

const adventuresByYear = {};

filteredGames.forEach(game => {

    const year = game.ano;

    if (!adventuresByYear[year]) {

    adventuresByYear[year] = [];

}

adventuresByYear[year].push(game);


});

const years = Object.keys(adventuresByYear).sort((a, b) => b - a);

if (filteredGames.length === 0) {

    adventureList.innerHTML = `
        <p class="adventure-empty">
            🦖 Nenhuma aventura registrada nessa plataforma... por enquanto!
        </p>
    `;

    return;

}

years.forEach((year, index) => {

    const yearSection = document.createElement("section");

    yearSection.className = "adventure-year";

    if (index === 0) {

    yearSection.classList.add("is-open");

}

const yearHeader = document.createElement("div");

yearHeader.className = "adventure-year-header";

    const yearTitle = document.createElement("h3");

    yearTitle.textContent = year;

    yearTitle.className = "adventure-year-title";

    const yearCounter = document.createElement("span");

yearCounter.className = "adventure-year-counter";

yearCounter.textContent =
    `${adventuresByYear[year].length} ${
        adventuresByYear[year].length === 1
            ? "Aventura"
            : "Aventuras"
    }`;

    const yearToggle = document.createElement("span");

yearToggle.className = "adventure-year-toggle";

yearToggle.textContent = index === 0 ? "▼" : "▶";

yearHeader.appendChild(yearToggle);

yearHeader.appendChild(yearTitle);

yearHeader.appendChild(yearCounter);

    const yearList = document.createElement("div");

    yearList.className = "adventure-year-list";


yearHeader.addEventListener("click", () => {

    const isOpen = yearSection.classList.contains("is-open");

    document
        .querySelectorAll(".adventure-year.is-open")
        .forEach(section => {

            section.classList.remove("is-open");

            const toggle = section.querySelector(
                ".adventure-year-toggle"
            );

           updateYearToggle(toggle, false);

        });

    if (!isOpen) {

        yearSection.classList.add("is-open");

        updateYearToggle(yearToggle, true);

    }

});

adventuresByYear[year]
    .sort((a, b) => {
        return parseGoogleDate(b.dataFim)
             - parseGoogleDate(a.dataFim);
    })
    .forEach(game => {

        renderAdventure(game, yearList);

    });

   yearSection.appendChild(yearHeader);

    yearSection.appendChild(yearList);

    adventureList.appendChild(yearSection);

});

}

/* ==================================================
   PLATFORMS
================================================== */

// Estatísticas e logos das plataformas.


/* ==================================================
   DASHBOARD
================================================== */

// Componentes visuais e interações.



function updateDashboard(games) {

    updateJourney(games);

}


/* ==================================================
   INITIALIZE
================================================== */

async function init() {

    console.log("GameDex iniciada!");

    const games = await loadGames();


    updateJourney(games);

    const currentGame = games.find(
        game => game.status === "Jogando"
    );

    updateCurrentAdventure(currentGame);

    updateLongestAdventure(games);
    
    const nextGame = games.find(
    game => game.status === "Em breve"
    );

    updateNextAdventure(nextGame);

    renderAdventures(games);


    const platformFilter = document.querySelector(
    "#platform-filter"
);

    platformFilter.addEventListener("change", () => {

    renderAdventures(games);


});
}

init();