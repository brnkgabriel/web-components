// M-Select Notes
// - the attributes must be in single quotes
//   so that the list attribute can accomodate JSON in double quotes
//   example: <m-select value='0' list='[{"x": "twenty"}]'></m-select>
// - must set the global --font css variable so the select list takes
//   the font of the parent

var globalId = 0

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
      position: relative;
      text-align: center;
      width: 42%;
      font-family: var(--font);
      font-weight: bold;
      height: 48px;
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
      background-color: rgba(0,0,0,0.3);
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
      overflow: hidden;
      color: white;
    }

    .materialSelect .select li[data-selected] {
      height: 48px;
    }

    .materialSelect .select li:not([data-selected]) {
      height: 0px;
      opacity: 0;
    }

    .materialSelect .select.isOpen {
      background-color: rgba(0,0,0,0.3);
      border-radius: 2px;
      box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.3);
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
      color: white;
    }

    .materialSelect .select.isOpen li:hover {
      background-color: rgba(0,0,0,0.3);
    }

    .materialSelect .select.isOpen li:active {
      background-color: rgba(0,0,0,0.3);
    }

    .materialSelect .select:not(.isOpen):hover {
      background-color: rgba(0,0,0,0.3);
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

class SelectElement {
  constructor(doc, id) {
    this.id             = id
    this.closeTimeout   = null
    this.selectTimeout  = null
    this.doc            = doc

    this.closeEl        = this.doc.querySelector('*')
    this.listItems      = this.doc.querySelectorAll('.select li')
    this.select         = this.doc.querySelector('.select')

    this.init()
  }

  static setSelected(parent, selected) {
    var children = parent.querySelectorAll('li')
    children.forEach(child => child.removeAttribute('data-selected'))
    selected.setAttribute('data-selected', true)
  }

  init() {
    this.addListeners()
    this.hide(this.select)
  }

  addListeners() {
    this.closeEl.addEventListener('click', e => this.close(e))
    this.listItems.forEach(listItem => listItem.addEventListener('click', event => this.trigger(event)))
  }

  trigger(event) {
    var listItem = event.target
    var parent   = listItem.parentElement

    this.selectItem(listItem, parent)
    clearTimeout(this.selectTimeout);

    parent.classList.contains('isOpen') ? this.hide(parent) : this.scroll(parent)
  }
  
  selectItem(listItem, parent) {
    SelectElement.setSelected(parent, listItem)

    if (!this.isItemTheFirstOnList(listItem)) {
      var evt = new CustomEvent(`selected-${this.id}`, { detail: listItem.textContent })
      window.dispatchEvent(evt)
    }
  }

  isItemTheFirstOnList(listItem) {
    var value = listItem.getAttribute('data-value')
    return parseInt(value) === -1
  }

  scroll(parent) {
    var selected = this.doc.querySelector('li[data-selected]')
    var pos      = Math.max((this.index(selected) - 2) * 48, 0)
    parent.classList.add('isOpen')
    parent.style.overflow = 'auto'
    parent.scrollTop = pos
  }

  // to remove if I don't find how to connect clicking
  // outside the shadow dom to close the list
  close(e) {
    var containsSelectToHide = e.target.querySelector('.select')

    if (containsSelectToHide) {
      if (this.select.classList.contains('isOpen')) {
        this.hide(this.select)
      }
    }
  }

  hide(parent) {
    parent.style.overflow = 'hidden'
    parent.classList.remove('isOpen')
    clearTimeout(this.closeTimeout)
    this.closeTimeout = setTimeout(() => {
      parent.parentElement.style.zIndex = 0
    }, 200)
  }

  index(selected) {
    return parseInt(selected.getAttribute('data-value')) + 1
  }
}

class MSelect extends HTMLElement {
  constructor() {
    super()
    this.id = globalId++
    this.attachShadow({mode: 'open'})
    this.render()
    // we append child to this.shadowRoot here
  }

  render() {
    Tag.appendMany2One([this.styles(), this.html()], this.shadowRoot)
    
    new SelectElement(this.shadowRoot, this.id)
    
    window.addEventListener(`selected-${this.id}`, (e) => {
      this.value = e.detail
      var evt = new CustomEvent(`change`, e)
      this.dispatchEvent(evt)
    })
  }

  styles() {
    var styles = document.createElement('template')
    styles.innerHTML = styleArray[0]
    return styles.content
  }

  html() {
    var selectProp      = {
                          materialSelect: ['div', { class: 'materialSelect inline' }, '', ''],
                          select        : ['ul', { class: 'select' }, '', ''],
                        }
    var materialSelect  = new Tag(selectProp['materialSelect']).get()
    var select          = new Tag(selectProp['select']).get()
    var choose          = new Tag(['li', { 'data-selected': true, 'data-value': -1 }, '', 'choose...']).get()

    select.appendChild(choose)
    this.list.forEach((item, idx) => {
      var item_el = new Tag(['li', { 'data-value': idx }, '', item]).get()
      select.appendChild(item_el)
    })

    materialSelect.appendChild(select)
    return materialSelect
  }

  static get observedAttributes() {
    return ['value', 'list']
  }

  get list() {
    return JSON.parse(this.getAttribute('list'))
  }

  set value(val) {
    this.setAttribute('value', val)
  }

  disconnectedCallback() {
    window.removeEventListener(`selected-${this.id}`, e => value = e.detail)
  }
}
customElements.define('m-select', MSelect)
