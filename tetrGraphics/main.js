import { renderMino, stringToBoard, renderBoard, renderQueue } from "./tetrGraphics.js";

var outputElement;
var currentMenu = null;

const chosenMenuMap = {
  "none": null,
  "mino": "minoMenu",
  "board": "boardMenu",
  "queue": "queueMenu",
}

function parseNumberList(str) {
  const l = [];
  var n = "";
  for (let i=0; i<str.length; i++) {
    const char = str[i];
    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)) {
      n += char;
    } else {
      if (n !== "") {
        l.push(n);
        n = "";
      }
    }
  }
  if (n !== "") {
    l.push(n);
    n = "";
  }
  return l;
}

function addRender(img) {
  try {
    if (img) {
      outputElement.appendChild(img);
      outputElement.appendChild(document.createElement("br"));
    } else {
      console.log("The image is not truthy. (" + img + ")");
    }
  } catch (e) {
    console.log("The image inputted isn't valid.");
    console.log(e);
  }
}

function testRender() {
  var img;
  
  // render single mino
  img = renderMino("T");
  addRender(img);
  
  // render boards
  img = renderBoard(stringToBoard(`
    -Z--------
    ZZ-------I
    Z------LJI
    OO-SSLLLJI
    OOSS---JJI
    `
    , 10, 5)); // SDPC
  addRender(img);
  
  img = renderBoard(stringToBoard(`
    ----T-----
    ---TTTI---
    ----SSIZZ-
    OO-SSLIJZZ
    OO-LLLIJJJ
    `
    , 10, 5)); // DT
  addRender(img);
  
  img = renderQueue("ZLOSIJT", null, "v");
  addRender(img);
  img = renderQueue("ZSIOLJTOSIZJLTOSZTIJLTZSLOJI", [7, 14, 21], "v");
  addRender(img);
  img = renderQueue("ZSIOLJTOSIZJLTOSZTIJLTZSLOJI", [7, 14, 21], "h");
  addRender(img);
  img = renderQueue("IITTIT", null, "v");
  addRender(img);
  img = renderQueue("OOTOI", null, "v");
  addRender(img);
  img = renderQueue("OITIITTOOTITO", null, "h");
  addRender(img);
}

// give interactivity to UI
function interactivity() {
  // outputElement is already defined in main()
  const renderSelector = document.getElementById("renderSelector");
  
  const clearImagesButton = document.getElementById("clearImagesButton");
  
  const minoSelector = document.getElementById("minoSelector");
  const minoRenderButton = document.getElementById("minoRenderButton");
  
  const boardWidthInput = document.getElementById("boardWidthInput");
  const boardHeightInput = document.getElementById("boardHeightInput");
  const boardStateInput = document.getElementById("boardStateInput");
  const boardRenderButton = document.getElementById("boardRenderButton");
  
  const queueDirectionSelection = document.getElementById("queueDirectionSelection");
  const pieceDistInput = document.getElementById("pieceDistInput");
  const evenlySpacedCheckbox = document.getElementById("evenlySpacedCheckbox");
  const pieceQueueInput = document.getElementById("pieceQueueInput");
  const borderPositionsInput = document.getElementById("borderPositionsInput");
  const queueRenderButton = document.getElementById("queueRenderButton");
  
  // select render type
  renderSelector.addEventListener("change", function() {
    const chosenMenu = renderSelector.value;
    console.log("Chosen Menu: " + chosenMenu);
    
    var chosenMenuId = chosenMenuMap[chosenMenu];
    if (chosenMenuId === undefined) {
      console.log("Menu not set!");
      return null;
    }
    
    if (currentMenu) {
      document.getElementById(currentMenu).style.display = "none";
    }
    
    if (chosenMenuId) {
      document.getElementById(chosenMenuId).style.display = "block";
    }
    
    currentMenu = chosenMenuId;
  });
  
  clearImagesButton.addEventListener("click", function() {
    if (confirm("Are you sure you would like to delete every image?")) {
      while (outputElement.firstChild) {
        outputElement.removeChild(outputElement.lastChild);
      }
    }
  });
  
  minoRenderButton.addEventListener("click", function() {
    const img = renderMino(minoSelector.value);
    addRender(img);
  });
  
  boardRenderButton.addEventListener("click", function() {
    const img = renderBoard(stringToBoard(
      boardStateInput.value,
      boardWidthInput.value,
      boardHeightInput.value)
    );
    addRender(img);
  });
  
  queueRenderButton.addEventListener("click", function () {
    const img = renderQueue(
      pieceQueueInput.value,
      parseNumberList(borderPositionsInput.value),
      queueDirectionSelection.value,
      pieceDistInput.value,
      evenlySpacedCheckbox.checked
    );
    addRender(img);
  });
}

function main() {
  outputElement = document.getElementById("outputImages");
  
  // testRender();
  interactivity();
}

document.addEventListener("DOMContentLoaded", main());