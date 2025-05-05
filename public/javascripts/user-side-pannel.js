document.addEventListener('DOMContentLoaded', function() {
    let userbtn = document.querySelector('#user-nav-btn');
    let usernav = document.querySelector('#user-nav');

    userbtn.addEventListener('click', function(event) {
        event.stopPropagation(); 
        userbtn.style.display = 'none';
        usernav.classList.add('show');

        let smoke = document.createElement('div');
        smoke.classList.add('smoke-screen');
        document.body.appendChild(smoke);
    });

    document.addEventListener('click', function(event) {
        var target = event.target;
        if (!usernav.contains(target) && target !== userbtn) {
            userbtn.style.display = 'flex';
            usernav.classList.remove('show');
            let smoke = document.querySelector('.smoke-screen');
            if (smoke) {
                smoke.remove();
            }
        }
    });
});