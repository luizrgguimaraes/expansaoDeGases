
const FRAMERATE = 60;
const CANVASW = 300;
const CANVASH = 300;
const LARGURADIVISORIA = 5;
const CORFUNDOCANVAS = [0,0,0];
const CFGQTDCONFIGLINHA = 3;


const CFGHABILITARDEBUG =           0;
const CFGHABILITARERRODEBUG =       1;
const CFGHABILITARPAUSAERRO =       2;
const CFGHABILITARPAUSACOLISAO =    3;
const CFGHABILITARNUMEROPARTICULA = 4;
const CFGHABILITARDIRECAOPARTICULA = 5;
const CFGPASSO =                    6;
const CFGERRO =                    7;
const CFGMULTIPLICADORMASSARAIO =   8;
const CFGLABELESTOCASTICA = 9;
const CFGESTOCASTICAVELOCIDADE = 10;
const CFGESTOCASTICAMASSA = 11;
const CFGESTOCASTICAANGULO2D = 12;
const CFGESTOCASTICAANGULO3D = 13;
const CFGMAXPARTICULAS = 14;
const CFGMOSTRARRASTRO =15; 


const TIPOCHECKBOX = 0;
const TIPOTEXTBOX = 1;
const TIPOLABEL = 2;

class GLOBALS{}
GLOBALS.config = Array();
GLOBALS.config[CFGHABILITARDEBUG] =[TIPOCHECKBOX,0,"Habilitar Debug"];
GLOBALS.config[CFGHABILITARERRODEBUG] =[TIPOCHECKBOX,0,"Habilitar Erros"];
GLOBALS.config[CFGHABILITARPAUSAERRO] =[TIPOCHECKBOX,0,"Pausar no Erro"];
GLOBALS.config[CFGHABILITARPAUSACOLISAO] =[TIPOCHECKBOX,1,"Pausar na colisao"];
GLOBALS.config[CFGHABILITARNUMEROPARTICULA] =[TIPOCHECKBOX,1,"Mostrar Número da Molécula"];
GLOBALS.config[CFGHABILITARDIRECAOPARTICULA] =[TIPOCHECKBOX,0,"Mostrar Direcao da Particula"];
GLOBALS.config[CFGPASSO] =[TIPOTEXTBOX,1,"Passo de deslocamento"];
GLOBALS.config[CFGERRO] =[TIPOTEXTBOX,0.001,"Erro"];
GLOBALS.config[CFGMULTIPLICADORMASSARAIO] =[TIPOTEXTBOX,5,"Multiplicador Raio"];
GLOBALS.config[CFGLABELESTOCASTICA] =[TIPOLABEL,,"*Deixe em branco para ativar o modo estocastico"];
GLOBALS.config[CFGESTOCASTICAVELOCIDADE] =[TIPOTEXTBOX,"","Velocidade Inicial[1-5]*"];
GLOBALS.config[CFGESTOCASTICAANGULO2D] =[TIPOTEXTBOX,"","Angulacao 2D [0-90]*"];
GLOBALS.config[CFGESTOCASTICAANGULO3D] =[TIPOTEXTBOX,"","Angulacao 3D [0-90]*"];
GLOBALS.config[CFGESTOCASTICAMASSA] =[TIPOTEXTBOX,"","Massa [1-5]*"];
GLOBALS.config[CFGMAXPARTICULAS] =[TIPOTEXTBOX,5,"Qtd Máxima de Moléculas"];
GLOBALS.config[CFGMOSTRARRASTRO] =[TIPOCHECKBOX,0,"Mostrar Rastro"];
               
function getConfig(idconfig){try{ return GLOBALS.config[idconfig][1]; }catch(err){alert("Erro getConfig: "+err)}}

criarElementosConfig("tblConfiguracoesDebug");

function setup() {try{

        frameRate(FRAMERATE);
        createCanvas(CANVASH+CANVASH+LARGURADIVISORIA, CANVASW);
        //createCanvas(CANVASH, CANVASW);
        noLoop();
        
        
        GLOBALS.particulas = new Particulas();
        GLOBALS.distribuicaoAnguloXY = new Distribuicao([0,10,20,30,40,50,60,70,80,90],[5,5,5,10,30,20,10,5,5,5]);
        GLOBALS.distribuicaoAnguloXZ = new Distribuicao([0,10,20,30,40,50,60,70,80,90],[5,5,5,10,30,20,10,5,5,5]);
        GLOBALS.distribuicaoVelocidade = new Distribuicao([1,2,3,4,5],[20,30,20,15,5]);
        GLOBALS.distribuicaoMassa = new Distribuicao([1,2,3,4,5],[10,20,40,20,10]);
        
        
        GLOBALS.idParticula = 0;
        
        GLOBALS.tempo = 0;
        GLOBALS.segundo = 0;
        GLOBALS.noLoop = 0;
        

}catch(err){ alert('Erro setup(): '+err); }}

function draw() {try{
        
        if(getConfig(CFGMOSTRARRASTRO))background('rgba(200,200,200, 0.25)');
        else background(CORFUNDOCANVAS);
        
        
        if(GLOBALS.tempo%FRAMERATE==0){
            GLOBALS.segundo++;
            
            
            if(GLOBALS.idParticula<getConfig(CFGMAXPARTICULAS)){
                    GLOBALS.idParticula++;
                    var anguloXY;
                    var anguloXZ;
                    var massa;
                    var velocidade;
                     
                    if(getConfig(CFGESTOCASTICAVELOCIDADE)==""){
                        velocidade = GLOBALS.distribuicaoVelocidade.getValor();
                    }else{
                        velocidade = getConfig(CFGESTOCASTICAVELOCIDADE)
                    }
                    if(getConfig(CFGESTOCASTICAANGULO2D)==""){
                        anguloXY = GLOBALS.distribuicaoAnguloXY.getValor();
                    }else{
                        anguloXY = getConfig(CFGESTOCASTICAANGULO2D)
                    }
                    if(getConfig(CFGESTOCASTICAANGULO3D)==""){
                        anguloXZ = GLOBALS.distribuicaoAnguloXZ.getValor();
                    }else{
                        anguloXZ = getConfig(CFGESTOCASTICAANGULO3D)
                    }
                    if(getConfig(CFGESTOCASTICAMASSA)==""){
                        massa = GLOBALS.distribuicaoMassa.getValor();
                    }else{
                        massa = getConfig(CFGESTOCASTICAMASSA)
                    }
                    
                    massa = GLOBALS.distribuicaoMassa.getValor();
                    GLOBALS.particulas.add(new Particula(GLOBALS.idParticula,anguloXY,anguloXZ,velocidade,massa));
            }
            
        }
        GLOBALS.particulas.draws();

        GLOBALS.particulas.movers();
        
        GLOBALS.particulas.colisoes();
        
        stroke(255,0,0); strokeWeight(LARGURADIVISORIA); line(CANVASH,0,CANVASH,CANVASW);
        
        GLOBALS.tempo++;
        
        
        

}catch(err){ alert('Erro draw(): '+err); }}


//alert('ola main');