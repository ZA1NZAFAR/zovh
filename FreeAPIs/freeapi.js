const entriesTable = document.getElementById("entries");
const loading = document.createElement("div");
loading.innerHTML = "Loading...";
loading.style.textAlign = "center";
loading.style.fontSize = "24px";
loading.style.marginTop = "20px";
document.body.appendChild(loading);

fetch("https://api.publicapis.org/entries")
    .then(response => response.json())
    .then(data => {
        const entries = data.entries;
        const entriesTable = document.getElementById("entries");
        for (let i = 0; i < entries.length; i++) {
            const api = entries[i].API;
            const description = entries[i].Description;
            const link = entries[i].Link;
            const row = `
        <tr>
          <td>${api}</td>
          <td>${description}</td>
          <td><a href="${link}" target="_blank">${link}</a></td>
        </tr>
      `;
            entriesTable.innerHTML += row;
        }
    });
