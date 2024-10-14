import { getData } from "./dataFetcher.js";
import { createParameters, generateThumbnail } from "./thumbnailGenerator.js";
import { readFile } from "./util.js";

function main() {
  // output area
  const outputElement = document.getElementById("outputElement");
  
  // buttons
  const autofillButton = document.getElementById("autofillButton");
  const autofillRenderButton = document.getElementById("autofillRenderButton");
  const renderButton = document.getElementById("renderButton");
  
  // top inputs
  const leftUserInput = document.getElementById("leftUserInput");
  const rightUserInput = document.getElementById("rightUserInput");
  
  // some parameters
  const paramElements = {
    "leftUsername": document.getElementById("leftUsername"),
    "rightUsername": document.getElementById("rightUsername"),
    "leftRankText": document.getElementById("leftRankText"),
    "rightRankText": document.getElementById("rightRankText"),
    "topCenterText": document.getElementById("topCenterText"),
    "ftText": document.getElementById("ftText"),
    "bottomCenterText": document.getElementById("bottomCenterText"),
  };
  
  const imageParamElements = {
    "userImage1": document.getElementById("userImage1"),
    "userImage2": document.getElementById("userImage2"),
    "userRank1": document.getElementById("userRank1"),
    "userRank2": document.getElementById("userRank2"),
    "bgImg": document.getElementById("bgImg"),
  };
  
  const imageParams = {
    "userImage1": null,
    "userImage2": null,
    "userRank1": null,
    "userRank2": null,
    "bgImg": null,
  }
  
  var chData;
  
  async function renderThumbnail(params) {
    const thumbnail = await generateThumbnail(params.data, params.imageData, params.textData);
    outputElement.appendChild(thumbnail);
  }
  
  async function autoFill() {
    // get data
    const data = await getData(leftUserInput.value, rightUserInput.value);
    // get parameters
    const params = await createParameters(data);
    
    // load text data into inputs
    for (let textProperty in params.textData) {
      paramElements[textProperty].value = params.textData[textProperty];
    }
    
    // load image data into imageParams
    for (let imageProperty in params.imageData) {
      imageParams[imageProperty] = params.imageData[imageProperty];
    }
    
    chData = data;
  }
  
  async function render() {
    // get text data
    const textData = {};
    for (let textProperty in paramElements) {
      textData[textProperty] = paramElements[textProperty].value;
    }
    
    // get image data
    const imageData = {};
    for (let imageProperty in imageParamElements) {
      const element = imageParamElements[imageProperty];
      if (element.files.length !== 0) {
        // if the user selected an image
        console.log("image loading");
        imageData[imageProperty] = await readFile(element.files[0]);
        console.log("image loaded");
      } else {
        imageData[imageProperty] = imageParams[imageProperty];
      }
    }
    
    const params = {
      "data": chData,
      "textData": textData,
      "imageData": imageData,
    }
    
    renderThumbnail(params);
  }
  
  autofillRenderButton.addEventListener("click", () => {
    autoFill().then(() => {
      render();
    });
  });
  
  autofillButton.addEventListener("click", () => {
    autoFill();
  });
  
  renderButton.addEventListener("click", () => {
    render();
  });
}

document.addEventListener("DOMContentLoaded", main);