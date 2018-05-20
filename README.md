# Noteworthy
A collaborative online text editor
**Created Feb, 2018**

## Table of Contents 
- [About](#about)
- [Installation Instructions](#installation-instructions)
- [Built With](#built-with)
- [Features](#features)

## Creator
- [Siyuan Xu](https://github.com/1009700427)

## About 
Noteworthy is a web app that allows for easy sharing and collaborative working of text documents. The text editor supports multiple font styles and search capabilities. 

## Installation Instructions:
#### Prerequisites
Requires Node.js
Installed MongoDB.
1. Clone the repository
2. ```cd Disputify```
3. Create a database named ```noteworthyDB```
4. Create two collections: ```users``` and ```documents```
5. Start the MongoDB server
6. Run ```npm install``` to download node modules
7. Run ```npm run build``` to bundle the code
8. Run ```npm run serve``` to start the server
9. In browser, visit ```localhost:3000``` to launch the app

## Built With 
- Webpack 
- Frontend 
  - React.js 
  - Draft.js 
  - Bootstrap 
  - LESS 
  - HTML/CSS
- Backend
  - Express.js 
  - Socket.io
  - MongoDB 

## Features

### Login and Register Page 
When you first open the app, it will ask for your username and password. If you don't already have one, click on the register button and it will lead you to the register page. 

Login Page: 
![1](https://user-images.githubusercontent.com/22974252/40284043-52904bb2-5c3d-11e8-90da-a13d1dbfc32b.png)

Register Page: 
![2](https://user-images.githubusercontent.com/22974252/40284046-618ecb52-5c3d-11e8-850d-923dab81efdc.png)

### User Home Page 
After successfully logging into your account, all the documents available will be presented to you, with their proper name and contents in plain text. This page serves as the main page for the user to access documents.  

![3](https://user-images.githubusercontent.com/22974252/40284058-bd30f87c-5c3d-11e8-8314-09af9e69553f.png)

### Text Editor 
I created the text editor based on Draft.js library. The text editor allows for real-time text editing and supports multipe font sizes, styles, as well as text aligning and listing (bullet/number) of paragraphs. In addition, there are also keyboard quick access for bolding (⌘B) and italicizing(⌘I). The file will also autosave whatever typed in whenever there is an input from user so that they don't lose their work. 

![4](https://user-images.githubusercontent.com/22974252/40284110-b1e94e32-5c3e-11e8-995f-1efc4b51dc9c.png)

The collaborative text editing functionality is implemented with Socket.io and Express.js. The .gif image below is a quick showcase of this functionality. 

1: 
![socketio1](https://user-images.githubusercontent.com/22974252/40284194-42c6265e-5c40-11e8-813d-8f976aa00a11.gif)

2: 
![socketio3](https://user-images.githubusercontent.com/22974252/40284241-04d43312-5c41-11e8-9627-a0c6c668d97c.gif)

3: 
![socketio2](https://user-images.githubusercontent.com/22974252/40284208-7413a678-5c40-11e8-804d-6b8037282e19.gif)

The editor also supports inline text searching: 

![searching](https://user-images.githubusercontent.com/22974252/40284152-742c2302-5c3f-11e8-8556-c87548abe02f.gif)
