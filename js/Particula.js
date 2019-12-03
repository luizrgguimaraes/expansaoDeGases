function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(100);

  noStroke();
  fill(50);
  push();
  translate(-275, 175);
  rotateY(1.25);
  rotateX(-0.9);
  box(100);
  pop();

  noFill();
  stroke(255);
  push();
  translate(500, height * 0.35, -200);
  sphere(300);
  pop();
}

class Particula{
    constructor(id,anguloXY,anguloXZ,velocidade, massa){try{
        this.id = id;
        var multiplicadorraio = getConfig(CFGMULTIPLICADORMASSARAIO); 
        this.pos = new Coordenadas(massa*multiplicadorraio,massa*multiplicadorraio,massa*multiplicadorraio);
        this.posAnterior = new Coordenadas(null,null,null);
        this.cor = Cores.getCor(massa);
        this.massa = massa;
        this.raio = massa*getConfig(CFGMULTIPLICADORMASSARAIO);
        this.velocidade = velocidade;
        
        var direcaoXY = anguloXY * Math.PI / 180;
        var direcaoXZ = anguloXZ * Math.PI / 180;
        var componenteY = Math.sin(direcaoXY)*this.velocidade;
        var componenteX = Math.cos(direcaoXZ)*Math.cos(direcaoXY)*this.velocidade;
        var componenteZ = Math.sin(direcaoXZ)*Math.cos(direcaoXY)*this.velocidade;
        this.vetor = new Coordenadas(componenteX,componenteY,componenteZ);
        this.historicoPosicao = new Pilha();
        this.historicoVetor = new Pilha();
        this.nColisoesParede = 0;
        this.nColisoesMoleculas = 0;
        criarLinhaMolecula(this);
        
        
        
        
    }catch(err){ alert('Erro new Particula(): '+err);}}
    
    getEnergiaCinetica(){
        return energiaCinetica(this.getModulo(),0,this.massa,0);
    }
    
    drawXY(){try{
         //desenhar();return;
//         fill(this.cor);
//         strokeWeight(0);
        
        desenhar(this);
        //ellipse(this.pos.x,CANVASW-this.pos.y,this.raio*2,this.raio*2);
         //sphere(this.pos.x,CANVASW-this.pos.y,this.raio*2,this.raio*2);
            //fill(255);
//           stroke(255);
//             push();
//             translate(0, 0, 200);
//             sphere(10);
//             pop();
//           return;
         
        if(getConfig(CFGHABILITARNUMEROPARTICULA)){
            fill(255);
            strokeWeight(0);
            textSize(15);
            text(this.id,this.pos.x-5,CANVASW-this.pos.y+5);
        }
        
        if(getConfig(CFGHABILITARDIRECAOPARTICULA)){
                stroke(255);
                strokeWeight(4);
                var x = this.vetor.x;
                var y = this.vetor.y;
                var h = Math.sqrt(x**2 + y**2);
                while(h<(this.raio*2)){
                    x*=1.1;
                    y*=1.1;
                    h = Math.sqrt(x**2 + y**2);            
                }
                line(this.pos.x,CANVASW-this.pos.y,this.pos.x+x,CANVASW-this.pos.y-y);
                
        }
        
        
    }catch(err){ alert('Erro Particula.drawXY(): '+err);}}
    
    drawZY(){try{
    
        //fill(this.cor);
        //strokeWeight(0);
        
        desenhar(this,LARGURADIVISORIA);
        //ellipse(this.pos.z+CANVASH+LARGURADIVISORIA,CANVASW-this.pos.y,this.raio*2,this.raio*2);
         
        if(getConfig(CFGHABILITARNUMEROPARTICULA)){
            fill(255);
            strokeWeight(0);
            textSize(15);
            text(this.id,this.pos.z-5+CANVASH+LARGURADIVISORIA,CANVASW-this.pos.y+5);
        }
        
        if(getConfig(CFGHABILITARDIRECAOPARTICULA)){
                stroke(255);
                strokeWeight(4);
                
                var z = this.vetor.z;
                var y = this.vetor.y;
                var h = Math.sqrt(z**2 + y**2);
                while(h<(this.raio*2)){
                    z*=1.1;
                    y*=1.1;
                    h = Math.sqrt(z**2 + y**2);            
                }
                line(this.pos.z+CANVASH+LARGURADIVISORIA,CANVASW-this.pos.y,this.pos.z+z+CANVASH+LARGURADIVISORIA,CANVASW-this.pos.y-y);
        }
        
        
    }catch(err){ alert('Erro Particula.drawZY(): '+err);}}
    
    historico(){try{
        
            var clonePos = new Coordenadas();
            clonePos.clone(this.pos);
            this.historicoPosicao.add(clonePos);
            
            var cloneVet = new Coordenadas();
            cloneVet.clone(this.vetor);
            return this.historicoVetor.add(cloneVet);
    
    }catch(err){ alert('Erro Particula.historico(): '+err);}}

