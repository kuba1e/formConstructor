class TextInput extends Input{
  constructor({inputType,label, id, minLength,maxLength, placeholder}){
    super(inputType, label, id, placeholder)
    this.maxLength = maxLength
    this.minLength = minLength
  }

  createTextInput(){
    super.createInput()
    this.input.setAttribute('maxlength', `${this.maxLength}`)
    this.input.setAttribute('minlength', `${this.minLength}`)
    this.input.classList.add('form-control')
    this.input.classList.add('form-control-lg')
  }

}