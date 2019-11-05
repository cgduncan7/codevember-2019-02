class Geometry {
  constructor (sketch, x, y, angle, size, color) {
    this.loc = sketch.createVector(x, y);
    this.angle = angle;
    this.size = size;
    this.color = color;
    this.connections = [];
    this.freeConnections = [];
    this.vertices = [];
  }

  draw (sketch) {
    sketch.push();
    sketch.translate(this.loc.x, this.loc.y);
    sketch.stroke(this.color);
    sketch.fill(this.color);
    sketch.strokeWeight(5);
    sketch.beginShape();
    for (let v of this.vertices) {
      sketch.vertex(v.x, v.y);
    }
    sketch.endShape(sketch.CLOSE);
    sketch.pop();
  }

  hasFreeConnections() {
    return this.freeConnections.length > 0;
  }

  getRandomConnectionPoint() {
    const i = Math.floor(Math.random() * this.freeConnections.length);
    const index = this.freeConnections[i];
    this.freeConnections.splice(i, 1);
    return this.connections[index];
  }
}

class Line extends Geometry {
  constructor(sketch, x, y, angle, size, color) {
    super(sketch, x, y, angle, size, color);
    this.vertices = this.createVertices(sketch, size, angle);
    this.connections = this.createConnectionPoints(this.vertices);
  }
  
  createVertices(sketch, size, angle) {
    const verts = [];
    const hsize = size / 2.0;
    const x0 = Math.cos(angle) * hsize;
    const y0 = Math.sin(angle) * hsize;
    const v0 = sketch.createVector(x0, y0);
    verts.push(v0);

    const x1 = Math.cos(Math.PI + angle) * hsize;
    const y1 = Math.sin(Math.PI + angle) * hsize;
    const v1 = sketch.createVector(x1, y1);
    verts.push(v1);

    return verts;
  }

  createConnectionPoints(vertices) {
    this.freeConnections = this.vertices.map((_, i) => i);
    return vertices;
  }
}

class Triangle extends Geometry {
  constructor(sketch, x, y, angle, size, color) {
    super(sketch, x, y, angle, size, color);
    this.vertices = this.createVertices(sketch, size, angle);
    this.connections = this.createConnectionPoints(this.vertices);
  }
  
  createVertices(sketch, size, angle) {
    const verts = [];
    const hsize = size / 2.0;
    const x0 = Math.cos(angle) * hsize;
    const y0 = Math.sin(angle) * hsize;
    const v0 = sketch.createVector(x0, y0);
    verts.push(v0);

    const x1 = Math.cos(2 * Math.PI / 3 + angle) * hsize;
    const y1 = Math.sin(2 * Math.PI / 3 + angle) * hsize;
    const v1 = sketch.createVector(x1, y1);
    verts.push(v1);

    const x2 = Math.cos(4 * Math.PI / 3 + angle) * hsize;
    const y2 = Math.sin(4 * Math.PI / 3 + angle) * hsize;
    const v2 = sketch.createVector(x2, y2);
    verts.push(v2);

    return verts;
  }

  createConnectionPoints(vertices) {
    this.freeConnections = this.vertices.map((_, i) => i);
    return vertices;
  }
}

class Square extends Geometry {
  constructor(sketch, x, y, angle, size, color) {
    super(sketch, x, y, angle, size, color);
    this.vertices = this.createVertices(sketch, size, angle);
    this.connections = this.createConnectionPoints(this.vertices);
  }
  
  createVertices(sketch, size, angle) {
    const verts = [];
    const hsize = size / 2.0;
    const x0 = Math.cos(angle) * hsize;
    const y0 = Math.sin(angle) * hsize;
    const v0 = sketch.createVector(x0, y0);
    verts.push(v0);

    const x1 = Math.cos(Math.PI / 2 + angle) * hsize;
    const y1 = Math.sin(Math.PI / 2 + angle) * hsize;
    const v1 = sketch.createVector(x1, y1);
    verts.push(v1);

    const x2 = Math.cos(2 * Math.PI / 2 + angle) * hsize;
    const y2 = Math.sin(2 * Math.PI / 2 + angle) * hsize;
    const v2 = sketch.createVector(x2, y2);
    verts.push(v2);

    const x3 = Math.cos(3 * Math.PI / 2 + angle) * hsize;
    const y3 = Math.sin(3 * Math.PI / 2 + angle) * hsize;
    const v3 = sketch.createVector(x3, y3);
    verts.push(v3);

    return verts;
  }

  createConnectionPoints(vertices) {
    this.freeConnections = this.vertices.map((_, i) => i);
    return vertices;
  }
}

class Circle extends Geometry {
  constructor(sketch, x, y, angle, size, color) {
    super(sketch, x, y, angle, size, color);
    this.vertices = this.createVertices(sketch, size, angle);
    this.connections = this.createConnectionPoints(this.vertices);
  }
  
  createVertices(sketch, size, angle) {
    const verts = [];
    const hsize = size / 2.0;
    const x0 = Math.cos(angle) * hsize;
    const y0 = Math.sin(angle) * hsize;
    const v0 = sketch.createVector(x0, y0);
    verts.push(v0);

    const x1 = Math.cos(Math.PI + angle) * hsize;
    const y1 = Math.sin(Math.PI + angle) * hsize;
    const v1 = sketch.createVector(x1, y1);
    verts.push(v1);

    return verts;
  }

  createConnectionPoints(vertices) {
    return vertices;
  }
}