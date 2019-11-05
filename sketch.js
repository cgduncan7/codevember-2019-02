/**
 * sketch
 */
var s = function(sketch) {
  // #region settings
  const framerate = 120;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const bgColor = sketch.color(0, 0, 0);
  // #endregion

  const shapes = [];
  let shader;
  let graphics;

  // #region p5
  sketch.preload = function() {
    shader = sketch.loadShader('effect.vert', 'effect.frag');
  }

  sketch.setup = function() {
    const p5canvas = sketch.createCanvas(w, h, sketch.WEBGL);
    canvas = p5canvas.canvas;
    graphics = sketch.createGraphics(w, h);

    makeShapes(100);

    sketch.frameRate(framerate);
    graphics.background(bgColor);
  }

  sketch.draw = function() {
    graphics.background(bgColor);
    for (let shape of shapes) {
      shape.draw(graphics);
    }
    sketch.shader(shader);
    shader.setUniform('tex0', graphics);
    shader.setUniform('resolution', [w, h]);
    shader.setUniform('offsetAmount', 10);
    sketch.rect(0,0,w,h);
  }

  sketch.mousePressed = function() {
    makeShapes(100);
  }

  makeShapes = function(numShapes) {
    for (let i = 0; i < numShapes; i += 1) {
      let shape;
      let x = w/2;
      let y = h/2;
      
      if (shapes.length > 0) {
        const availableShapes = shapes.filter((shape) => shape.hasFreeConnections());
        const shapeIndex = Math.floor(Math.random() * availableShapes.length);
        const shape = availableShapes[shapeIndex];
        const cp = shape.getRandomConnectionPoint();
        x = cp.x + shape.loc.x;
        y = cp.y + shape.loc.y;
      }

      const angle = Math.random(0, 1) * Math.PI * 2;
      const size = Math.min(w/2, h/2) * Math.random();
      const color = sketch.color(Math.random() * 255, Math.random() * 255, Math.random() * 255);

      let t = Math.round(sketch.random(0, 2));
      switch (t) {
        case 0: {
          shape = new Line(sketch, x, y, angle, size, color);
          break;
        }
        case 1: {
          shape = new Triangle(sketch, x, y, angle, size, color);
          break;
        }
        case 2:
        default: {
          shape = new Square(sketch, x, y, angle, size, color);
          break;
        }
      }
      shapes.push(shape);
    }
  }
  // #endregion
};

var sketch = new p5(s, document.getElementById('sketch'));
