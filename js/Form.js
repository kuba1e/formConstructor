class Form {
constructor(container){
  this.container = container

}

  get container(){
    return this._container
  }

  set container (element) {
    if(element !== null){
      this._container = element;
      return
    }
    return
  }

  createNewForm(){
    const formElement = document.createElement('form')
    const copyButton = document.createElement('div')
    formElement.classList.add('col')
    formElement.classList.add('new-form-element')
    copyButton.classList.add('copy-btn')
    copyButton.textContent = 'Copy'
    formElement.insertAdjacentElement('afterbegin', copyButton)
    formElement.insertAdjacentElement('afterbegin', this.createInputsContainer())
    formElement.insertAdjacentElement('beforeend', Form.createSubmitButton())
    this.form = formElement
  }

  appendNewForm(){
    if(this.form){
      this._container.append(this.form)
    }
  }


  static copyFormHtml(){
    if(this.form !== undefined){
      return this.form.outerHTML
    }
    return
  }

  static createSubmitButton(){
    const submitButton = document.createElement('button')
    submitButton.setAttribute('type','submit')
    submitButton.classList.add('btn')
    submitButton.classList.add('btn-success')
    submitButton.textContent='Send'
    return submitButton
  }

  createInputsContainer(){
    const inputsContainer = document.createElement('div')
    inputsContainer.classList.add('inputs-container')
    this.inputsContainer = inputsContainer
    return this.inputsContainer
  }

}