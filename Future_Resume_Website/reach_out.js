

function init() {
    document.getElementById('back').onclick = function() {change_page()};
}


function change_page() {
    window.location.href = "index.html";
}


window.onload = init;

/*
//this does not work, does not recognize the id 'back'
window.onload = (function() {


    function init() {
        document.getElementById('back').onclick = function() {change_page()};
    }


    function change_page() {
        window.location.href = "index.html";
    }

    init();

})();
*/
//need to implement a timer function for something maybe a clock?
