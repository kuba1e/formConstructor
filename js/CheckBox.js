class CheckBox extends Input {
  constructor({inputType, value, label, id}){
    super(inputType, label, id)
    this.value = value
  }

  createCheckBox(){
    super.createInput()
    this.input.setAttribute('value', `${this.value}`)
    this.input.classList.add('form-check-input')
    const checkBoxContainer = document.createElement('div')
    checkBoxContainer.classList.add('form-check')
    checkBoxContainer.append(this.input,this.labelElement)
    this.checkboxInputContainer = checkBoxContainer

  }
  createCheckBoxLabel(){
    super.createLabel()
    this.labelElement.classList.add('form-check-label')
  }
}