document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('productList');


    function loadProducts() {

        const products = [
            { id: 1, name: 'Produkt 1', price: '19.99' },
            { id: 2, name: 'Produkt 2', price: '29.99' },

        ];

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <p>ID: ${product.id}</p>
                <p>Název: ${product.name}</p>
                <p>Cena: ${product.price} €</p>
                <button class="delete-product-btn" data-product-id="${product.id}">Odebrat</button>
            `;
            productList.appendChild(productDiv);
        });
      const deleteProductButtons = document.querySelectorAll('.delete-product-btn');
        deleteProductButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = button.getAttribute('data-product-id');
                deleteProduct(productId);
            });
        });
    }

    function deleteProduct(productId) {
      
        alert(`Produkt s ID ${productId} byl úspěšně odstraněn.`);
        
        productList.innerHTML = '';
        loadProducts();
    }

  
    loadProducts();
});
