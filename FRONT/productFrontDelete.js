document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('productList');

    // Funkce pro načtení a zobrazení produktů
    function loadProducts() {
        // Zde můžeš použít AJAX požadavek nebo Fetch API na získání produktů z MongoDB
        // Pro účely demonstrace použijeme statická data
        const products = [
            { id: 1, name: 'Produkt 1', price: '19.99' },
            { id: 2, name: 'Produkt 2', price: '29.99' },
            // Další produkty...
        ];

        // Vytvoření HTML pro každý produkt
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

        // Přidání posluchače události pro tlačítka "Odebrat"
        const deleteProductButtons = document.querySelectorAll('.delete-product-btn');
        deleteProductButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = button.getAttribute('data-product-id');
                deleteProduct(productId);
            });
        });
    }

    // Funkce pro smazání produktu
    function deleteProduct(productId) {
        // Zde můžeš použít AJAX požadavek nebo Fetch API na smazání produktu z MongoDB
        // Pro účely demonstrace použijeme statický alert
        alert(`Produkt s ID ${productId} byl úspěšně odstraněn.`);
        // Aktualizace seznamu produktů po smazání
        productList.innerHTML = '';
        loadProducts();
    }

    // Načtení a zobrazení produktů při načtení stránky
    loadProducts();
});
