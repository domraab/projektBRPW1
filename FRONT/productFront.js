function fetchData() {
    fetch('http://localhost:5000/get-visible-product')
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

            const productContainer = document.getElementById('productContainer');

            data.documents.forEach(item => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('products');
                
                const image = document.createElement('img');
                image_url = item.url;
                image.src = image_url.slice(6);
                console.log(item.url);
                image.alt = item.name;
                productDiv.appendChild(image);
                
                const nameHeading = document.createElement('h3');
                nameHeading.textContent = item.name;
                productDiv.appendChild(nameHeading);
                
                const priceHeading = document.createElement('h4');
                priceHeading.textContent = item.price + ' Kč';
                productDiv.appendChild(priceHeading);
                
                const buyLink = document.createElement('a');
                buyLink.href = '#';
                buyLink.classList.add('primary-btn');
                buyLink.textContent = 'Kup nyní';
                /*Přidávání položek do košíku*/
                buyLink.onclick = ()=> {
                    addToCart(
                    item._id,item.name, item.url, item.price);
                    alert('Položka: ' + item.name + ' byla přidána do košíku');
                }; 
                
                productDiv.appendChild(buyLink);
                
                productContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}

function addToCart(id, name, img, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let newProduct = {
        id:id,
        name: name,
        img: img,
        price: price
    };

    let productExists = cart.some(product => product.name === name);

    if (!productExists) {
        cart.push(newProduct);

        localStorage.setItem('cart', JSON.stringify(cart));

        console.log('Product added to cart:', newProduct);
    } else {
        console.log('Product already in cart:', newProduct);
    }
}

window.onload = function() {
    fetchData();
};
