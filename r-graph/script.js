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
class Radar {
  constructor(json) {
    this.percents   = json['percents']
    this.colorCodes = json['colors']
    this.width      = json['width']
    this.height     = json['height']
    this.size       = json['size']
    this.vertices   = json['vertices']
    this.categories = json['categories']
    this.radarEl    = document.querySelector(json['selector'])

    this.radii      = this.getRadii()
    this.colors     = this.getColors()

    this.polyPoints = {}
    this.grids      = {}
    this.textPos    = {
                      zero: { 'text-anchor': 'middle', 'dominant-baseline': 'central' },
                      minus: { 'text-anchor': 'end', 'dominant-baseline': 'alphabetic' },
                      plus: { 'text-anchor': 'start', 'dominant-baseline': 'hanging' }
                    }
  }

  draw() {
    this.polyPoints = this.polygon()
    this.grids = this.grid(this.polyPoints)
    var star = this.star(this.polyPoints['_100']['points'])
    var text = this.text(this.polyPoints['_100']['points'])

    Object.assign(this.grids, star)
    Object.assign(this.grids, text)
    this.build().repositionText()
  }

  repositionText() {
    var texts = document.querySelectorAll('.-svg_txt')
    texts.forEach(text => {
      var boundingBox = text.getBBox()
    })
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
      // return {
        // shape: 'polygon',
        // attributes: [
        //   { name: 'points', value: polyPoints[key]['points'].join(',') },
        //   { name: 'style', value },
        // ],
        // props: {
        //   shape: ['polygon', { class: '-polygon' }, { style: value }, '', '']
        // }
      // }
    })
    return polyPoint
  }

  text(vertices) {
    console.log('in text, vertices', vertices)
    var text = {}
    vertices.map((item, idx) => {
      var x_y = item.split(' ')
      text[`text-${idx}`] = ['text', { class:'-svg_txt', x: x_y[0], y: x_y[1]}, '', this.categories[idx].substring(0, 3)]
    })
    return text
  }

  star(vertices) {
    var star = {}
    vertices.map((item, idx) => {
      var style = 'stroke:#5e5e5e;stroke-width:0.5', d = `M 0 0 L ${item}`
      star[`star-${idx}`] = ['path', { d, class: '-d' }, { style }, '']
      // return {
      //   shape: 'path',
      //   attributes: [
      //     { name: 'd', value: `M 0 0 L ${item}` },
      //     { name: 'style', value: 'stroke:#5e5e5e;stroke-width:0.5' }
      //   ]
      // }
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

class RGraph {
  constructor(width, height, vertices) {
    this.URI = "http://www.w3.org/2000/svg";
    this.radii = {
      $100_prcnt: Array(8).fill(1 * width), $80_prcnt: Array(8).fill(0.8 * width),
      $60_prcnt: Array(8).fill(0.6 * width), $40_prcnt: Array(8).fill(0.4 * width),
      $20_prcnt: Array(8).fill(0.2 * width), $vertices: vertices.map(vertex => vertex * width)
    };
    this.colors = {
      $100_prcnt: '#94c277', $80_prcnt: '#bee894', $60_prcnt: '#f3f2a2', $40_prcnt: '#f1c354',
      $20_prcnt: '#f07377', $vertices: 'none'
    };
    this.width = Math.round(width * 100) / 100
    this.height = height
    this.octagons = {};
    this.octagonGrids = [];
    this.categories = [
      { textContent: 'relationships', 'text-anchor': 'middle', transform: 'translateY(6%)' },
      { textContent: 'purpose', 'text-anchor': 'end', transform: 'translate(-1.5%,3%)' },
      { textContent: 'history', 'text-anchor': 'end', transform: 'translate(-1.5%, 1.5%)' },
      { textContent: 'bible', 'text-anchor': 'end', transform: 'translate(-1.5%, 0%)' },
      { textContent: 'faith', 'text-anchor': 'middle', transform: 'translateY(-1.5%)' },
      { textContent: 'finances', 'text-anchor': 'start', transform: 'translate(1.5%, 0%)' },
      { textContent: 'kingdom', 'text-anchor': 'start', transform: 'translate(1.5%, 1.5%);' },
      { textContent: 'spirit', 'text-anchor': 'start', transform: 'translate(1.5%,3%)' }
    ]
  }

  draw() {
    var self = this;
    self.createOctagonArrays();
    self.setOctGrids(self.octagons);
    var assembled = self.assembleSVG(
      self.octagonGrids,
      self.starShape(self.octagons['$100_prcnt']['points']),
      self.text(self.octagons['$100_prcnt']['points'])
    );
    return this.buildSVG(assembled)
  }
  createOctagonArrays() {
    var self = this, keys = Object.keys(this.radii);
    keys.forEach(key => {
      self.octagons[key] = {
        color: self.colors[key], points: self.createOctagon(self.radii[key])
      };
    });
    console.log('octagons', self.octagons)
  }

  createOctagon(radii) {
    var numOfSides = 8, a = 0, b = 0, self = this;
    var theta = Math.PI / 2, dTheta = 2 * Math.PI / numOfSides;
    return radii.map(radius => {
      var xLen = self.length(a, radius, theta, 'cos');
      var yLen = self.length(b, radius, theta, 'sin');
      var assembled = `${xLen} ${yLen}`;
      theta += dTheta;
      return assembled;
    });
  }

  length(side, radius, theta, trig) { return Math.round(side + radius * Math[trig](theta)); }

  createSVGs(el, list) {
    list.forEach(shape => {
      var svgShape = document.createElementNS("http://www.w3.org/2000/svg", shape['shape']);
      shape['attributes'].forEach(attrib => svgShape.setAttribute(attrib['name'], attrib['value']));
      el.appendChild(svgShape);
    });
  }

  buildSVG(param) {
    var self = this, SVG_URI = "http://www.w3.org/2000/svg"
    var svg = document.createElementNS(SVG_URI, "svg")
    Object.keys(param['attrib']).forEach(key => svg.setAttribute(key, param['attrib'][key]))
    var gTag = document.createElementNS(SVG_URI, "g")
    param['shapes'].forEach(shape => {
      var svgShape = document.createElementNS(SVG_URI, shape['shape'])
      shape['attributes'].forEach(attrib => svgShape.setAttribute(attrib['name'], attrib['value']))
      svgShape.textContent = shape['textContent']
      if (shape['children']) {
        self.createSVGs(svgShape, shape['children'])
      }
      gTag.appendChild(svgShape)
    })
    svg.appendChild(gTag)
    return svg
  }

  starShape(list) {
    return list.map(item => {
      return {
        shape: 'path', attributes: [
          { name: 'd', value: `M 0 0 L ${item}` },
          { name: 'style', value: 'stroke:#5e5e5e;stroke-width:0.5' }
        ]
      };
    });
  }

  text(list) {
    return list.map((item, idx) => {
      return {
        shape: 'text', attributes: [
          { name: 'x', value: parseInt(item.split(' ')[0]) },
          { name: 'y', value: parseInt(item.split(' ')[1]) },
          { name: 'text-anchor', value: this.categories[idx]['text-anchor'] },
          { name: 'style', value: `font-family:'Poppins';letter-spacing:1px;font-size:4em;font-weight:600;transform:${this.categories[idx]['transform']};text-transform:Capitalize` }
        ],
        textContent: this.categories[idx]['textContent']
      };
    });
  }

  setOctGrids(obj) {
    this.octagonGrids = Object.keys(obj).map(key => {
      var value = (key === '$vertices') ? `stroke:#000;stroke-width:8;` : `stroke:#5e5e5e;stroke-width:1;`
      value += `fill:${obj[key]['color']}`
      return {
        shape: 'polygon', attributes: [
          { name: 'points', value: obj[key]['points'].join(',') },
          { name: 'style', value }
        ]
      };
    });
  }

  assembleSVG(octs, stars, text) {
    var ratio = Math.round((this.width / this.height) * 100) / 100
    return {
      attrib: {
        width: `${this.width}px`,
        height: `${this.height}px`,
        viewBox: `0 0 ${this.width * (2.5 + ratio)} ${this.height * (2.5 + ratio)}`,
        class: '-chart_container_svg'
      }, shapes: [...octs, ...stars, ...text]
    };
  }
}

// var vertices = [0.5, 0.45, 0.8, 0.363, 0.44, 0.33, 0.4, 0.35]
// var rGraph = new RGraph(320, 320, vertices)
// rGraph.draw()

var json = {
  vertices: [0.5, 0.45, 0.8, 0.363, 0.44, 0.33, 0.4, 0.35],
  percents: [1, 0.8, 0.6, 0.4, 0.2, 0],
  colors: ['#94c277', '#bee894', '#f3f2a2', '#f1c354', '#f07377', '#000'],
  size: 8,
  width: 320,
  height: 320,
  categories: [
    'bible', 'maths', 'software design', 'yoruba',
    'music', 'physics', 'engineering', 'hardware design'
  ],
  selector: '.-chart'
}

var chart = document.querySelector('.-chart')
new Radar(json).draw()