class Coordenadas{
    constructor(x,y){
        this.setX(x);
        this.setY(y);
    }

    clone(obj){
        this.x = obj.x;
        this.y = obj.y;
    }
    
    soma(vetor){
        this.x += vetor.x;
        this.y += vetor.y;
    }
    
    setX(n){
        this.x = round2(n,5);
    }
    setY(n){
        this.y = round2(n,5);
    }
}


class Particulas{
    constructor(){
        this.array = Array();
    }

    add(obj){try{
            this.array.push(obj);
    }catch(err){ alert('Erro Particulas.add(): '+err);}}

    draws(){try{
        for(var i=0; i < this.array.length;i++){
             this.array[i].draw();
        }
    }catch(err){ alert('Erro Particulas.draws(): '+err);}}

    movers(){try{
        
        for(var i=0; i < this.array.length;i++){
            this.array[i].mover();
        }
    }catch(err){ alert('Erro Particulas.movers(): '+err);}}

    colisoes(){try{
 
        for(var i=0; i < (this.array.length-1);i++){
            for(var j=i+1; j < this.array.length;j++){
                var obj1 = this.array[i];
                var obj2 = this.array[j]; 
                if(obj1.colisaoX(obj2)){
                    obj1.reverterPosicao();
                    obj2.reverterPosicao();
                    
                    //noLoop();
                    Debug.print(["Colisao ",obj1.id,obj2.id]);
                    
                    var vax0 = obj1.vetor.x;
                    var vbx0 = obj2.vetor.x; 
                    var vay0 = obj1.vetor.y;
                    var vby0 = obj2.vetor.y;
                    
                    var momentoInicialx = vax0 + vbx0;
                    Debug.print(["antesx",vax0,vbx0]);
                    var vaxf = calcularNovaVelocidadeA(vax0,vbx0);
                    var vbxf = calcularNovaVelocidadeA(vbx0,vax0);
                    
                    var momentoInicialy = vay0 + vby0;
                    Debug.print(["antesy",vay0,vby0]);
                    var vayf = calcularNovaVelocidadeA(vay0,vby0);
                    var vbyf = calcularNovaVelocidadeA(vby0,vay0);
                    
                    
                    var momentoAtualx = 0;
                    var momentoAtualy = 0;
                    var settedX = false;
                    var settedY = false;
                    for(var m=0;m<=1;m++){
                        for(var n=0;n<=1;n++){
                            momentoAtualx = vaxf[m]+vbxf[n];
                            
                            if( (momentoAtualx == momentoInicialx) && (vax0 != vaxf[m]) && !settedX){
                                Debug.print(["nova ConfiguracaoX",vaxf[m],vbxf[n]]);
                                obj1.vetor.setX(vaxf[m]);
                                obj2.vetor.setX(vbxf[n]);
                                settedX = true;
                            }
                            
                            momentoAtualy = vayf[m]+vbyf[n];
                            
                            if( (momentoAtualy == momentoInicialy) && (vay0 != vayf[m]) && !settedY ){
                                Debug.print(["nova ConfiguracaoY",vayf[m],vbyf[n]]);
                                obj1.vetor.setY(vayf[m]);
                                obj2.vetor.setY(vbyf[n]);
                                settedY = true;
                            }
                            
                            if(settedX && settedY){
                                obj1.mover();
                                obj2.mover();
                                break;
                            }
                            
                        }
                        if(settedX && settedY){
                            break;
                        }
                    
                        
                    }
                    
                    
                }
            }
        }
        return false;
        
    }catch(err){ alert('Erro Particulas.colisoes(): '+err);}}

}

function calcularNovaVelocidadeA(VA,VB){try{
    Debug.print(["VA/VB",VA,VB]);
    var delta = 4*Math.pow(VA,2) - 8*VA*VB + 4*Math.pow(VB,2);
    Debug.print(["delta",delta]);
    var raizDelta = Math.sqrt(delta);
    Debug.print(["raizDelta",raizDelta]);
    var menosb = 2*VA + 2*VB;
    Debug.print(["menosb",menosb]);
    var doisa = 4.0;
    var result = [round2(((menosb + raizDelta)/doisa),5),round2(((menosb - raizDelta)/doisa),5)];
    Debug.print(["result"]);
    Debug.print(result);
    return result; 





}catch(err){ alert('Erro calcularNovaVelocidade():'+err);}}
// 
// function energiaCineticaInicial(A,B){
//      return ((A.velocidade*A.velocidade)/2 + (B.velocidade*B.velocidade)/2);
//}

