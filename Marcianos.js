class Marciano{
    constructor(x,y,ancho,alto,imgURL,imgURL1,array){
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.id = "R"+x+y;
        this.imgURL = imgURL;
        this.imgURL1 = imgURL1;
        this.rectangulo  = new Rectangulo(x,y,ancho,alto,"img/blanco.png");
        this.disparos = array;
        this.cronoDisparo = new Cronometro();
        this.cronoDisparo.run(200);
        this.cronoAnimacion = new Cronometro();
        this.cronoAnimacion.run(400);
        this.cronoAnimacion2 = new Cronometro();
        this.cronoAnimacion2.run(800);
        this.arrayMuerte = ["img/maciano1muerte_1.png","img/maciano1muerte_2.png"];
        this.animacion = null;
        this.muerto = false;
        this.elimidado = false;
    }
    update(){
        if(this.muerto){
            if(this.animacion.isEncendido()){
                this.animacion.update();
                this.rectangulo.update();
           }else{
                 document.getElementById(this.rectangulo.getID()).style.background = "url(img/blanco.png)";
                 this.elimidado = true;
           }
        }else{
            if(this.rectangulo!==undefined&&this.rectangulo!= null){
                this.rectangulo.update();
                this.rectangulo.setX(this.x);
                this.rectangulo.setY(this.y);
                this.rectangulo.update();

        
                if(Math.floor(Math.random()*5000)==1){
                    this.disparos.push(new Disparo(this.x+(this.ancho/2),this.y,3,12,"img/disparo1.png","img/disparo2.png",false));
                }

                this.actualizarImagenes();
                this.rectangulo.update();
            }
        }  
    }
    reprientear(){
        this.rectangulo.recargarDiv();
        this.rectangulo.update();
    }
    getMuerto(){
        return this.muerto;
    }
    getEliminado(){
        return this.elimidado;
    }
    setMuerto(valor){
        if(!this.muerto){
            this.muerto = valor;
            this.animacion = new Animacion(this.arrayMuerte,400,this.rectangulo.getID());
        }
    }
    draw(){

    }
    actualizarImagenes(){
        if(this.cronoAnimacion.isEncendido()){
            
            document.getElementById(this.rectangulo.getID()).style.background = "url("+this.imgURL+")";
            document.getElementById(this.rectangulo.getID()).style.backgroundRepeat = "no-repeat";
        }else{
            if(this.cronoAnimacion2.isEncendido()){
                
                document.getElementById(this.rectangulo.getID()).style.background = "url("+this.imgURL1+")";
                document.getElementById(this.rectangulo.getID()).style.backgroundRepeat = "no-repeat";
            }else{
                this.cronoAnimacion.run(400);
                this.cronoAnimacion2.run(800);
            }
        }
        this.cronoAnimacion2.update();
        this.cronoAnimacion.update();
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
}