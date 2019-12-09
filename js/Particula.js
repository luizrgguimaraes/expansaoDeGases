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
        this.idade = 1;
        this.nColisoesParede = 0;
        this.nColisoesMoleculas = 0;
        criarLinhaMolecula(this);
        
        
        
        
    }catch(err){ alert('Erro new Particula(): '+err);}}
    
    drawXY(){try{
        if(this.idade<1)return;
        
        Interface.desenharMolecula(this);
        if(getConfig(CFGHABILITARNUMEROPARTICULA)){ Interface.desenharIdParticula(this.pos.x,this.pos.y,this.id,0); }
        if(getConfig(CFGHABILITARDIRECAOPARTICULA)){ desenharDirecao(this.pos.x,this.pos.y,this.vetor.x,this.vetor.y,this.raio,0); }
    }catch(err){ alert('Erro Particula.drawXY(): '+err);}}
    
    drawZY(){try{
        if(this.idade<1)return;
        Interface.desenharMolecula(this,LARGURADIVISORIA);
        if(getConfig(CFGHABILITARNUMEROPARTICULA)){Interface.desenharIdParticula(this.pos.z,this.pos.y,this.idade,CANVASH+LARGURADIVISORIA);}
        if(getConfig(CFGHABILITARDIRECAOPARTICULA)){Interface.desenharDirecao(this.pos.z,this.pos.y,this.vetor.z,this.vetor.y,this.raio,CANVASH+LARGURADIVISORIA);}
    }catch(err){ alert('Erro Particula.drawZY(): '+err);}}
    
    historico(){try{
            if(this.idade<0){
                this.idade++;
                return;
            }
            var clonePos = new Coordenadas();
            clonePos.clone(this.pos);
            
            this.historicoPosicao.add(clonePos);
            //Debug.erro(["add",this.id,this.pos.x,this.pos.y,this.historicoPosicao.topo,this.idade]);
            
            var cloneVet = new Coordenadas();
            cloneVet.clone(this.vetor);
            
            this.idade++;
            
//             alert(cloneVet.x+'/'+cloneVet.y);
            return this.historicoVetor.add(cloneVet);
    
    }catch(err){ alert('Erro Particula.historico(): '+err);}}

    back(){try{

            
            var pos = this.historicoPosicao.get();
            var vet = this.historicoVetor.get();  
            if(pos&&vet){
                this.pos.clone(pos);
                //Debug.erro(["get OK",this.id,this.pos.x,this.pos.y,this.historicoPosicao.topo,this.idade]);
                this.vetor.clone(vet);
            }else{
                //Debug.erro(["NOT get",this.id,"null","null",this.historicoPosicao.topo,this.idade]);
            }
            this.idade--;
                
            
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
    getEnergiaCinetica(){ return energiaCinetica(this.getModulo(),0,this.massa,0); }

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