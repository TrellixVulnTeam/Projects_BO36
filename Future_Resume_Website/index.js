//look into bounce.js/anime.js/magic animation js for animation libraries

//lotta global variables up here
var backgroundColor = "#fefefa";

var cb1 = "#64c7e8";
var cb2 = "#bb8fce";
var cb3 = "#900C3F";

var array_ID = ['cb1', 'cb2', 'cb3'];

var number_ID = ['#cb1', '#cb2', '#cb3'];

var i = 0;

function assign_EventListeners() {
    for(i = 0; i<array_ID.length; i++) {
        let put = document.getElementById(array_ID[i]);

        document.getElementById(array_ID[i]).onmouseover = function() {onMouseOver(this)};
        document.getElementById(array_ID[i]).onmouseleave = function() {onMouseLeave(this)};
        document.getElementById(array_ID[i]).onclick = function() {onMClick(this)};
        document.getElementById('contact').onclick = function() {change_page()};
    }

    clock();
}

//function to switch between pages
function change_page() {
    window.location.href = "reach_out.html";
}

//function testing how i can grab the id from the element my mouse is hovering over
function test(obj) {
    var selected_Object = obj.id;
    console.log(selected_Object);
}

//my attempt at convering all the onMouseOver functions into one general function
function onMouseOver(obj) {
    let selected_Object = obj.id;
    let background = 'bg3';
    let id = '#' + selected_Object;

    let i = 0;

    for(i=0; i<array_ID.length; i++) {
        if(array_ID[i] != selected_Object)
        {
            document.getElementById(array_ID[i]).style.visibility = 'hidden';
        }
    }

    let child_id = more_ids(selected_Object);
    let child_id_ = '#' + child_id;

    anime({
      targets: id,
      borderRadius: ['0%', '50%'],
      duration: 100,
      easing: 'easeInOutQuad'
    });

    anime({
      targets: child_id_,
      width: '25%',
      duration: 250,
      ea1sing: 'easeInOutQuad'
    });

    document.getElementById(child_id).classList.add('vertical-align');
}

function animate_Flow(obj) {
    let selected_Object = obj.id;

    //use this function to animate the flow of the cards
    anime({
      targets: selected_Object,
      left: '240px',
      backgroundColor: '#FFF',
      borderRadius: ['0%', '50%'],
      easing: 'easeInOutQuad'
    });
}

//my attempt to make one function for onMouseLeave()
function onMouseLeave(obj) {
    let selected_Object = obj.id;
    let id = '#' + selected_Object;

    let i = 0;

    for(i=0; i<array_ID.length; i++) {
        if(document.getElementById(array_ID[i]).style.visibility == 'hidden')
        {
            document.getElementById(array_ID[i]).style.visibility = 'visible';
        }
    }

    let child_id = more_ids(selected_Object);
    let child_id_ = '#' + child_id;


    anime({
      targets: id,
      borderRadius: ['50%', '2%'],
      duration: 100,
      easing: 'easeInOutQuad'
    });

    anime({
      targets: child_id_,
      width: '100%',
      duration: 250,
      easing: 'easeInOutQuad'
    });

    //dont really know what i am looking for in the animation right now...

    document.getElementById(child_id).classList.remove('vertical-align');
}

//function that grabs all child ID's when the parent is hovered over.
function more_ids(id)
{
    let object = document.getElementById(id);

    let new_id = '';

    for(let i=0; i<object.childNodes.length; i++) {
        let string = object.childNodes[i];
        if(string.nodeName == 'SECTION') {
            new_id = string.id;
        }
    }

    return new_id; //returns the name of the id without the #
}

function clock()
{
    let clock = document.getElementById('clock');

    function time() {
        let d = new Date();
        let s = d.getSeconds();
        let m = d.getMinutes();
        let h = d.getHours();

        if(m < 10 && s < 10)
        {
            clock.textContent = h + ":0" + m + ":0" + s;
        }
        else if(m < 10 && s > 10)
        {
            clock.textContent = h + ":0" + m + ":" + s;
        }
        else if(m > 10 && s < 10)
        {
            clock.textContent = h + ":" + m + ":0" + s;
        }
        else
        {
            clock.textContent = h + ":" + m + ":" + s;
        }
    }
    setInterval(time, 1000);
}

window.onload = assign_EventListeners;
