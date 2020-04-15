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
    
    
    /* CHECKBOX */
    .pure-material-checkbox {
      z-index: 0;
      position: relative;
      display: inline-block;
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
      font-family: var(--font);
      font-size: 16px;
      line-height: 1.5
    }
    
    .pure-material-checkbox.horizontal {
      display: inline-block;
      vertical-align: middle;
      margin: 5px !important;
    }
    
    /* input */
    .pure-material-checkbox > input {
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
      box-shadow: none;
      outline: none;
      opacity: 0;
      transform: scale(1);
      pointer-events: none;
      transition: opacity 0.3s, transform 0.2s;
    }
    
    /* span */
    .pure-material-checkbox > span {
      display: inline-block;
      width: 100%;
      cursor: pointer;
    }
    
    /* box */
    .pure-material-checkbox > span::before {
      content: '';
      display: inline-block;
      box-sizing: border-box;
      margin: 3px 11px 3px 1px;
      border: solid 2px;
      border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
      border-radius: 2px;
      width: 18px;
      height: 18px;
      vertical-align: top;
      transition: border-color 0.2s, background-color 0.2s;
    }
    
    /* checkmark */
    .pure-material-checkbox > span::after {
      content: '';
      display: block;
      position: absolute;
      top: 3px;
      left: 1px;
      width: 10px;
      height: 5px;
      border: solid 2px transparent;
      border-right: none;
      border-top: none;
      transform: translate(3px, 4px) rotate(-45deg)
    }
    
    /* checked, intermediate */
    .pure-material-checkbox > input:checked,
    .pure-material-checkbox > input:indeterminate {
      background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    }
    
    .pure-material-checkbox > input:checked + span::before,
    .pure-material-checkbox > input:indeterminate + span::before {
      border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
      background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243))
    }
    
    .pure-material-checkbox > input:checked + span::after,
    .pure-material-checkbox > input:indeterminate + span::after {
      border-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255))
    }
    
    .pure-material-checkbox > input:indeterminate + span::after {
      border-left: none;
      transform: translate(4px, 3px)
    }
    
    /* hover, focus */
    .pure-material-checkbox:hover > input {
      opacity: 0.04;
    }
    
    .pure-material-checkbox > input:focus {
      opacity: 0.12
    }
    
    .pure-material-checkbox:hover > input:focus {
      opacity: 0.16;
    }
    
    /* active */
    .pure-material-checkbox > input:active {
      opacity: 1;
      transform: scale(0);
      transition: transform 0s, opacity 0s;
    }
    
    .pure-material-checkbox > input:active + span::before {
      border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    }
    
    .pure-material-checkbox > input:checked:active + span::before {
      border-color: transparent;
      background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6)
    }
    
    /* disabled */
    .pure-material-checkbox > input:disabled {
      opacity: 0;
    }
    
    .pure-material-checkbox > input:disabled + span {
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
      cursor: initial
    }
    
    .pure-material-checkbox > input:disabled + span::before {
      border-color: currentColor
    }
    
    .pure-material-checkbox > input:checked:disabled + span::before,
    .pure-material-checkbox > input:indeterminate:disabled + span::before {
      border-color: transparent;
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

class MCheckboxes extends HTMLElement {
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
      label:  ['label', { class: `pure-material-checkbox ${this.stack}` }, '', ''],
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
    return ['selected', 'list', 'stack']
  }

  set selection(value) {
    var idx = this.selected.indexOf(value)
    idx !== -1 ? this.selected.splice(idx, 1) : this.selected.push(value)
    this.setAttribute('selected', JSON.stringify(this.selected))
  }

  get list() {
    return JSON.parse(this.getAttribute('list'))
  }

  get stack() {
    return this.getAttribute('stack')
  }
}

customElements.define('m-checkboxes', MCheckboxes)