    back(){try{
            var pos = this.historicoPosicao.get();
            var vet = this.historicoVetor.get();  
            
            if(pos&&vet){
                this.pos.clone(pos);
                this.vetor.clone(vet);
                return true;
            }
            return false;
            
    }catch(err){ alert('Erro Particula.back(): '+err);}}

    mover(){try{
        var deslocamentoX = this.vetor.x * getConfig(CFGPASSO);
        var deslocamentoY = this.vetor.y * getConfig(CFGPASSO);
        var deslocamentoZ = this.vetor.z * getConfig(CFGPASSO);

        var vetorDeslocamento = new Coordenadas(deslocamentoX,deslocamentoY,deslocamentoZ);
        
        this.salvarPosicao();
        this.pos.soma(vetorDeslocamento);
        
        
        var colisao = false;
        if(this.colisaoRecipienteX()) {
            //Debug.print(["Colisao Fronteira X",this.id]);if(ENABLEPAUSECOLISAO)noLoop();
            this.inverterDirecaoX();
            colisao = true;
        }
        if(this.colisaoRecipienteY()) {
            //Debug.print(["Colisao Fronteira Y",this.id]);if(ENABLEPAUSECOLISAO)noLoop();

            this.inverterDirecaoY();
            colisao = true;
        }
        if(this.colisaoRecipienteZ()) {
            //Debug.print(["Colisao Fronteira Y",this.id]);if(ENABLEPAUSECOLISAO)noLoop();

            this.inverterDirecaoZ();
            colisao = true;
        }

        
        if(colisao){
            this.reverterPosicao();
            this.mover();
            this.nColisoesParede++;
            return;
        }
        
    }catch(err){ alert('Erro Particula.mover(): '+err);}}
    
    
    inverterDirecaoX(){
        this.vetor.x *=-1;
        
        
        GLOBALS.qtdTotalMomento += Math.abs(2*this.massa*this.vetor.x);
         
    }
    inverterDirecaoY(){
        
        this.vetor.y *=-1;
        GLOBALS.qtdTotalMomento += Math.abs(2*this.massa*this.vetor.y);
    }
    
    inverterDirecaoZ(){
        GLOBALS.qtdTotalMomento += Math.abs(2*this.massa*this.vetor.z);
        this.vetor.z *=-1;
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
    
    
    colisaoRecipienteZ(){try{
        if((this.pos.z+this.raio)>(CANVASH)
            ||(this.pos.z-this.raio)<(0)){
            return true;
        }
        return false;
    	
    }catch(err){ alert('Erro Particula.colisaoRecipienteZ(): '+err);}}

    longe(obj){try{
        var objA = this;
        var objB = obj;
        
        var distancia = objA.pos.distancia(objB.pos);
        var somaRaios = objA.raio + objB.raio;
        
        if(distancia > somaRaios ){
            return false;
        }
        
        return true;
    	
    }catch(err){ alert('Erro Particula.longe(): '+err);}}


    
    sobre(obj,eixo,flag){try{

        if(this.pos.get(eixo) <= obj.pos.get(eixo)){
            if((this.pos.get(eixo)+this.raio)>(obj.pos.get(eixo)-obj.raio)){
                //Debug.erro(this.id+" sobre "+obj.id +"no eixo "+ eixo);noLoop();
                return true;
            }
        }else{
            if(!flag)return obj.sobre(this,eixo,true);
        }
        return false;

    }catch(err){ alert('Erro Particula.sobre(): '+err);}}
    

    sobreposicao(obj){try{
            
            var flag = 0;
            if(this.sobre(obj,'x'))flag++;
            if(this.sobre(obj,'y'))flag++;
            if(this.sobre(obj,'z'))flag++;

            if(flag>=3)return true;
            else return false;

    }catch(err){ alert('Erro Particula.sobreposicao(): '+err);}}




    salvarPosicao(){try{this.posAnterior.clone(this.pos);}catch(err){ alert('Erro Particula.salvarPosicao(): '+err);}}
    reverterPosicao(){try{this.pos.clone(this.posAnterior);}catch(err){ alert('Erro Particula.reverterPosicao(): '+err);}}
    getModulo(){try{return calcModulo(this.vetor.x,this.vetor.y,this.vetor.z); }catch(err){ alert('Erro getModulo(): '+err);}}
}




function colisaoSentidos(objA,objB,eixo,flag){try{
        var pa = objA.pos.get(eixo);
        var pb = objB.pos.get(eixo);
        var va = objA.vetor.get(eixo);
        var vb = objB.vetor.get(eixo);
        
        if(pa <= pb){
                if( va <= 0 && vb < 0 && vb < va){     
                   return true;
                    //          <A      <<<B
                }else if(va > 0 && vb >= 0 && va > vb){
                    return true;
                    //          A>>>    B>
                }else if(va > 0 && vb < 0){
                    return true;
                    //          A>>>    <<<B
                }
        }else{
            if(!flag)return colisaoSentidos(objB,objA,eixo,true); //inverter posicao
        }
        return false;
}catch(err){ alert('Erro colisaoSentidos(): '+err);}}





//alert('ola Particula');