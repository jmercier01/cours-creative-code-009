// Script By Jerome Mercier https://linktr.ee/jmercier
// https://formation.pizza-punk.com/
let particles = [];
//let diag, middle;
let nb, seuil;
let palette = [];

function setup() {
  cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.parent("canvas");

  palette[0] = color("#EEE");

  palette[1] = color("#8D99AE");
  palette[2] = color("#EDF2F4");
  palette[3] = color("#EF233C");
  palette[4] = color("#D90429");
  palette[5] = color("#2B2D42");
  dispersion = 400; 
  seuil = random(20,100);   nb = 80; 
  /*console.log("nombre " + nb);
  console.log("seuil " + seuil);
  console.log("dispersion " + dispersion);*/
  for (let i = 0; i < nb; i++) {
    particles.push(new Particle(i));
  }
  //background(palette[0]);
}

function draw() {
  clear();

  for (let i = 0; i < particles.length; i++) {
    if (!particles[i].isFixe) particles[i].update();
    particles[i].display();
    for (let j = i; j < particles.length; j++) {
      let d = particles[i].v.dist(particles[j].v);
      if (d < seuil && particles[i] != particles[j]) {
        strokeWeight(map(d, 0, seuil, 2, 0));
        stroke(
          red(particles[i].col),
          green(particles[i].col),
          blue(particles[i].col),
          255
        ); //map(d, 0, seuil, 255, 0)
        line(
          particles[i].v.x,
          particles[i].v.y,
          particles[j].v.x,
          particles[j].v.y
        );
      }
    }
  }
}

class Particle {
  constructor(i) {
    let ii = map(i, 0, nb, 0, TAU);
    this.v = createVector(
      random(width),
      random(height)
    );

    this.r = random(1, 5);
    this.vRd = createVector(random(1000), random(1000));
    this.speed = p5.Vector.random2D();
    this.isFixe = i % 5 ? false : true; //random([true,false]);
    this.col = palette[int(random(1, palette.length))];
    this.op = 255; //random(0,250);
  }
  display() {
    noStroke();
    fill(red(this.col), green(this.col), blue(this.col));
    circle(this.v.x, this.v.y, this.r);
  }
  update() {
    let nx = map(
      noise(this.vRd.x + frameCount * this.speed.x*0.001),
      0,
      1,
      -width/2,
      width/2
    );
    let ny = map(
      noise(this.vRd.y + frameCount * this.speed.y*0.001),
      0,
      1,
      -height/2,
      height/2
    );
    this.v.x = width / 2 + nx;
    this.v.y = height / 2 + ny;
  }
}
