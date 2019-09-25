class Disparo{   
    constructor(x,y,ancho,alto,imgURL,imgURL1,queEs){
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.id = "R"+x+y;
        this.imgURL = imgURL;
        this.imgURL1 = imgURL1;
        this.queEs = queEs;
        this.rectangulo  = new Rectangulo(x,y,ancho,alto,"img/blanco.png");
        this.borrar = false;
        this.eliminado = false;
        this.cronoAnimacion = new Cronometro();
        this.cronoAnimacion.run(200);
        this.cronoAnimacion2 = new Cronometro();
        this.cronoAnimacion2.run(400);
    }
    update(){
        
        

        if(this.borrar && !this.eliminado){
            this.rectangulo.borrar(); 
            this.eliminado = true;
        }else{
            if(!this.borrar){
                this.actualizarImagenes();
                this.rectangulo.setY(this.y);
                if(this.queEs){
                    this.y = this.y-4;
                }else{
                    this.y = this.y+4;
                }
                this.rectangulo.update();
            }
        }
        
    }
    actualizarImagenes(){
        if(this.cronoAnimacion.isEncendido()){
            document.getElementById(this.rectangulo.getID()).style.background = "url("+this.imgURL+")";
        }else{
            if(this.cronoAnimacion2.isEncendido()){
                document.getElementById(this.rectangulo.getID()).style.background = "url("+this.imgURL1+")";
            }else{
                this.cronoAnimacion.run(200);
                this.cronoAnimacion2.run(400);
            }
        }
        this.cronoAnimacion2.update();
        this.cronoAnimacion.update();
    }
    setEliminado(valor){
        this.eliminado = valor;
    }
    isEliminado(){
        return this.eliminado;
    }
    reprientear(){
        this.rectangulo.recargarDiv();
        this.rectangulo.update();
    }
    setBorrar(valor){
        this.borrar = valor;
    }
    idBorrar(){
        return this.borrar;
    }
    draw(){

    }
    setX(valor){
        this.x = valor;
    }
    setY(valor){
        this.y = valor;
    }
    getRectangulo(){
        return this.rectangulo;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getAlto(){
        return this.Alto;
    }
    getAncho(){
        return this.Ancho;
    }
}