public class Assignment_2_Kennedy_Java
{

    static int hmthibc = -1; //intialize this at -1 so it will start at the right position in the function runn() //cause the first line will add 1 to hmthibc

    static int[][] f_grid =
    {
        {0, 0, 0},
        {0, 0, 0},
        {0, 0, 0}
    };

    //for future changes to the code, trying to make it more module. //TODO: still
    static int[][] s_pos =
    {
        {0, 0},
        {0, 3},
        {0, 6},
        {3, 0},
        {3, 3},
        {3, 6},
        {6, 0},
        {6, 3},
        {6, 6}
    };

    static int number_of_threads = 9;

    //include the grid here/
    //edit input here

/*
    static int[][] q_grid =
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
*/
/*

    // question grid //this one fails
    static int[][] q_grid =
    {
        {9, 2, 4, 5, 3, 9, 1, 8, 7},
        {5, 1, 9, 7, 2, 8, 6, 3, 4},
        {8, 3, 7, 6, 1, 4, 2, 9, 5},
        {1, 4, 3, 8, 6, 5, 7, 2, 9},
        {9, 5, 8, 2, 4, 7, 3, 6, 1},
        {7, 6, 2, 3, 9, 1, 4, 5, 8},
        {3, 7, 1, 9, 5, 6, 8, 8, 2},
        {4, 9, 6, 1, 8, 2, 5, 9, 9},
        {2, 8, 5, 4, 7, 3, 3, 1, 6}
    };
*/
/*
    // question grid //this one fails (subgrid starting at 3, 3 should fail)
    int[][] q_grid =
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

    public static void main(String[] args)
    {
        //create threads
        //partition each subgrid out to each thread //maybe do this in another function
        for(int i = 0; i < 9; i++)
        {
            Runnable runnable =
                () -> { runn(); };

            Thread thread = new Thread(runnable);
            thread.start();

            //implement a sleep function here to wait ateast one second before the other threads are created.
            //this is important in order for my code to work
            try {
                java.util.concurrent.TimeUnit.SECONDS.sleep(1);
            }
            catch (InterruptedException e)
            {
                e.printStackTrace();
            }
        }

        print_matrix(f_grid);
    }

    public static int runn()
    {
        hmthibc += 1;

        //public static String Distributor(int sub_row, int sub_col, int row, int col, int[][] q_grid)

        if(hmthibc == 0)
        {
            if(Error_reader(Distributor(0, 0, 0, 0, q_grid)) == 1)
            {
                f_grid[0][0] = 1;
            }
            Thread thread = Thread.currentThread(); // grab the current thread
            thread.interrupt(); //cancel the current thread
        }
        else if(hmthibc == 1)
        {
            if(Error_reader(Distributor(0, 3, 1, 1, q_grid)) == 1)
            {
                f_grid[0][1] = 1;
            }
            Thread thread = Thread.currentThread(); // grab the current thread
            thread.interrupt(); //cancel the current thread
        }
        else if(hmthibc == 2)
        {
            if(Error_reader(Distributor(0, 6, 2, 2, q_grid)) == 1)
            {
                f_grid[0][2] = 1;
            }
            Thread thread = Thread.currentThread(); // grab the current thread
            thread.interrupt(); //cancel the current thread
        }
        else if(hmthibc == 3)
        {
            if(Error_reader(Distributor(3, 0, 3, 3, q_grid)) == 1)
            {
                f_grid[1][0] = 1;
            }
            Thread thread = Thread.currentThread(); // grab the current thread
            thread.interrupt(); //cancel the current thread
        }
        else if(hmthibc == 4)
        {
            if(Error_reader(Distributor(3, 3, 4, 4, q_grid)) == 1)
            {
                f_grid[1][1] = 1;
            }
            Thread thread = Thread.currentThread(); // grab the current thread
            thread.interrupt(); //cancel the current thread
        }
        else if(hmthibc == 5)
        {
            if(Error_reader(Distributor(3, 6, 5, 5, q_grid)) == 1)
            {
                f_grid[1][2] = 1;
            }
            Thread thread = Thread.currentThread(); // grab the current thread
            thread.interrupt(); //cancel the current thread
        }
        else if(hmthibc == 6)
        {
            if(Error_reader(Distributor(6, 0, 6, 6, q_grid)) == 1)
            {
                f_grid[2][0] = 1;
            }
            Thread thread = Thread.currentThread(); // grab the current thread
            thread.interrupt(); //cancel the current thread
        }
        else if(hmthibc == 7)
        {
            if(Error_reader(Distributor(6, 3, 7, 7, q_grid)) == 1)
            {
                f_grid[2][1] = 1;
            }
            Thread thread = Thread.currentThread(); // grab the current thread
            thread.interrupt(); //cancel the current thread
        }
        else if(hmthibc == 8)
        {
            if(Error_reader(Distributor(6, 6, 8, 8, q_grid)) == 1)
            {
                f_grid[2][2] = 1;
            }
            Thread thread = Thread.currentThread(); // grab the current thread
            thread.interrupt(); //cancel the current thread
        }
        else
        {
            return 0;

        }

        return 0;
    }

    public static int grid_calculator(int s_row, int s_col, int[][] q_grid)
    {

        int e_row = s_row + 2; // variables to dictate the ending position given the beginning position
        int e_col = s_col + 2; // ^^

        int count = 0;  // integer for storing the value of each subgrid, if count equal's 45 then its a valid subgrid

        // double for loop to iterate through each sub grid given a starting position [int, int]
        for(int i = s_row; i <= e_row; i++)
        {
            for(int j = s_col; j <= e_col; j++)
            {
                count += q_grid[i][j];
            }
        }

        if(count == 45)
        {
            //cancel threads here
            return 1; // 1 means a valid return
        }
        else
        {
            //cancel threads here
            return 0; // 0 means an invalid return
        }
    }

    public static int print_matrix(int[][] f_grid) //parameter is a matrix
    {
        boolean fail = false;

        for (int row=0; row<3; row++)
        {
            for(int columns=0; columns<3; columns++)
            {
                System.out.print(f_grid[row][columns] + " ");
                if(f_grid[row][columns] == 0)
                {
                    fail = true;
                }
            }
            System.out.println("");
        }

        if(fail == true)
        {
            System.out.println("F_GRID failed validation.");
            return 0;
        }
        else
        {
            System.out.println("F_GRID Successfully passed validation.");
            return 1; //1 for pass
        }


    }

    public static int ROW_validation(int col, int[][] q_grid) //validate a row given the starting position and column position
    {
        int count = 0; //intialize a temp variable to add every number to, if it equals 45 we goooood

        for(int pos=0; pos < 9; pos++)
        {
            count += q_grid[pos][col];
        }

        if(count == 45)
        {
            return 1; // 1 means a valid return
        }
        else
        {
            return 0; // 0 means an invalid return
        }
    }

    public static int COL_validation(int row, int[][] q_grid) //validate a column given the starting position
    {
        int count = 0; //intialize a temp variable to add every number to, if it equals 45 we goooood

        for(int pos=0; pos < 9; pos++)
        {
            count += q_grid[row][pos];
        }

        if(count == 45)
        {
            return 1; // 1 means a valid return
        }
        else
        {
            return 0; // 0 means an invalid return
        }
    }

    public static String Distributor(int sub_row, int sub_col, int row, int col, int[][] q_grid)
    {
        String ERROR = "";

        if(grid_calculator(sub_row, sub_col, q_grid) == 0)
        {
            ERROR += "| Subgrid " + sub_row + "," + sub_col + " FAILED ";
        }
        else
        {
            ERROR += "| Subgrid " + sub_row + "," + sub_col + " PASSED ";
        }
        if(ROW_validation(col, q_grid) == 0)
        {
            ERROR += "| ROW " + row + " FAILED ";
        }
        else
        {
            ERROR += "| ROW " + row + " PASSED ";
        }
        if(COL_validation(row, q_grid) == 0)
        {
            ERROR += "| COL " + col + " FAILED |";
        }
        else
        {
            ERROR += "| COL " + col + " PASSED |";
        }

        return ERROR;
    }

    public static int Error_reader(String ERROR)
    {
        //System.out.println("Error: " + ERROR);
        String error  = "FAILED";

        if (ERROR.toLowerCase().indexOf(error.toLowerCase()) != -1 )
        {
           System.out.println(ERROR);
           return 0;

        }
        else
        {
           System.out.println(ERROR);
           return 1;
        }
    }
}
