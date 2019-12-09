// JavaScript Document

function show(elementId){try{
    var element = $(elementId);
     if(element.style.display == 'none'){
        element.style.display = '';
     }else{
        element.style.display = 'none';        
     }
}catch(err){ alert('Erro show: '+err); }}

function round2(num, casas){
    try{
    
        var fator = 1.0;
        for(var i = 0; i< casas; i++){
            fator *= 10.0;
        }
        
        //alert('fator = '+fator);
        var res = Math.round(num*fator)/fator;
        //alert('res = '+res);                                                                 
        return res; 

    }catch(err){ alert('Erro definirOrdem: '+err); }
}

function definirOrdem(array){
    try{
        var ordem = new Array();
        var copia = array.slice();
        copia.sort();
        for(var c in copia){
            var index = 0;
            if(array[index] != copia[c]){
                index++;
            } 
            while(ordem.indexOf(index)>-1 || (array[index] != copia[c])){//se indice ja foi usado
                index = array.indexOf(copia[c],index+1);
            }
            ordem[c] = index;
        }
        return ordem;
    }catch(err){
        alert('Erro definirOrdem: '+err);
    }
    
}


function $(elid){ 

    try{

        var obj=document.getElementById(elid);

        if(obj){return obj;}else{

            //alert('ELEMENTO NAO ENCONTRADO:'+elid);
        }

        return false;

    }catch(err){

        //alert('Error on $('+elid+'): '+err);

    }

}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
}

function formatted_string(pad, user_str, pad_pos)
{
  if (typeof user_str === 'undefined') 
    return pad;
  if (pad_pos == 'l')
     {
     return (pad + user_str).slice(-pad.length);
     }
  else 
    {
    return (user_str + pad).substring(0, pad.length);
    }
}


class Pilha{
    constructor(){
        this.limite = CFGMAXBACK;
        this.cabeca = 0;
        this.topo = 0;
        this.count = 0;
        this.pilha = Array();
    }
    add(obj){try{
        if(this.count<this.limite){
            this.pilha[this.topo] = obj;
            this.topo++;
            this.count++;        
        }else{
            this.topo = this.cabeca;
            this.cabeca++;
            if(this.cabeca>=this.limite){
                this.cabeca=0;
            }
            this.pilha[this.topo] = obj;
            this.topo++;                                    
        }
        if(this.topo>=this.limite)this.topo=0;
        return this.count;

    }catch(err){alert("Erro Pilha.add: "+err)}}
    
    get(){try{
        var result = null;
        if(this.count>0){
            result = this.pilha[this.topo-1];
            this.topo--;
            this.count--;
            if(this.count>0&&this.topo==0)this.topo=this.limite;
        }

        return result;                
    }catch(err){alert("Erro Pilha.get(): "+err)}}
    
    getCurrent(){try{
        var result = null;
        if(this.count>0){
            result = this.pilha[this.topo-1];
        }

        return result;                
    }catch(err){alert("Erro Pilha.get(): "+err)}}
    
    print(){try{
        Debug.erro(this.pilha);
        Debug.erro(["topo="+this.topo,"cabeca="+this.cabeca,"count="+this.count]);
    }catch(err){alert("Erro Pilha.print(): "+err)}}

}


//alert('utils ok');