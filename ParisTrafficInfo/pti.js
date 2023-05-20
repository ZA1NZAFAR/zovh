fetch('https://api-ratp.pierre-grimaud.fr/v4/traffic')
    .then(response => response.json())
    .then(data => {
        let content = document.getElementById('content');
        ['metros', 'rers', 'tramways'].forEach(category => {
            let table = document.createElement('table');
            let caption = table.createCaption();
            caption.textContent = category.toUpperCase();
            let headerRow = table.insertRow();
            ['Line', 'Status', 'Title', 'Message'].forEach(headerText => {
                let headerCell = document.createElement('th');
                headerCell.textContent = headerText;
                headerRow.appendChild(headerCell);
            });

            data.result[category].forEach(item => {
                let row = table.insertRow();
                ['line', 'slug', 'title', 'message'].forEach(key => {
                    let cell = row.insertCell();
                    cell.textContent = item[key];
                });
            });

            content.appendChild(table);
        });
    })
    .catch(error => console.error('Error:', error));