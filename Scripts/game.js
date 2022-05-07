const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor(){
        this.velocity = {
            x:0,
            y:0
        }

        this.rotation = 0

        const image = new Image()
        image.src = '../Images/SpaceShip.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height-20
            }
        }
   
    }
    draw() {

        c.save()
        c.translate(player.position.x + player.width /2 , player.position.y + player.height / 2)
        c.rotate(this.rotation)
        c.translate(-player.position.x - player.width /2 , -player.position.y - player.height / 2)
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        c.restore()
    }
    
    update() {
        if(this.image){
        this.draw()
        this.position.x += this.velocity.x
        }
    }
}
class Enemy {
    constructor(){
        this.velocity = {
            x:0,
            y:3
        }

        const image = new Image()
        image.src = '../Images/Enemy.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: Math.random()*canvas.width,
                y: 0
            }
        }
   
    }
    draw() {

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }
    
    update() {
        if(this.image){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            if(this.position.y > canvas.height-player.height-80){
                game.active = false
            }
        
        }
    }
}
class Projectile{
    constructor({position , velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 4
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x , this.position.y, this.radius, 0, Math.PI * 2 )
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
    }
}
game = {
    active:true
}
const player = new Player()
const projectiles = []
const enemys = []


const keys = {
    ArrowLeft: {
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    Space:{
        pressed:false
    }
}
setInterval(()=>{
    enemys.push(new Enemy())
},2000  )

function animate(){
   
    requestAnimationFrame(animate)
    if(!game.active){
        return
    }
    c.fillStyle = 'black'
    c.fillRect(0, 0 , canvas.width , canvas.height)
    player.update()
    enemys.forEach((enemy) => {
        enemy.update()
    })
    enemys.forEach((enemy,i) => {
       projectiles.forEach((projectile,j)=>{
           if(projectile.position.y - projectile.radius <= enemy.position.y+enemy.height &&
              (projectile.position.x > enemy.position.x && projectile.position.x < enemy.position.x+enemy.width))
            {
               setTimeout(()=>{
                enemys.splice(i,1)
                projectiles.splice(j,1)
               },0)
           }
           
       })
    })

    projectiles.forEach( (projectile , index) => {
        if(projectile.position.y+ projectile.radius <= 0){
            setTimeout(()=>{
                projectiles.splice(index , 1)
            },0)
        }else{
            projectile.update()
        }
        
    })
    
    if(keys.ArrowLeft.pressed && player.position.x >=0){
        player.velocity.x = -25
        player.rotation = -0.25
    }
    else if(keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width){
        player.velocity.x = 25
        player.rotation = 0.25
    }
    else{
        player.velocity.x  = 0
        player.rotation = 0
    }
}

animate()


addEventListener('keydown', ({key})=>{
    console.log(key)
    switch (key){
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break;
        case ' ':
            projectiles.push(new Projectile({
                position:{
                    x:player.position.x + player.width /2,
                    y:player.position.y
                },
                velocity:{
                    x:0,
                    y:-20
                }
            })
            )
            break;
    }
})

addEventListener('keyup', ({key})=>{
    console.log(key)
    switch (key){
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case ' ':
            break;
    }
})