class Parapeto{
    constructor(array,x,y,ancho,alto,juego){
        this.vidas = 4;
        
        this.array = array;
        this.rectangulo = new Rectangulo(x,y,ancho,alto,"img/blanco.png");
        this.borrar = false;
        this.juego = juego;
    }
    update(){
        if(!this.borrar){
            document.getElementById(this.rectangulo.getID()).style.background = "url("+this.array[4-this.vidas]+")";
            document.getElementById(this.rectangulo.getID()).style.backgroundRepeat = "no-repeat";
            this.rectangulo.update();
        }else{
            delete this.juego.getParapetos()[this];
        }
        
    }
    getRectangulo(){
        return this.rectangulo;
    }
    reprientear(){
        this.rectangulo.recargarDiv();
        this.rectangulo.update();
    }
    vidas1(){
        this.vidas--;
        if(this.vidas == 0){
            this.rectangulo.borrar(); 
            this.borrar = true;
        }
    }
    isVivo(){
        if(this.vidas == 0){
            return false;
        }else{
            return true;
        }
    }
}