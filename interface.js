const fileInput = document.getElementById('file-input');
        fileInput.addEventListener('change', function() {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function() {
                const contents = reader.result;
                const rows = contents.split('\n');
                const data = [];
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i].trim();
                    if (row) {
                        const values = row.split(',');
                        data.push(values);
                    }
                }
                // Create
                const table = document.createElement('table');
                table.setAttribute('border', '1');
                // Create data rows
                for (let i = 0; i < data.length; i++) {
                    const row = document.createElement('tr');
                    for (let j = 0; j < data[i].length; j++) {
                    const cell = document.createElement('td');
                    const cellText = document.createTextNode(data[i][j]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
            // Add table to container
            const tableContainer = document.getElementById('table-container');
            tableContainer.innerHTML = '';
            tableContainer.appendChild(table);
        };
        reader.readAsText(file);
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('table tr');
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            let found = false;
            for (let j = 0; j < cells.length; j++) {
                const cell = cells[j];
                const text = cell.innerText.toLowerCase();
                if (text.indexOf(filter) !== -1) {
                    found = true;
                    break;
                }
            }
            if (found) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    });