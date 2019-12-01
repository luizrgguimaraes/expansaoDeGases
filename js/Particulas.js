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

                
                if(!obj1.longe(obj2)){
                    continue;
                }
               Debug.print(["Objetos Muito Perto",obj1.id,obj2.id]);


                if(!obj1.sobreposicao(obj2)){
                    continue;
                }
                Debug.print(["Objetos Sobrepostos",obj1.id,obj2.id]);
                
                
                var resultX = Array();
                var resultY = Array();
                var resultZ = Array();
                
                var moduloA = calcModulo(obj1.vetor.x,obj1.vetor.y,obj1.vetor.z); 
                var moduloB = calcModulo(obj2.vetor.x,obj2.vetor.y,obj2.vetor.z);
                
                var EcInicial = energiaCinetica(moduloA,moduloB,obj1.massa,obj2.massa);
                var PTInicial = obj1.massa*moduloA+obj2.massa*moduloB;
                
                Debug.print(["Posicao Inicial","XA="+obj1.pos.x,"XB="+obj2.pos.x,"YA="+obj1.pos.y,"YB="+obj2.pos.y,"ZA="+obj1.pos.z,"ZB="+obj2.pos.z]);
                Debug.print(["Ec Inicial",EcInicial,"P Inicial Total",PTInicial]);
                Debug.print(["Vetores Iniciais","XA="+obj1.vetor.x,"XB="+obj2.vetor.x,"YA="+obj1.vetor.y,"YB="+obj2.vetor.y,"ZA="+obj1.vetor.z,"ZB="+obj2.vetor.z]);
                Debug.print(["Momentos Iniciais","X="+calcMomento(obj1,obj2,'x'),"Y="+calcMomento(obj1,obj2,'y'),"Z="+calcMomento(obj1,obj2,'z')]);

                var flagcolisaoX = false;
                var flagcolisaoY = false;                                                    
                var flagcolisaoZ = false;                                                    

                if(colisaoSentidos(obj1,obj2,'x')){
                        Debug.print(["Colisao X",obj1.id,obj2.id]);//noLoop();
                        //if(ENABLEPAUSECOLISAO)noLoop();
                        flagcolisaoX = true;
                        resultX = choque(obj1,obj2,'x');
                        
                }
                if(colisaoSentidos(obj1,obj2,'y')){
                        Debug.print(["Colisao Y",obj1.id,obj2.id]);//noLoop();
                        //if(ENABLEPAUSECOLISAO)noLoop();
                        flagcolisaoY = true;
                        resultY = choque(obj1,obj2,'y');
                        
                }
                if(colisaoSentidos(obj1,obj2,'z')){
                        Debug.print(["Colisao Z",obj1.id,obj2.id]);//noLoop();
                        //if(ENABLEPAUSECOLISAO)noLoop();
                        flagcolisaoZ = true;
                        resultZ = choque(obj1,obj2,'z');
                        
                }

                if(resultX.length == 0){
                    resultX = [[obj1.vetor.x,obj2.vetor.x]];
                }

                if(resultY.length == 0){
                    resultY = [[obj1.vetor.y,obj2.vetor.y]];
                }

                if(resultZ.length == 0){
                    resultZ = [[obj1.vetor.z,obj2.vetor.z]];
                }

                var config = [0,0,0];
                var flagSetted = 0;
                if(flagcolisaoX||flagcolisaoY||flagcolisaoZ){
                    if(getConfig(CFGHABILITARPAUSACOLISAO))noLoop();
                    for(var x = 0;x < resultX.length;x++){
                        for(var y = 0;y < resultY.length;y++){
                            for(var z = 0;z < resultZ.length;z++){
                                var XA = resultX[x][0];
                                var XB = resultX[x][1];
                                var YA = resultY[y][0];
                                var YB = resultY[y][1];
                                var ZA = resultZ[z][0];
                                var ZB = resultZ[z][1];
                                
//                                 var PX = (obj1.massa*XA+obj2.massa*XB);
//                                 var PY = (obj1.massa*YA+obj2.massa*YB);
//                                 var PZ = (obj1.massa*ZA+obj2.massa*ZB);
//                                 
                                var PX = calcMomento(obj1,obj2,'x');
                                var PY = calcMomento(obj1,obj2,'y');
                                var PZ = calcMomento(obj1,obj2,'z');
                             
                                var modA = calcModulo(XA,YA,ZA);
                                var modB = calcModulo(XB,YB,ZB);
                                
                                var PT = (obj1.massa*modA+obj2.massa*modB);
                                var EC = energiaCinetica(modA,modB,obj1.massa,obj2.massa);
                                
                                Debug.print([x+"."+y+"."+z,"XA="+XA,"XB="+XB,"YA="+YA,"YB="+YB,"ZA="+ZA,"ZB="+ZB,"PX="+PX,"PY="+PY,"PZ="+PZ,"PT="+PT,"EC="+EC]);
                                
                                
                                if(igual(EC,EcInicial)){
                                    //if(igual(PT,PTInicial)){
                                        if(flagcolisaoX){
                                                if(igual(XA,obj1.vetor.x) && igual(XB,obj2.vetor.x)){
                                                    Debug.print("Xs IGUAL ANTERIOR");
                                                    if(!igual(obj1.vetor.x,obj2.vetor.x)){
                                                        Debug.print("Mas no inicio eles nao eram iguais");
                                                        continue;//COnfiguracao Invalida - mesma de antes
                                                    }
                                                }
                                        }
                                        
                                        if(flagcolisaoY){
                                                if(igual(YA,obj1.vetor.y) && igual(YB,obj2.vetor.y)){
                                                    Debug.print("Ys IGUAL ANTERIOR");
                                                    if(!igual(obj1.vetor.y,obj2.vetor.y)){
                                                        Debug.print("Mas no inicio eles nao eram iguais");
                                                        continue;//COnfiguracao Invalida - mesma de antes
                                                    }
                                                }
                                        }
                                        if(flagcolisaoZ){
                                                if(igual(ZA,obj1.vetor.z) && igual(ZB,obj2.vetor.z)){
                                                    Debug.print("Zs IGUAL ANTERIOR");
                                                    if(!igual(obj1.vetor.z,obj2.vetor.z)){
                                                        Debug.print("Mas no inicio eles nao eram iguais");
                                                        continue;//COnfiguracao Invalida - mesma de antes
                                                    }
                                                }
                                        }
                                        
                                        
                                        Debug.print("UHUUUU SETTED "+x+'.'+y+'.'+z);
                                        config = [x,y,z];
                                        flagSetted++;
                                    //}//if PT
                                }//if EC
                            }//for z
                        }//for y
                    }//for x
                }//if colisao
                 if(!flagSetted&&(flagcolisaoX||flagcolisaoY||flagcolisaoZ)){
                    Debug.erro('NOT SETTED');
                 }
                 if(flagSetted>1){
                    Debug.erro('SETTED TIMES'+flagSetted);
                 }
                 
                 obj1.reverterPosicao();
                 obj2.reverterPosicao();            
                 obj1.vetor.set("x",resultX[config[0]][0]);
                 obj2.vetor.set("x",resultX[config[0]][1]);
                 obj1.vetor.set("y",resultY[config[1]][0]);
                 obj2.vetor.set("y",resultY[config[1]][1]);
                 obj1.vetor.set("z",resultZ[config[2]][0]);
                 obj2.vetor.set("z",resultZ[config[2]][1]);
                 
                 obj1.mover();
                 obj2.mover();            
                
            }//for i
        }//for j
        
                  
        
        return false;
        
    }catch(err){ alert('Erro Particulas.colisoes(): '+err);}}

}

