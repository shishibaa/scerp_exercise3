        const memberList = document.getElementById("memberList");
        const searchForm = document.getElementById("search-form")
        const searchInput = document.getElementById("search-input");
        let members = [];

        async function getMember() {
            const response = await fetch('https://api.tsukijou.dev/members');
            const jsonData = await response.json();
            if (response.status !== 200) {
                alert('Something went wrong');
            }

            saveList(jsonData);
        }

        function saveList(list) {
            members = list;
            renderList(members);
        }

        function renderList(list) {
            memberList.textContent = "";
            const div = document.createElement("div");

            if (!list.length) {
                div.innerHTML = `<p>Member Not Found</p>`
                memberList.appendChild(div);
                return;
            }

            list.forEach(member => {
                const div = document.createElement("div");
                div.innerHTML = `
                                <div class="member-card">
                                <h1 class="id"> ${member.id}</h1>
                                <h2 class="title"> ${member.title}</h2>
                                <div class = "bio-wrapper"><p class="bio"> ${member.bio}</p></div>
                                <p class="website"> <a href="${member.website}">Visit</a></p>
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
