class Form {
  constructor(container) {
    this.container = container;
  }

  get container() {
    if(this._container){
      return this._container;
    }
    return
  }

  set container(element) {
    if (element !== null) {
      this._container = element;
    }
  }

  createNewForm() {
    const formMarkup = Form.getFormMarkup()
    formMarkup.insertAdjacentElement(
      "afterbegin",
      this.createInputsContainer()
    );
      if(this.container){
      this.container.append(Form.createCopyButton());
    }
    this.form = formMarkup;
  }

  appendNewForm() {
    if (this.form && this.container) {
      this.container.append(this.form);
    }
  }

  createCopyHandler() {
    this.copyBtn= document.querySelector('.copy-btn')
    this.copyBtn.addEventListener("click", this.getFormHtml());
    Form.createToastHandler()
  }

  copyFormHtml() {
    if (this.form !== undefined) {
      return this.form.outerHTML;
    }
  }

  async getFormHtml() {
    await navigator.clipboard.writeText(this.copyFormHtml());
  }

    createInputsContainer() {
    const inputsContainer = document.createElement("div");
    inputsContainer.classList.add("inputs-container");
    this.inputsContainer = inputsContainer;
    return this.inputsContainer;
  }

  static  createToastHandler=()=>{
    let toastTrigger = document.querySelector(".copy-btn");
    let toastLiveExample = document.getElementById("liveToast");
    if (toastTrigger) {
      toastTrigger.addEventListener("click", function () {
        let toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
      });
    }
  }

  static createSubmitButton() {
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.classList.add("btn");
    submitButton.classList.add("btn-primary");
    submitButton.classList.add("btn-send-form");
    submitButton.textContent = "Send";
    return submitButton;
  }

  static createCopyButton() {
    const buttonContainer = document.createElement('div')
    const copyButton = document.createElement("button");
    buttonContainer.classList.add('d-flex')
    buttonContainer.classList.add('justify-content-end')
    copyButton.id = "liveToastBtn";
    copyButton.classList.add("copy-btn");
    copyButton.classList.add('btn')
    copyButton.classList.add('btn-primary')
    copyButton.setAttribute("type", "button");
    copyButton.textContent = "Copy";
    buttonContainer.append(copyButton)
    return buttonContainer
  }

  static getFormMarkup(){
    const formElement = document.createElement("form");
    formElement.classList.add("col");
    formElement.classList.add("new-form-element");
    formElement.insertAdjacentElement("beforeend", Form.createSubmitButton());
    return formElement
  }

}
