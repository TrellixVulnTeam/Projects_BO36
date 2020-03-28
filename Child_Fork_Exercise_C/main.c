#include "stdio.h"
#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdlib.h>


int command_Validator(char command[20])
{
    int valid = 0;
    //cl = command list
    const char * cl[5] = {
        "trans_EF", "trans_ES", "trans_SE", "trans_FE", "exit"
    };

    int i;

    for(i=0; i<5; i++)
    {
        if(!strcmp(command, cl[i]))
        {
            //returns 0 if the command is valid
            return valid;
        }
    }
    //return 1 if the command is not valid
    valid = 1;
    return valid;
}

int word_Validator(char *word) {

    const char * ef[8][2] = {
        {"cat\n", "chat\n"},
        {"dog\n", "chien\n"},
        {"bird\n", "oiseau\n"},
        {"mouse\n", "souris\n"},
        {"cow\n", "vache\n"},
        {"tiger\n", "tigre\n"},
        {"horse\n", "cheval\n"},
        {"monkey\n", "singe\n"}
    };

    const char * es[8][2] = {
        {"cat\n", "gato\n"},
        {"dog\n", "perro\n"},
        {"bird\n", "pajaro\n"},
        {"mouse\n", "raton\n"},
        {"cow\n", "vaca\n"},
        {"tiger\n", "tigre\n"},
        {"horse\n", "caballo\n"},
        {"monkey\n", "mono\n"}
    };

    int i;

    for(i=0; i<16; i++)
    {
        if(!strcmp(word, es[0][i]))
        {
            return 0;
        }
        else if(!strcmp(word, ef[0][i]))
        {
            return 0;
        }
        else
        {
            if(i == 15)
            {
                //return 1 if the word is not in either array
                return 1;
            }
        }
    }
}

//function that activate the shell
void shell()
{
    int status = 1;
    int cmd_valid;
    int wrd_valid;

    do {
        char tmp[40];
        char command[40];
        char* args[4][10] = {"","","",""};

        char *word;

        printf("Translator> ");
        fgets(tmp, 40, stdin);

        if(!strcmp(tmp, "exit\n"))
        {
            exit(0);
        }
        else
        {
            //make a copy of the original command:
            strcpy(command, tmp);
            strtok_r(command, " ", &word);
            //tmp = command, word = word that needs to be translated
        }

        cmd_valid = command_Validator(command);
        wrd_valid = word_Validator(word);

        if(cmd_valid != 1 && wrd_valid != 1)
        {
            //if command and word is valid then fork.
            pid_t Ppid = fork();

            if(Ppid == -1)
            {
                perror("there was an error calling fork()");
                exit(-1);
            }

            if(Ppid == 0) //child here
            {
                int ret;

                printf("command: %s\n", command);
                printf("word: %s\n", word);

                strcat(args[0], "commands");
                printf("adding commands string \n");
                strcat(args[1], command);
                printf("adding command \n");
                strcat(args[2], word);
                printf("adding words \n");
                //strcat(args[3], NULL);
                //printf("adding NULL \n");

                printf("got here\n");

                ret = execvp("/Users/natesmac/Documents/'Atom Files'/'Operating Systems '/Homework1_Part2&3", args);

                printf("%d\n", ret);

                if(ret == -1)
                {
                    perror("connection failed\n");
                }
            }

            else //parent here
            {
                waitpid(Ppid,0,0);
            }
        }
        else
        {
            if(cmd_valid == 0 && wrd_valid ==1)
            {
                printf("please choose a valid word \n");
            }
            else if(cmd_valid == 1 && wrd_valid == 0)
            {
                printf("please use a valid command \n");
            }
            else
            {
                printf("Both command and word given are invalid \n");
            }
        }

    } while(status);
}

//should only have one command to run the shell
int main()
{
    shell();

    return 0;
}
