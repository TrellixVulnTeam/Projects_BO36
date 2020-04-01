//global variables
var id_grid = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,-1] //-1 to indicate the empty block
];

var current_grid =  [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,-1]
    ];

var pos_array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,-1];

var pos_grid = [
    [[0,0], [100,0], [200, 0], [300,0]],
    [[0,100], [100,100], [200, 100], [300,100]],
    [[0,200], [100,200], [200, 200], [300,200]],
    [[0,300], [100,300], [200, 300], [300,300]]
];

var row = 4;
var col = 4;

//arg = what are you looking for in the arra
//return an array of the i j position
function indexOf_Double_Array_Edition(array, arg)
{
    let tmp = [-1,-1];

    for(let i=0; i<row; i++)
    {
        for(let j=0; j<col; j++)
        {
            if(array[i][j] === arg) //maybe want to use strict equals here?
            {
                tmp[0] = i;
                tmp[1] = j;
                return tmp;
            }
        }
    }
    return false;
}

function init() {
    document.getElementById("shufflebutton").addEventListener("click", do_The_Shuffle);

    image_Splitter();
    //do_The_Shuffle();
    //console.log(indexOf_Double_Array_Edition(id_grid, 1)) //testing the function

    //function to assign the MOVE() functon to each cell
    MOVE_assign();

    $('.square').mouseover(function() {
        move_validator(this);
    });

    $('.square').mouseleave(function() {
        leaver(this);
    });

}

function image_Splitter() {
    //didnt know $ was shorthand notation for document.getElementsByID - jquery style
    let canvas = $('div.area');
    let background = canvas.css('background-image');

    //remove background after grabbing it and set it to a color
    canvas.css('background', 'aliceblue');

    //finding out best way to divide the picture/gif
    let colWidth = canvas.width() / col;
    let rowHeight = canvas.height() / row;

    for(let i=0; i<row; i++)
    {
        for(let j=0; j<col; j++)
        {
            if(i == 3 && j == 3)
            {
                //do nothing for now
                //this is so the last square and will be
            }
            //append each square to the canvas
            //also divids background image into each square
            else
            {
                var cell = $("<div class='square'></div>").attr("id", id_grid[i][j])
                       .width(colWidth).height(rowHeight).appendTo(canvas)
                       .css('background', background)
                       .css('background-position', -(j * colWidth) + 'px ' + -(i * rowHeight) + 'px')
                       .css('left', (j * colWidth) +'px')
                       .css('top', (i * rowHeight) + 'px');
            }
        }
    }
}

//shuffles the actual pieces on the website
function do_The_Shuffle()
{
    //randomize the order of of the elements
    let shuffled_array = valid_shuffle();

    //construct new 2d using order above
    let new_array = from_1d_array_to_2d_array(shuffled_array);

    //push that 2d array to the webiste
    //use the new array to set the positions of the squares on the webiste

    for(let i=0; i<row; i++)
    {
        for(let j=0; j<col; j++)
        {
            if(new_array[i][j] != -1)
            {
                let current_pos_in_doubleArray = new_array[i][j];
                let current_square = $(current_pos_in_doubleArray);

                //grabbing the location of the id from the ORIGINAL grid (id_grid)
                let index = indexOf_Double_Array_Edition(current_grid, current_pos_in_doubleArray);
                let row = index[0];
                let col = index[1];

                //grabbing the number for top and left to reposition the square based on the
                //position of the location from id_grid
                let new_pos = pos_grid[row][col];
                let left = new_pos[0];
                let top = new_pos[1];

                //the $ function does not work here :/
                document.getElementById(current_pos_in_doubleArray).style.top = top + 'px';
                document.getElementById(current_pos_in_doubleArray).style.left = left +'px';

            }
        }
    }
}

//constructs a 2d array from a given 1d array
function from_1d_array_to_2d_array(array)
{
    let new_array = id_grid; //make a copy of id_grid

    let col = Math.sqrt(array.length);
    let row = array.length / col;

    let m = 0;

    for(let i=0; i<row; i++)
    {
        for(let j=0; j<col; j++)
        {
            new_array[i][j] = array[m];
            m+=1
        }
    }

    current_grid = new_array;

    return new_array; //returns shuffled 2d array
}

//old shufflinf algorithm i used
/*
//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
//OR https://bost.ocks.org/mike/shuffle/
//shuffles a 1d array and returns it
function fisher_Yates_Shuffle(array)
{
    let j, x, i;

    for (i = array.length-1; i>0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}
*/

