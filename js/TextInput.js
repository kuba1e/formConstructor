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

  set minLength(minLength){
    const minLengthNumber = +minLength
    if(minLengthNumber >= 0){
      this._minLength = minLengthNumber
    }
  }

  get minLength(){
    return this._minLength
  }


  set maxLength(maxLength){
    const maxLengthNumber = +maxLength
    if(maxLengthNumber > 20){
      this._maxLength = maxLengthNumber
      return
    }
  }

  get maxLength(){
    return this._maxLength
  }


}