class Particula{
    constructor(id,angulo, velocidade, x, y){
        this.id = id;
        this.pos = new Coordenadas(x,y);
        this.posAnterior = new Coordenadas(null,null);
        this.cor = Cores.getNewCor();
        this.raio = 10;
        this.direcao = angulo * Math.PI / 180;
        this.velocidade = velocidade;
        this.vetor = new Coordenadas(Math.cos(this.direcao)*this.velocidade, Math.sin(this.direcao)*this.velocidade);
    
    
        //this.draw();
    }

    draw(){try{
    
        fill(this.cor);
        strokeWeight(0);
        ellipse(this.pos.x,CANVASW-this.pos.y,this.raio*2,this.raio*2);
        
        fill(255);
        strokeWeight(0);
        textSize(15);
        text(this.id,this.pos.x-5,CANVASW-this.pos.y+5);
        
        
    	
    }catch(err){ alert('Erro Particula.draw(): '+err);}}
    
    mover(){try{
        var deslocamentoX = this.vetor.x * PASSO;
        var deslocamentoY = this.vetor.y * PASSO;

        var vetorDeslocamento = new Coordenadas(deslocamentoX,deslocamentoY);
        
        this.salvarPosicao();
        this.pos.soma(vetorDeslocamento);
        

        var colisao = false;
        if(this.colisaoRecipienteX()) {
            this.inverterDirecaoX();
            colisao = true;
        }
        if(this.colisaoRecipienteY()) {
            this.inverterDirecaoY();
            colisao = true;
        }
        
        if(colisao){
            this.reverterPosicao();
            this.mover();
            return;
        }
        
    }catch(err){ alert('Erro Particula.mover(): '+err);}}
    
    
    inverterDirecaoX(){
        this.vetor.x *=-1;
    }
    inverterDirecaoY(){
        this.vetor.y *=-1;
    }
    
    
    colisaoRecipienteX(){try{
        if((this.pos.x+this.raio)>CANVASH
            ||(this.pos.x-this.raio)<0){
            return true;
        }
    
        return false;
    	
    }catch(err){ alert('Erro Particula.colisaoRecipienteX(): '+err);}}

    colisaoRecipienteY(){try{
        if((this.pos.y+this.raio)>CANVASW
            ||(this.pos.y-this.raio)<0){
            return true;
        }
    
        return false;
    	
    }catch(err){ alert('Erro Particula.colisaoRecipienteY(): '+err);}}

    colisaoX(obj){try{
        var objA = this;
        var objB = obj;
        
        if(objA.pos.x <= objB.pos.x){
           if((objA.pos.x+objA.raio)>(objB.pos.x-objB.raio)){
        
                  if(objA.pos.y <= objB.pos.y){
                     if((objA.pos.y+objA.raio)>(objB.pos.y-objB.raio)){
                          return true;
                     }
                  }
              
                  objA = obj;
                  objB = this;

                  if(objA.pos.y <= objB.pos.y){
                     if((objA.pos.y+objA.raio)>(objB.pos.y-objB.raio)){
                          return true;
                     }
                  }


           }
        }
        
        
        objA = obj;
        objB = this;
        
        if(objA.pos.x <= objB.pos.x){
           if((objA.pos.x+objA.raio)>(objB.pos.x-objB.raio)){

                    objA = this;objB = obj;

                    if(objA.pos.y <= objB.pos.y){
                       if((objA.pos.y+objA.raio)>(objB.pos.y-objB.raio)){
                            return true;
                       }
                    }
              
                    objA = obj;objB = this;

                    if(objA.pos.y <= objB.pos.y){
                       if((objA.pos.y+objA.raio)>(objB.pos.y-objB.raio)){
                            return true;
                       }
                    }


           }
        }
        
        return false;
    	
    }catch(err){ alert('Erro Particula.colisaoParticula(): '+err);}}



    salvarPosicao(){try{this.posAnterior.clone(this.pos);}catch(err){ alert('Erro Particula.salvarPosicao(): '+err);}}
    reverterPosicao(){try{this.pos.clone(this.posAnterior);}catch(err){ alert('Erro Particula.reverterPosicao(): '+err);}}

}

