function getRandomSize(){

  let r = pow(random(0,1),2);
  return constrain(r*32,4,32);

}


class Snowflake {

  constructor(sx,sy,img){
    let x = sx||random(width);
    let y = sy||random(-100,-10);
    this.img=img;

    this.pos=createVector(x,y);
    this.vel=createVector(0,0);
    this.acc=createVector();

    this.r= getRandomSize();
    this.angle=random(TWO_PI);
    this.dir=random((1) > 0.5)? 1:-1;

    this.xOff=0;
  }

  randomize(){
    let x =random(width);
    let y = random(-100,-10);
    this.pos=createVector(x,y);
    this.vel=createVector(0,0);
    this.acc=createVector();
    this.r= getRandomSize();
  }

  render(){
    push();
    translate(this.pos.x+this.xOff,this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.img,0,0,this.r,this.r);
    pop();

  }

  applyForce(force){
    //Parallax Effect
    let f = force.copy();
    f.mult(this.r);
    this.acc.add(f);
  }

  offScreen(){
    return (this.pos.y>height+this.r);
  }

  update(){

    this.xOff=sin(this.angle*2)*2*this.r;

    this.vel.add(this.acc);
    this.vel.limit(this.r*.4);

    if (this.vel.mag() <1){
      this.vel.normalize();
    }

    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.offScreen()) {
      this.randomize();
    }

    if (this.pos.x < -this.r) {
      this.pos.x=windowWidth+this.r;
    }
    if (this.pos.x > windowWidth+this.r) {
      this.pos.x=-this.r;
    }

    this.angle+=this.dir*this.vel.mag()/200;

  }
}
