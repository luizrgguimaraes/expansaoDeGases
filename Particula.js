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
    }catch(err){ alert('Erro new Particula(): '+err);}}
    
    draw(){try{
    
        fill(this.cor);
        strokeWeight(0);
        ellipse(this.pos.x,CANVASW-this.pos.y,this.raio*2,this.raio*2);
        ellipse(this.pos.z+CANVASH+LARGURADIVISORIA,CANVASW-this.pos.y,this.raio*2,this.raio*2);
         
        if(getConfig(CFGHABILITARNUMEROPARTICULA)){
            fill(255);
            strokeWeight(0);
            textSize(15);
            text(this.id,this.pos.x-5,CANVASW-this.pos.y+5);
            text(this.id,this.pos.z-5+CANVASH+LARGURADIVISORIA,CANVASW-this.pos.y+5);
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
                
                var z = this.vetor.z;
                y = this.vetor.y;
                h = Math.sqrt(z**2 + y**2);
                while(h<(this.raio*2)){
                    z*=1.1;
                    y*=1.1;
                    h = Math.sqrt(z**2 + y**2);            
                }
                line(this.pos.z+CANVASH+LARGURADIVISORIA,CANVASW-this.pos.y,this.pos.z+z+CANVASH+LARGURADIVISORIA,CANVASW-this.pos.y-y);
        }
        
        
    }catch(err){ alert('Erro Particula.draw(): '+err);}}
    
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
            return;
        }
        
    }catch(err){ alert('Erro Particula.mover(): '+err);}}
    
    
    inverterDirecaoX(){
        this.vetor.x *=-1;
    }
    inverterDirecaoY(){
        this.vetor.y *=-1;
    }
    
    inverterDirecaoZ(){
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

}


function colisaoX(objA,objB,flag){try{
        var xa = objA.pos.x;
        var xb = objB.pos.x;
        var va = objA.vetor.x;
        var vb = objB.vetor.x;
        if(xa < xb){
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
            if(!flag)return colisaoX(objB,objA,true); //inverter posicao
        }
        return false;
}catch(err){ alert('Erro colisaoX(): '+err);}}

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



function colisaoY(objA,objB,flag){try{
        var xa = objA.pos.y;
        var xb = objB.pos.y;
        var va = objA.vetor.y;
        var vb = objB.vetor.y;
        if(xa < xb){
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
            if(!flag)return colisaoY(objB,objA,true); //inverter posicao
        }
        return false;
}catch(err){ alert('Erro colisaoY(): '+err);}}

//alert('ola Particula');