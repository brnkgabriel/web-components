class ProgressBar extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    this._complete = 0
  }

  get complete() {
    return this._complete
  }

  set complete(value) {
    this.setAttribute('complete', value)
  }

  static get observedAttributes() {
    return ['complete']
  }

  attributeChangedCallback(name, oldVal, newVal) {
    var innerBar = this.shadow.querySelector('.progress-bar-inner')
    switch(name) {
      case 'complete':
        this._complete = parseInt(newVal, 10) || 0

        if (innerBar) {
          innerBar.style.width = this.complete + '%'
          innerBar.innerHTML = this.complete + '%'
        }
    }
  }

  connectedCallback() {
    var template = `
      <style>
        .progress-bar {
          width: 50%;
          height: 30px;
          background-color: #edf2f4;
          border-radius: 5px;
          color: white;
        }

        .progress-bar-inner {
          height: 30px;
          line-height: 30px;
          background-color: #282d42;
          text-align: center;
          border-radius: 5px;
          transition: width 0.25s
        }
      </style>
      <div class="progress-bar">
        <div class="progress-bar-inner">${this.complete}</div>
      </div>
    `

    this.shadow.innerHTML = template
  }
}

window.customElements.define('progress-bar', ProgressBar)