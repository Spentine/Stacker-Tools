import { inputs, configs } from "./data.js";

function main() {
  const settingRoomCategory = document.getElementById("settingRoomCategory");
  const settingMatchCategory = document.getElementById("settingMatchCategory");
  const settingGameCategory = document.getElementById("settingGameCategory");
  const settingMovementCategory = document.getElementById("settingMovementCategory");
  const settingGravityCategory = document.getElementById("settingGravityCategory");
  
  const importText = document.getElementById("importText");
  const importButton = document.getElementById("importButton");
  const outputCode = document.getElementById("outputCode");
  const exportButton = document.getElementById("exportButton");
  
  const selectAllButton = document.getElementById("selectAllButton");
  const selectAllExceptRoomButton = document.getElementById("selectAllExceptRoomButton");
  const deselectAllButton = document.getElementById("deselectAllButton");
  
  const selectOnChange = document.getElementById("selectOnChange");
  
  const copyButton = document.getElementById("copyButton");
  const clearButton = document.getElementById("clearButton");
  
  const createInput = (data) => {
    data ??= {};
    
    if (data.type === "checkbox") {
      const containerElement = document.createElement("div");
      containerElement.classList.add("mainCheckbox-container");
      // containerElement.classList.add("setting-input");
      containerElement.setAttribute("id", `${data.id}-container`);
      
      const inputElement = document.createElement("input");
      inputElement.classList.add("mainCheckbox-checkbox");
      inputElement.setAttribute("type", "checkbox");
      inputElement.setAttribute("id", data.id);
      if (data.value) inputElement.setAttribute("checked", data.value);
      
      const labelElement = document.createElement("label");
      labelElement.classList.add("mainCheckbox-button");
      labelElement.setAttribute("for", data.id);
      
      containerElement.appendChild(inputElement);
      containerElement.appendChild(labelElement);
      
      return {
        element: containerElement,
        value: inputElement,
      };
    } else if (data.type === "select") {
      const inputElement = document.createElement("select");
      inputElement.classList.add("setting-input");
      inputElement.setAttribute("id", data.id);
      
      for (const option of data.options) {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", option.value);
        optionElement.textContent = option.label;
        inputElement.appendChild(optionElement);
      }
      
      if (data.value) inputElement.setAttribute("value", data.value);
      
      return {
        element: inputElement,
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
    
    // enable checkbox
    
    const enableCheckboxContainer = document.createElement("div");
    enableCheckboxContainer.classList.add("enableCheckbox-container");
    
    const enableCheckbox = document.createElement("input");
    enableCheckbox.classList.add("enableCheckbox-checkbox");
    enableCheckbox.setAttribute("type", "checkbox");
    enableCheckbox.setAttribute("id", `setting-${elementId}-enable`);
    
    const enableLabel = document.createElement("label");
    enableLabel.classList.add("enableCheckbox-button");
    enableLabel.setAttribute("for", `setting-${elementId}-enable`);
    
    enableCheckboxContainer.appendChild(enableCheckbox);
    enableCheckboxContainer.appendChild(enableLabel);
    
    // label
    
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", elementId);
    labelElement.textContent = label;
    
    // input
    
    data ??= {};
    data.id = elementId;
    
    const resultElements = createInput(data);
    const inputElement = resultElements.element;
    const valueElement = resultElements.value;
    
    containerElement.appendChild(enableCheckboxContainer);
    containerElement.appendChild(labelElement);
    containerElement.appendChild(inputElement);
    
    return {
      containerElement: containerElement,
      valueElement: valueElement,
      enableCheckbox: enableCheckbox,
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
      const enableCheckbox = settingElements.enableCheckbox;
      const type = settingElements.type;
      
      elementMap[input.id] = {
        settingElement,
        valueElement,
        enableCheckbox,
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
      
      commandName = commandName.trim();
      
      if (commandName === "") continue;
      // else if (commandName === "match.modename") {
      //   commandName = "options.presets";
      // }
      // else if (commandName === "options.presets") continue;
      
      const elements = elementsList[commandName];
      
      if (!elements) {
        console.warn(`Unknown command: ${commandName}`);
        continue;
      }
      
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
  };
  
  const processSettingCode = (code, elementsList, presetsEnabled) => {
    code = parseSettingCode(code, elementsList);
    for (const command of code) {
      if (command.id === "options.presets") {
        if (presetsEnabled) {
          importSettingCode(configs[command.value], elementsList, false);
        } else {
          // do nothing, this is a preset name
          continue;
        }
      }
      const elements = elementsList[command.id];
      if (elements.type === "checkbox") {
        elements.valueElement.checked = command.value;
      } else {
        elements.valueElement.value = command.value;
      }
    }
    return code;
  };
  
  const exportSettingCode = (elementsList) => {
    const commands = [];
    
    // filter elements for enabled checkboxes
    const filteredElements = {};
    const keys = Object.keys(elementsList);
    for (const id of keys) {
      if (id === "options.presets") continue; // skip this one
      const element = elementsList[id];
      if (element.enableCheckbox.checked) {
        filteredElements[id] = element;
      }
    }
    
    // create commands
    const filteredKeys = Object.keys(filteredElements);
    for (const id of filteredKeys) {
      const element = filteredElements[id];
      const type = element.type;
      const value = (type === "checkbox")
        ? element.valueElement.checked
        : element.valueElement.value;
      
      if (type === "checkbox") {
        commands.push(`${id}=${value ? "1" : "0"}`);
      } else {
        // escape semicolon and equals sign
        const escapedValue = value.replaceAll(";", "%SEMI%").replaceAll("=", "%EQUALS%");
        commands.push(`${id}=${escapedValue}`);
      }
    }
    
    return "/set " + commands.join(";");
  };
  
  const importSettingCode = (code, elementsList, presetsEnabled) => {
    // remove /set only from the beginning
    if (code.startsWith("/set ")) {
      code = code.substring(5);
    }
    const selectOnChangeChecked = selectOnChange.checked;
    const changed = processSettingCode(code, elementsList, presetsEnabled);
    for (const command of changed) {
      const elements = elementsList[command.id];
      if (selectOnChangeChecked) {
        elements.enableCheckbox.checked = true;
      }
    }
  };
  
  const allExceptRoom = {
    ...addToCategory(settingMatchCategory, inputs.settingMatchCategory),
    ...addToCategory(settingGameCategory, inputs.settingGameCategory),
    ...addToCategory(settingMovementCategory, inputs.settingMovementCategory),
    ...addToCategory(settingGravityCategory, inputs.settingGravityCategory),
  };
  
  const roomElements = addToCategory(settingRoomCategory, inputs.settingRoomCategory);
  
  const allElements = {
    ...roomElements,
    ...allExceptRoom,
  };
  
  console.log(allElements);
  
  processSettingCode(configs.startup, allElements, false);
  
  const ids = Object.keys(allElements);
  for (const id of ids) {
    const element = allElements[id];
    element.valueElement.addEventListener("change", (e) => {
      if (selectOnChange.checked) {
        element.enableCheckbox.checked = true;
      }
    });
  }
  
  exportButton.addEventListener("click", () => {
    const code = exportSettingCode(allElements);
    outputCode.textContent = code;
  });
  
  importButton.addEventListener("click", () => {
    const code = importText.value;
    importSettingCode(code, allElements, true);
  });
  
  allElements["options.presets"].valueElement.addEventListener("change", (e) => {
    const value = e.target.value;
    importSettingCode(configs[value], allElements, false);
  });
  
  selectAllButton.addEventListener("click", () => {
    const ids = Object.keys(allElements);
    for (const id of ids) {
      const element = allElements[id];
      element.enableCheckbox.checked = true;
    }
  });
  
  deselectAllButton.addEventListener("click", () => {
    const ids = Object.keys(allElements);
    for (const id of ids) {
      const element = allElements[id];
      element.enableCheckbox.checked = false;
    }
  });
  
  selectAllExceptRoomButton.addEventListener("click", () => {
    const ids = Object.keys(allExceptRoom);
    for (const id of ids) {
      const element = allExceptRoom[id];
      element.enableCheckbox.checked = true;
    }
    
    const roomIds = Object.keys(roomElements);
    for (const id of roomIds) {
      const element = roomElements[id];
      element.enableCheckbox.checked = false;
    }
  });
  
  copyButton.addEventListener("click", () => {
    const code = outputCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
      alert("Copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  });
  
  clearButton.addEventListener("click", () => {
    outputCode.textContent = "";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}