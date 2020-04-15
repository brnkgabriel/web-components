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
    
    
    /* CIRCULAR PROGRESS */
    .pure-material-progress-circular {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      box-sizing: border-box;
      border: none;
      border-radius: 50%;
      padding: 0.25em;
      width: 3em;
      height: 3em;
      color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
      background-color: transparent;
      font-size: 16px;
      overflow: hidden
    }
    
    .pure-material-progress-circular::-webkit-progress-bar {
      background-color: transparent
    }
    
    /* indeterminate */
    .pure-material-progress-circular:indeterminate {
      -webkit-mask-image: linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%);
      mask-image: linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%);
      animation: pure-material-progress-circular 6s infinite cubic-bezier(.3, .6, 1, 1)
    }
    
    :-ms-lang(x),
    .pure-material-progress-circular:indeterminate {
      animation: none;
    }
    
    .pure-material-progress-circular:indeterminate::before,
    .pure-material-progress-circular:indeterminate::-webkit-progress-value {
      content: '';
      display: block;
      box-sizing: border-box;
      margin-bottom: 0.25em;
      border: solid 0.25em transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      width: 100% !important;
      height: 100%;
      background-color: transparent;
      animation: pure-material-progress-circular-pseudo 0.75s infinite linear alternate
    }
    
    .pure-material-progress-circular:indeterminate::-moz-progress-bar {
      box-sizing: border-box;
      border: solid 0.25em transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      background-color: transparent;
      animation: pure-material-progress-circular-pseudo 0.75s infinite linear alternate
    }
    
    .pure-material-progress-circular:indeterminate::-ms-fill {
      animation-name: -ms-ring
    }
    
    @keyframes pure-material-progress-circular {
      0% {
        transform: rotate(0deg)
      }
    
      12.5% {
        transform: rotate(180deg);
        animation-timing-function: linear
      }
    
      25% {
        transform: rotate(630deg);
      }
    
      37.5% {
        transform: rotate(810deg);
        animation-timing-function: linear
      }
    
      50% {
        transform: rotate(1260deg);
      }
    
      62.5% {
        transform: rotate(1440deg);
        animation-timing-function: linear
      }
    
      75% {
        transform: rotate(1890deg)
      }
    
      87.5% {
        transform: rotate(2070deg);
        animation-timing-function: linear
      }
    
      100% {
        transform: rotate(2520deg)
      }
    }
    
    @keyframes pure-material-progress-circular-pseudo {
      0% {
        transform: rotate(-30deg)
      }
    
      29.4% {
        border-left-color: transparent
      }
    
      29.41% {
        border-left-color: currentColor
      }
    
      64.7% {
        border-bottom-color: transparent;
      }
    
      64.71% {
        border-bottom-color: currentColor
      }
    
      100% {
        border-left-color: currentColor;
        border-bottom-color: currentColor;
        transform: rotate(225deg)
      }
    }
    
    </style>
  `
]

class Tag {
  constructor() {}

  static appendMany2One(many, one) {
    many.forEach(each => one.appendChild(each))
  }

}

class MProgressCircular extends HTMLElement {
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
    var progress = document.createElement('progress')
    progress.className = 'pure-material-progress-circular'
    return progress
  }

  static get observedAttributes() {
    return []
  }
}

customElements.define('m-progress-circular', MProgressCircular)