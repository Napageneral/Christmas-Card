function getRandomSize(){
  let r = pow(random(0,1),2);
  return constrain(r*32,4,32);

}


class Vehicle{

  constructor(x,y,img){

    this.pos=createVector(random(width),random(height));
    this.vel=p5.Vector.random2D();
    this.acc=createVector();
    this.target=createVector(x,y);

    this.img=img;
    this.r=getRandomSize();
    this.maxspeed=10;
    this.maxforce=1;
  }

  behavior(){
    var arrive=this.arrive(this.target);
    this.applyForce(arrive);

    var mouse = createVector(mouseX,mouseY);
    var flee=this.flee(mouse);
    flee.mult(5);
    this.applyForce(flee);
  }

  seek(target){
    var des = p5.Vector.sub(target,this.pos);
    des.setMag(this.maxspeed);
    var steer = p5.Vector.sub(des,this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  arrive(target){
    var des = p5.Vector.sub(target,this.pos);
    var d =des.mag();
    var speed=this.maxspeed;
    if(d<100){
      speed=map(d,0,100,0,this.maxspeed);
    }
    des.setMag(speed);
    var steer = p5.Vector.sub(des,this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  flee(target){
    var des = p5.Vector.sub(target,this.pos);
    var d = des.mag();
    if(d<50){
      des.setMag(this.maxspeed);
      des.mult(-1);
      var steer = p5.Vector.sub(des,this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else{
      return createVector(0,0);
    }
  }

  applyForce(f){
    this.acc.add(f);
  }

  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show(){
    stroke(255);
    strokeWeight(this.r);
    point(this.pos.x,this.pos.y);
  }

  clone(){
    var v = new FlakeVehicle(this.pos.x, this.pos.y);

    v.pos.x = this.pos.x;
    v.pos.y = this.pos.y;

    v.vel.x = this.vel.x;
    v.vel.y = this.vel.y;

    v.acc.x = this.acc.x;
    v.acc.y = this.acc.y;

    return v;
  }

}
