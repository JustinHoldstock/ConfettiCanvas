## Easy Confetti!

![It's Pizza Time!](./pizza-time.gif)

### How to install

1. Create a canvas with the class `confetti` on it
2. Include the script on your page AFTER you define the body (I am lazy)

### How to run

```js
// Create instance
const cannon = new ConfettiCannon();
// Create a buncha sprites in the sprite pool.
// I find 500 is enough
cannon.createSprites(500);
// You don't have to do this, but useful for debugging
window.cannon = cannon;

// Render/update loop
let lastFrame = Date.now();
function update() {
  const dt = (Date.now() - lastFrame) * 0.001;
  cannon.update(dt);
  lastFrame = Date.now();
  window.requestAnimationFrame(update);
}

// Kickstart the whole thing. Remember to clean up your RAF when done
update();

// Invoke this is render all 500 at once!
// Once a piece of confetti has fallen, you have to wait until it hits the ground to shoot more.
cannon.shoot(); // or cannon.pizzaTime()
```

### Todo

[] More configuration of sprites

[] Init method that allows you to fetch canvas instead of just when the script runs
