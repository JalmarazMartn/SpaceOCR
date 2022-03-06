# SpaceOCR

Thanks for https://gist.github.com/dirask/bac45a6520296faefd494c148d7b9d6b for the getting clipboard code. Great work!

## The idea

This program is the combination of the following elements:

- Clipboard : The program reads the clipboard and converts it to base64.
- OCR : The program uses the SpaceOCR API to recognize the text in the clipboard.
- Regex : The program uses the regex to extract the text from the OCR result.

## Usage

Go to https://jalmarazmartn.github.io/SpaceOCR/Clipborad.html

In this website you have some controls:

- Space OCR apikey. You can get it from https://space-ocr.com/. If blank, the program will use the default key, helloworld. Please get a key. These people made a good work and it is the minimum you can do.

- Pattern. You can use regex to extract the text from the OCR result. You can set a description and a regex to the search pattern.

When you push the button "Get Clipboard image and serach regexp" the program will get image clipboard content, parse it with OCR and search the regexp. In the "Search result" you will see the matches of the pattern search.

There are two auxiliary items in wep page:

- Link to rexp101.com. You can find the regexp examples here, execute them and see the result, and get lots of previous regexp examples.

- Clipboard content in base64. Is useful to copy the base64 clipboard content to the clipboard of another program.

## Steps

### Step 1: 
Push PrintScreen in the screen you want to search for the pattern.

### Step 2: 
Introduce Space OCR apikey, i needed. You can work with test key helloworld, but everyone can get a key. Get your own key!! It is free and easy.

### Step 3: 
Set the pattern and press the button "Get Clipboard image and serach regexp".

## Cookies

From a sesion to another session, the program will use the cookies of the previous session. It save the space-ocr.com apikey and the pattern.