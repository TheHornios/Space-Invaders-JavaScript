class Rectangulo{   
    constructor(x,y,ancho,alto,imgURL){
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.id = "R"+(x+y)+Math.ceil((Math.random()*1000)*Math.ceil((Math.random()*1000)));
        this.imgURL = imgURL;
        this.inicializar();
    }
    update(){
        this.reposicionar();
    }
    getX(){
        return this.x;
    }
    setX(valor){
        this.x = valor;
    }
    getAncho(){
        return this.ancho;
    }
    getAlto(){
        return this.alto;
    }
    getY(){
        return this.y;
    }
    setY(valor){
        this.y = valor;
    }
    getID(){
        return this.id;
    }
    borrar(){
        document.getElementById(this.id).style.visibility = "hidden";
    }
    reposicionar(){
        document.getElementById(this.id).style.left = this.x+"px";
        document.getElementById(this.id).style.top = this.y+"px";
        document.getElementById(this.id).style.width = this.ancho+"px";
        document.getElementById(this.id).style.height = this.alto+"px";
    }
    inicializar(){
        var img = '<img id="'+ this.id+'" src="'+this.imgURL+'"  />';
        var html = document.getElementById("juego").innerHTML;
       // var color = '#'+Math.floor(Math.random()*16777215).toString(16);
        document.getElementById("juego").innerHTML = html+img;
    
        document.getElementById(this.id).style.position = "absolute";
        document.getElementById(this.id).style.left = this.x+"px";
        document.getElementById(this.id).style.top = this.y+"px";
        document.getElementById(this.id).style.width = this.ancho+"px";
        document.getElementById(this.id).style.height = this.alto+"px";
       // document.getElementById(this.id).style.backgroundColor = color;
    }
    recargarDiv(){
        var img = '<img id="'+ this.id+'" src="'+this.imgURL+'"  />';
        var html = document.getElementById("juego").innerHTML;
        document.getElementById("juego").innerHTML = html+img;

        document.getElementById(this.id).style.position = "absolute";
        document.getElementById(this.id).style.left = this.x+"px";
        document.getElementById(this.id).style.top = this.y+"px";
        document.getElementById(this.id).style.width = this.ancho+"px";
        document.getElementById(this.id).style.height = this.alto+"px";
    }
    colision(rectangulo){
            if(rectangulo.getX()<=this.x&&rectangulo.getX()+rectangulo.getAncho()>=this.x+this.ancho&&rectangulo.getY()<=this.y&&rectangulo.getY()+rectangulo.getAlto()>=this.y+this.alto){
               // console.log(this.x+this.ancho+"  "+(rectangulo.getX()+rectangulo.getAncho()));
                return true;
            }else{
                if(rectangulo.getX()<=this.x&&rectangulo.getX()+rectangulo.getAncho()>=this.x&&rectangulo.getY()<=this.y&&rectangulo.getY()+rectangulo.getAlto()>=this.y+this.alto){
                    return true;
                }else{
                    if(rectangulo.getX()>=this.x&&rectangulo.getX()<=this.x+this.ancho&&rectangulo.getY()<=this.y&&rectangulo.getY()+rectangulo.getAlto()>=this.y+this.alto){
                        return true;
                    }else{
                        return false;
                    }
                    
                }
                
            }
        
            
    }
}