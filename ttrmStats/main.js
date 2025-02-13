import { getTtrmData } from "./ttrm.js";

function dataLog(label, data) {
  console.log(`%c${label}`,"color: #00ff00;");
  console.log(data);
}

function main() {
  console.log("Script Loaded");
  
  const fileInput = document.getElementById("fileInput");
  const processButton = document.getElementById("processButton");
  
  processButton.addEventListener("click", () => {
    dataLog("files", fileInput.files);
    
    for (let file of fileInput.files) {
      // get json from file
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const json = JSON.parse(text);
        dataLog("json", json);
        const ttrmData = getTtrmData(json);
        dataLog("ttrmData", ttrmData);
      }
      
      reader.readAsText(file);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}