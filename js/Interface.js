class Interface{

    static updateBack(value){
        $('btnBack').innerHTML = 'back('+value+')';
    } 

    static limparTabelaMoleculas()
    {try{
        var table = $('tblMoleculas');
        table.innerHTML = "";
    
    }catch(err){ alert('Erro Interface.limparTabelaMoleculas(): '+err); }}

    static criarLinhaMoleculaTotais(){try{
        var table = $('tblMoleculas');
        
        table.innerHTML = '<tr><th>Molecula</th><th>Massa</th><th>Modulo</th><th>Colisoes Parede</th><th>Colisoes Moleculas</th><th>Ec</th></tr>';
        var tr = document.createElement('tr');
        var td;
        
        
        td = document.createElement('td'); td.className = 'tdConfig'; tr.appendChild(td);
        td = document.createElement('td'); td.className = 'tdConfig'; tr.appendChild(td);
        td = document.createElement('td'); td.className = 'tdConfig'; tr.appendChild(td);
        
        td = document.createElement('td'); td.innerHTML = 0; td.id = 'moleculaColisoesParedeTotal'; td.className = 'tdConfig'; tr.appendChild(td);
        td = document.createElement('td'); td.innerHTML = 0; td.id = 'moleculaColisoesMoleculasTotal'; td.className = 'tdConfig'; tr.appendChild(td);
        td = document.createElement('td'); td.innerHTML = 0; td.id = 'moleculaEnergiaCineticaTotal'; td.className = 'tdConfig'; tr.appendChild(td);
        
        table.appendChild(tr);
    
    }catch(err){ alert('Erro Interface.criarLinhaMoleculaTotais: '+err); }}

    static atualizarIndicadores(pressao,tempo,temperatura){try{
            fill([255,255,255]);
            strokeWeight(1);
            textSize(17);
            text('Pressao: '+round2(pressao,10),CANVASH+CANVASH+LARGURADIVISORIA+10,100);    //CANVASH+CANVASH+LARGURADIVISORIA+CANVASH
            text('Tempo: '+tempo,CANVASH+CANVASH+LARGURADIVISORIA+10,150);
            text('Temperatura: '+temperatura,CANVASH+CANVASH+LARGURADIVISORIA+10,200);
            
    }catch(err){ alert('Erro Interface.atualizarIndicadores: '+err); }}

    static desenharDivisorias(){try{
            stroke(255,0,0); strokeWeight(LARGURADIVISORIA); line(CANVASH,0,CANVASH,CANVASW);
            stroke(255,0,0); strokeWeight(LARGURADIVISORIA); line(CANVASH+LARGURADIVISORIA+CANVASH,0,CANVASH+LARGURADIVISORIA+CANVASH,CANVASW);
    }catch(err){ alert('Erro Interface.desenharDivisorias: '+err); }}
    
    
    static desenharMolecula(obj,deslocamentoX) {try{
            fill(obj.cor);
            strokeWeight(0);
            if(deslocamentoX)ellipse(obj.pos.z+CANVASH+LARGURADIVISORIA,CANVASW-obj.pos.y,obj.raio*2,obj.raio*2);
            else ellipse(obj.pos.x,CANVASW-obj.pos.y,obj.raio*2,obj.raio*2);
    }catch(err){ alert('Erro Interface.desenharMolecula: '+err); }}

    static desenharDirecao(posX,posY,vetorX,vetorY,raio,deslocamentoDimensao) {try{
        
        stroke(255);
        strokeWeight(4);
        posX+=deslocamentoDimensao;
        var x = vetorX;
        var y = vetorY;
        var h = Math.sqrt(x**2 + y**2);
        while(h<(raio*2)){
            x*=1.1;
            y*=1.1;
            h = Math.sqrt(x**2 + y**2);            
        }
        line(posX,CANVASW-posY,posX+x,CANVASW-posY-y);
    }catch(err){ alert('Erro Interface.desenharDirecao: '+err); }}
    
    
    static desenharIdParticula(posX,posY,id,deslocamentoDimensao) {try{
        
        posX+=deslocamentoDimensao;
        fill(255);
        strokeWeight(0);
        textSize(15);
        text(id,posX-5,CANVASW-posY+5);

    }catch(err){ alert('Erro Interface.desenharIdParticula: '+err); }}
    

}




