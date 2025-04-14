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
  
  const outputInfo = document.getElementById("outputInfo");
  
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
      
      value = value.replaceAll("%SEMI%", ";").replaceAll("%EQUALS%", "=").trim();
      
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
    
    // determine if any configs are compatible
    const compatibleConfigs = {};
    const configKeys = Object.keys(configs);
    const codeBitmap = generateBitmap(filteredElements, ids);
    console.log(codeBitmap);
    for (const key of configKeys) {
      compatibleConfigs[key] = determineConfigCompatibility(
        bitmaps[key], codeBitmap
      );
    }
    compatibleConfigs.startup = false; // technically not compatible
    console.log(compatibleConfigs);
    
    // get all values
    const commands = [];
    const filteredKeys = Object.keys(filteredElements);
    for (const id of filteredKeys) {
      const element = filteredElements[id];
      const type = element.type;
      
      const value = (type === "checkbox")
        ? element.valueElement.checked
        : element.valueElement.value;
      
      commands.push({
        id, value
      });
    }
    
    // function to convert commands to array of strings
    const convertToArrayStrings = function (commands) {
      const commandStrings = [];
      for (const command of commands) {
        const id = command.id;
        const value = command.value;
        if (typeof value === "boolean") {
          commandStrings.push(`${id}=${value ? "1" : "0"}`);
        } else {
          commandStrings.push(`${id}=${value
            .replaceAll(";", "%SEMI%")
            .replaceAll("=", "%EQUALS%")
          }`);
        }
      }
      return commandStrings;
    }
    
    // create list of all possible command strings
    const alternates = [];
    alternates.push(convertToArrayStrings(commands));
    
    for (const config of Object.keys(compatibleConfigs)) {
      if (!compatibleConfigs[config]) continue;
      // filter for differing values
      const configData = parsed[config];
      const configSet = new Set(configData.map((c) => c.id));
      const differingCommands = commands.filter((command) => {
        if (!configSet.has(command.id)) return true;
        const configCommand = configData.find((c) => c.id === command.id);
        if (configCommand.value !== command.value) {
          return true;
        }
        return false;
      });
      // console.log(differingCommands);
      differingCommands.splice(0, 0, {
        id: "options.presets",
        value: config,
      });
      alternates.push(convertToArrayStrings(differingCommands));
    }
    
    const convertToString = (commands) => {
      return commands.join(";");
    }
    
    // choose the shortest one
    const stringifiedCommands = alternates.map((commands) => {
      return convertToString(commands);
    });
    let shortestIndex = -1;
    let shortestLength = Infinity;
    for (let i = 0; i < stringifiedCommands.length; i++) {
      const length = stringifiedCommands[i].length;
      if (length < shortestLength) {
        shortestLength = length;
        shortestIndex = i;
      }
    }
    const shortestString = "/set " + stringifiedCommands[shortestIndex];
    
    if (shortestLength === 0) {
      return "";
    } else if (shortestLength > 512) {
      // split into multiple /set commands
      const consecutiveCommands = [];
      const commands = alternates[shortestIndex];
      console.log(commands);
      
      let currentString = "/set ";
      for (let i=0; i<commands.length; i++) {
        const command = commands[i];
        if ((currentString.length + command.length) > 512) {
          consecutiveCommands.push(currentString.substring(0, currentString.length - 1));
          currentString = "/set ";
        } else {
          currentString += command + ";";
        }
      }
      consecutiveCommands.push(currentString.substring(0, currentString.length - 1));
      
      return consecutiveCommands.join("\n");
    }
    
    return shortestString;
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
  
  const generateBitmap = (code, ids) => {
    const allCodeIds = ((Array.isArray(code))
      ? new Set(code.map((c) => c.id))
      : new Set(Object.keys(code))
    );
    // add options.presets to the bitmap to ignore it
    allCodeIds.add("options.presets");
    let bitmap = 0n;
    for (const option of ids) {
      bitmap <<= 1n;
      if (allCodeIds.has(option)) {
        bitmap |= 1n;
      }
    }
    return bitmap;
  };
  
  const determineConfigCompatibility = (configBitmap, codeBitmap) => {
    // for each 1 in the configBitmap, check if the codeBitmap has a 1 in the same position
    /*
      config, code | result
      1 1 | 0
      1 0 | 1
      0 1 | 0
      0 0 | 0
    */
    const allSet = 0x3ffffffffffffffffffn; // all bits set to 1
    // consider also using bitmaps.startup
    const notCodeBitmap = allSet - codeBitmap;
    const result = configBitmap & notCodeBitmap;
    console.log(result);
    return result === 0n; // if all bits are 0, then the config is compatible
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
  
  const ids = Object.keys(allElements);
  
  console.log(allElements);
  
  processSettingCode(configs.startup, allElements, false);
  
  const parsed = {};
  const bitmaps = {};
  
  {
    const configKeys = Object.keys(configs);
    for (const key of configKeys) {
      const config = configs[key];
      const parsedConfig = parseSettingCode(config, allElements, false);
      parsed[key] = parsedConfig;
    }
    
    for (const key of configKeys) {
      const parsedConfig = parsed[key];
      const bitmap = generateBitmap(parsedConfig, ids);
      bitmaps[key] = bitmap;
    }
  }
  
  console.log(parsed);
  console.log(bitmaps);
  
  {
    for (const id of ids) {
      const element = allElements[id];
      element.valueElement.addEventListener("change", (e) => {
        if (selectOnChange.checked) {
          element.enableCheckbox.checked = true;
        }
      });
    }
  }
  
  exportButton.addEventListener("click", () => {
    const code = exportSettingCode(allElements);
    outputCode.textContent = code;
    
    const multipleCommands = code.includes("\n");
    if (multipleCommands) {
      outputCode.innerHTML = outputCode.innerHTML.replaceAll("\n", "<br><br>");
      outputInfo.innerHTML = `Code Length: ${code.length} characters<br><br>This command contains multiple /set commands. Copy and paste them one by one.`;
    } else {
      outputInfo.innerHTML = `Code Length: ${code.length} characters`;
    }
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
    for (const id of ids) {
      const element = allElements[id];
      element.enableCheckbox.checked = true;
    }
  });
  
  deselectAllButton.addEventListener("click", () => {
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
      copyButton.textContent = "Copied!";
      
      // wait 2 seconds and change back to "Copy"
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 2000);
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