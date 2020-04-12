// we create the template in the html file

var template = document.getElementById('my-component')

class Component extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({mode: 'open'})
    // we append child to this.shadowRoot here
  }

  static get observedAttributes() {
    return ['attribute-a', 'attribute-b']
  }

  connectedCallback() {
    // when Component is added to the page
    // listeners on the component automatically go here
  }

  disconnectedCallback() {
    // when Component is removed from the page
  }

  adoptedCallback() {
    // when Component is moved to a new page
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // when Component attribute changes
  }

  get attribute() {
    // return this.getAttribute('attribute')
  }

}

customElements.define('my-component', Component)