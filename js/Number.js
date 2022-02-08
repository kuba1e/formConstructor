class Number extends Input{
  constructor({inputType, label, id, value, step, maxValue, minValue, placeholder}){
    super(inputType, label, id, placeholder)
    this.value = value;
    this.step = step; 
    this.maxValue = maxValue;
    this.minValue = minValue;
  }

  createNumberInput(){
    super.createInput()
    this.input.setAttribute('value', `${this.value}`)
    this.input.setAttribute('step', `${this.step}`)
    this.input.setAttribute('max',`${this.maxValue}`)
    this.input.setAttribute('min',`${this.minValue}`)
    this.input.classList.add('form-control')
    this.input.classList.add('form-control-lg')
  }

}