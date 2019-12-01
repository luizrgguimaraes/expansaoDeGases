function calcMomento(obj1,obj2,eixo){
    var P = (obj1.massa*obj1.vetor.get(eixo)+obj2.massa*obj2.vetor.get(eixo));
    return P;
}

function energiaCinetica(vA,vB,mA,mB){
    return ((mA*vA*vA)/2 + (mB*vB*vB)/2);
}

function calcModulo(x,y,z){
    var modulo = Math.sqrt(x**2 + y**2 + z**2);
    return modulo;
}


function calculoVelocidadeComMassa(VA,VB,MA,MB){try{
    var a = 1 + MA/MB;
    var b = -2*VA*MA/MB - 2*VB;
    var c = -1*Math.pow(VA,2)*(1-MA/MB)+2*VA*VB;
    var delta = Math.pow(b,2) - 4 * a * c ;
    var raizDelta = Math.sqrt(delta);
    var menosb = -1*b;
    var doisa = 2*a;
    var result = [((menosb + raizDelta)/doisa),((menosb - raizDelta)/doisa)];
    return result; 
}catch(err){ alert('Erro calculoVelocidadeComMassa():'+err);}}

function choque(obj1,obj2,eixo){try{
            
    var ma = obj1.massa;
    var mb = obj2.massa;
    var va0 = obj1.vetor.get(eixo);
    var vb0 = obj2.vetor.get(eixo);

    var momentoInicial = ma*va0 + mb*vb0;
    
    var vaf = calculoVelocidadeComMassa(va0,vb0,ma,mb);
    var vbf = calculoVelocidadeComMassa(vb0,va0,mb,ma);
                      
    var momentoFinal = 0;
    var result = Array();
    for(var m=0;m<=1;m++){
        for(var n=0;n<=1;n++){
            momentoFinal = round2(ma*vaf[m]+ mb*vbf[n],4);
              
//             var diferencaMomento = Math.abs(momentoFinal - momentoInicial);
//             var diferencaVA = Math.abs(va0 - vaf[m]);
//             var diferencaVB = Math.abs(vb0 - vbf[n]);
//             var diferencaVAB = Math.abs(vaf[m] - vbf[n]); 
            if(igual(momentoFinal,momentoInicial))result.push([vaf[m],vbf[n]]);
        }//for n
         
    }//for m
    return result;
        
}catch(err){ alert('Erro Fisica.choque(): '+err);}}
    
function igual(n1,n2){try{
    if(Math.abs(n1 - n2) < getConfig(CFGERRO)){
        return true;
    }else{
        return false;
    }

}catch(err){ alert('Erro Fisica.igual(): '+err);}}
    
    
    
//alert('Ola Fisica');