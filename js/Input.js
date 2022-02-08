class Input {
  constructor( inputType, label, id, placeholder){
    this.inputType = inputType
    this.label = label
    this.placeholder = placeholder
    this.id = id
  }

  set placeholder(placeholder){
    if(placeholder){
      this._placeholder = placeholder
      console.log(this.placeholder)
    }
  }

  get placeholder(){
    return this._placeholder
  }

  createInput(){
    const input = document.createElement('input')
    input.setAttribute('type', `${this.inputType}`)
    input.setAttribute('placeholder', `${this.placeholder}`)
    input.id = this.id
    this.input = input
  }

  createLabel(){
    const labelElement = document.createElement('label')
    labelElement.setAttribute('for', `${this.id}`)
    labelElement.textContent = this.label
    this.labelElement = labelElement
  }

}