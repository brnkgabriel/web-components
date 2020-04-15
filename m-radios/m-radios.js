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
    
    
    
    /* RADIO BUTTONS */
    .pure-material-radio {
      z-index: 0;
      position: relative;
      display: inline-block;
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
      font-family: var(--font);
      font-size: 16px;
      line-height: 1.5;
    }

    .pure-material-radio.horizontal {
      display: inline-block;
      vertical-align: middle;
      margin: 5px !important;
    }
    
    /* input */
    .pure-material-radio > input {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      z-index: -1;
      position: absolute;
      left: -10px;
      top: -8px;
      display: block;
      margin: 0;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
      outline: none;
      opacity: 0;
      transform: scale(1);
      pointer-events: none;
      transition: opacity 0.3s, transform 0.2s;
    }
    
    /* span */
    .pure-material-radio > span {
      display: inline-block;
      width: 100%;
      cursor: pointer
    }
    
    /* circle */ 
    .pure-material-radio > span::before {
      content: '';
      display: inline-block;
      box-sizing: border-box;
      margin: 2px 10px 2px 0;
      border: solid 2px;
      border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
      border-radius: 50%;
      width: 20px;
      height: 20px;
      vertical-align: top;
      transition: border-color 0.2s
    }
    
    /* check */
    .pure-material-radio > span::after {
      content: '';
      display: block;
      position: absolute;
      top: 2px;
      left: 0;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
      transform: translate(5px, 5px) scale(0);
      transition: transform 0.2s;
    }
    
    /* checked */
    .pure-material-radio > input.checked {
      background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    }
    
    .pure-material-radio > input.checked + span::before {
      border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    }
    
    .pure-material-radio > input.checked + span::after {
      transform: translate(5px, 5px) scale(1)
    }
    
    /* hover, focus */
    .pure-material-radio:hover > input {
      opacity: 0.04;
    }
    
    .pure-material-radio > input:focus {
      opacity: 0.12
    }
    
    .pure-material-radio:hover > input:focus {
      opacity: 0.16;
    }
    
    /* active */
    .pure-material-radio > input:active {
      opacity: 1;
      transform: scale(0);
      transition: transform 0s, opacity 0s;
    }
    
    .pure-material-radio > input:active + span::before {
      border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    }
    
    /* disabled */
    .pure-material-radio > input:disabled {
      opacity: 0;
    }
    
    .pure-material-radio > input:disabled + span {
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
      cursor: initial
    }
    
    .pure-material-radio > input:disabled + span::before {
      border-color: currentColor
    }
    
    .pure-material-radio > input:disabled + span::after {
      background-color: currentColor
    }
    
    </style>
  `
]

class Tag {
  constructor(properties) {
    this.tag          = properties[0]
    this.attributes   = properties[1]
    this.styles       = properties[2]
    this.textContent  = properties[3]
    this.element      = null
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

class MRadioBtns extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    Tag.appendMany2One([this.styles(), this.html()], this.shadowRoot)
  }

  styles() {
    var styles = document.createElement('template')
    styles.innerHTML = styleArray[0]
    return styles.content
  }

  html() {
    var radios = new Tag(['div', { class: 'radios' }, '', '']).get()
    Tag.appendMany2One(
      this.list.map((item, idx) => this.radioBtn(item, idx)),
      radios
    )
    return radios
  }

  radioBtn(item, idx) {
    var self = this, cls = '';
    (idx === 0) && (cls = 'checked')
    var prop = {
      label:  ['label', { class: `pure-material-radio ${this.stack}` }, '', ''],
      input:  ['input', { type: "radio", name: 'group-enabled', class: cls }, '', ''],
      span:   ['span', '', '', item]
    }
    var label = new Tag(prop['label']).get()
    var input = new Tag(prop['input']).get()
    var span  = new Tag(prop['span']).get()

    input.addEventListener('click', () => {
      self.value = span.textContent
      this.toggleChecked(input)
    })

    Tag.appendMany2One([input, span], label)
    return label
  }

  toggleChecked(toActivate) {
    var radios = this.shadowRoot.querySelectorAll('input[type]')
    radios.forEach(radio => radio.classList.remove('checked'))
    toActivate.classList.add('checked')
  }

  static get observedAttributes() {
    return ['value', 'list', 'stack']
  }

  set value(value) {
    this.setAttribute('value', value)
  }

  get list() {
    return JSON.parse(this.getAttribute('list'))
  }

  get stack() {
    return this.getAttribute('stack')
  }
}

customElements.define('m-radio-btns', MRadioBtns)