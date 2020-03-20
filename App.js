let B = 0;
let D = 0.05;
let R = 0.2;
let C = 0.001;

let specie;

let world;

let avgS;
let avgn;

function restart() {
  B = getSliderValue("B");
  D = getSliderValue("D");
  R = getSliderValue("R");
  C = getSliderValue("C");

  specie = new Specie(B, D, R, C);
  world = new World(10, specie);

  avgS = world.getN();
  avgn = 1;

  Plotly.newPlot(
    "plot",
    [
      {
        y: [0],
        mode: "lines",
        name: "Population size"
      },
      {
        y: [0],
        mode: "lines",
        name: "Expected Change"
      },
      {
        y: [0],
        mode: "lines",
        name: "Average population size"
      }
    ],
    { title: "Population Evolution"},
    { responsive: true }
  );
}

let FPS = 0;
var lastLoop = new Date();

function loop() {
  world.update();

  let N = world.getN();

  avgS += N;
  avgn++;

  Plotly.extendTraces(
    "plot",
    {
      y: [
        [N],
        [Evolution.expectedChange(specie.B, specie.D, specie.R, specie.C, N)],
        [avgS / avgn]
      ]
    },
    [0, 1, 2]
  );
}

function createSlider(parent, name, min, max, value, step) {
  var div = document.createElement("div");
  div.setAttribute("id", name);
  div.setAttribute("class", "vardiv");

  var text = document.createTextNode(name + "\t");
  div.appendChild(text);

  var slider = document.createElement("INPUT");
  slider.setAttribute("id", "SLIDER");
  slider.setAttribute("type", "range");
  slider.setAttribute("class", "slider");
  slider.setAttribute("min", min);
  slider.setAttribute("max", max);
  slider.setAttribute("step", step);
  slider.value = value;
  div.appendChild(slider);

  var inputbox = document.createElement("INPUT");
  inputbox.setAttribute("id", "IBOX");
  inputbox.setAttribute("type", "text");
  inputbox.value = value;
  div.appendChild(inputbox);

  slider.oninput = () => {
    inputbox.value = slider.value;
    restart();
  };

  inputbox.oninput = () => {
    slider.value = inputbox.value;
    restart();
  };

  div.appendChild(slider);

  document.querySelector(parent).appendChild(div);
}

function getSliderValue(name) {
  return Number.parseFloat(
    document.getElementById(name).querySelector("#SLIDER").value
  );
}

BSlider = createSlider("#config", "B", 0, 1, 0, 0.01);
DSlider = createSlider("#config", "D", 0, 1, 0.05, 0.001);
RSlider = createSlider("#config", "R", 0, 1, 0.2, 0.001);
CSlider = createSlider("#config", "C", 0, 1, 0.001, 0.0001);

restart();

var interval;
function setSpeed(speed) {
  clearInterval(interval);
  interval = setInterval(loop, 1000 / speed);
}

setSpeed(30);

setInterval(() => {
  var curLoop = new Date();
  FPS = Math.round(1000 / (curLoop - lastLoop));
  lastLoop = curLoop;

  document.getElementById("fps").innerHTML = `FPS: ${FPS}`;
});
