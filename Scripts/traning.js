const yoda = document.getElementById("yodaPic")
const yodaText = document.querySelector(".yodaText")
const yodaText2 = document.querySelector(".yodaText2")
const spaceShip =  document.getElementById('spaceShip')
const yodaleft = document.querySelector('.yodaleft')
const yodaRight = document.querySelector('.yodaright')
const yodaText3 = document.querySelector('.yodaText3')
const body = document.querySelector('body')
const btn = document.querySelector('span')
// let spaceShipPosition  = window.getComputedStyle(spaceShip).getPropertyValue('left')
let spaceShipPosition = 1480
let yodaLeftPosition = 950
let yodaRightPosition = 2050
window.onload = function() {
    yoda.classList.replace("displayNone",'in')
    yodaText.classList.replace('displayNone','in')
    setTimeout(()=>{
        yoda.classList.replace('in','out')
        
        yodaText.classList.replace('in','out')
      
    },4000)
    setTimeout(()=>{
        yodaText2.classList.replace('displayNone','in')
        yodaleft.classList.replace('displayNone','in')
        yoda.classList.add('displayNone')
        yodaText.classList.add('displayNone')
    } , 5000)
  
}
function moveLeft() {
    spaceShipPosition -=40
    spaceShip.style.left = spaceShipPosition  + 'px';
}
function moveRight() {
    spaceShipPosition +=40
    spaceShip.style.left = spaceShipPosition  + 'px';
}
function leftSide () {
    yodaleft.classList.replace('in','out')
    yodaText2.classList.replace('in','out')
    setTimeout(()=>{
        if(yodaRight.classList.contains('displayNone')){
            yodaRight.classList.replace('displayNone','in')
            yodaText3.classList.replace('displayNone','in')
            }
    },2000)
}
function rightSide(){
    yodaRight.classList.replace('in','out')
    yodaText3.classList.replace('in','out')
    setTimeout(()=>{
        if(yoda.classList.contains('displayNone')){
            yodaText.innerHTML = "You can fire with Space"
            yoda.classList.replace('displayNone','in')
            yodaText.classList.replace('displayNone','in')
            }
    },2000)
    setTimeout(()=>{
        yoda.classList.replace('in','out')
        yodaText.classList.replace('in','out')
        btn.classList.replace('displayNone','in')
    },7000)
}
function fireLaser(){
  let laser = createLaserElement()
  body.appendChild(laser)
  moveLaser(laser)

}
function createLaserElement() {
    let newLaser = document.createElement('div')
    newLaser.classList.add('laser')
    newLaser.style.left = `${spaceShipPosition + 62}px`
    return newLaser
}
function moveLaser(laser){
    let laserInterval = setInterval(()=>{
        let position = parseInt(window.getComputedStyle(laser).getPropertyValue('top'))
        if(position<0){
            laser.remove()
        }
        else{
            position -= 20
            laser.style.top = position+'px'
        
        }
    })
}
document.querySelector('body').addEventListener('keydown', function(event) {
    switch (event.key) {
    case 'ArrowLeft':
        
        if(spaceShipPosition > yodaLeftPosition){
            moveLeft();
            break;
        }
        else{
            leftSide()
            break;
        }
          
       case 'ArrowRight':
        if(spaceShipPosition <= yodaRightPosition){
          moveRight();
          break;}
        else{ 
            rightSide()
            break;
        }
       case ' ':
           fireLaser();
           break;
        }
    })
