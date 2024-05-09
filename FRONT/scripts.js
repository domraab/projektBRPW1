document.addEventListener("DOMContentLoaded", function() {
    var produktLi = document.querySelector('nav ul li:first-child');
    var produktSubMenu = produktLi.querySelector('ul');
    
    produktLi.addEventListener('click', function() {
        produktSubMenu.classList.toggle('active');
    });
});
