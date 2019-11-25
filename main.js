const FRAMERATE = 30;
const CANVASW = 600;
const CANVASH = 600;
const CORFUNDOCANVAS = [125,125,125];
class GLOBALS{}

const PASSO = 1;

function setup() {try{

        frameRate(FRAMERATE);
        createCanvas(CANVASH, CANVASW);
        background(CORFUNDOCANVAS);
        noLoop();


        GLOBALS.particulas = new Particulas();
        GLOBALS.particulas.add(new Particula(1,90,6,500,300));
        GLOBALS.particulas.add(new Particula(2,90,2,500,100));
        GLOBALS.particulas.add(new Particula(3,30,3,100,100));
        GLOBALS.particulas.add(new Particula(4,45,2,50,100));
        //GLOBALS.particulas.add(new Particula(5,85,8,200,100));
        //GLOBALS.particulas.add(new Particula(6,110,0.5,250,100));


}catch(err){ alert('Erro setup(): '+err); }}

function draw() {try{
        background(CORFUNDOCANVAS);

        GLOBALS.particulas.draws();
        GLOBALS.particulas.movers();
        
        
        if(GLOBALS.particulas.colisoes()){
            //noLoop();
        }
        


}catch(err){ alert('Erro draw(): '+err); }}


alert('ola main');