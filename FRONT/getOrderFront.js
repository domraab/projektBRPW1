function fetchProducts() {
    fetch('http://localhost:5000/getorder')
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

            const orders = document.getElementById('homeOrders');

            data.documents.forEach(order => {
                let orderContainer = document.createElement('div');
                orderContainer.onclick =()=>{
                    window.location.href = `order.html?id=${order._id}`;
                }
                orderContainer.classList.add('order-item');

                let orderTitle = document.createElement('h2');
                orderTitle.textContent = order.name;
                orderContainer.appendChild(orderTitle);
                
                let spanEmail = document.createElement('span');
                spanEmail.textContent = order.email;
                orderContainer.appendChild(spanEmail);

                let spanDate = document.createElement('span');
                let date = new Date(order.date).toLocaleString().slice(0,11);
                spanDate.textContent = date;
                orderContainer.appendChild(spanDate);

                let spanCount = document.createElement('span');
                spanCount.textContent = order.products.length;
                orderContainer.appendChild(spanCount);

                let spanPrice = document.createElement('span');
                spanPrice.textContent = order.price + ' Kč';
                orderContainer.appendChild(spanPrice);
                
  

                orders.appendChild(orderContainer);
            });
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});
