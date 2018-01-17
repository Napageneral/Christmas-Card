let smile;

// function preload(){
//   smile = loadImage('smiley.png');
// }


let smilePoints=[];
 // let smilePoints=parseImage(smile,3);
 // let smileParticles=[];


// function createSmile(x,y){
//   for (p of smilePoints) {
//     let sPart=new Vehicle(x-w/2+p.x,y-h/2+p.y);
//     smileParticles.push(sPart);
//   }
// }

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

function drawSmile(){
	for(var i=0;i<smilePoints.length;i++){
		var v=smilePoints[i];
		v.behavior();
		v.update();
		v.show();
	}
}
