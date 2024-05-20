const addToDB = () => {
  const name = document.getElementById('nameCheckout').value;
  const email = document.getElementById('emailCheckout').value;
  const address = document.getElementById('addressCheckout').value;
  const phone = document.getElementById('phoneCheckout').value;
  const price = parseInt(localStorage.getItem('totalPrice'));
  const productsID = JSON.parse(localStorage.getItem('cart')) || [];

  if (!Array.isArray(productsID) || productsID.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const products = productsID.map(product => ({
    productId: product.id,
    quantity: product.quantity
  }));

  console.log({ products, name, email, address, phone, price });

  fetch('http://localhost:5000/save-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      products: products,
      name: name,
      email: email,
      address: address,
      phone: phone,
      price:price
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert(data.msg);
    })
    .catch(error => console.error('Error:', error));
};

const btn = document.getElementById('saveCheckout');
btn.onclick = () => {
  addToDB();
};