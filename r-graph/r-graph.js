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
    .-chart {
      width: 320px;
      height: 320px;
      display: inline-block;
      font-family: var(--font);
      font-weight: bold;
    }
    
    .-chart svg g {
      transform: translate(50%,50%) scale(0.4)
    }
    
    .-chart svg g text {
      font-size: 2em;
      text-transform: uppercase;
      dominant-baseline: central
    }
    </style>
  `
]

styles.innerHTML = styleArray[0]

class Tag {
  constructor(properties) {
    this.URI          = "http://www.w3.org/2000/svg"
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
    this.element = document.createElementNS(this.URI, this.tag)
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

// var json = {
//   vertices: [0.5, 0.45, 0.8, 0.363, 0.44, 0.33, 0.4, 0.35],
//   percents: [1, 0.8, 0.6, 0.4, 0.2, 0],
//   colors: ['#94c277', '#bee894', '#f3f2a2', '#f1c354', '#f07377', '#000'],
//   size: 8,
//   width: 320,
//   height: 320,
//   categories: [
//     'bible', 'maths', 'software design', 'yoruba',
//     'music', 'physics', 'engineering', 'hardware design'
//   ]
// }
// vertices must follow the same order as categories
// key(index) is gotten from percents above as follows
// percent is an arithmetic progression: ap = a + (n-1)d
// a = 1, n = variable index, d = -0.2
// ap(1) = 1 + (1 - 1) * -0.2 = 1
// ap(2) = 1 + (2 - 1) * -0.2 = 1 + (-0.2) = 0.8
// ap(3) = 1 + (3 - 1) * -0.2 = 1 + (-0.4) = 0.6
// ap(n) = 1 + (n - 1) * -0.2 = 1 + (-0.2n + 0.2) = 1.2 - 0.2n
// text-anchor corresponds to the horizontal position of the text
// dominant-baseline corresponds to the vertical position of the text
class Radar {
  constructor(json) {
    this.percents   = json['percents']
    this.colorCodes = json['colors']
    this.width      = json['width']
    this.height     = json['height']
    this.size       = json['size']
    this.vertices   = json['vertices']
    this.categories = json['categories']
    this.radarEl    = json['el']

    this.radii      = this.getRadii()
    this.colors     = this.getColors()

    this.polyPoints = {}
    this.grids      = {}
    this.textPos    = {
                      zero: { 'text-anchor': 'middle', 'dominant-baseline': 'central' },
                      minus: { 'text-anchor': 'end', 'dominant-baseline': 'alphabetic' },
                      plus: { 'text-anchor': 'start', 'dominant-baseline': 'hanging' }
                    }

    this.draw()
  }

  draw() {
    this.polyPoints = this.polygon()
    this.grids = this.grid(this.polyPoints)
    var star = this.star(this.polyPoints['_100']['points'])
    var text = this.text(this.polyPoints['_100']['points'])

    Object.assign(this.grids, star)
    Object.assign(this.grids, text)
    this.build()
  }

  build() {
    var width     = this.width
    var height    = this.height
    var viewBox   = `0 0 ${width} ${height}`
    var svgProps  = {
                    svg: ['svg', { class: '-radar', width, height, viewBox }, '', ''],
                    g: ['g', '', '', '']
                  }
    var svg       = new Tag(svgProps['svg']).get()
    var g         = new Tag(svgProps['g']).get()
    Object.keys(this.grids).map(key => {
      var key_el = new Tag(this.grids[key]).get()
      g.appendChild(key_el)
    })
    svg.appendChild(g)
    this.radarEl.appendChild(svg)

    return this
  }

  // grid replaces setOctGrids
  grid(polyPoints) {
    var polyPoint = {}
    this.getKeys().map(key => {
      var style = this.value(key, polyPoints)
      polyPoint[key] = ['polygon', { class: '-polygon', points: polyPoints[key]['points'].join(',')  }, { style }, '']
    })
    return polyPoint
  }

  text(vertices) {
    var text = {}
    vertices.map((item, idx) => {
      var x_y = item.split(' ')
      text[`text-${idx}`] = [
        'text', {
          class:'-svg_txt',
          x: x_y[0],
          y: x_y[1]
        }, { style: this.textStyle(x_y) },
        this.categories[idx].substring(0, 3)
      ]
    })
    return text
  }

  textStyle(pieces) {
    var x     = parseInt(pieces[0])
    var y     = parseInt(pieces[1])
    var style = this.getStyle(x, 'text-anchor')
    style     += this.getStyle(y, 'dominant-baseline')
    return style
  }

  getStyle(num, prop) {
    if (parseInt(num) === 0) {
      return `${prop}:${this.textPos['zero'][prop]};`
    } else if (parseInt(num) > 0) {
      return `${prop}:${this.textPos['plus'][prop]};`
    } else {
      return `${prop}:${this.textPos['minus'][prop]};`
    }
  }

  star(vertices) {
    var star = {}
    vertices.map((item, idx) => {
      var style = 'stroke:#5e5e5e;stroke-width:0.5', d = `M 0 0 L ${item}`
      star[`star-${idx}`] = ['path', { d, class: '-d' }, { style }, '']
    })
    return star
  }

  // polygon replaces createOctagonArrays
  polygon() {
    var self = this, json = {}
    this.getKeys().map(key => {
      json[key] = { color: self.colors[key], points: self.points(self.radii[key]) }
    })
    return json
  }

  points(radii) {
    var a = 0, b = 0, self = this;
    var theta = Math.PI / 2, dTheta = 2 * (Math.PI / this.size)
    return radii.map(radius => { 
      var coordinate = this.coordinate({ radius, a, b, theta })
      theta += dTheta
      return coordinate
    })
  }

  coordinate(json) {
    var cosJson = {...json, trig: 'cos', side: json['a']}
    var sinJson = {...json, trig: 'sin', side: json['b']}
    var xLen = this.length(cosJson)
    var yLen = this.length(sinJson)
    return `${xLen} ${yLen}`
  }

  length(json) {
    var angle = Math[json['trig']](json['theta'])
    return Math.round(json['side'] + json['radius'] * angle)
  }

  value(key, polyPoints) {
    if (key === '_0')
      return `stroke:#000;stroke-width:8;fill:none`
    return `stroke:#5e5e5e;stroke-width:1;fill:${polyPoints[key]['color']}`
  }

  getKeys() {
    return this.percents.map((_, idx) => `_${100 * this.key(idx + 1)}`)
  }

  key(index) { return this.twoDP(1.2 - 0.2 * index) }

  getRadii() {
    var list = this.polygonMap(this.percents, this.polygonFormula)
    list.push({ vertices: this.vertices.map(vertex => this.vertexWidth(vertex)) })
    return Object.assign({}, ...list)
  }

  vertexWidth(vertex) { return this.twoDP(vertex * this.width) }

  getColors() {
    var list = this.polygonMap(this.colorCodes, this.colorFormula)
    list.push({ vertices: 'none' })
    return Object.assign({}, ...list)
  }

  twoDP(value) {  return Math.round(value * 100) / 100 }

  polygonFormula(value, radar) {
    if (value === 0) 
      return radar.vertices.map(vertex => radar.twoDP(vertex * radar.width))
    return Array(radar.size).fill(value * radar.width)
  }

  colorFormula(value) { return value }

  // to refactor polygonMap() with getKeys()
  polygonMap(list, formula) {
    var self = this
    return list.map((item, idx) => {
      var obj = {}
      obj[`_${100 * this.key(idx + 1)}`] = formula(item, self)
      return obj
    })
  }
}

