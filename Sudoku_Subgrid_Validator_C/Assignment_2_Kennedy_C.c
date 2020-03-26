#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

#define ROW 9
#define COLUMN 9
#define NUMBER_OF_THREADS 9
#define SECOND 1  // the delay between the creation of each thread, this is important because without any delay the threads will be created so quickly the assigner function will assign mutliple threads to the same section.

//defining all the starting points for later
const int subgrid_0[2] = {0, 0};
const int subgrid_1[2] = {0, 3};
const int subgrid_2[2] = {0, 6};
const int subgrid_3[2] = {3, 0};
const int subgrid_4[2] = {3, 3};
const int subgrid_5[2] = {3, 6};
const int subgrid_6[2] = {6, 0};
const int subgrid_7[2] = {6, 3};
const int subgrid_8[2] = {6, 6};

int hmthibc = -1; // variable used to store how many times it has been called. hmthibc = how_many_times_have_i_been_called

// starting position for each subgrid: 0,0 0,3 0,6 3,0 3,3 3,6 6,0 6,3 6,6

// final grid 1's mean the block passed, 0's mean it failed
// defualt is failed just like my life

int f_grid [3][3] =
{
    {0, 0, 0},
    {0, 0, 0},
    {0, 0, 0}
};

void grid_validator() // function for assigning each thread to a subsection of the big grid TM
{
    hmthibc += 1;

    printf("how many times have I been called: %d \n", hmthibc);

    printf("thread #: %d \n", pthread_self()); // each thread_id is long and never consistent EG: 236265472

    if(hmthibc == 0)
    {
        if(grid_calculator(0, 0) == 1)
        {
            f_grid[0][0] = 1;
            printf("subgrid 0, 0 passed validation\n");
        }
        else
        {
            printf("subgrid 0, 0 failed validation\n");
        }

    }
    else if(hmthibc == 1)
    {
        if(grid_calculator(0, 3) == 1)
        {
            f_grid[0][1] = 1;
            printf("subgrid 0, 3 passed validation\n");
        }
        else
        {
            printf("subgrid 0, 3 failed validation\n");
        }

    }
    else if(hmthibc == 2)
    {
        if(grid_calculator(0, 6) == 1)
        {
            f_grid[0][2] = 1;
            printf("subgrid 0, 6 passed validation\n");
        }
        else
        {
            printf("subgrid 0, 6 failed validation\n");
        }

    }
    else if(hmthibc == 3)
    {
        if(grid_calculator(3, 0) == 1)
        {
            f_grid[1][0] = 1;
            printf("subgrid 3, 0 passed validation\n");
        }
        else
        {
            printf("subgrid 3, 0 failed validation\n");
        }

    }
    else if(hmthibc == 4)
    {
        if(grid_calculator(3, 3) == 1)
        {
            f_grid[1][1] = 1;
            printf("subgrid 3, 3 passed validation\n");
        }
        else
        {
            printf("subgrid 3, 3 failed validation\n");
        }

    }
    else if(hmthibc == 5)
    {
        if(grid_calculator(3, 6) == 1)
        {
            f_grid[1][2] = 1;
            printf("subgrid 3, 6 passed validation\n");
        }
        else
        {
            printf("subgrid 3, 6 failed validation\n");
        }
    }
    else if(hmthibc == 6)
    {
        if(grid_calculator(6, 0) == 1)
        {
            f_grid[2][0] = 1;
            printf("subgrid 6, 0 passed validation\n");
        }
        else
        {
            printf("subgrid 6, 0 failed validation\n");
        }

    }
    else if(hmthibc == 7)
    {
        if(grid_calculator(6, 3) == 1)
        {
            f_grid[2][1] = 1;
            printf("subgrid 6, 3 passed validation\n");
        }
        else
        {
            printf("subgrid 6, 3 failed validation\n");
        }

    }
    else if(hmthibc == 8)
    {
        if(grid_calculator(6, 6) == 1)
        {
            f_grid[2][2] = 1;
            printf("subgrid 6, 6 passed validation\n");
        }
        else
        {
            printf("subgrid 6, 6 failed validation\n");
        }

    }
    else
    {
        printf("what's up\n");

    }


}

