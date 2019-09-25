class Nave{   
    constructor(x,y,ancho,alto,imgURL,juego){
        this.juego = juego;
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.id = "R"+x+y;
        this.imgURL = imgURL;
        this.rectangulo  = new Rectangulo(x,y,ancho,alto,imgURL);
        this.disparos = new Array();
        this.cronoDisparo = new Cronometro();
        this.cronoDisparo.run(800);
    }
    update(){
        this.rectangulo.setX(this.x);
        this.rectangulo.setY(this.y);
        if(teclado.teclaPulsada(" ")&&!this.cronoDisparo.isEncendido()){
            this.disparos.push(new Disparo(this.x+(this.ancho/2),this.y-10,3,15,"img/disparo1.png","img/disparo2.png",true));
            this.cronoDisparo.run(800)
        }
        if(this.disparos.length!=0){
            var borrar = -1;
            for(var i = 0 ; i<this.disparos.length;i++){
                if(this.disparos[i] !=null){
                    this.disparos[i].update();
                   
                    if(this.disparos[i].getY()<-15){
                        borrar = i;
                        this.disparos[i].update();
                        this.disparos[i].setBorrar(true);
                        this.disparos[i].setEliminado(true);
                    }
                    
                }
            }
            if(borrar > -1){
                this.disparos.splice(borrar,1);
            }
        }
        this.cronoDisparo.update();
        this.rectangulo.update();
    }
    reprientear(){
        this.rectangulo.recargarDiv();
        this.rectangulo.update();
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
    getAncho(){
        return this.ancho;
    }
    getY(){
        return this.y;
    }
    getAlto(){
        return this.alto;
    }
    getDisparos(){
        return this.disparos;
    }
    getDisparosEaspecifico(valor){
        return this.disparos[valor];
    }
}