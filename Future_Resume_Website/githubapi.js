
//const URL = 'https://api.github.com/repos/kennedy15/Projects';
const URL = 'https://api.github.com/users/kennedy15/repos';

//array for storing which projects are being displayed
project_array = [];


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

    for(let i = 0; i < ids.length; i++) {
        //randomly select a project to display so each time the page is refreshed the user can see new projects!
        let project = random_integer(repo_result.length);

        $(ids[i]).find('p').text(repo_result[project].name); // 'i+2' isnt the best way to ignore the readme and .gitignore files but it works for now

        if(repo_result[project].name == 'Future_Resume_Website') {
            $(ids[i]).find('i').addClass('html_icon');
            //hard coded this icon in because its the only website in my lists of projects
        }

        //dynamically setting the links
        $(ids[i]).find('a').attr('href', repo_result[project].html_url);

        let tmp_url = repo_result[project].git_url;
        const project_response = await fetch(tmp_url);
        const project_result = await project_response.json();

        console.log(project_result);

        let file_name = project_result.tree;
        let tree_length = file_name.length;

        let ext_array = [];

        //dynamically adds an icon of the main language used in each project
        for(let j = 0; j < tree_length; j++) {
            ext_array.push(file_extenstion_reader(file_name[j].path));

        }

        if(ext_array.includes('c')) {
            $(ids[i]).find('i').addClass('c_icon');
        }
        else if(ext_array.includes('java')) {
            $(ids[i]).find('i').addClass('java_icon');
        }
        else if(ext_array.includes('js')) {
            $(ids[i]).find('i').addClass('js_icon');
        }
        else if(ext_array.includes('py')) {
            $(ids[i]).find('i').addClass('py_icon');
        }
        else{
            //do nothing
        }

    }
}

function file_extenstion_reader(file_name) {
    let file = file_name;
    let file_length = file.length;

    let extension = '';

    for(let i = 0; i < file_length; i++) {
        if(file[i] == '.') {
            extension = file.slice(i+1, file_length);

            return extension;
        }
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

function random_integer(max) {
    let int = Math.floor(Math.random() * (max - 2) + 2);

    if(int != 6 && project_array.includes(int) == false) {
        project_array.push(int);
        return int;
    }
    else {
        return random_integer(max);
    }
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
