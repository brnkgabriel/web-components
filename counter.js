class MyCounter extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  get count() {
    return this.getAttribute('count')
  }

  set count(value) {
    this.setAttribute('count', value)
  }

  static get observedAttributes() {
    return ['count']
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if (prop === 'count') {
      this.render()
      var btn = this.shadow.querySelector('#btn')
      btn.addEventListener('click', this.increment.bind(this))
    }
  }

  increment() {
    this.count++
  }

  connectedCallback() {
    this.render()
    var btn = this.shadow.querySelector('#btn')
    btn.addEventListener('click', this.increment.bind(this))
  }

  render() {
    this.shadow.innerHTML = `
      <h1>Counter</h1>
      ${this.count}
      <button id='btn'>Increment</button>
    `
  }
}

customElements.define('my-counter', MyCounter)