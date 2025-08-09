let currentSource = "all";

// You can add or remove sources here
const sources = [
    { id: "all", name: "All" },
    { id: "help", name: "Help Articles" },
    { id: "legal", name: "Legal Docs" },
    { id: "community", name: "Community" },
    { id: "news", name: "News" } // example of adding a new one
];

// You can add or remove search results here
const data = [
    { title: "Account Recovery", link: "#", url: "dasc.org/help/account-recovery", snippet: "Learn how to <b>recover</b> your lost Discord account quickly.", source: "help" },
    { title: "Community Guidelines", link: "#", url: "dasc.org/community/rules", snippet: "Read our <i>official</i> community guidelines to stay compliant.", source: "community" },
    { title: "Terms of Service", link: "#", url: "dasc.org/legal/tos", snippet: "View the <b>Terms</b> that govern your use of DASC© services.", source: "legal" },
    { title: "Support Contact", link: "#", url: "dasc.org/help/contact", snippet: "Reach our <a href='#'>help desk</a> for assistance.", source: "help" },
    { title: "DASC Newsroom", link: "#", url: "dasc.org/news", snippet: "Stay updated with <b>official announcements</b> from DASC©.", source: "news" }
];

// Build the source filter buttons dynamically
function renderSourceFilters() {
    const filterContainer = document.getElementById("sourceFilters");
    filterContainer.innerHTML = "";
    sources.forEach(src => {
        const btn = document.createElement("button");
        btn.textContent = src.name;
        btn.onclick = () => setSource(src.id);
        if (src.id === currentSource) btn.classList.add("active");
        filterContainer.appendChild(btn);
    });
}

function setSource(source) {
    currentSource = source;
    renderSourceFilters();
    performSearch();
}

function performSearch() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const results = data.filter(item => {
        const matchesSource = currentSource === "all" || item.source === currentSource;
        const matchesQuery = item.title.toLowerCase().includes(query) || item.snippet.toLowerCase().includes(query);
        return matchesSource && matchesQuery;
    });

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
    }

    results.forEach(item => {
        resultsDiv.innerHTML += `
            <div class="result-item">
                <a href="${item.link}" class="result-title">${item.title}</a>
                <div class="result-url">${item.url}</div>
                <div class="result-snippet">${item.snippet}</div>
            </div>
        `;
    });
}

function luckySearch() {
    if (data.length > 0) {
        window.location.href = data[0].link;
    }
}

// Initialize filters on page load
document.addEventListener("DOMContentLoaded", renderSourceFilters);
