#include "stdio.h"
#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdlib.h>

//function to translate words from english to spanish
int trans_ES(char *word)
{
    int i;

    const char * es[8][2] = {
        {"cat", "gato"},
        {"dog", "perro"},
        {"bird", "pajaro"},
        {"mouse", "raton"},
        {"cow", "vaca"},
        {"tiger", "tigre"},
        {"horse", "caballo"},
        {"monkey", "mono"}
    };

    for(i=0; i<16; i++)
    {
        if(!strcmp(word, es[0][i]))
        {
            printf("The Spanish word for %s is: %s \n", word, es[0][i+1]);
        }
    }

    return 0;
}

//function to translate words from spanish to english
int trans_SE(char *word)
{
    int i;

    const char * es[8][2] = {
        {"cat", "gato"},
        {"dog", "perro"},
        {"bird", "pajaro"},
        {"mouse", "raton"},
        {"cow", "vaca"},
        {"tiger", "tigre"},
        {"horse", "caballo"},
        {"monkey", "mono"}
    };

    for(i=0; i<16; i++)
    {
        if(!strcmp(word, es[0][i]))
        {
            printf("The English word for %s is: %s \n", word, es[0][i-1]);
        }
    }

    return 0;
}

//function to translate words from english to french
int trans_EF(char *word)
{
    int i;

    const char * ef[8][2] = {
        {"cat", "chat"},
        {"dog", "chien"},
        {"bird", "oiseau"},
        {"mouse", "souris"},
        {"cow", "vache"},
        {"tiger", "tigre"},
        {"horse", "cheval"},
        {"monkey", "singe"}
    };

    for(i=0; i<16; i++)
    {
        if(!strcmp(word, ef[0][i]))
        {
            printf("The French word for %s is: %s \n", word, ef[0][i+1]);
        }
    }

    return 0;
}

//function to translate words from french to english
int trans_FE(char *word)
{
    int i;

    const char * ef[8][2] = {
        {"cat", "chat"},
        {"dog", "chien"},
        {"bird", "oiseau"},
        {"mouse", "souris"},
        {"cow", "vache"},
        {"tiger", "tigre"},
        {"horse", "cheval"},
        {"monkey", "singe"}
    };

    for(i=0; i<16; i++)
    {
        if(!strcmp(word, ef[0][i]))
        {
            printf("The English word for %s is: %s \n", word, ef[0][i-1]);
        }
    }

    return 0;
}

//function to execute all commands
void command_Runner(char command[40], char *word)
{
    if(strcmp(command, "trans_ES") == 0)
    {
        printf("inside function1\n");
        trans_ES(word);
    }
    else if(strcmp(command, "trans_SE") == 0)
    {
        printf("inside function2\n");
        trans_SE(word);
    }
    else if(strcmp(command, "trans_EF") == 0)
    {
        printf("inside function3\n");
        trans_EF(word);
    }
    else //trans_FE
    {
        printf("inside function4\n");
        trans_FE(word);

    }

}

int main(int argc, char** argv)
{
    printf("get here\n");

    char *arg1[10];
    strcpy(&arg1, argv[1]);

    char *arg2[10];
    strcpy(&arg2, argv[2]);

    printf("command: %s\n", arg1);
    printf("word: %s\n", arg2);

    command_Runner(arg1, arg2);

    return 0;
}
