window.onload = function() {
    zobrazKosik();
    updateTotalPrice(); // Initial calculation of total price
};

function zobrazKosik() {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('order-summary');
    cartContainer.innerHTML = ''; // Clear the container before rendering

    cart.forEach(function (item, index) {
        // Create the main order-item div
    const orderItem = document.createElement('div');
    orderItem.classList.add('order-item');

    // Create and append the img element
    const img = document.createElement('img');
    img.src = item.img.slice(6);
    img.alt = item.name;
    orderItem.appendChild(img);

    // Create the item-details div
    const itemDetails = document.createElement('div');
    itemDetails.classList.add('item-details');

    // Create and append the h2 element for the product name
    const productName = document.createElement('h2');
    productName.textContent = item.name;
    itemDetails.appendChild(productName);

    // Create and append the p element for the price
    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = item.price+ ' Kč';
    itemDetails.appendChild(price);

    // Append item-details to the main order-item div
    orderItem.appendChild(itemDetails);

    cartContainer.appendChild(orderItem);

    // Append the order-item div to the body or any other container
    
    
    });
};

function updateItemPrice(itemPriceElement, price, quantity) {
    itemPriceElement.textContent = (price * quantity) + ' Kč';
}

function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    zobrazKosik();
    updateTotalPrice();
}

function updateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * (item.quantity || 1);
    });

    const totalPriceSpan = document.getElementById('total-price');
    totalPriceSpan.textContent = `Celková cena: ${totalPrice} Kč`;
}
