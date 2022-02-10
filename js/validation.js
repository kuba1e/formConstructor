const toastLiveExample = document.getElementById("liveToast");
const toastBody = document.querySelector(".toast-body");

const doValidation = (form, uniqueValuesArray) => {
  const inputs = [...form.querySelectorAll(".req")];
  let validationState = true;
  deleteErrorStyle(inputs);
  inputs.forEach((element) => {
    switch (element.name) {
      case "label":
        if (!isTextValid(element.value)) {
          validationState = false;
          showAnError(element);
        } else {
          showSuccess(element);
        }
        break;
      case "id":
        if (!isIdValid(element.value, uniqueValuesArray)) {
          validationState = false;
          showAnError(element);
        } else if(!isValueUnique(element.value, uniqueValuesArray)){
          validationState = false;
          showAnError(element);
          showToast(toastLiveExample, "IDs have to have unique values");
        } else {
          showSuccess(element);
        }
        break;
      case "minLength":
        if (!isLengthValid(element.value)) {
          validationState = false;
          showAnError(element);
        } else {
          showSuccess(element);
        }
        break;
      case "maxLength":
        if (!isLengthValid(element.value)) {
          validationState = false;
          showAnError(element);
        } else {
          showSuccess(element);
        }
        break;
      case "placeholder":
        if (!isTextValid(element.value)) {
          validationState = false;
          showAnError(element);
        } else {
          showSuccess(element);
        }
        break;

      case "value":
        if (!isTextValid(element.value)) {
          validationState = false;
          showAnError(element);
        } else {
          showSuccess(element);
        }
        break;

      case "step":
        if (!isLengthValid(element.value)) {
          validationState = false;
          showAnError(element);
        } else {
          showSuccess(element);
        }
        break;

      case "max":
        if (!isLengthValid(element.value)) {
          validationState = false;
          showAnError(element);
        } else {
          showSuccess(element);
        }
        break;

      case "min":
        if (!isLengthValid(element.value)) {
          validationState = false;
          showAnError(element);
        } else {
          showSuccess(element);
        }
        break;
    }
  });

  return validationState;
};

const isTextValid = (text) => {
  const regExp = /^[[a-zA-z]|\d|\s]+$/;
  return regExp.test(text);
};

const isIdValid = (id, uniqueValuesArray) => {
  const regExp = /^[a-zA-z|_|-]+$/;
  return regExp.test(id);
};

const isLengthValid = (length) => {
  const regExp = /^\d+$/;
  return regExp.test(length.trim());
};

const showAnError = (element) => {
  if (element.classList.contains("is-valid")) {
    element.classList.remove("is-valid");
  }
  element.classList.add("is-invalid");
};

const showSuccess = (element) => {
  if (element.classList.contains("is-invalid")) {
    element.classList.remove("is-invalid");
    console.log("dsf");
  }
  element.classList.add("is-valid");
};

const deleteErrorStyle = (elements) => {
  elements.forEach((element) => {
    if (element.classList.contains("is-invalid")) {
      element.classList.remove("is-invalid");
    }
  });
};

const isValueUnique = (value, array) => {
  const uniqueValue = array.filter((element) => element === value).length;
  if (uniqueValue === 1) {
    return true;
  }
};

const showToast = (toast, message) => {
  toastBody.textContent = message;
  let newToast = new bootstrap.Toast(toast);
  newToast.show();
};
