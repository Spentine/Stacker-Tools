import { inputs, configs } from "./data.js";

function main() {
  const settingRoomCategory = document.getElementById("settingRoomCategory");
  const settingMatchCategory = document.getElementById("settingMatchCategory");
  const settingGameCategory = document.getElementById("settingGameCategory");
  const settingMovementCategory = document.getElementById("settingMovementCategory");
  const settingGravityCategory = document.getElementById("settingGravityCategory");
  
  const createInput = (data) => {
    data ??= {};
    
    if (data.type === "checkbox") {
      const containerElement = document.createElement("div");
      containerElement.classList.add("checkbox-container");
      // containerElement.classList.add("setting-input");
      containerElement.setAttribute("id", `${data.id}-container`);
      
      const inputElement = document.createElement("input");
      inputElement.classList.add("checkbox-checkbox");
      inputElement.setAttribute("type", "checkbox");
      inputElement.setAttribute("id", data.id);
      if (data.value) inputElement.setAttribute("checked", data.value);
      
      const labelElement = document.createElement("label");
      labelElement.classList.add("checkbox-button");
      labelElement.setAttribute("for", data.id);
      
      containerElement.appendChild(inputElement);
      containerElement.appendChild(labelElement);
      
      return {
        element: containerElement,
        value: inputElement,
      };
    } else {
      const inputElement = document.createElement("input");
      inputElement.classList.add("setting-input");
      
      inputElement.setAttribute("type", data.type);
      inputElement.setAttribute("id", data.id);
      if (data.placeholder) inputElement.setAttribute("placeholder", data.placeholder);
      if (data.value) inputElement.setAttribute("value", data.value);
      if (data.min) inputElement.setAttribute("min", data.min);
      if (data.max) inputElement.setAttribute("max", data.max);
      
      return {
        element: inputElement,
        value: inputElement,
      };
    }
  }
  
  const createSetting = (label, id, data) => {
    const elementId = `setting-${id}`;
    
    const containerElement = document.createElement("div");
    containerElement.classList.add("setting-pair");
    
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", elementId);
    labelElement.textContent = label;
    
    data ??= {};
    data.id = elementId;
    
    const resultElements = createInput(data);
    const inputElement = resultElements.element;
    const valueElement = resultElements.value;
    
    containerElement.appendChild(labelElement);
    containerElement.appendChild(inputElement);
    
    return {
      containerElement: containerElement,
      valueElement: valueElement,
      type: data.type,
    };
  };
  
  const addToCategory = (element, inputs) => {
    const ids = Object.keys(inputs);
    const elementMap = {};
    for (const id of ids) {
      const input = inputs[id];
      
      const settingElements = createSetting(input.label, input.id, input.data);
      const settingElement = settingElements.containerElement;
      const valueElement = settingElements.valueElement;
      const type = settingElements.type;
      
      elementMap[input.id] = {
        settingElement,
        valueElement,
        type,
      };
      element.appendChild(settingElement);
    }
    return elementMap;
  }
  
  const parseSettingCode = (code, elementsList) => {
    const result = [];
    
    // semicolon-separated list of elements
    const commands = code.split(";");
    
    for (const command of commands) {
      let [commandName, value] = command.split("=");
      
      console.log(commandName, elementsList[commandName]);
      if (commandName === "") continue;
      else if (commandName === "match.modename") {
        commandName = "options.presets";
      }
      
      const elements = elementsList[commandName];
      
      value = value.replace("%SEMI%", ";").replace("%EQUALS%", "=").trim();
      
      if (elements.type === "checkbox") {
        result.push({
          id: commandName,
          value: (
            "false" !== value.toLowerCase() &&
            "0" !== value.toLowerCase() &&
            Boolean(value)
          )
        });
      } else {
        result.push({
          id: commandName,
          value: value
        });
      }
    }
    
    return result;
  }
  
  const processSettingCode = (code, elementsList) => {
    code = parseSettingCode(code, elementsList);
    console.log(code);
    for (const command of code) {
      const elements = elementsList[command.id];
      if (elements.type === "checkbox") {
        elements.valueElement.checked = command.value;
      } else {
        elements.valueElement.value = command.value;
      }
    }
  };
  
  const allElements = {
    ...addToCategory(settingRoomCategory, inputs.settingRoomCategory),
    ...addToCategory(settingMatchCategory, inputs.settingMatchCategory),
    ...addToCategory(settingGameCategory, inputs.settingGameCategory),
    ...addToCategory(settingMovementCategory, inputs.settingMovementCategory),
    ...addToCategory(settingGravityCategory, inputs.settingGravityCategory),
  };
  
  console.log(allElements);
  
  processSettingCode(configs.default, allElements);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}