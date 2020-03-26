'''
CSC - 468 Project 1:
using a genetic algorthim i want to build a program that will generate
abstract images on a canvas.
'''
from PIL import Image
import numpy as np
from random import choice,random,randint,uniform

width = 500
height = 500

maxPixels = width * height
print('Max Pixels = ' + str(maxPixels))

canvas = Image.new('RGB', (width,height), "black")
pixels = canvas.load()


'''
I understand that the functions 'checkPixelValue' and 'RGBValueChecker' best fit
the description of a fitness function, but I am choosing to keep the current names to
avoid confusion in the futureself.

it turns out the problem I was having was that I was giving pixel[i,j] incorrect values
for RGB and therefor it could not change themself.

in the future I am hoping to implement a mutation method that mutates the immediate
pixels in an area to be close in value to the original and also crossover.

After watching a couple of different pictures be generated I am interested in making the mutationRate
change based on pixel location so that pixels on the outer edge have a less likely chance to mutate and
pixels in the center mutate more. this way the concentration of colored pixels is stronger
in the center of the image and the concentration of blank pixels is stronger on the outer edge.
'''

#   function that takes in the parameters width and height and generates / returns a random starting point
#   for the algorithm.
def randomStartingImage(width, height):
    for i in range(width):
        for j in range(height):
            if random() < 0.01:
                pixels[i,j] = (randint(0, 254), randint(0, 254), randint(0, 254))


    return canvas

#   function that checks if the value of a pixel is all 0 or a blank/black pixel
def checkPixelValue(r, g, b):
    if(r == 0 and g == 0 and b == 0):
        return True
    else:
        return False

#   function that checks the values of all pixels in the image and returns a number
def checkAllPixels(canvas):
    blankPixelCounter = 0
    for i in range(width):
        for j in range(height):
            r, g, b = canvas.getpixel((i, j))
            if(checkPixelValue(r,g,b)):
                blankPixelCounter += 1
    return blankPixelCounter

#   function that checks the value of an int is within a valid range
def RGBValueChecker(int):
    if(int > 0 or int < 255):
        return False
    else:
        return True


    # TODO: write a mutation algorithm that for the value returned from the fitness function
    #   it will change the pixels color?
    #   takes in an image or canvas
def mutate(canvas, pixels):
    mutationRate = 0.3
    for i in range(width):
        for j in range(height):
            if(random() < mutationRate):
                r, g, b = canvas.getpixel((i,j))
                #   do the mutation here
                #   maybe implement a way for it to randomly choose between .01 and .03 percent
                #   need the if statement to check if [ r + (r * .03) < 255]
                p = uniform(0.02, 0.1)

                #   increasing on the scale: (in stands for increasing)
                inR = int(float(r + (float(r) * float(p))))
                inG = int(float(g + (float(g) * float(p))))
                inB = int(float(b + (float(b) * float(p))))

                #   decreasing on the scale: (de stands for decreasing)
                #   this is for future use
                deR = int(float(r + (float(r) * float(-p))))
                deG = int(float(g + (float(g) * float(-p))))
                deB = int(float(b + (float(b) * float(-p))))

                if(RGBValueChecker(inR)):
                    if(RGBValueChecker(inG)):
                        if(RGBValueChecker(inB)):
                            pixels[i,j] = (inR, inG, inB)
                        else:
                            pixels[i,j] = (inR, inG, randint(0, 255))
                    else:
                        if(RGBValueChecker(inB)):
                            pixels[i,j] = (inR, randint(0, 255), inB)
                        else:
                            pixels[i,j] = (inR, randint(0, 255), randint(0, 255))
                else:
                    if(RGBValueChecker(inG)):
                        if(RGBValueChecker(inB)):
                            pixels[i,j] = (randint(0, 255), inG, inB)
                        else:
                            pixels[i,j] = (randint(0,255), inG, randint(0,255))
                    else:
                        pixels[i,j] = (randint(0,255), randint(0,255), randint(0,255))

    print('Number of blank pixels (inside the mutation function): ' + str(checkAllPixels(canvas)))
    return canvas


    # TODO: this function will be recursive, it will keep calling itself with the previous
    #   image it generated as long as the % of blank pixels is higher then the set amoumt
    #   this combined with the rules in fitness should produce some interesting images
    #   take the number that checkAllPixels returns and divide it by the maxPixels to get
    #   the percent of how many pixels are blank / black
    #   will take an image as the only arg
    #   heat equation  or wave equation
    #   2nd order PDE's - 3 different types of linear second order partial equations
    #   elliptic, parabolic,
    #   use the pixel array instead of canvas, then at the end re-intialize the canvas from the array
def main(canvas, pixels):
    print('Number of blank pixels: ' + str(checkAllPixels(canvas)))
    percentageBlankPixels = float(checkAllPixels(canvas)) / float(maxPixels)
    print(percentageBlankPixels)

    if(percentageBlankPixels < .3):
        canvas.show()
        return 'All done'

    canvas = mutate(canvas, pixels)
    main(canvas, pixels)

print(main(randomStartingImage(width, height), pixels))

'''
Since this project is a little different its harder to plot the differnce of the algorithm over time instead of just running itself.
currently the program will create an image with a diverse population of pixels, but hopefully the changes i have talked about in the comments
above really change the output more to what i was expecting.
'''