function setFrontConfigCheckBox(idconfig){try{
    
    var tipo = GLOBALS.config[idconfig][0]; 

    if(tipo == TIPOCHECKBOX){
        var v = (GLOBALS.config[idconfig][1])?(true):(false);
        $("CONFIG"+idconfig).checked = v;
    }else if(tipo == TIPOTEXTBOX){
        
    }
    
}catch(err){ alert('Erro setFrontConfigCheckBox: '+err); }}



function criarLinhaMolecula(particula){try{
    var table = $('tblMoleculas');
    var tr = document.createElement('tr');
    var td;
    
    td = document.createElement('td');
    td.innerHTML = particula.id;
    td.id = 'moleculaId'+particula.id;
    td.className = 'tdConfig';
    tr.appendChild(td);
    
    td = document.createElement('td');
    td.innerHTML = particula.massa;
    td.id = 'moleculaMassa'+particula.id;
    td.className = 'tdConfig';
    tr.appendChild(td);
    
    td = document.createElement('td');
    td.innerHTML = round2(particula.getModulo(),3);
    td.id = 'moleculaModulo'+particula.id;
    td.className = 'tdConfig';
    tr.appendChild(td);
    
    td = document.createElement('td');
    td.innerHTML = particula.nColisoesParede;
    td.id = 'moleculaColisoesParede'+particula.id;
    td.className = 'tdConfig';
    tr.appendChild(td);
    
    td = document.createElement('td');
    td.innerHTML = particula.nColisoesMoleculas;
    td.id = 'moleculaColisoesMoleculas'+particula.id;
    td.className = 'tdConfig';
    tr.appendChild(td);
    
    td = document.createElement('td');
    td.innerHTML = round2(particula.getEnergiaCinetica(),3);
    td.id = 'moleculaEnergiaCinetica'+particula.id;
    td.className = 'tdConfig';
    tr.appendChild(td);
    
    
    table.appendChild(tr);
    

}catch(err){ alert('Erro criarLinhaMolecula: '+err); }}

function atualizarLinhaMolecula(particula,apagar){try{
    var table = $('tblMoleculas');
    
    
    td = $('moleculaModulo'+particula.id);
    td.innerHTML = round2(particula.getModulo(),3);
    if(apagar)td.innerHTML = '';
    
    td = $('moleculaColisoesParede'+particula.id);
    td.innerHTML = particula.nColisoesParede;
    if(apagar)td.innerHTML = '';
    
    td = $('moleculaColisoesMoleculas'+particula.id);
    td.innerHTML = particula.nColisoesMoleculas;
    if(apagar)td.innerHTML = '';
    
    td = $('moleculaEnergiaCinetica'+particula.id);
    td.innerHTML = round2(particula.getEnergiaCinetica(),3);
    if(apagar)td.innerHTML = '';
    
    
}catch(err){ alert('Erro atualizarLinhaMolecula: '+err); }}

function atualizarLinhaMoleculaTotais(colisoesParede,colisoesMoleculas,energiaCinetica){try{
    var td;
    
    
    td = $('moleculaColisoesParedeTotal');
    td.innerHTML = colisoesParede;
    
    td = $('moleculaColisoesMoleculasTotal');
    td.innerHTML = colisoesMoleculas;
    
    td = $('moleculaEnergiaCineticaTotal');
    td.innerHTML = round2(energiaCinetica,3);
    
    
    
}catch(err){ alert('Erro atualizarLinhaMolecula: '+err); }}


function setBackConfigCheckBox(obj){try{
    var valor = 0;
    
    if(obj.type == "checkbox"){
        if(obj.checked){
            valor = 1;
        }
    }else if(obj.type == "text"){
        valor = obj.value;
    }

    var idconfig = obj.getAttribute("zid");
    GLOBALS.config[idconfig][1] = valor;

}catch(err){ alert('Erro setBackConfigCheckBox: '+err); }}

