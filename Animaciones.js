class Animacion{
    constructor(arrayImgeString,velocidad,id){
        this.id = id;
        this.array = arrayImgeString;
        this.cronometro = new Cronometro();
        this.posicion = 0;
        this.velocidad = velocidad;
        this.cronometro.run(this.velocidad);
        this.encendido = true;
        this.empezar = false;
    }
    update(){
        if(!this.empezar){
            this.cronometro.run(this.velocidad);
            this.empezar = true;
        }else{
            if(this.cronometro.isEncendido()){
                if(!this.posicion<this.array.length){
                    document.getElementById(this.id).style.background = "url("+this.array[this.posicion]+")";
                    document.getElementById(this.id).style.backgroundRepeat = "no-repeat";
                }
            }else{
                this.posicion ++;
                if(this.posicion >= this.array.length){
                    this.encendido = false;
                }else{
                    this.cronometro.run(this.velocidad);
                }
                
            }
            this.cronometro.update();
        }
        
        
        
    }
    getPosicion(){
        return this.posicion;
    }
    isEncendido(){
        return this.encendido;
    }
}