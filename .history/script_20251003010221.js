const memberList = document.getElementById("memberList");
const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search-input");
let members = [];

async function getMember() {
    try {
        const response = await fetch("https://api.tsukijou.dev/members");
        if (!response.ok) {
            alert("Failed to fetch member data");
            return;
        }
        const jsonData = await response.json();
        saveList(jsonData);
    } catch (error) {
        alert("An error occurred while fetching member data");
        console.error(error);
        return
    }
}

function saveList(list) {
    members = list;
    renderList(members);
}

function escapeHtml(s) {
    return String(s ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function escapeJsString(s) {
    return String(s ?? "").replace(/[^0-9A-Za-z ]/g, c =>
        "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")
    );
}

function renderList(list) {
    memberList.textContent = "";
    const div = document.createElement("div");

    if (!list.length) {
        div.textContent = "Member Not Found";
        memberList.appendChild(div);
        return;
    }

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    }

    list.forEach(member => {
        const div = document.createElement("div");
        const graduated = escapeHtml(member.graduated) ? "Graduated" : "Not Graduated";
        let website;
        if (member.website && isValidUrl(member.website)) {
            website = `<a href="${member.website}">Visit</a>`;
        } else {
            website = `<a href="#" onclick="alert('The website is under construction');">Visit</a>`;
        }
        div.innerHTML = `
                                <div class="member-card">
                                <h1 class="id"> ${escapeHtml(member.id)}</h1>
                                <h2 class="title"> ${escapeHtml(member.title)}</h2>
                                <p class="graduated"> (${graduated})</p>
                                <div class = "bio-wrapper"><p class="bio"> ${escapeHtml(member.bio}</p></div>
                                <p class="website">${website}</p>

                                </div>
                                `
        memberList.appendChild(div)
    });

}

function searchMember() {
    const sInput = (searchInput.value || "").trim().toLowerCase();
    if (!sInput) {
        renderList(members);
        return;
    }
    const filtered = members.filter(member =>
        (member.id || "").toLowerCase().includes(sInput)
    );
    renderList(filtered);
}

searchInput.addEventListener('input', searchMember);
getMember();
