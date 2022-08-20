PIXI.utils.sayHello() // the code from Step 3, you can leave it// create a canvas for all of your game elements
const renderer = PIXI.autoDetectRenderer(512, 512, {
  transparent: true,
  resolution: 1,
})
const displayDiv = document.querySelector('#display')
displayDiv.appendChild(renderer.view)
const stage = new PIXI.Container()

const loader = PIXI.Loader.shared
loader.add('spritesheet', 'images/skeleton.png').load(setup)

var sprite

function setup() {
  stage.interacrive = true

  const rect = new PIXI.Rectangle(0, 0, 64, 64)

  const texture = loader.resources['spritesheet'].texture

  texture.frame = rect

  sprite = new PIXI.Sprite(texture)

  // setInterval to actual animate the sprite
  const idle = setInterval(function () {
    if (rect.x >= 64 * 4) rect.x = 0
    sprite.texture.frame = rect
    rect.x += 64
  }, 500)

  // highly recommend to use scale to change frame size
  sprite.scale.set(2, 2) // these two lines are for eventlistener later
  sprite.vx = 10
  sprite.vy = 10
  stage.addChild(sprite) // add sprite to stage area
  animationLoop() // from below helper function
}

// helper function
function animationLoop() {
  // a function from Pixi
  requestAnimationFrame(animationLoop)
  renderer.render(stage)
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' && sprite.x < 650) {
    sprite.x += sprite.vx
  } else if (event.key === 'ArrowLeft' && sprite.x > 0) {
    sprite.x -= sprite.vx
  } else if (event.key === 'ArrowDown' && sprite.y < 450) {
    sprite.y += sprite.vy
  } else if (event.key === 'ArrowUp' && sprite.y > 0) {
    sprite.y -= sprite.vy
  }
})
