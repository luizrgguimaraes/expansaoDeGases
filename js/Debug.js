class Debug{

    static limpar(){
        try{
            var table = $('tabelaDebug');
            if(!table){
                alert('Erro Debug.limpar(): tabelaDebug NotFound');
                return;
            }
                        
            table.innerHTML = "";            
        }catch(err){
           alert('Erro Debug.limpar()(): '+err);
        }
    
    }


    static print(array,th){
        try{
            var table = $('tabelaDebug');
            if(!table){
                //alert('Erro Print.tabela(): tabelaDebug NotFound');
                return;
            }
            var tr = document.createElement('tr');
            var tag = 'td';if(th)tag = 'th';
            
            for(var i in array){
                var td = document.createElement(tag);
                var texto = array[i];        
                var cor = null; 
                if(Array.isArray(array[i])){
                    texto = array[i][0];
                    cor = array[i][1];
                    td.style.backgroundColor = 'rgb('+cor[0]+','+cor[1]+','+cor[2]+')';                                    
                }
                td.innerHTML = texto;
                tr.appendChild(td); 
            }
            table.appendChild(tr);            
        }catch(err){
           alert('Erro new Debug.print(): '+err);
        }
    
    }
    
//     static tabelaInversa(rotulos,th,nLinha){
//         try{
//             var table = $('tabelaResultados');
//             if(!table){ alert('Erro Print.tabela(): tabelaResultados NotFound'); return; }
//             
//             if(!nLinha)nLinha = 0;
//             
//             var tr = document.createElement('tr');
//             tr.setAttribute('id','tr'+nLinha);
//             
//             var tag = 'td'; if(th)tag = 'th'; 
//             
//             for(var i = 0; i< rotulos.length;i++){
//                 var tdRotulo = document.createElement(tag);
//                 tdRotulo.innerHTML = rotulos[i];
//                 tr.appendChild(tdRotulo); 
//             }
// 
//             if(nLinha){
//                 table.insertBefore(tr,$('tr'+(nLinha-1)));
//             }else{
//                 table.appendChild(tr);
//             }            
//                                     
//                         
//         }catch(err){
//            alert('Erro new Print.tabelaInversa(): '+err);
//         }
//     
//     }

}
alert('Print.js already');