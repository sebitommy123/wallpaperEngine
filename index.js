const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas')
let fs = require('fs');
let util = require('util');

let frenchWords = require('./words.json');

function a(){

	fetch("https://www.merriam-webster.com/word-of-the-day")
	.then(res => res.text())
	.then(text => {
		
		let type = text.split(`<span class="main-attr">`)[1].split("</span>")[0];

		fetch("https://www.merriam-webster.com/word-of-the-day/calendar")
		.then(res => res.text())
		.then(text => {
			let word = text.split(`<h2 class="wod-l-hover">`)[1].split("</h2>")[0];
			let def = text.split(`<p>`)[1].split(`</p>`)[0];
					
			const canvas = createCanvas(1368, 912);
			const ctx = canvas.getContext('2d');
			
			let frenchWord = frenchWords[Math.floor(Math.random() * frenchWords.length)];
			
			loadImage('background.jpg').then((image) => {
				ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
				
				ctx.fillStyle = "white";
				
				ctx.textAlign = "center";
				ctx.baseline = "center";
				
				let engWord = word.charAt(0).toUpperCase() + word.substring(1);
				let engMeaning = def.charAt(0).toUpperCase() + def.substring(1) + ", " + type;
				
				ctx.font = "30px Verdana";
				ctx.fillText(frenchWord.french, canvas.width/2, canvas.height/2-50);
				
				ctx.font = "25px Verdana";
				ctx.fillText(frenchWord.english, canvas.width/2, canvas.height/2-50 + 40);
				
				console.log("UPDATED");
				
				var buf = canvas.toBuffer();
				fs.writeFileSync('img/unicorn.png', buf);
				
				setTimeout(a, 1000*60*10);
			})
		});

	});

}

a();