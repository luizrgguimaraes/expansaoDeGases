class Distribuicao{
    constructor(categorias,distribuicao){try{
        this.categorias = categorias; 
        this.distribuicao = Array();
        var i = 0;
        var soma = 0;
        while(i<(distribuicao.length-1)){//distribuicoes tem um tamanho menor, porque o ultimo valor é sempre 100, e na funcao getValor() a variavel a nunca será maior que 100
            this.distribuicao[i] = distribuicao[i]+soma;
            soma +=distribuicao[i];
            i++;
        }
        
//        Print.tabela(this.categorias);
//        Print.tabela(this.distribuicao);

    }catch(err){ alert('Erro new Distribuicao(): '+err);}}
    
    
    getValor(){
        try{
            var a = Math.random()*100; 
            var variavel = this.categorias[0];
            
            for(var i = (this.distribuicao.length - 1);i >= 0;i--){

                if(a > this.distribuicao[i]){
                    variavel = this.categorias[i+1];
                    break; 
                }
            }
            
            return variavel;
            
        }catch(err){ alert('Erro getValor: '+err); }
    }                

}

alert('Distribuicao OK');