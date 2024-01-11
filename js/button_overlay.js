window.addEventListener('load', function() {
    var btnsTop = document.querySelectorAll('.categoryButtonTop');
    var btnsBottom = document.querySelectorAll('.categoryButtonBottom');

    // Add the clicked class to the first two top and bottom buttons
    btnsTop[0].classList.add('clicked');
    btnsBottom[0].classList.add('clicked');

    btnsTop.forEach(function(btn, index) {
        btn.addEventListener('click', function() {
            // Remove the clicked class from all top and bottom buttons
            btnsTop.forEach(function(b) {
                b.classList.remove('clicked');
            });
            btnsBottom.forEach(function(b) {
                b.classList.remove('clicked');
            });
            // Add the clicked class to the clicked top button and corresponding bottom button
            btn.classList.add('clicked');
            btnsBottom[index].classList.add('clicked');
        });
    });

    btnsBottom.forEach(function(btn, index) {
        btn.addEventListener('click', function() {
            // Remove the clicked class from all top and bottom buttons
            btnsTop.forEach(function(b) {
                b.classList.remove('clicked');
            });
            btnsBottom.forEach(function(b) {
                b.classList.remove('clicked');
            });
            // Add the clicked class to the clicked bottom button and corresponding top button
            btn.classList.add('clicked');
            btnsTop[index].classList.add('clicked');
        });
    });
});
