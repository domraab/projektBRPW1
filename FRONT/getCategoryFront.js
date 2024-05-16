document.addEventListener('DOMContentLoaded', function() {
    getCategory();
});

function getCategory() {
    fetch('http://localhost:5000/getcategory')
        .then(response => {
            if (!response.ok) {
                throw new Error('Nepodařilo se získat data');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data.documents)) {
                throw new Error('Data nejsou ve správném formátu');
            }


            const productContainer = document.getElementById('homeCategory');

            
            data.documents.forEach(item => {
                const flexDiv = document.createElement('div');
                flexDiv.classList.add('flex');

                const nazevDiv = document.createElement('div');
                nazevDiv.textContent = item.name;
                nazevDiv.classList.add('divContainer')

                const popisDiv = document.createElement('div');
                popisDiv.textContent = item.description;
                popisDiv.classList.add('divContainer');

                const buttonsDiv = document.createElement('div');
                const smazatButton = document.createElement('button');
                smazatButton.textContent = 'Smazat';
                smazatButton.onclick = () => deleteProduct(item._id);
                smazatButton.classList.add('button');

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('button');
                editButton.onclick =()=> {
                window.location.href = `categoryAdd.html?id=${item._id}`;
                }

                buttonsDiv.appendChild(smazatButton);
                buttonsDiv.appendChild(editButton);
                buttonsDiv.classList.add('buttonsDiv')


                flexDiv.appendChild(nazevDiv);
                flexDiv.appendChild(popisDiv);
                flexDiv.appendChild(buttonsDiv);
                flexDiv.classList.add('flexDiv')

                productContainer.appendChild(flexDiv);
            });
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}





async function deleteProduct(categoryId) { 
    try {
        const response = await fetch(`http://localhost:5000/delete-category/${categoryId}`, { // Použití await pro počkání na odpověď
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Nepodařilo se smazat Kategorii');
        }
        const productElement = document.getElementById(categoryId);
        productElement.remove();
        console.log('Kategorie byl úspěšně smazán');
        location.reload(location.href);
    } catch (error) {
        console.error('Kategorie při mazání produktu:', error);
    }
}