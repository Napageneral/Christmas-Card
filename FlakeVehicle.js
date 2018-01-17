function getRandomSize(){
  let r = pow(random(0,1),1);
  return constrain(r*32,8,24);

}


class FlakeVehicle{

  constructor(x,y,img){

    this.pos=createVector(random(width),random(-100,-10));
    this.vel=createVector(0,0);
    this.acc=createVector();
    this.target=createVector(x,y);

    this.img=img;
    this.r=getRandomSize();
    this.angle=random(TWO_PI);
    this.dir=random((1) > 0.5)? 1:-1;
    this.maxspeed=10;
    this.maxforce=1;

    this.xOff=0;
  }

  randomize(){
    this.pos=createVector(random(width),random(-100,-10));
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

  applyForce(force){
    let f = force.copy();
    //f.mult(this.r);
    this.acc.add(f);
  }

  update(){
    var des = p5.Vector.sub(this.target,this.pos);
    var d = des.mag();
    if(d>50){
      this.xOff=sin(this.angle*2)*2*this.r;
      this.angle+=this.dir*this.vel.mag()/200;
    }


    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.r*0.4);
    if (this.vel.mag() <1){
      this.vel.normalize();
    }
    this.acc.mult(0);


  }

  show(){
    push();
    translate(this.pos.x+this.xOff,this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    tint(255,105,180);
    image(this.img,0,0,this.r,this.r);   
    pop();
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
