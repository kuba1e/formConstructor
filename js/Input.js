class Input {
  constructor(inputType, label, id, placeholder) {
    this.inputType = inputType;
    this.label = label;
    this.placeholder = placeholder;
    this.id = id;
  }

  set placeholder(value) {
    if (value) {
      this._placeholder = this.placeholder;
    }
    return;
  }

  get placeholder() {
    if (this._placeholder) {
      return this._placeholder;
    }
    return
  }

  createInput() {
    const input = document.createElement("input");
    input.setAttribute("type", `${this.inputType}`);
    if (this.placeholder) {
      input.setAttribute("placeholder", `${this.placeholder}`);
    }
    input.id = this.id;
    this.input = input;
  }

  createLabel() {
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", `${this.id}`);
    labelElement.textContent = this.label;
    this.labelElement = labelElement;
  }
}
