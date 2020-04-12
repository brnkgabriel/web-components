class Tag {
  constructor(properties) {
    this.URI = "http://www.w3.org/2000/svg"
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

// vertices = [0.5, 0.45, 0.8, 0.3, 0.44, 0.33, 0.4, 0.35]
// percents = [1, 0.8, 0.6, 0.4, 0.2]
// key(index) is gotten from percents above as follows
// percent is an arithmetic progression: ap = a + (n-1)d
// a = 1, n = variable index, d = -0.2
// ap(1) = 1 + (1 - 1) * -0.2 = 1
// ap(2) = 1 + (2 - 1) * -0.2 = 1 + (-0.2) = 0.8
// ap(3) = 1 + (3 - 1) * -0.2 = 1 + (-0.4) = 0.6
// ap(n) = 1 + (n - 1) * -0.2 = 1 + (-0.2n + 0.2) = 1.2 - 0.2n
// colors = ['#94c277', '#bee894', '#f3f2a2', '#f1c354', '#f07377']
// size = 8
class Radar {
  constructor(json) {
    this.percents = json['percents']
    this.colorCodes = json['colors']
    this.width = json['width']
    this.height = json['height']
    this.size = json['size']
    this.vertices = json['vertices']
    this.radii = this.getRadii()
    this.colors = this.getColors()
  }

  key(index) {
    return Math.round((1.2 - 0.2 * index) * 100) / 100
  }

  getRadii() {
    // var list = this.percents.map((percent, idx) => {
    //   var obj = {}
    //   obj[`_${100 * this.key(idx)}`] = Array(this.size).fill(percent * this.width)
    //   return obj
    // })
    var list = this.polygonMap(this.percents, this.polygonFormula)
    var proportion = this.vertices.map(vertex => vertex * this.width)
    list.push({ vertices: proportion })
    return Object.assign({}, ...list)
  }

  polygonFormula(value, radar) {
    return Array(radar.size).fill(value * radar.width)
  }

  colorFormula(value) {
    return value
  }

  polygonMap(list, formula) {
    var self = this
    return list.map((item, idx) => {
      var obj = {}
      obj[`_${100 * this.key(idx + 1)}`] = formula(item, self)
      return obj
    })
  }

  getColors() {
    // var list = this.colors.map((color, idx) => {
    //   var obj = {}
    //   obj[`_${100 * this.key(idx)}`] = color
    //   return obj
    // })
    var list = this.polygonMap(this.colorCodes, this.colorFormula)
    list.push({ vertices: 'none' })
    return Object.assign({}, ...list)
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

// var vertices = [0.5, 0.45, 0.8, 0.3, 0.44, 0.33, 0.4, 0.35]
// var rGraph = new RGraph(320, 320, vertices)

var json = {
  vertices: [0.5, 0.45, 0.8, 0.3, 0.44, 0.33, 0.4, 0.35],
  percents: [1, 0.8, 0.6, 0.4, 0.2],
  colors: ['#94c277', '#bee894', '#f3f2a2', '#f1c354', '#f07377'],
  size: 8,
  width: 320,
  height: 320
}

console.log('radar', new Radar(json))
