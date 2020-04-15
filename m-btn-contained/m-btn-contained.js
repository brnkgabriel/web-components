// R-Graph Notes
// - the attributes must be in single quotes
//   so that the list attribute can accomodate JSON in double quotes
//   example: <m-select value='0' list='[{"x": "twenty"}]'></m-select>
// - must set the global --font css variable so the select list takes
//   the font of the parent

var styles = document.createElement('template')

var styleArray = [
  `
    <style>
    
    .checkboxes > label,
    .radios > label {
      display: block;
      margin: 16px 0;
    }
    
    .switches > label {
      width: 120px;
    }
    
    .switches > label:first-child {
      margin: 0 0 16px;
    }
    
    .textfields > label {
      margin: 16px 0
    }
    
    .checkboxes > label:first-child,
    .radios > label:first-child,
    .textfields > label:first-child {
      margin: 0 0 16px;
    }
    
    .checkboxes > label:last-child,
    .radios > label:last-child,
    .textfields > label:last-child {
      margin: 0 0 16px;
    }
    
    .progresses > progress:first-child {
      margin: 0 0 16px;
    }
    
    .progresses > progress:last-child {
      margin: 16px 0 0;
    }
    
    
    a {
      font-size: 18px;
      color: rgb(var(--pure-material-primary-rgb));
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline
    }
    
    /* PURE MATERIAL BUTTON CONTAINED */
    .pure-material-button-contained {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      border: none;
      border-radius: 4px;
      padding: 0 16px;
      min-width: 64px;
      height: 36px;
      vertical-align: middle;
      text-align: center;
      text-overflow: ellipsis;
      text-transform: uppercase;
      color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
      background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.12);
      font-family: var(--font);
      font-size: 14px;
      font-weight: bold;
      line-height: 36px;
      overflow: hidden;
      outline: none;
      cursor: pointer;
      transition: box-shadow 0.2s;
    }
    
    .pure-material-button-contained::-moz-focus-inner {
      border: none;
    }
    
    /* overlay */
    .pure-material-button-contained::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    /* ripple */
    .pure-material-button-contained::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      padding: 50%;
      width: 32px;
      height: 32px;
      background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
      transition: opacity 1s, transform 0.5s;
    }
    
    /* hover, focus */
    .pure-material-button-contained:hover,
    .pure-material-button-contained:focus {
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)
    }
    
    .pure-material-button-contained:hover::before {
      opacity: 0.08;
    }
    
    .pure-material-button-contained:focus::before {
      opacity: 0.24
    }
    
    .pure-material-button-contained:hover:focus::before {
      opacity: 0.3
    }
    
    /* active */
    .pure-material-button-contained:active {
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)
    }
    
    .pure-material-button-contained:active::after {
      opacity: 0.32;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0s;
    }
    
    /* disabled */
    .pure-material-button-contained:disabled {
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
      background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.12);
      box-shadow: none;
      cursor: initial;
    }
    
    .pure-material-button-contained:disabled::before {
      opacity: 0;
    }
    
    .pure-material-button-contained:disabled::after {
      opacity: 0;
    }
    
    </style>
  `
]

styles.innerHTML = styleArray[0]

class Tag {
  constructor(properties) {
    this.tag = properties[0]
    this.attributes = properties[1]
    this.styles = properties[2]
    this.textContent = properties[3]
    this.element = null
  }

  get() {
    return this.create()
      .setAttributes()
      .setStyle()
      .setHTML()
      .getElement()
  }

  create() {
    this.element = document.createElement(this.tag)
    return this
  }

  assignAttribute(object) {
    var keys = Object.keys(object)
    keys.forEach(key => {
      var value = object[key]
      this.element.setAttribute(key, value)
    })
  }

  setAttributes() {
    this.assignAttribute(this.attributes)
    return this
  }

  setStyle() {
    this.assignAttribute(this.styles)
    return this
  }

  setHTML() {
    this.element.innerHTML = this.textContent
    return this
  }

  getElement() {
    return this.element
  }

  static appendMany2One(many, one) {
    many.forEach(each => one.appendChild(each))
  }

}

class MBtnContained extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(styles.content)

    var prop = {
      btn: ['button', { class: 'pure-material-button-contained' }, '', this.text]
    }
    this.shadowRoot.appendChild(new Tag(prop['btn']).get())
    // we append child to this.shadowRoot here
  }


  static get observedAttributes() {
    return ['text']
  }

  get text() {
    return this.getAttribute('text')
  }

  set text(value) {
    this.setAttribute('text', value)
  }

  connectedCallback() {
    // when Component is added to the page
    // listeners on the component automatically go here
  }

  get list() {
    return JSON.parse(this.getAttribute('list'))
  }

  set value(val) {
    this.setAttribute('value', val)
  }

  disconnectedCallback() {
    // when Component is removed from the page
    window.removeEventListener('selected', e => value = e.detail)
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

customElements.define('m-btn-contained', MBtnContained)