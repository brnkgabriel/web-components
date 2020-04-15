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
    
    
    /* SWITCH */
    .pure-material-switch {
      z-index: 0;
      position: relative;
      display: inline-block;
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
      font-family: var(--font);
      font-size: 16px;
      line-height: 1.5;
    }
    
    /* input */
    .pure-material-switch > input {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      z-index: -1;
      position: absolute;
      right: 6px;
      top: -8px;
      display: block;
      margin: 0;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
      outline: none;
      opacity: 0;
      transform: scale(1);
      pointer-events: none;
      transition: opacity 0.3s 0.1s, transform 0.2s 0.1s
    }
    
    /* span */
    .pure-material-switch > span {
      display: inline-block;
      width: 100%;
      cursor: pointer;
      text-transform: capitalize;
      font-weight: bold;
    }
    
    /* track */ 
    .pure-material-switch > span::before {
      content: '';
      float: right;
      margin: 5px 0 5px 10px;
      border-radius: 7px;
      width: 36px;
      height: 14px;
      background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
      transition: background-color 0.2s, opacity 0.2s;
    }
    
    /* thumb */
    .pure-material-switch > span::after {
      content: '';
      position: absolute;
      top: 2px;
      right: 16px;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      transition: background-color 0.2s, transform 0.2s;
    }
    
    /* checked */
    .pure-material-switch > input:checked {
      right: -10px;
      background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    }
    
    .pure-material-switch > input:checked + span::before {
      background-color: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.6);
    }
    
    .pure-material-switch > input:checked + span::after {
      background-color: rgba(var(--pure-material-primary-rgb, 33, 150, 243));
      transform: translateX(16px)
    }
    
    /* hover, focus */
    .pure-material-switch:hover > input {
      opacity: 0.04
    }
    
    .pure-material-switch > input:focus {
      opacity: 0.12;
    }
    
    .pure-material-switch:hover > input:focus {
      opacity: 0.16;
    }
    
    /* active */
    .pure-material-switch > input:active {
      opacity: 1;
      transform: scale(0);
      transition: transform 0s, opacity 0s;
    }
    
    .pure-material-switch > input:active + span::before {
      background-color: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.6);
    }
    
    .pure-material-switch > input:checked:active + span::before {
      background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38)
    }
    
    /* disabled */
    .pure-material-switch > input:disabled {
      opacity: 0;
    }
    
    .pure-material-switch > input:disabled + span {
      color: rgb(var(--pure-material-onsurface-rgb, 0, 0, 0));
      opacity: 0.38;
      cursor: default
    }
    
    .pure-material-switch > input:disabled + span::before {
      background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38)
    }
    
    .pure-material-switch > input:checked:disabled + span::before {
      background-color: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.6)
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

class MSwitch extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.selected = []
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
    var list = [this.on, this.off]
    Tag.appendMany2One(
      list.map((item, idx) => this.radioBtn(item, idx)),
      radios
    )
    return radios
  }

  radioBtn(item, idx) {
    var self = this, cls = '';
    (idx === 0) && (cls = 'checked')
    var prop = {
      label:  ['label', { class: `pure-material-switch ${this.stack}` }, '', ''],
      input:  ['input', { type: "checkbox", name: 'group-enabled', class: cls }, '', ''],
      span:   ['span', '', '', item]
    }
    var label = new Tag(prop['label']).get()
    var input = new Tag(prop['input']).get()
    var span  = new Tag(prop['span']).get()

    input.addEventListener('click', () => {
      self.selection = item
      this.toggleChecked(input)
    })

    Tag.appendMany2One([input, span], label)
    return label
  }

  toggleChecked(toActivate) {
    var fn = toActivate.classList;
    fn.contains('checked') ? fn.remove('checked') : fn.add('checked')
  }

  static get observedAttributes() {
    return ['selected', 'on', 'off']
  }

  set selection(value) {
    var idx = this.selected.indexOf(value)
    idx !== -1 ? this.selected.splice(idx, 1) : this.selected.push(value)
    this.setAttribute('selected', JSON.stringify(this.selected))
  }

  get on() {
    return this.getAttribute('on')
  }

  get off() {
    return this.getAttribute('off')
  }
}

customElements.define('m-switch', MSwitch)