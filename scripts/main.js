const canvas = document.body.querySelector('canvas.confetti');
const dpr = window.devicePixelRatio || 1;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
const ctx = canvas.getContext('2d');
ctx.width = canvas.clientWidth * devicePixelRatio;
ctx.height = canvas.clientHeight * devicePixelRatio;

const COLORS = ['orange', 'red', 'blue'];

class Sprite {
  rotation = 0;
  scale = 1;
  x = 0;
  y = 0;
  width = 5;
  height = 5;
  color = 'green';
  visible = false;
  fallFactor = 1;
  spinFactor = 1;
  weight = 1;

  constructor({ maxScale = 3, width = 10, height = 10, spinFactor = 5, weight = 50 } = {}) {
    // random size
    this.scale = Math.random() * maxScale;
    this.width = Math.random() * width;
    this.height = Math.random() * height;

    // random color
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

    // random rotation
    this.rotation = (Math.random() * 360 * Math.PI) / 180;
    this.spinFactor = Math.random() * spinFactor;

    this.weight = weight + Math.random() * weight;
  }

  render() {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(this.x + this.height / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  update(dt) {
    this.fallFactor += this.weight * dt;
    this.y += dt * this.fallFactor;
    this.rotation += dt * this.spinFactor;
    if (this.y > ctx.height + 50) {
      this.visible = false;
    }
  }
}

class ConfettiCannon {
  x = 0;
  y = 0;
  pool = [];

  createSprites(numSprites = 100) {
    for (let i = 0; i < numSprites; i++) {
      this.pool.push(new Sprite());
    }
  }

  update(dt) {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    const numSprites = this.pool.length;
    for (let i = 0; i < numSprites; i++) {
      const sprite = this.pool[i];
      if (sprite.visible) {
        sprite.update(dt);
        sprite.render();
      }
    }
  }

  shoot() {
    this.pizzaTime();
  }

  pizzaTime() {
    this.pool.forEach((sprite) => {
      if (sprite.visible) {
        return;
      }
      sprite.visible = true;
      sprite.x = ctx.width * Math.random();
      sprite.y = -ctx.height * Math.random();
      sprite.fallFactor = 1;
    });
  }
}
