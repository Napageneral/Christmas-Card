function Vehicle(x,y){
  this.pos=createVector(random(width),random(height));
  this.vel=p5.Vector.random2D();;
  this.acc=createVector();
  this.target=createVector(x,y);
  this.r=8;
  this.maxspeed=15;
  this.maxforce=10;
}

Vehicle.prototype.behavior=function(){
  //var seek=this.seek(this.target);
  //this.applyForce(seek);

  var arrive=this.arrive(this.target);
  this.applyForce(arrive);

  var mouse = createVector(mouseX,mouseY);
  var flee=this.flee(mouse);
  flee.mult(5);
  this.applyForce(flee);

}

Vehicle.prototype.seek=function(target){
  var des = p5.Vector.sub(target,this.pos);
  des.setMag(this.maxspeed);
  var steer = p5.Vector.sub(des,this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.arrive=function(target){
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

Vehicle.prototype.flee=function(target){
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

Vehicle.prototype.applyForce=function(f){
  this.acc.add(f);
}

Vehicle.prototype.update=function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);

}

Vehicle.prototype.show=function(){
  stroke(255);
  strokeWeight(this.r);
  point(this.pos.x,this.pos.y);
}

Vehicle.prototype.clone = function () {
    var v = new Vehicle(this.pos.x, this.pos.y);

    v.pos.x = this.pos.x;
    v.pos.y = this.pos.y;

    v.vel.x = this.vel.x;
    v.vel.y = this.vel.y;

    v.acc.x = this.acc.x;
    v.acc.y = this.acc.y;

    return v;
}
