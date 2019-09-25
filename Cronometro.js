class Cronometro{
    constructor(){
        this.delta = 0;
        this.date = new Date();
	    this.ultimoTiempo = this.date.getTime();
        this.encendido = false;
        this.tiempo;
    }
    run(valor){
        this.tiempo = valor;
        this.encendido = true;
    }
    update(){
        this.date = new Date();
        if(this.encendido){
            this.delta += this.date.getTime()-this.ultimoTiempo;
        }
        if(this.delta >= this.tiempo){
            this.encendido = false;
            this.delta = 0;
        }
        this.ultimoTiempo = this.date.getTime();
    }
    isEncendido(){
        return this.encendido;
    }
}