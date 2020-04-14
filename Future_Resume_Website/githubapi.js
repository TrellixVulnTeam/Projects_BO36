
//const URL = 'https://api.github.com/repos/kennedy15/Projects';
const URL = 'https://api.github.com/users/kennedy15/repos';

function init() {
    //returns an array of repos
    callAjax();


    load_profiles();
    document.getElementById('cb1').onclick = function() {change_page()};
    document.getElementById('cb1').onmouseover = function() {profile_hover()};

    //start the clock
    clock();
}

async function callAjax() {

    let ids = ['#p1', '#p2', '#p3', '#p4'];

    const response = await fetch(URL);
    const result = await response.json();

    //console.log(result); //debug purposes

    const projects_url = result[3].contents_url //3 standing for the specific repo i want
    //console.log(projects_url); //debug purposes

    let new_url = remove_brackets(projects_url); // the project url has '{paths}' at the end which does not work with fetch() need to remove it
    //console.log(new_url); //debug purposes

    const repo_response = await fetch(new_url);
    const repo_result = await repo_response.json();

    console.log(repo_result);
    for(let i = 0; i < ids.length; i++) {
        $(ids[i]).find('p').text(repo_result[i+2].name); // 'i+2' isnt the best way to ignore the readme and .gitignore files but it works for now

        //dynamically setting the links
        $(ids[i]).find('a').attr('href', repo_result[i+2].html_url);
    }
}


//function that loads in each profile picture grabbed from the creators github.
function load_profiles() {
    let one_profile_picture = "url('https://avatars.githubusercontent.com/kennedy15')";

    $('#cb1').css("background-image", one_profile_picture);

}

function change_page() {
    window.location.href = "http://www.github.com/kennedy15";
}

function profile_hover() {
    document.getElementById("cb1").classList.add('pointer');
}

//removes the brackets at the end of urls
function remove_brackets(url) {
    let length = url.length

    let new_url = '';

    for(let i = 0; i < length; i++) {
        if(url[i] == '{') {
            new_url = url.slice(0, i);
        }
    }

    return new_url;
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


window.onload = init;
