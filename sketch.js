//Snow Forces
let snow=[];
let gravity;
let wind;
//Perlin Noise
var font;
var vehicles=[];
//insert text here
var texts=[];
var nextT=0;
var maxChangeForce=40;
var fontsize=120;


let fr;

let zOff=0;
let smile;

let smilePoints=[];
let spritesheet;
let textures=[];



function preload(){
	spritesheet=loadImage('flakes32.png');
	smile=loadImage('heart.png');
	font=loadFont('AvenirNextLTPro-Demi.otf');

}

function setup() {
	createCanvas(windowWidth,windowHeight);
	gravity=createVector(0,0.3);
	fr=createP('');
	smile.resize(0,windowHeight*.9);


	var bounds=font.textBounds(texts[nextT],0,0,fontsize,{
			sampleFactor: 0.1
	});
	var posx=width/2-bounds.w/2;
	var posy=height/2+bounds.h/2;

	var points=font.textToPoints(texts[nextT],posx,posy,fontsize);

	for(var i=0;i<points.length;i++){
		var pt = points[i];
		var vehicle=new Vehicle(pt.x,pt.y);
		vehicles.push(vehicle);
	}


	for (let x = 0; x < spritesheet.width; x+=32) {
		for (let y = 0; y < spritesheet.height; y+=32) {
			let img = spritesheet.get(x,y,32,32);
			textures.push(img);
		}
	}

	parseFSmile(windowWidth/2,windowHeight/2);

	for (let i = 0; i < 500; i++) {
		let x = random(width);
		let y = random(height);
		let design = random(textures);
		snow.push(new Snowflake(x,y,design));
	}

}

function draw() {
	background(51);


	for (flake of snow) {
		let xOff=flake.pos.x/width;
		let yOff=flake.pos.y/height;
		let wAngle=noise(xOff,yOff,zOff)*TWO_PI;
		let wind = p5.Vector.fromAngle(wAngle);
		wind.mult(0.1);

		flake.applyForce(gravity);
		flake.applyForce(wind);
		flake.update();
		flake.render();
	}

	if (nextT>=texts.length-1) {
		drawSmile(4);
	}

	for(var i=0;i<vehicles.length;i++){
		var v=vehicles[i];
		v.behavior();
		v.update();
		v.show();
	}



	fr.html(floor(frameRate()));
}


function mouseClicked(){
	nextT++;
	if(nextT>texts.length){
		nextT=0;
	}


	var bounds = font.textBounds(texts[nextT], 0, 0, fontsize);
  var posx = width / 2 - bounds.w / 2;
  var posy = height / 2 + bounds.h / 2;

  var points = font.textToPoints(texts[nextT], posx, posy, fontsize, {
      sampleFactor: 0.1
  });

	if (points.length < vehicles.length) {
        var toSplice = vehicles.length - points.length;
        vehicles.splice(points.length - 1, toSplice);

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    } else if (points.length > vehicles.length) {

        for (var i = vehicles.length; i < points.length; i++) {
            var v = vehicles[i - vehicles.length].clone();

            vehicles.push(v);
        }

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }

    } else {
        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    }
}


function parseSmile(sx,sy,res){
	let w=smile.width;
	let h=smile.height;
	smile.loadPixels();

	for (var i = 0; i < w*h; i+=res) {
			// get color of pixel
			var r = smile.pixels[i*4]; // Red
			var g = smile.pixels[i*4+1]; // Green
			var b = smile.pixels[i*4+2]; // Blue
			// get the position of pixel
			var y = parseInt(i / w, 10);
			var x = i - y * w;
			//if pixel is black, draw a point
			if (r==0 && g==0&& b==0) {
				let Spoint= new Vehicle(sx-smile.width/2+x,sy-smile.height/2+y);
				smilePoints.push(Spoint);
			}
	}
}

function parseFSmile(sx,sy){
	let w=smile.width;
	let h=smile.height;
	smile.loadPixels();

	for (var i = 0; i < w*h; i++) {
			// get color of pixel
			var r = smile.pixels[i*4]; // Red
			var g = smile.pixels[i*4+1]; // Green
			var b = smile.pixels[i*4+2]; // Blue
			// get the position of pixel
			var y = parseInt(i / w, 10);
			var x = i - y * w;
			//if pixel is black, draw a point
			if (r==0 && g==0&& b==0) {
				var design = random(textures);

				smilePoints.push(new FlakeVehicle(sx-smile.width/2+x,sy-smile.height/2+y,design));
			}
	}
}

function drawSmile(res){
	for(var i=0;i<smilePoints.length;i+=res){
		var v=smilePoints[i];
		v.behavior();
		v.update();
		v.show();
	}
}
