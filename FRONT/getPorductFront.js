
function fetchProducts() {
    fetch('http://localhost:5000/getproduct')
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


            const productContainer = document.getElementById('homeProducts');

            
            data.documents.forEach(item => {
                const flexDiv = document.createElement('div');
                flexDiv.classList.add('flex');

                const nazevDiv = document.createElement('div');
                nazevDiv.textContent = item.name;
                nazevDiv.classList.add('divContainer')
                
                const categoryDiv = document.createElement('div');
                categoryDiv.textContent = item.category.name;
                categoryDiv.classList.add('divContainer')

                const codeDiv = document.createElement('div');
                codeDiv.textContent = item.code;
                codeDiv.classList.add('divContainer');

                const cenaDiv = document.createElement('div');
                cenaDiv.textContent = item.price;
                cenaDiv.classList.add('divContainer');

                const popisDiv = document.createElement('div');
                popisDiv.textContent = item.description;
                popisDiv.classList.add('divContainer');

                const buttonsDiv = document.createElement('div');
                const smazatButton = document.createElement('button');
                smazatButton.textContent = 'Smazat';
                smazatButton.onclick = () => deleteProduct(item._id);
                smazatButton.classList.add('button');

                const videtButton = document.createElement('button');
                if(item.isVisible){
                    videtButton.textContent = 'Viditelný';  
                }

                else{
                    videtButton.textContent = 'Neviditelný';    
                }
                videtButton.classList.add('button');
                videtButton.onclick =()=>{
                    checkVisibility(item._id);
                }

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('button');
                editButton.onclick =()=> {
                window.location.href = `productAdd.html?id=${item._id}`;
                }

                buttonsDiv.appendChild(smazatButton);
                buttonsDiv.appendChild(videtButton);
                buttonsDiv.appendChild(editButton);
                buttonsDiv.classList.add('buttonsDiv')


                flexDiv.appendChild(nazevDiv);
                flexDiv.appendChild(categoryDiv);
                flexDiv.appendChild(codeDiv);
                flexDiv.appendChild(cenaDiv);
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




async function deleteProduct(productId) { 
    
    try {
        
        const response = await fetch(`http://localhost:5000/delete-product/${productId}`, { // Použití await pro počkání na odpověď
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Nepodařilo se smazat produkt');
        }
        window.location.reload();
    } catch (error) {
        console.error('Chyba při mazání produktu:', error);
    }
}


const updateVisibility = async(productId) =>{
    try {
        const response = await fetch(`http://localhost:5000/update-visible-product/${productId}`, { // Použití await pro počkání na odpověď
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Nepodařilo se aktualizovat produkt');
        }
        
    } catch (error) {
        console.error('Chyba při aktualizaci produktu:', error);
    }
}




const updateFalseVisibility = async(productId) =>{
    try {
        const response = await fetch(`http://localhost:5000/update-visible-product-false/${productId}`, { // Použití await pro počkání na odpověď
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Nepodařilo se aktualizovat produkt');
        }
        
    } catch (error) {
        console.error('Chyba při aktualizaci produktu:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});


const checkVisibility = (productId) =>{
    fetch(`http://localhost:5000/get-visibility/${productId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Nepodařilo se získat data');
        }
        return response.json();
    })
    .then(data => {
        if(data.msg === 'true'){
            updateFalseVisibility(productId);
            window.location.reload();
        }

        if(data.msg === 'false'){
            updateVisibility(productId);
            window.location.reload();
        }
    })
    .catch(error => {
        console.error('Chyba při získávání dat:', error);
    });
}

