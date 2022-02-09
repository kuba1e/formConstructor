class NumberInput extends Input{
  constructor({inputType, label, id, value, step, max, min, placeholder}){
    super(inputType, label, id, placeholder)
    this.value = value;
    this.step = step; 
    this.maxValue = max;
    this.minValue = min;
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