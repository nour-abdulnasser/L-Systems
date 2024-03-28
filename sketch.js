// class Rule {
//   constructor() {
//     this.from = "";
//     this.to = "";
//   }
// }

/*
  define system properties
*/
// angleMode (degrees)

let system = {
  variables: "",
  constants: "",
  axiom: "",
  rules: [],
  startingAngle: 0,
  rotationAngle: 0,
};
let sentence = "";
function createRulesFields() {
  document.getElementById("rules").innerHTML = "";
  let numRules = document.getElementById("numRules").value;

  for (let i = 0; i < numRules; i++) {
    var title = document.createElement("label");
    title.innerHTML = `Rule #${i + 1}`;
    var div = document.createElement("div");
    div.setAttribute("class", "d-flex");
    div.setAttribute("id", `rule${i + 1}Parent`);

    var inputFrom = document.createElement("input");
    var inputTo = document.createElement("input");

    inputFrom.setAttribute("type", "text");
    inputFrom.setAttribute("class", "form-control");
    inputFrom.setAttribute("id", `rule${i + 1}From`);

    inputTo.setAttribute("type", "text");
    inputTo.setAttribute("class", "form-control");

    inputTo.setAttribute("id", `rule${i + 1}To`);

    div.appendChild(inputFrom);
    div.appendChild(inputTo);

    document.getElementById("rules").appendChild(title);
    document.getElementById("rules").appendChild(div);
  }
}
function generateSystem() {
  let iterations = document.getElementById("iterations").value;

  system.variables = document.getElementById("variables").value;
  system.constants = "";
  system.axiom = document.getElementById("axiom").value;
  system.startingAngle = document.getElementById("startingAngle").value;
  system.rotationAngle = document.getElementById("rotationAngle").value;
  let rulesBox = [];
  for (i = 0; i < document.getElementById("numRules").value; i++) {
    rulesBox.push({
      from: document.getElementById(`rule${i + 1}From`).value,
      to: document.getElementById(`rule${i + 1}To`).value,
    });
  }
  system.rules = rulesBox;
  sentence = system.axiom;
  console.log(system);
  for (let i = 0; i < iterations; i++) {
    generateSentence();

    len *= 0.75;
    sketchSystem();
  }
}
console.log(system);

let len = 100;

function generateSentence() {
  let newSentence = "";
  for (let char of sentence) {
    let flag = false;
    for (let rule of system.rules) {
      if (char == rule.from) {
        newSentence += rule.to;
        flag = true;
        break;
      }
    }
    if (!flag) {
      newSentence += char;
    }
  }

  sentence = newSentence;
  // createP(sentence);
  sketchSystem();
}

function sketchSystem() {
  background("rgba(0, 255, 0)");
  resetMatrix();
  translate(width / 2, height);
  stroke(0, 100);
  rotate(system.startingAngle);
  strokeWeight(3);
  for (let char of sentence) {
    if (char == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (char == "-") {
      rotate((-PI / 180) * system.rotationAngle);
    } else if (char == "+") {
      rotate((PI / 180) * system.rotationAngle);
    } else if (char == "[") {
      push();
    } else if (char == "]") {
      pop();
    }
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
