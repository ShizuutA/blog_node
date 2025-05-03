let userbtn = document.querySelector('#user-nav-btn');

userbtn.addEventListener('click', function() {
    let usernav = document.querySelector('#user-nav')
   if (usernav.classList.contains('show')) {
        usernav.classList.remove('show'); 
    } else {
        usernav.classList.add('show'); 
    }
});