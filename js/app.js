"use strict";
document.addEventListener("DOMContentLoaded", (event) => {
  const formContainer = document.querySelector(".form-container");
  const inputsContainer = document.querySelector(".inputs-container");
  const createdFormContainer = document.querySelector(
    ".created-form-container"
  );
  const addIputsForm = document.querySelector(".form");

  formContainer.addEventListener("click", (event) => {
    const { target } = event;
    if (target.closest(".add-input-btn")) {
      inputsContainer.insertAdjacentHTML("beforeend", renderNewInputs());
      return;
    }
    if (target.closest(".remove-input-btn")) {
      if (checkInputAmount() > 1) {
        target.closest(".input-container").remove();
      }
      return;
    }
  });

  addIputsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { target } = event;
    const elementsInfoArray = getArrayInfoObjects(target);
    const uniqueValuesArray = getUniqueArray(elementsInfoArray);
    if (doValidation(target, uniqueValuesArray)) {
      clearCreatedFormContainer(createdFormContainer);
      const newForm = new Form(createdFormContainer);
      const inputsFragment = getNewFormMarkup(elementsInfoArray);
      newForm.createNewForm();
      newForm.inputsContainer.prepend(inputsFragment);
      newForm.appendNewForm();
      newForm.createCopyHandler();
    }
  });

  formContainer.addEventListener("change", (event) => {
    event.stopImmediatePropagation();
    const { target } = event;
    const inputsInfoContainer = target
      .closest(".input-container")
      .querySelector(".inputs-info-container");
    switch (target.value) {
      case "text":
        renderInfoInputs(inputsInfoContainer, getTextInputMarkup);
        break;
      case "number":
        renderInfoInputs(inputsInfoContainer, getNumberInputMarkup);
        break;
      case "checkbox":
        renderInfoInputs(inputsInfoContainer, getCheckBoxInputMarkup);
        break;
    }
  });

  const getTextInputMarkup = () => {
    return `
  <input
  class="form-control req"
  type="text"
  placeholder="Label for input"
  aria-label="Disabled input example"
  name="label"
  required
/>
<input
  class="form-control req"
  type="text"
  placeholder="Id for label"
  aria-label="Disabled input example"
  name="id"
  required
/>
<input
  class="form-control req"
  type="text"
  placeholder="Min text length"
  aria-label="Disabled input example"
  name="minLength"
  required
/>
<input
class="form-control req"
type="text"
  placeholder="Max text length"
  aria-label="Disabled input example"
  name="maxLength"
  required
/>
<input
class="form-control req"
type="text"
  placeholder="Placeholder for input"
  aria-label="Disabled input example"
  name="placeholder"
  required
/>
  `;
  };

  const getNumberInputMarkup = () => {
    return `
  <input
  class="form-control req"
  type="text"
  placeholder="Label for input"
  aria-label="Disabled input example"
  name="label"
  required
/>
<input
class="form-control req"
type="text"
  placeholder="Id for label"
  aria-label="Disabled input example"
  name="id"
  required
/>
<input
class="form-control req"
type="text"
  placeholder="Start value"
  aria-label="Disabled input example"
  name="value"
  required
/>
<input
class="form-control req"
type="text"
  placeholder="Step"
  aria-label="Disabled input example"
  name="step"
  required
/>
<input
class="form-control req"
type="text"
  placeholder="Min value"
  aria-label="Disabled input example"
  name="min"
  required
/>
<input
class="form-control req"
type="text"
  placeholder="Max value"
  aria-label="Disabled input example"
  name="max"
  required
/>
<input
class="form-control req"
type="text"
  placeholder="Placeholder for input"
  aria-label="Disabled input example"
  name="placeholder"
  required
/>
  `;
  };

  const getCheckBoxInputMarkup = () => {
    return `
  <input
  class="form-control req"
  type="text"
  placeholder="Label for input"
  aria-label="Disabled input example"
  name="label"
  required
/>
<input
class="form-control req"
type="text"
  placeholder="Id for label"
  aria-label="Disabled input example"
  name="id"
  required
/>
<input
class="form-control req"
type="text"
  placeholder="Value"
  aria-label="Disabled input example"
  name="value"
  required
/>
  `;
  };

  const renderInfoInputs = (container, markup) => {
    container.innerHTML = "";
    container.insertAdjacentHTML("beforeend", markup());
  };

  const renderNewInputs = () => {
    return `
    <div class="input-container row">
    <div class="input-add-form col-10">
      <select
        class="form-select req"
        aria-label="Default select example"
        name="inputType"
        required
      >
        <option selected value="">Choose input</option>
        <option value="number">Number input</option>
        <option value="text">Text input</option>
        <option value="checkbox">Checkbox input</option>
      </select>
    </div>
    <div class="buttons-container col-2">
      <div  class="add-new-input-markup-btn">
        <button type="button" class="btn btn-success add-input-btn">
          <i class="far fa-plus-square"></i>
        </button>
      </div>
      <div   class="remove-input-markup-btn">
        <button type="button" class="btn btn-danger remove-input-btn">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
    <div class="inputs-info-container"></div>
  </div>
    `;
  };

  const checkInputAmount = () => {
    return [...document.querySelectorAll(".input-container")].length;
  };

  const getArrayInfoObjects = (targetForm) => {
    const objectsArray = [];
    const formData = [...targetForm.querySelectorAll(".req")].reduce(
      (acc, element) => {
        acc.push([element.name, element.value.trim()]);
        return acc;
      },
      []
    );

    const preparedArrayForCreatingObjects = getFormDataArrays(formData);
    preparedArrayForCreatingObjects.forEach((element) => {
      objectsArray.push(Object.fromEntries(element));
    });
    return objectsArray;
  };

  const getFormDataArrays = (formInfoArray) => {
    const indexArray = [];
    const devidedArray = [];
    formInfoArray.forEach((element, index) => {
      if (element[0] === "inputType") {
        indexArray.push(index);
      }
    });

    for (let i = 0; i < indexArray.length; i++) {
      if (!indexArray[i + 1]) {
        devidedArray.push(formInfoArray.slice(indexArray[i]));
      } else {
        devidedArray.push(
          formInfoArray.slice(indexArray[i], indexArray[i + 1])
        );
      }
    }
    return devidedArray;
  };

  const getNewFormMarkup = (infoArray) => {
    const fragment = document.createDocumentFragment();
    infoArray.forEach((element) => {
      switch (element.inputType) {
        case "number":
          const numberInput = new NumberInput(element);
          numberInput.createNumberInput();
          numberInput.createLabel();
          fragment.append(numberInput.input, numberInput.labelElement);
          break;
        case "text":
          const textInput = new TextInput(element);
          textInput.createTextInput();
          textInput.createLabel();
          fragment.append(textInput.input, textInput.labelElement);
          break;
        case "checkbox":
          const checkboxInput = new CheckBox(element);
          checkboxInput.createCheckBoxLabel();
          checkboxInput.createCheckBox();
          fragment.append(checkboxInput.checkboxInputContainer);
          break;
      }
    });
    return fragment;
  };

  const clearCreatedFormContainer = (formContainer) => {
    formContainer.innerHTML = "";
  };

  const getUniqueArray = (elementsInfoArray) => {
    return elementsInfoArray.reduce((acc, element) => {
      acc.push(element.id);
      return acc;
    }, []);
  };
});