//function to implement a valid form of shuffling talked about in the instructions.
function valid_shuffle()
{
    let r_min = 0;
    let r_max = 4;
    let end_min = 20;
    let end_max = 60;
    let i = 0;
    let array = pos_array;
    let free_square = -1;
    let tmp = 0;
    let end = Math.floor(Math.random() * (end_max - end_min) + end_min); // this variable is to allow the while loop to run for a random amountof time between 20 - 60 to get better shuffles 
    //console.log(end);

    while(i <= end ) {

        let pos = pos_array.indexOf(-1);

        let random = Math.floor(Math.random() * (r_max - r_min) + r_min);
        //console.log(random);

        if(random == 0) { //swap the square with the one above
            if(pos_array[pos-4] !== undefined) {
                tmp = pos_array[pos-4];
                pos_array[pos-4] = free_square;
                pos_array[pos] = tmp;
            }
        }
        else if(random == 1) { //swap the square with the one to the left
            if(pos_array[pos-1] !== undefined) {
                tmp = pos_array[pos-1];
                pos_array[pos-1] = free_square;
                pos_array[pos] = tmp;
            }
        }
        else if(random == 2) { //swap the square with the one to the right
            if(pos_array[pos+1] !== undefined) {
                tmp = pos_array[pos+1];
                pos_array[pos+1] = free_square;
                pos_array[pos] = tmp;
            }
        }
        else { //swap the square with the one below
            if(pos_array[pos+4] !== undefined) {
                tmp = pos_array[pos+4];
                pos_array[pos+4] = free_square;
                pos_array[pos] = tmp;
            }
        }

        i++;
    }

    return pos_array;
}


//function to assign the move function to each square
function MOVE_assign()
{
    let p_area = document.getElementById('puzzlearea'), p_area_child;

    for(i = 0; i < p_area.childNodes.length; i++)
    {
        p_area.childNodes[i].addEventListener("click", function() {
            MOVE(this);
        });
        //p_area.childNodes[i].addEventListener("onMouseOver", function() {move_validator(this)});
        //document.getElementById(array_ID[i]).onmouseover = function() {onMouseOver(this)};
    }

}

function MOVE(obj)
{
    //grab the css value for cursor as a check to see if the square is a valid move
    let square_id = obj.id;
    let square = document.getElementById(square_id);

    if(square.style.cursor == 'pointer') {
        //console.log('this square is valid bby');

        //grabbing the location of the free square from the current_grid

        let index = indexOf_Double_Array_Edition(current_grid, -1);
        let row = index[0];
        let col = index[1];
        //console.log(row);
        //console.log(col);


        //grabbing the number for top and left to reposition the square based on the
        //position of the location from id_grid
        let new_pos = pos_grid[row][col];
        let left = new_pos[0];
        let top = new_pos[1];

        //the $ function does not work here :/
        document.getElementById(square_id).style.top = top + 'px';
        document.getElementById(square_id).style.left = left +'px';

        //need to swap the postition in current_grid to stay up to date

        //let free_square = indexOf_Double_Array_Edition(current_grid, -1);
        //console.log('Square_id: ' + square_id);
        let move_square = indexOf_Double_Array_Edition(current_grid, parseInt(square_id));
        //console.log('current_grid 2: ' + current_grid);
        //console.log(move_square);
        let tmp_row = move_square[0];
        let tmp_col = move_square[1];

        //need to swap the squares in current_grid
        current_grid[row][col] = parseInt(square_id);

        current_grid[tmp_row][tmp_col] = -1;
        console.log('current_grid: ' + current_grid);

        //run grid_checker here
        console.log(grid_checker());

        if(grid_checker()) {
            //outline id puzzlearea in green
            let parent = document.getElementById('controls')
            let p = document.createElement('p');
            p.appendChild(document.createTextNode("Puzzle Complete!"));
            p.setAttribute("id", 'done');
            p.setAttribute("class", 'complete')
            parent.appendChild(p);
        }
        else {
            let p = document.getElementById('done');
            p.parentNode.removeChild(p);
        }

        //store where -1 is currently
    }
    else {
        //use an animation library to show a stroke that fades out signifying no valid move.
    }

}


//returns true or false if the 'square' being checked is a valid square on the grid IE not out of bounds
function move_validator(obj)
{
    let hovered_Square = obj.id;
    let id = '#' + hovered_Square;

    let r , c;


    for(let i=0; i<row; i++) {
        for(let j=0; j<col; j++) {
            if(current_grid[i][j] == hovered_Square) {
                r = i;
                c = j;
            }
        }
    }

    if(r + 1 != 4) {
        if(current_grid[r+1][c] == -1) {
            $(id).css('cursor', 'pointer');
        }
    }
    if(r - 1 != -1) {
        if(current_grid[r-1][c] == -1) {
            $(id).css('cursor', 'pointer');
        }
    }
    if(c + 1 != 4) {
        if(current_grid[r][c+1] == -1) {
            $(id).css('cursor', 'pointer');
        }
    }
    if(c - 1 != -1) {
        if(current_grid[r][c-1] == -1) {
            $(id).css('cursor', 'pointer');
        }
    }
}

//if current_grid = id_grid return true else false
function grid_checker()
{
    for(let i=0; i<row; i++)
    {
        for(let j=0; j<col; j++)
        {
            //console.log(current_grid[i][j]);
            //console.log(id_grid[i][j]);
            if(current_grid[i][j] != id_grid[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function leaver(obj) {
    let hovered_Square = obj.id;
    let id = '#' + hovered_Square;

    $(id).css('cursor', 'default');
}

window.onload = init;
