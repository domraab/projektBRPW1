const checkLogin = () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = "login.html";
    }
    fetch('http://localhost:5000/check-login', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Nepodařilo se získat data');
            }
            return response.json();
        })
        .then(data => {
          let message = data.message; 
          if(message != "login"){
            window.location.href = "login.html";
           }
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}

function fetchUserName() {
    fetch('http://localhost:5000/getUserInfo', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Nepodařilo se získat jméno uživatele');
        }
        return response.json();
    })
    .then(data => {
        
        const userDiv = document.querySelector('.user');
        userDiv.textContent = data.userInfo;
    })
    .catch(error => {
        console.error('Chyba při získávání jména uživatele:', error);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
    fetchUserName();
});