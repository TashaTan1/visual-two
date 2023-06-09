/***************************************************************************************
*    Title: snowflake doodles
*    Author: Sophia (fractal kitty)
*    Date: n.d.
*    Code version: 1.0
*    Availability: https://codepen.io/fractalkitty/pen/QWxzZLP
*
***************************************************************************************/

//variables
let two;
let temps = 0;
let oldtemps = 0;
let r = 0;
let varRand = 0;
let timer = 5;
let button;

function preload() {
  // LOAD SOUND
  two = loadSound("TWO.mp3");
}

function setup() {
  c = min(windowWidth, windowHeight) * 0.9;
  createCanvas(windowWidth, windowHeight);
  strokeWeight(0.1);
  varRand = random(2, 10);
  two.play();
  two.loop();
}
function draw() {
  temps = 200 * sin(frameCount / 520);
  translate(width / 2, height / 2);
  mouseCont();
  flaking();
//timer
  if (frameCount % 60 == 0 && timer > 0) {
    
    timer--;
  }
  //  console.log(timer);
  if (timer == 0) {
    button = createButton("Carry on Listening");
    button.position(200, height/2);
    button.mousePressed(function goToAnotherPage() {
      window.location.href =
        "https://tashatan1.github.io/visual-two/";
    });
    button = createButton("Let's Breath");
    button.position(425, height/2);
    button.mousePressed(function goToAnotherPage() {
      window.location.href =
        "https://tashatan1.github.io/let-s-breath/";
    });
  }
}
//animation of visual - flake effect
function flaking() {
  if ((temps > 0 && temps < 0.1) || temps > 199) {
    r = 2;
    oldtemps = 0;
  }
  stroke(
    255 + 255 * sin(temps / 200),
    255 + 255 * sin(temps / 200),
    355 + 255 * sin(temps / 100)
  );
  fill(
    155 * sin(temps / 200),
    155 * sin(temps / 200),
    255 * sin(temps / 100),
    2
  );
  if (temps == 0) {
    r = 1;
  }
  r = random(
    4 - (temps / varRand / 2) * sin(temps),
    r + (temps / varRand + r / 4) * sin(temps)
  );
  f = random(0, 1);
  p = random(r, r + 60);
  for (let i = 0; i < 6; i++) {
    push();
    rotate((i * PI) / 3);
    line(temps, r / 4, temps, -r / 4);
    push();

    line(temps, 0, temps + 10, r / 4);

    line(temps, 0, temps + 10, -r / 4);
    pop();
    if (f > 0.9) {
      push();
      rotate(PI / 6);
      line(temps, 0, temps + 5, r * 2);
      line(temps, 0, temps + 5, -r * 2);
      pop();
    }
    if (f > 0.5) {
      push();
      noStroke();
      translate(temps + random(0, 100), random(20));
      if (f > 0.99) {
        stroke(
          255 * sin(temps / 200),
          255 * sin(temps / 200),
          255 * sin(temps / 100)
        );
      }

      hexS(p);
      pop();
      push();
      translate(temps / 3, 0);
      rotate(PI / 6);
      noStroke();
      //fill(0)
      if (f > 0.99) {
        stroke(255);
      }
      hexS(r);
      pop();
    }
    pop();
  }
  oldtemps = r;
}

function hexS(p) {
  beginShape();
  for (let k = 0; k <= 6; k++) {
    vertex(p * sin((k * PI) / 3), p * cos((k * PI) / 3));
  }
  endShape();
}
function mousePressed() {
  //change background
  background(
    355 * sin(frameCount / 200),
    255 * sin(frameCount / 200),
    355 * sin(frameCount / 100),
    50
  );
  varRand = random(2, 10);
}

function mouseCont() {
  g = map(mouseX, 0, width, -0.002, 0.002);
  rotate(mouseX / 2000 + (PI / 6) * sin(frameCount * g));
  h = map(mouseY, 0, height, -200, 200);
  temps = temps - h;
}
