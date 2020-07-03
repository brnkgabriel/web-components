var styleModal = [
  `
    <style>
    label span,
    label input {
      font-family: var(--font);
      font-weight: bold;
    }

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
    
    
    .pure-material-textfield-outlined {
      --pure-material-safari-helper1: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
      position: relative;
      display: inline-block;
      padding-top: 6px;
      font-family: var(--font);
      font-size: 16px;
      line-height: 1.5;
      overflow: hidden
    }
    
    /* input, textarea */
    .pure-material-textfield-outlined > input,
    .pure-material-textfield-outlined > textarea {
      box-sizing: border-box;
      margin: 0;
      border: solid 1px;
      border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
      border-top-color: transparent;
      border-radius: 4px;
      padding: 15px 13px 15px;
      width: 100%;
      height: inherit;
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
      background-color: transparent;
      box-shadow: none;
      font-family: inherit;
      font-size: inherit;
      caret-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
      transition: border 0.2s, box-shadow 0.2s;
    }
    
    /* span */
    .pure-material-textfield-outlined > input + span,
    .pure-material-textfield-outlined > textarea + span {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      border-color: rgba(var(--pure-material-surface-rgb, 0, 0, 0), 0.6);
      width: 100%;
      max-height: 100%;
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
      font-size: 75%;
      line-height: 15px;
      cursor: text;
      transition: color 0.2s, font-size 0.2s, line-height 0.2s;
    }
    
    /* corners */
    .pure-material-textfield-outlined > input + span::before,
    .pure-material-textfield-outlined > input + span::after,
    .pure-material-textfield-outlined > textarea + span::before,
    .pure-material-textfield-outlined > textarea + span::after {
      content: '';
      display: block;
      box-sizing: border-box;
      margin-top: 6px;
      border-top: solid 1px;
      border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
      min-width: 10px;
      height: 8px;
      pointer-events: none;
      box-shadow: inset 0 1px transparent;
      transition: border-color 0.2s, box-shadow 0.2s
    }
    
    .pure-material-textfield-outlined > input + span::before,
    .pure-material-textfield-outlined > textarea + span::before {
      margin-right: 4px;
      border-left: solid 1px transparent;
      border-radius: 4px 0;
    }
    
    .pure-material-textfield-outlined > input + span::after,
    .pure-material-textfield-outlined > textarea + span::after {
      flex-grow: 1;
      margin-left: 4px;
      border-right: solid 1px solid transparent;
      border-radius: 0 4px;
    }
    
    /* hover */
    .pure-material-textfield-outlined:hover > input,
    .pure-material-textfield-outlined:hover > textarea {
      border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
      border-top-color: transparent
    }
    
    .pure-material-textfield-outlined:hover > input + span::before,
    .pure-material-textfield-outlined:hover > textarea + span::before,
    .pure-material-textfield-outlined:hover > input + span::after,
    .pure-material-textfield-outlined:hover > textarea + span::after {
      border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
    }
    
    .pure-material-textfield-outlined:hover > input:not(:focus):placeholder-shown,
    .pure-material-textfield-outlined:hover > textarea:not(:focus):placeholder-shown {
      border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87)
    }
    
    /* placeholder-shown */
    .pure-material-textfield-outlined > input:not(:focus):placeholder-shown,
    .pure-material-textfield-outlined > textarea:not(:focus):placeholder-shown {
      border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6)
    }
    
    .pure-material-textfield-outlined > input:not(:focus):placeholder-shown + span,
    .pure-material-textfield-outlined > textarea:not(:focus):placeholder-shown + span {
      font-size: inherit;
      line-height: 60px;
    }
    
    .pure-material-textfield-outlined > input:not(:focus):placeholder-shown + span::before,
    .pure-material-textfield-outlined > textarea:not(:focus):placeholder-shown + span::before,
    .pure-material-textfield-outlined > input:not(:focus):placeholder-shown + span::after,
    .pure-material-textfield-outlined > textarea:not(:focus):placeholder-shown + span::after {
      border-top-color: transparent
    }
    
    /* focus */
    .pure-material-textfield-outlined > input:focus,
    .pure-material-textfield-outlined > textarea:focus {
      border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
      border-top-color: transparent;
      box-shadow: inset 1px 0 var(--pure-material-safari-helper1), inset -1px 0 var(--pure-material-safari-helper1), inset 0 -1px var(--pure-material-safari-helper1);
      outline: none;
    }
    
    .pure-material-textfield-outlined > input:focus + span,
    .pure-material-textfield-outlined > textarea:focus + span {
      color: rgb(var(--pure-material-primary-rgb, 33, 150, 243))
    }
    
    .pure-material-textfield-outlined > input:focus + span::before,
    .pure-material-textfield-outlined > input:focus + span::after,
    .pure-material-textfield-outlined > textarea:focus + span::before,
    .pure-material-textfield-outlined > textarea:focus + span::after {
      border-top-color: var(--pure-material-safari-helper1) !important;
      box-shadow: inset 0 1px var(--pure-material-safari-helper1);
    }
    
    /* disabled */
    .pure-material-textfield-outlined > input:disabled,
    .pure-material-textfield-outlined > input:disabled + span,
    .pure-material-textfield-outlined > textarea:disabled,
    .pure-material-textfield-outlined > textarea:disabled + span {
      border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
      border-top-color: transparent !important;
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
      pointer-events: none;
    }
    
    .pure-material-textfield-outlined > input:disabled + span::before,
    .pure-material-textfield-outlined > input:disabled + span::after,
    .pure-material-textfield-outlined > textarea:disabled + span::before,
    .pure-material-textfield-outlined > textarea:disabled + span::after {
      border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
    }
    
    .pure-material-textfield-outlined > input:disabled:placeholder-shown,
    .pure-material-textfield-outlined > input:disabled:placeholder-shown + span,
    .pure-material-textfield-outlined > textarea:disabled:placeholder-shown,
    .pure-material-textfield-outlined > textarea:disabled:placeholder-shown + span {
      border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
    }
    
    .pure-material-textfield-outlined > input:disabled:placeholder-shown + span::before,
    .pure-material-textfield-outlined > input:disabled:placeholder-shown + span::after,
    .pure-material-textfield-outlined > textarea:disabled:placeholder-shown + span::before,
    .pure-material-textfield-outlined > textarea:disabled:placeholder-shown + span::after {
      border-top-color: transparent !important;
    }
    
    /* faster transition in safari for less noticeable fractional font-size issue */
    @media not all and (min-resolution: .001dpcm) {
      @supports (-webkit-appearance:none) {
        .pure-material-textfield-outlined > input,
        .pure-material-textfield-outlined > input + span,
        .pure-material-textfield-outlined > textarea,
        .pure-material-textfield-outlined > textarea + span,
        .pure-material-textfield-outlined > input + span::before,
        .pure-material-textfield-outlined > input + span::after,
        .pure-material-textfield-outlined > textarea + span::before,
        .pure-material-textfield-outlined > textarea + span::after {
          transition-duration: 0.1s;
        }
      }
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

class MModal extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
    // we append child to this.shadowRoot here
  }
  render() {
    Tag.appendMany2One([this.styles(), this.html()], this.shadowRoot)

  }

  styles() {
    var styles = document.createElement('template')
    styles.innerHTML = styleModal[0]
    return styles.content
  }

  html() {
    var self = this
    var prop = {
      label:  ['label', { class: 'pure-material-textfield-outlined' }, '', ''],
      input:  ['input', { placeholder: ' ' }, '', ''],
      span:   ['span', '', '', this.placeholder]
    }
    var label = new Tag(prop['label']).get()
    var input = new Tag(prop['input']).get()
    var span  = new Tag(prop['span']).get()

    input.addEventListener('keyup', () => self.value = input.value)

    Tag.appendMany2One([input, span], label)
    return label
  }

  static get observedAttributes() {
    return ['value', 'placeholder']
  }
  

  get placeholder() {
    return this.getAttribute('placeholder')
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value)
  }

  get value() {
    return this.getAttribute('text')
  }

  set value(value) {
    this.setAttribute('value', value)
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
}

customElements.define('m-modal', MModal)