int grid_calculator(int s_row, int s_col) //change the arguements to accept a single array of two numbers
{
    // question grid //this one passes
    int q_grid [ROW][COLUMN] =
    {
        {6, 2, 4, 5, 3, 9, 1, 8, 7},
        {5, 1, 9, 7, 2, 8, 6, 3, 4},
        {8, 3, 7, 6, 1, 4, 2, 9, 5},
        {1, 4, 3, 8, 6, 5, 7, 2, 9},
        {9, 5, 8, 2, 4, 7, 3, 6, 1},
        {7, 6, 2, 3, 9, 1, 4, 5, 8},
        {3, 7, 1, 9, 5, 6, 8, 4, 2},
        {4, 9, 6, 1, 8, 2, 5, 7, 3},
        {2, 8, 5, 4, 7, 3, 9, 1, 6}
    };

    /*
    // question grid //this one fails (subgrid starting at 6, 6 should fail)
    int q_grid [ROW][COLUMN] =
    {
        {6, 2, 4, 5, 3, 9, 1, 8, 7},
        {5, 1, 9, 7, 2, 8, 6, 3, 4},
        {8, 3, 7, 6, 1, 4, 2, 9, 5},
        {1, 4, 3, 8, 6, 5, 7, 2, 9},
        {9, 5, 8, 2, 4, 7, 3, 6, 1},
        {7, 6, 2, 3, 9, 1, 4, 5, 8},
        {3, 7, 1, 9, 5, 6, 8, 4, 2},
        {4, 9, 6, 1, 8, 2, 5, 9, 9},
        {2, 8, 5, 4, 7, 3, 3, 1, 6}
    };
*/
/*
    // question grid //this one fails (subgrid starting at 3, 3 should fail)
    int q_grid [ROW][COLUMN] =
    {
        {6, 2, 4, 5, 3, 9, 1, 8, 7},
        {5, 1, 9, 7, 2, 8, 6, 3, 4},
        {8, 3, 7, 6, 1, 4, 2, 9, 5},
        {1, 4, 3, 8, 6, 5, 7, 2, 9},
        {9, 5, 8, 7, 4, 7, 3, 6, 1},
        {7, 6, 2, 3, 9, 1, 4, 5, 8},
        {3, 7, 1, 9, 5, 6, 8, 4, 2},
        {4, 9, 6, 1, 8, 2, 5, 7, 3},
        {2, 8, 5, 4, 7, 3, 9, 1, 6}
    };
*/
    int e_row = s_row + 2; // variables to dictate the ending position given the beginning position
    int e_col = s_col + 2; // ^^

    int count; // integer for storing the value of each subgrid, if count equal's 45 then its a valid subgrid

    // double for loop to iterate through each sub grid given a starting position [int, int]
    for(int i = s_row; i <= e_row; i++)
    {
        for(int j = s_col; j <= e_col; j++)
        {
            //printf("thread #: %d \n", pthread_self());
            //printf("%d \n", q_grid[i][j] );
            count += q_grid[i][j];
        }
    }

    if(count == 45)
    {
        pthread_cancel(pthread_self()); //closing the current thread now that it is done
        return 1; // 1 means a valid return
    }
    else
    {
        pthread_cancel(pthread_self()); // ^^
        return 0; // 0 means an invalid return
    }
}
// function for printing out the final matrix to see what subgrids failed //Taken off of stack overflow lol
void print_matrix(int f_grid [3][3]) //parameter is a matrix
{
    int row, columns;

    for (int row=0; row<3; row++)
    {
        for(int columns=0; columns<3; columns++)
        {
            printf("%d     ", f_grid[row][columns]);
            if(f_grid[row][columns] == 0)
            {
                printf("Failed\n");
            }
        }
        printf("\n");
     }
}

int main()
{
    pthread_t thread_id[NUMBER_OF_THREADS]; // intializing thread id for later
    int i; // used in the for loop
    int error; // variable to state any errors when generating threads


    // for loop for creating each thread
    for(i = 0; i < 9; i++)
    {
        // create threads here
        // the third argument is a function pointer,threads must start with a function
        error = pthread_create( &thread_id, NULL , &grid_validator, NULL);

        if(error != 0 )
        {
            perror("Unsuccessful in creating threads. \n");
        }
        else // success!
        {
            //printf("Successful in creating thread. \n");
        }

        sleep(SECOND); // IMPORTANT DO NOT TOUCH ME

    }

    print_matrix(f_grid);

    return 0;
}
