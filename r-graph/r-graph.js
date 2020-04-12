// M-Select Notes
// - the attributes must be in single quotes
//   so that the list attribute can accomodate JSON in double quotes
//   example: <m-select value='0' list='[{"x": "twenty"}]'></m-select>
// - must set the global --font css variable so the select list takes
//   the font of the parent

var styles = document.createElement('template')

var styleArray = [
  `
    <style>

    .drop {
      display: block;
      position: absolute;
      background: #ccc;
      border-radius: 100%;
      transform: scale(0);
      pointer-events: none;
      width: 100%;
      height: 100%;
    }

    .drop.animate {
      animation: drop 1s ease-out;
    }

    @keyframes drop {
      100% {
        opacity: 0;
        transform: scale(2.5)
      }
    }

    .materialSelect {
      height: 70px;
      position: relative;
      text-align: center;
      margin-bottom: 10px;
      width: 42%;
      font-family: var(--font);
      font-weight: bold
    }

    .materialSelect.error .select:not(.isOpen) {
      border: 1px solid #dd2c00 !important;
    }

    .materialSelect.error .message {
      display: block
    }

    .materialSelect.inline {
      float: none !important;
      display: inline-block;
      z-index: 0;
      min-width: 100px;
      width: 250px;
    }

    .materialSelect.inline .select {
      transform: translate(0, 0);
      top: 0;
      left: 0;
      margin: 0;
      transition: all .2s !important;
      width: 100%;
    }

    .materialSelect.inline .select.isOpen {
      transform: translate(0, -50%);
      top: 50%;
    }

    .materialSelect:not(.inline) {
      width: 250px;
    }

    .materialSelect:not(.inline).select {
      width: 250px;
      margin-left: 50%;
      transform: translate(-50%, 0)
    }

    .materialSelect .select {
      position: absolute;
      margin: 0;
      padding: 0;
      top: -1px;
      user-select: none;
      width: 250px;
      text-align: center;
      margin: 0px auto;
      z-index: 9999;
      height: 48px;
      overflow: hidden;
      border: 1px solid rgba(0,0,0,0);
      box-shadow: 0 0 0 0 rgba(0,0,0,0);
      background-color: white;
      margin-left: 0;
      transform: none;
    }

    .materialSelect .select::after {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #bbb;
      content: '';
      display: block;
      height: 0px;
      position: absolute;
      pointer-events: none;
      top: 19px;
      right: 10px;
      width: 0px;
    }

    .materialSelect .select li {
      cursor: pointer;
      font-size: 15px;
      list-style: none;
      line-height: 48px;
      padding: 0 48px 0 24px;
      position: relative;
      overflow: hidden
    }

    .materialSelect .select li[data-selected] {
      height: 48px;
    }

    .materialSelect .select li:not([data-selected]) {
      height: 0px;
      opacity: 0;
    }

    .materialSelect .select.isOpen {
      background-color: #fafafa;
      border-radius: 2px;
      box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.3);
      padding-bottom: 16px;
      top: -96px;
      height: 250px;
      z-index: 99999;
    }

    .materialSelect .select.isOpen::after {
      display: none;
    }

    .materialSelect .select.isOpen::before {
      border-color: transparent !important;
    }

    .materialSelect .select.isOpen li {
      height: 48px;
      opacity: 1;
    }

    .materialSelect .select.isOpen li[data-selected] {
      color: #e91e63;
    }

    .materialSelect .select.isOpen li:hover {
      background-color: #eee;
    }

    .materialSelect .select.isOpen li:active {
      background-color: #dbdbdb;
    }

    .materialSelect .select:not(.isOpen):hover {
      background-color: #f7f7f7;
      border-top: 1px solid #cdcdcd;
      border-bottom: 1px solid #cdcdcd;
    }

    .materialSelect .select:not(.isOpen):active {
      box-shadow: 1px 2px 1px 0 rgba(0,0,0,0.3)
    }

    .materialSelect .select + .select::before {
      border-left: thin solid #c8c8c8;
      content: '';
      height: 32px;
      left: 0;
      position: absolute;
      top: 8px;
    }

    .materialSelect .message {
      position: absolute;
      top: 50px;
      width: 100%;
      color: #dd2c00;
      display: none;
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


class MSelect extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(styles.content)
    this.build()
    new SelectElement(this.shadowRoot)
    window.addEventListener('selected', (e) => this.value = e.detail)
    // we append child to this.shadowRoot here
  }

  build() {
    var selectProp = {
      materialSelect: ['div', { class: 'materialSelect inline' }, '', ''],
      select: ['ul', { class: 'select' }, '', ''],
    }
    var materialSelect = new Tag(selectProp['materialSelect']).get()
    var select = new Tag(selectProp['select']).get()
    var choose = new Tag(['li', { 'data-selected': true, 'data-value': -1 }, '', 'choose...']).get()

    select.appendChild(choose)
    this.list.forEach((item, idx) => {
      var item_el = new Tag(['li', { 'data-value': idx }, '', item]).get()
      select.appendChild(item_el)
    })

    materialSelect.appendChild(select)
    this.shadowRoot.appendChild(materialSelect)
    // console.log('from build, list is', this.list instanceof Array)
  }

  static get observedAttributes() {
    return ['value', 'list']
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

customElements.define('m-select', MSelect)