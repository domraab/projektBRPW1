const activateUser = () =>{
    let activateMail = document.getElementById("activateEmail").value;
    let activateCode = document.getElementById("activateCode").value;
    fetch("http://localhost:5000/activateuser", {
      method:"post",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({email:activateMail, code:activateCode})
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
    })
    .then(() => {
      alert("Váš účet je aktivován");
      window.location.href = "prihlaseni.html"; 
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }