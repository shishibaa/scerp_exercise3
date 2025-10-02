const memberList = document.getElementById("memberList");
const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search-input");
let members = [];

async function getMember() {
    try{
        const response = await fetch("https://api.tsukijou.dev/members");
        if (!response.ok) {
    }

}

function saveList(list) {
    members = list;
    renderList(members);
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
        const graduated = member.graduated ? "Graduated" : "Not Graduated";
        let website;
        if (member.website && isValidUrl(member.website)) {
            website = `<a href="${member.website}">Visit</a>`;
        } else {
            website = `<a href="#" onclick="alert('The website is under construction');">Visit</a>`;
        }
        div.innerHTML = `
                                <div class="member-card">
                                <h1 class="id"> ${member.id}</h1>
                                <h2 class="title"> ${member.title}</h2>
                                <p class="graduated"> (${graduated})</p>
                                <div class = "bio-wrapper"><p class="bio"> ${member.bio}</p></div>
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