function criarElementosConfig(nometabela){try{
    var contador = 0;
    var tr = document.createElement("tr");
    var table = $(nometabela);
    var flagLinhaCompleta = false;
    for(var idconfig = 0;idconfig<GLOBALS.config.length;idconfig++){
        if(GLOBALS.config[idconfig]==undefined){
            continue;
        }
        if(flagLinhaCompleta){
            tr = document.createElement("tr");
            flagLinhaCompleta = false;
        }
        
        var tipo = GLOBALS.config[idconfig][0];
        var obj;
        var v;
        
        
        var td = document.createElement("td");
        td.className = "tdConfig";
        var tddesc = document.createElement("td");
        tddesc.className = "tdConfig";
        
        if(tipo == TIPOCHECKBOX){
            obj = $('modeloCheckbox').cloneNode(true);
            obj.setAttribute("zid",idconfig);
            obj.checked = (GLOBALS.config[idconfig][1])?(true):(false);
            
        }else if(tipo == TIPOTEXTBOX){
            obj = $('modeloTextbox').cloneNode(true);
            obj.setAttribute("zid",idconfig);
            obj.value = GLOBALS.config[idconfig][1];
        }else if(tipo == TIPOLABEL){
            if(contador%CFGQTDCONFIGLINHA!=0){
                contador = 0;
                table.appendChild(tr);
            }
            tr = document.createElement('tr');
            td = document.createElement('td');
            td.className = 'thConfig';
            td.innerHTML = GLOBALS.config[idconfig][2]
            tr.appendChild(td);
            table.appendChild(tr);
            flagLinhaCompleta = true; 
            continue;
            
        }
        obj.setAttribute("id","config"+idconfig);
        tddesc.innerHTML = GLOBALS.config[idconfig][2];
        td.appendChild(obj);
        tr.appendChild(tddesc);
        tr.appendChild(td);
        contador++;
        if(contador%CFGQTDCONFIGLINHA==0){
            table.appendChild(tr);
            flagLinhaCompleta = true;
        }
    }
    if(!flagLinhaCompleta){
        table.appendChild(tr);
    }    

}catch(err){ alert('Erro insertFrontElement: '+err); }}






function atualizarCheckBox(checkBox){
    var valor = 0;
    if(checkBox.checked){
        valor = 1;
    }
    
    GLOBALS.inputConfigCaixas[checkBox.atendente][checkBox.config] = valor;
    
    var table = $('tblConfigCaixas');
    table.innerHTML = "" ;
    setup();
}

function inserirLinhaTitulo(nometabela){
        var table = $(nometabela);
        var tr1 = $('LinhaTitulo1').cloneNode(true);
        var tr2 = $('LinhaTitulo2').cloneNode(true); 
        table.appendChild(tr1);
        table.appendChild(tr2);


}

function preencherTabela(nometabela,id,dados){try{


        var table = $(nometabela);
        
        var tr = document.createElement('tr');
        var td;
        for(var i = 0; i < 5;i++){
            td = document.createElement('td');
            td.innerHTML = dados[i];
            tr.appendChild(td);
        }
        
        var checkbox = $('caixaAtivo').cloneNode(true);
        checkbox.id = "caixaAtivo"+id;
        checkbox.atendente = id;
        checkbox.config = 5;
            
        checkbox.checked = false;if(dados[5])checkbox.checked = true;
        td = document.createElement('td');
        td.appendChild(checkbox);
        tr.appendChild(td);
    
        checkbox = $('caixaRapido').cloneNode(true);
        checkbox.id = "caixaRapido"+id;
        checkbox.atendente = id;
        checkbox.config = 6;
        checkbox.checked = false;if(dados[6])checkbox.checked = true;
        td = document.createElement('td');
        td.appendChild(checkbox);
        tr.appendChild(td);
    
    
        table.appendChild(tr);

}catch(err){ alert('Erro preencherTabela: '+err); }}


function drawTabela(){try{

        fill([255,255,255]);
        strokeWeight(1);
        textSize(17);
        text('Caixa          Fila Atual          Clientes Atendidos          Produtos Examinados',630,50);
        textSize(30);
        fill([255,0,0]);
        text(formatted_string('00',GLOBALS.hora+GLOBALS.horaInicial,'l')+' : '+formatted_string('00',GLOBALS.minuto,'l')+' : '+formatted_string('00',GLOBALS.segundo,'l'),CANVASH-200,CANVASW-20);

}catch(err){ alert('Erro drawTabela: '+err); }}


//alert('ola Interface');                                                