class RGraph extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(styles.content)
    this.appendParent()

    this.el = this.shadowRoot.querySelector('.-chart')
    new Radar(this.json(this.el))
    // we append child to this.shadowRoot here
  }

  json(el) {
    return {
      vertices: this.vertices,
      percents: [1, 0.8, 0.6, 0.4, 0.2, 0],
      colors: ['#94c277', '#bee894', '#f3f2a2', '#f1c354', '#f07377', '#000'],
      size: this.vertices.length,
      width: 320,
      height: 320,
      categories: this.categories,
      el: el
    }
  }

  appendParent() {
    var radarEl = document.createElement('div')
    radarEl.className = '-chart'
    this.shadowRoot.appendChild(radarEl)
    // console.log('from build, list is', this.list instanceof Array)
  }

  static get observedAttributes() {
    return ['categories', 'vertices']
  }

  get categories() {
    return JSON.parse(this.getAttribute('categories'))
  }

  get vertices() {
    return JSON.parse(this.getAttribute('vertices'))
  }

  set categories(value) {
    this.setAttribute('categories', value)
  }

  set vertices(value) {
    this.setAttribute('vertices', value)
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
    this.el.innerHTML = ""
    new Radar(this.json(this.el))
    // when Component attribute changes
  }

  get attribute() {
    // return this.getAttribute('attribute')
  }

}

customElements.define('r-graph', RGraph)