![](https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/logo/logo.jpg)

<h1 align='center'>nShopping WEB</h1>
<p align='center'>Website about a shopping system built with Ionic Framework along with Angular.</p>
<p align="center">
	<a href="https://github.com/williamniemiec/nshopping-web/actions/workflows/windows.yml"><img src="https://github.com/williamniemiec/nshopping-web/actions/workflows/windows.yml/badge.svg" alt=""></a>
	<a href="https://github.com/williamniemiec/nshopping-web/actions/workflows/macos.yml"><img src="https://github.com/williamniemiec/nshopping-web/actions/workflows/macos.yml/badge.svg" alt=""></a>
	<a href="https://github.com/williamniemiec/nshopping-web/actions/workflows/ubuntu.yml"><img src="https://github.com/williamniemiec/nshopping-web/actions/workflows/ubuntu.yml/badge.svg" alt=""></a>
	<a href="http://node.dev"><img src="https://img.shields.io/badge/NodeJS-15+-D0008F.svg" alt="NodeJS compatibility"></a>
    <a href="https://ionicframework.com"><img src="https://img.shields.io/badge/Ionic-5-D0008F.svg" alt="Ionic compatibility"></a>
	<a href="https://github.com/williamniemiec/nshopping-web/releases"><img src="https://img.shields.io/github/v/release/williamniemiec/nshopping-web" alt="Release"></a>
	<a href="https://github.com/williamniemiec/nshopping-web/blob/master/LICENSE"><img src="https://img.shields.io/github/license/williamniemiec/nshopping-web" alt="License"></a>
</p>
<p align="center">
	<a href='https://wniemiec-web-nshopping.herokuapp.com/'><img alt='Deploy' src='https://www.herokucdn.com/deploy/button.svg' width=200/></a>
</p>

<hr />

## ❇ Introduction
nShopping Web is a website built with Ionic Framework along with Angular for a simple shopping system. This application was made for the sole purpose of learning the Ionic framework better. You can interact with the project through the Heroku platform ([click here to access](https://wniemiec-web-nshopping.herokuapp.com/)).

### Login information
| Email| Password |
|------- | ----- |
| william@email.com |123|

## ⚠ Warnings
The hosting service Heroku may have a certain delay (~ 1 min) for uploading the application so the loading of the website may have a certain delay. 

## ✔ Requiremens
- [NodeJS](https://nodejs.dev);
- [Cordova](https://cordova.apache.org);
- [Ionic Framework](https://ionicframework.com);

## ℹ How to run

Type in your terminal:

1. npm install

2. sudo ionic serve

## 🖼 Gallery

<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; flex-wrap: wrap">

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen1.png" alt="image 1" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen2.png" alt="image 2" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen3.png" alt="image 3" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen4.png" alt="image 4" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen5.png" alt="image 5" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen6.png" alt="image 6" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen1-phone.png" alt="mobile image 1" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen2-phone.png" alt="mobile image 2" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen3-phone.png" alt="mobile image 3" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen4-phone.png" alt="mobile image 4" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen5-phone.png" alt="mobile image 5" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/screens/screen6-phone.png" alt="mobile image 6" />
</div>

## 🚩 Changelog
Details about each version are documented in the [releases section](https://github.com/williamniemiec/nshopping-web/releases).

## 🗺 Project structure
![architecture](https://raw.githubusercontent.com/williamniemiec/nshopping-web/master/docs/images/design/architecture.jpg)

## 📁 Files

### /
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|docs|`Directory`|Documentation files|
|resources|`Directory`|When building the app for different platforms (like iOS or android), this folder will be automatically generated with the app resources like the logo and the splash screen image|
|src|`Directory`|Application and test files|

### /src
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|app|`Directory`|Has all the components, modules, pages, services and styles needed for building the application|
|assets|`Directory`|Application static files|
|environments|`Directory`|Configuration files used by the Angular CLI to manage the different environment variables|
|theme|`Directory`|It includes all the theming, variables and sass mixins to be used in the application|
|global.scss|`File`|Style used by multiple pages|
|index.html|`File`|Application point entry|
|main.ts|`File`|Application point entry|
|test.ts|`File`|Test file|
|zone-flag.ts|`File`|Prevents Angular change detection from running with certain Web Component callbacks|

### /src/app
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|config|`Directory`|Configuration classes|
|dto|`Directory`|Data transfer object classes|
|interceptors|`Directory`|Classes that intercept the HTTP requests and errors|
|models|`Directory`|Application model classes, including domain classes|
|pages|`Directory`|Application pages|
|services|`Directory`|Classes responsible for providing data from APIs and utility services|
|app-routing.module.ts|`File`|Application page routes|
|app.component.html|`File`|Application main HTML|
|app.component.ts|`File`|Application main component|
|app.module.ts|`File`|Context of application main component|
