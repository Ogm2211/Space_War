const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const score = document.querySelector('#score')
const stage = document.querySelector('#stage')
canvas.width = innerWidth
canvas.height = innerHeight
let scorePoint = 0
let gameOver  = new Image()
gameOver.src = '../Images/uploads_game_over_game_over_PNG23.png'
let globalScale = 1
let xMultiplayer = 1
let yMultiplayer = 1
class Player {
    constructor(){
        this.velocity = {
            x:0,
            y:0
        }
        this.opacity = 1
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
        c.globalAlpha = this.opacity
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
    constructor(velocityY){
        this.velocity = {
            x:0,
            y:velocityY
        }

        const image = new Image()
        image.src = '../Images/Enemy.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: (Math.random()*(canvas.width-100)),
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
            this.position.x += Math.random()*4-2
            this.position.y += this.velocity.y
            if(this.position.y > canvas.height-player.height-80){
                game.activeLine = true  
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
class EnemyProjectile{
    constructor({position , velocity}) {
        this.position = position
        this.velocity = velocity
        this.width =3
        this.height = 10
    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
    }
}
class Particle{
    constructor({position , velocity ,radius, color}){
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.opacity = 1
    }
    draw(){
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath()
        c.arc(this.position.x , this.position.y, this.radius , 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.opacity -= 0.01
    }
}
class SuperPower{
    constructor() {
        this.position = {
            x: Math.random()*canvas.width,
            y: 40
        }
        this.velocity = {
            x: 10,
            y: 10
        }
        this.radius = 20
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x , this.position.y, this.radius, 0, Math.PI * 2 )
        c.fillStyle = 'orange'
        c.fill()
        c.closePath()
    }

    update(){
        this.draw()
     
        if(this.position.x > canvas.width-50 && this.position.y < canvas.height - player.height ){
            xMultiplayer *= -1
            this.position.x += (this.velocity.x * xMultiplayer)
        }
        else if(this.position.y > canvas.height - player.height && this.position.x < canvas.width ){
            yMultiplayer *= -1
            this.position.y += (this.velocity.y * yMultiplayer)
        }
        else if(this.position.y < 30 && this.position.x < canvas.width){
            yMultiplayer *= -1
            this.position.y += (this.velocity.y * yMultiplayer)
        }
        else if(this.position.x < 0 && this.position.y < canvas.height - player.height ){
            xMultiplayer *= -1
            this.position.x += (this.velocity.x * xMultiplayer)
        }
        else{
            this.position.x += (this.velocity.x * xMultiplayer)
            this.position.y += (this.velocity.y * yMultiplayer)
        }
        
        
    }


}
game = {
    active:true,
    activeLine : false
}
const player = new Player()
const projectiles = []
const enemys = []
const enemyProjectiles = []
const particles = []
const stars = []
const superPowers  = []
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
setTimeout(()=>{
   setInterval(()=>{
    superPowers.push(new SuperPower())
   },10000) 
},0)
stage.innerHTML = "Stage 1"
setTimeout(()=>{
    stage.innerHTML = " "
},1000)
let Stage1 = setInterval(()=>{
    enemys.push(new Enemy(2))
},1750  )
setTimeout(() => {
    stage.innerHTML = "Stage 2"
    setTimeout(()=>{
    stage.innerHTML = " "
    },1000)
    clearInterval(Stage1);
    let Stage2 = setInterval(() => {
        enemys.push(new Enemy(4))
    },1500)
    setTimeout(() => {
        stage.innerHTML = "Stage 3"
        setTimeout(()=>{
        stage.innerHTML = " "
        },1000)
        clearInterval(Stage1);
        let Stage2 = setInterval(() => {
            enemys.push(new Enemy(6))
        },1250)
        setTimeout(() => {
            stage.innerHTML = "Stage 4"
            setTimeout(()=>{
            stage.innerHTML = " "
            },1000)
            clearInterval(Stage1);
            let Stage2 = setInterval(() => {
                enemys.push(new Enemy(8))
            },1000)
            setTimeout(() => {
                stage.innerHTML = "Stage 5"
                setTimeout(()=>{
                stage.innerHTML = " "
                },1000)
                clearInterval(Stage1);
                let Stage2 = setInterval(() => {
                    enemys.push(new Enemy(10))
                },750)
            }, 60000);
        }, 45000);
    }, 30000);
}, 15000);


setInterval(()=>{
    let current = Math.floor(Math.random()* enemys.length)
    console.log(current)
    enemyProjectiles.push(new EnemyProjectile({position:{
        x:enemys[current].position.x + enemys[current].width /2,
        y:enemys[current].position.y + enemys[current].height
    },
    velocity:{
        x:0,
        y:4
    }}))
},2000)
console.log(enemyProjectiles.toString())

function animate(){
    c.drawImage(gameOver, canvas.width/2 - gameOver.width * globalScale /2,canvas.height/2 - gameOver.height * globalScale / 2,gameOver.width * globalScale,gameOver.height * globalScale)
    requestAnimationFrame(animate)
    if(game.activeLine){
        enemys.forEach((enemy,index)=>{
                enemys.splice(index,1 )
                for(let i =0 ; i< 15 ; i++){
                    particles.push(new Particle({
                        position:{
                            x:enemy.position.x + enemy.width /2,
                            y:enemy.position.y + enemy.height / 2
                        },
                        velocity:{
                            x:(Math.random()-0.5)*2,
                            y:(Math.random()-0.5)*2
                        },
                        radius: Math.random() *3,
                        color: "#BAA0DE"
                    }))
                }
                setTimeout(()=>{
                    game.active = false
                },2000)
            })
    }
    if(!game.active){
        return
    }
    c.fillStyle = 'black'
    c.fillRect(0, 0 , canvas.width , canvas.height)
    for(let i =0 ; i<3 ; i++){
        particles.push(new Particle({
            position:{
                x:Math.random() * canvas.width,
                y:Math.random() * canvas.height
            },
            velocity:{
                x:0,
                y:3
            },
            radius: Math.random() *1.5,
            color: "white"
        }))
    }
    player.update()
    enemys.forEach((enemy) => {
        enemy.update()
    })
    superPowers.forEach((superPower, index)=>{
        superPower.update()
        if(superPower.position.y  >= player.position.y && (superPower.position.x > player.position.x && superPower.position.x < player.position.x+player.width))
            {
                superPowers.splice(index,1)
                enemys.forEach((enemy,index)=>{
                    enemys.splice(index,1 )
                    for(let i =0 ; i< 15 ; i++){
                        particles.push(new Particle({
                            position:{
                                x:enemy.position.x + enemy.width /2,
                                y:enemy.position.y + enemy.height / 2
                            },
                            velocity:{
                                x:(Math.random()-0.5)*2,
                                y:(Math.random()-0.5)*2
                            },
                            radius: Math.random() *3,
                            color: "#BAA0DE"
                        }))
                    }
                })
            }
    })
    particles.forEach((particle,index) =>{
        if(particle.opacity <= 0){
            particles.splice(index,1)
        }
        else{
        particle.update()
        }
    })
    
    enemyProjectiles.forEach((enemyProjectile)=>{
        enemyProjectile.update()
        if(enemyProjectile.position.y  >= player.position.y && (enemyProjectile.position.x > player.position.x && enemyProjectile.position.x < player.position.x+player.width)){
            player.opacity =0;
            for(let i =0 ; i< 15 ; i++){
                particles.push(new Particle({
                    position:{
                        x:player.position.x + player.width /2,
                        y:player.position.y + player.height / 2
                    },
                    velocity:{
                        x:(Math.random()-0.5)*2,
                        y:(Math.random()-0.5)*2
                    },
                    radius: Math.random() *3,
                    color: "white"
                }))
            }
            setTimeout(()=>{
                game.active = false
            },2000)
            
        }
    })
    
    enemys.forEach((enemy,i) => {
       projectiles.forEach((projectile,j)=>{
           if(projectile.position.y - projectile.radius <= enemy.position.y+enemy.height &&
              (projectile.position.x > enemy.position.x && projectile.position.x < enemy.position.x+enemy.width))
            {
                for(let i =0 ; i< 15 ; i++){
                    particles.push(new Particle({
                        position:{
                            x:enemy.position.x + enemy.width /2,
                            y:enemy.position.y + enemy.height / 2
                        },
                        velocity:{
                            x:(Math.random()-0.5)*2,
                            y:(Math.random()-0.5)*2
                        },
                        radius: Math.random() *3,
                        color: "#BAA0DE"
                    }))
                }
               
            

               setTimeout(()=>{
                enemys.splice(i,1)
                projectiles.splice(j,1)
               },0)
               scorePoint +=100
               score.innerHTML = scorePoint
           }
           
       })
    })
    enemyProjectiles.forEach((enemyProjectile,index) => {
        if(enemyProjectile.position.y   > player.position.y + enemyProjectile.height){
            enemyProjectiles.splice(index,1)
        }
        else{
            enemyProjectile.update()
        }
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