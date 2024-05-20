document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const orderId = queryParams.get('id');
    fetchOrderInfo(orderId)
});

function fetchOrderInfo(orderId) {
    fetch(`http://localhost:5000/get-order/${orderId}`)
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
            const name = document.getElementById('orderName');
            const email = document.getElementById('orderEmail');
            const phone = document.getElementById('orderPhone');
            const date= document.getElementById('orderDate');
            const price = document.getElementById('orderPrice');

            const orderList = document.getElementById('products-order');

            data.documents.forEach(order => {
                order.products.forEach(productItem => {
                    let productContainer = document.createElement('div');
                    productContainer.classList.add('order-product');

                    let productDetails = document.createElement('div');
                    productDetails.classList.add('product-details');
                    productContainer.appendChild(productDetails);

                    let img = document.createElement('img');
                    img.src = productItem.productId ? productItem.productId.url.slice(6) : 'Unknown Product';
                    productDetails.appendChild(img);
                        
                    let productTitle = document.createElement('h3');
                    productTitle.textContent = productItem.productId ? productItem.productId.name : 'Unknown Product';
                    productDetails.appendChild(productTitle);

                    let productPrice = document.createElement('p');
                    productPrice.classList.add('product-price');
                    productPrice.textContent = productItem.productId ? `${productItem.productId.price} Kč` : 'Unknown Price';
                    productDetails.appendChild(productPrice);

                     let productQuantity = document.createElement('p');
                    productQuantity.classList.add('product-quantity');
                    productQuantity.textContent = `Množství: ${productItem.quantity}`;
                    productDetails.appendChild(productQuantity);

                    orderList.appendChild(productContainer);
                });
                name.textContent ='Jméno: ' + order.name;
                email.textContent = 'Email: ' +order.email;
                phone.textContent = 'Telefon: ' +order.phone;
                let dateEdit = new Date(order.date).toLocaleString().slice(0,11);
                date.textContent ='Datum objednání: ' + dateEdit;
                price.textContent = 'Cena: ' +order.price + ' Kč';
            });
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}


