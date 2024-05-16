const addToDB = () => {
    const name = document.getElementById('categoryName').value;
    const description = document.getElementById('categoryDescription').value;

    fetch('http://localhost:5000/save-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, description: description })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert(data.msg);
        window.location.href = "categoryAdd.html";
    })
    .catch(error => {
        console.error('Error uploading category:', error);
        alert('Error uploading category: ' + error.message);
    });
}

const click =()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const categoryId = queryParams.get('id');
    
    if(categoryId){
        updateToDB(categoryId);
    }
    else{
        addToDB();
    }
}

const saveButton = document.getElementById('saveButton');
saveButton.onclick = () =>{
    click();
}

document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const categoryId = queryParams.get('id');
    if (categoryId) {
        getCategoryInfo(categoryId);
    }
});

const updateToDB =(categoryId)=> {
    const name = document.getElementById('categoryName').value;
    const description = document.getElementById('categoryDescription').value;

    fetch(`http://localhost:5000/update-category/${categoryId}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name:name, description:description}) 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.msg);
        window.location.href = "category.html";
    })
    .catch(error => {
        console.error('Error uploading product:', error);
    });
}
const getCategoryInfo = (categoryId) => {
    fetch(`http://localhost:5000/get-category/${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Nepodařilo se získat data');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const product = data.documents[0]; 
            document.getElementById("categoryName").value = product.name;
            document.getElementById("categoryDescription").value = product.description;
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}