function parseImage(imagelink,res){
  let points=[];
	let w=image.width;
	let h=image.height;
	image.loadPixels();

	for (var i = 0; i < w*h; i+=res) {
			// get color of pixel
			var r = image.pixels[i*4]; // Red
			var g = image.pixels[i*4+1]; // Green
			var b = image.pixels[i*4+2]; // Blue
			// get the position of pixel
			var y = parseInt(i / w, 10);
			var x = i - y * w;
			//if pixel is black, draw a point
			if (r==0 && g==0&& b==0) {
				let ipoint = createVector(x,y);
        points.push(ipoint);
			}
	}
  return points;
}
