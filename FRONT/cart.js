window.onload = function() {
    zobrazKosik();
    updateTotalPrice(); // Initial calculation of total price
};

function zobrazKosik() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear the container before rendering

    cart.forEach(function (item, index) {
        // Create the main cart-item div
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Create and append the img element
        const img = document.createElement('img');
        img.src = item.img.slice(6);
        img.alt = item.name;
        cartItem.appendChild(img);

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
        price.textContent = item.price + ' Kč';
        itemDetails.appendChild(price);

        // Create the quantity input element
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity || 1; // Use stored quantity or default to 1
        quantityInput.min = 1;
        quantityInput.onchange = () => {
            if (quantityInput.value < 1) {
                quantityInput.value = 1; // Prevent value below 1
            }
            item.quantity = parseInt(quantityInput.value);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateItemPrice(itemPrice, item.price, item.quantity);
            updateTotalPrice();
        };

        // Create the increment button
        const btnInc = document.createElement('button');
        btnInc.classList.add('cartButton');
        btnInc.textContent = '+';
        btnInc.onclick = () => {
            quantityInput.value++;
            item.quantity = parseInt(quantityInput.value);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateItemPrice(itemPrice, item.price, item.quantity);
            updateTotalPrice();
        };

        // Create the decrement button
        const btnDec = document.createElement('button');
        btnDec.classList.add('cartButton');
        btnDec.textContent = '-';
        btnDec.onclick = () => {
            if (quantityInput.value > 1) {
                quantityInput.value--;
                item.quantity = parseInt(quantityInput.value);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateItemPrice(itemPrice, item.price, item.quantity);
                updateTotalPrice();
            }
        };

        // Create and append the span element for the item price
        const itemPrice = document.createElement('span');
        itemPrice.classList.add('item-total-price');
        updateItemPrice(itemPrice, item.price, item.quantity);
        itemDetails.appendChild(itemPrice);

        // Append the buttons and input to item-details
        itemDetails.appendChild(quantityInput);
        itemDetails.appendChild(btnDec);
        itemDetails.appendChild(btnInc);

        // Create and append the button element for removing the item
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Odstranit';
        removeBtn.onclick = () => {
            removeItemFromCart(index);
        };
        itemDetails.appendChild(removeBtn);

        // Append item-details to the main cart-item div
        cartItem.appendChild(itemDetails);

        // Append the cart-item div to the cart container
        cartContainer.appendChild(cartItem);
    });
}

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

    // Save the total price to localStorage
    localStorage.setItem('totalPrice', totalPrice);
}
