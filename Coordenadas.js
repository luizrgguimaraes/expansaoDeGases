class Coordenadas{
    constructor(x,y,z){
        this.set("x",x);
        this.set("y",y);
        this.set("z",z);
    }

    clone(obj){
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
    }
    
    
    soma(vetor){
        this.x += vetor.x;
        this.y += vetor.y;
        this.z += vetor.z;
    }
    set(eixo,n){
        if(eixo == 'x'){
            this.x = round2(n,3);
        }else if(eixo == 'y'){
            this.y = round2(n,3);
        }else if(eixo == 'z'){
            this.z = round2(n,3);
        }
    }
    
    get(eixo){
        if(eixo == 'x'){
            return this.x;
        }else if(eixo == 'y'){
            return this.y;
        }else if(eixo == 'z'){
            return this.z;
        }
    }
    
    distancia(coordenadasB){try{
    
        var diffx = Math.abs(this.x - coordenadasB.x);
        var diffy = Math.abs(this.y - coordenadasB.y);
        var diffz = Math.abs(this.z - coordenadasB.z);
        
        var dist = Math.sqrt(Math.pow(diffx,2)+Math.pow(diffy,2)+Math.pow(diffz,2));
        
        return dist;
        
    }catch(err){ alert('Erro Coordenadas.distancia(): '+err);}}
}
