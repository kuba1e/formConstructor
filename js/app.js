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
      event.preventDefault();
      const addInputContainer = target.closest(".input-container").outerHTML;
      inputsContainer.insertAdjacentHTML("beforeend", addInputContainer);
      return;
    }
    if (target.closest(".remove-input-btn")) {
      event.preventDefault();
      if (checkInputAmount() > 1) {
        target.closest(".input-container").remove();
      }
      return;
    }
  });

  addIputsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { target } = event;
    clearCreatedFormContainer(createdFormContainer);
    const elementsInfoArray = getArrayInfoObjects(target);

    const newForm = new Form(createdFormContainer);
    const inputsFragment = getNewFormMarkup(elementsInfoArray);
    newForm.createNewForm();
    newForm.inputsContainer.prepend(inputsFragment);
    newForm.appendNewForm();
  });

  formContainer.addEventListener("change", (event) => {
    event.stopImmediatePropagation();
    const { target } = event;
    const selectValue = target.value;
    const inputsInfoContainer = target
      .closest(".input-container")
      .querySelector(".inputs-info-container");
    switch (selectValue) {
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
  class="form-control"
  type="text"
  placeholder="Label for input"
  aria-label="Disabled input example"
  name="label"
  required
/>
<input
  class="form-control"
  type="text"
  placeholder="Id for label"
  aria-label="Disabled input example"
  name="id"
  required
/>
<input
  class="form-control"
  type="text"
  placeholder="Min text length"
  aria-label="Disabled input example"
  name="minLength"
  required
/>
<input
  class="form-control"
  type="text"
  placeholder="Max text length"
  aria-label="Disabled input example"
  name="maxLength"
  required
/>
<input
  class="form-control"
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
  class="form-control"
  type="text"
  placeholder="Label for input"
  aria-label="Disabled input example"
  name="label"
  required
/>
<input
  class="form-control"
  type="text"
  placeholder="Id for label"
  aria-label="Disabled input example"
  name="id"
  required
/>
<input
  class="form-control"
  type="text"
  placeholder="Start value"
  aria-label="Disabled input example"
  name="value"
  required
/>
<input
  class="form-control"
  type="text"
  placeholder="Step"
  aria-label="Disabled input example"
  name="step"
  required
/>
<input
  class="form-control"
  type="text"
  placeholder="Min value"
  aria-label="Disabled input example"
  name="min"
  required
/>
<input
  class="form-control"
  type="text"
  placeholder="Max value"
  aria-label="Disabled input example"
  name="max"
  required
/>
<input
  class="form-control"
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
  class="form-control"
  type="text"
  placeholder="Label for input"
  aria-label="Disabled input example"
  name="label"
  required
/>
<input
  class="form-control"
  type="text"
  placeholder="Id for label"
  aria-label="Disabled input example"
  name="id"
  required
/>
<input
  class="form-control"
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

  const checkInputAmount = () => {
    return [...document.querySelectorAll(".input-container")].length;
  };

  const getArrayInfoObjects = (targetForm) => {
    const objectsArray = [];
    const formData = [...targetForm.elements].reduce((acc, element) => {
      if (element.tagName !== "BUTTON") {
        acc.push([element.name, element.value]);
        return acc;
      }
      return acc;
    }, []);

    const preparedArrayForCreatingObjects = getFormDataArrays(formData);

    console.log(preparedArrayForCreatingObjects)

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
          const numberInput = new Number(element);
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
});
