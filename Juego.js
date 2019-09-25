class Juego1{
        constructor(htmBueno){
            this.htmBueno = htmBueno;
            this.nave=null;//new Rectangulo(100,90,90,90,"img/nave.png");
            this.marciamos=null;
            this.disparosMarcianos= null;
            this.cronometro=null;
            this.direcion=true;
            this.direcion1 = false;
            this.direcion_bajar=false;
            this.direcion_bajar1=false;

            this.nave = new Nave(dimensionesVentana.ancho/2-30,dimensionesVentana.alto-100,60,36,"img/nave.png",this);
            this.marciamos = new Array();
            this.disparosMarcianos= new Array();
            this.crearMarcianos();
            this.cronometro = new Cronometro();
            this.cronometro.run(3000);
            this.arrayParapeto = new Array();
            this.crarParapetos();
            this.cronoAhorrarTiempo = new Cronometro();
            this.cronometro.run(10);
        }
        borrarHtml(){
            document.getElementById("juego").innerHTML = this.htmBueno;
        }
        getParapetos(){
            return this.arrayParapeto;
        }
       
        update(){
        /* Actualizar los parapetos */
        
        
        /* Mover Marcianos y actualizarlos*/
        if(this.marciamos.length != 0){
            for(var i = 0 ; i<this.marciamos.length;i++){
               
                if(!this.cronometro.isEncendido()){
                    if(!this.direcion_bajar){
                        if(this.direcion){
                            if(!this.marciamos[i].getMuerto()){
                                    this.marciamos[i].setX(this.marciamos[i].getX()+30);
                                    this.marciamos[i].update();
                                    if(this.marciamos[i].getX()>dimensionesVentana.ancho-80){
                                        this.direcion1 = true;
                                    }
                                }
                        }else{
                            if(!this.marciamos[i].getMuerto()){
                                this.marciamos[i].setX(this.marciamos[i].getX()-30);
                                this.marciamos[i].update();
                                if(this.marciamos[i].getX()<50){
                                    this.direcion1 = true;
                                }
                            }
                        }
                    }else{
                        if(!this.marciamos[i].getMuerto()){
                            this.marciamos[i].setY(this.marciamos[i].getY()+30);
                            this.marciamos[i].update();
                            this.direcion_bajar1 = true;
                        }
                    }
                    
                }
                this.marciamos[i].update();        
            }
            if(this.direcion1){
                this.direcion_bajar= true;
                this.direcion1 = false;
            }
            if(this.direcion_bajar1){
                
                this.direcion_bajar1 = false;
                this.direcion_bajar = false;
                if(this.direcion){
                    this.direcion = false;
                }else{
                    this.direcion = true;
                }
            }
            if(!this.cronometro.isEncendido()){
                this.cronometro.run(3000);
            }
        }
        
        /*Actualizar y borrar Disparos Marcianos*/
        
        if(this.disparosMarcianos.length != 0){
            var borrar = -1;
            for(var i = 0 ; i<this.disparosMarcianos.length;i++){
                if(this.disparosMarcianos[i]!==undefined&&this.disparosMarcianos[i] !=null&&!this.marciamos[i].getEliminado()){
                    this.disparosMarcianos[i].update();
                
                    if(this.disparosMarcianos[i].getY()> dimensionesVentana.ancho+150){
                        borrar = i;
                        this.disparosMarcianos[i].update();
                        this.disparosMarcianos[i].setBorrar(true);
                        this.disparosMarcianos[i].setEliminado(true);
                    }
                    
                }
            }
            if(this.borrar != -1){
                delete this.disparosMarcianos[borrar];
               // this.reprintear();
            }
        }
        
        /* Movimiento de la nave por las teclas */
        if(teclado.teclaPulsada("ArrowRight")&&this.nave.getX()+this.nave.getAncho()<dimensionesVentana.ancho-10){
            this.nave.setX(this.nave.getX()+5);
        }else{
            if(teclado.teclaPulsada("ArrowLeft")&&this.nave.getX()>7){
                this.nave.setX(this.nave.getX()-5);
            }
        }
        
        /* Actualizar la nave y comparar las colisiones cada 10 ms */
        this.nave.update();
        this.cronoAhorrarTiempo.update();
        if(!this.cronoAhorrarTiempo.isEncendido()){
            if(this.arrayParapeto.length != 0){
                for(var i = 0 ; i<this.arrayParapeto.length;i++){
                    this.arrayParapeto[i].update();
                }
            }

            this.compararDeisparosNave();
            this.colisionesParapetos();
            this.cronoAhorrarTiempo.run(10);
        }
        
        this.cronometro.update();
        }

        /* Borra el html y lo vuelve a printear todos los objetos que estan vivos */
        reprintear(){
            this.borrarHtml();
            this.nave.reprientear();
            
            if(!this.arrayParapeto.length==0){
                var borrar = -1;
                for(let x = 0 ; x<this.arrayParapeto.length;x++){
                    if(this.arrayParapeto[x].isVivo()){
                        this.arrayParapeto[x].reprientear();
                    }else{
                        borrar = x;
                    }
                }
                if(borrar > -1){
                    this.arrayParapeto.splice(borrar,1);
                }
            }
            
            if(this.nave.getDisparos().length!=0){
                var borrar = -1;
                for(let i = 0;i<this.nave.getDisparos().length;i++){
                    if(this.nave.getDisparosEaspecifico(i) !== undefined){
                        if(!this.nave.getDisparosEaspecifico(i).idBorrar()){
                            this.nave.getDisparosEaspecifico(i).reprientear();
                        }else{
                            borrar = i;
                        }
                    }
                }
                if(borrar > -1){
                    this.nave.getDisparos().splice(borrar,1);
                }
            }

            if(this.disparosMarcianos.length!=0){
                for(let i = 0;i<this.disparosMarcianos.length;i++){
                    if(this.disparosMarcianos[i] !== undefined){
                        if(!this.disparosMarcianos[i].idBorrar()){
                            this.disparosMarcianos[i].reprientear();
                        }else{
                            borrar = i;
                        }
                    }
                }
                if(borrar > -1){
                    this.disparosMarcianos.splice(borrar,1);
                }
            }

            if(this.marciamos.length!=0){
                var borrar = -1;
                for(let i = 0;i<this.marciamos.length;i++){
                    if(this.marciamos[i] !== undefined){
                        if(!this.marciamos[i].getEliminado()){
                            this.marciamos[i].reprientear();
                        }else{
                            borrar = i;
                        }
                    }
                }
                if(borrar > -1){
                    this.marciamos.splice(borrar,1);
                }
            }
        }
        /* Colision de los parapetos de los disparos de la nave Y los marcianos */
        colisionesParapetos(){
             /* Disparos nave Colisiones Parapetos */
            if(this.nave.getDisparos().length!=0){
                for(let i = 0;i<this.nave.getDisparos().length;i++){
                    if(this.nave.getDisparosEaspecifico(i) !== undefined){

                        if(this.arrayParapeto.length != 0){
 
                            for(let x = 0 ; x<this.arrayParapeto.length;x++){
                                if(this.arrayParapeto[x].isVivo()){
                                    this.arrayParapeto[x].update();
                                    if(this.nave.getDisparosEaspecifico(i) !== undefined&&!this.nave.getDisparosEaspecifico(i).idBorrar()&&this.nave.getDisparosEaspecifico(i).getRectangulo().colision(this.arrayParapeto[x].getRectangulo())){
                                         this.arrayParapeto[x].vidas1();
                                         this.arrayParapeto[x].update();
                                         this.nave.getDisparosEaspecifico(i).setBorrar(true);
                                         this.nave.getDisparosEaspecifico(i).setEliminado(true);
                                         this.reprintear();
                                    }
                                }
                            }

                        }

                    }
                }
            }
            /* Disparos marcianos Colisiones Parapetos */
            if(this.disparosMarcianos.length!=0){
                for(let i = 0;i<this.disparosMarcianos.length;i++){
                    if(this.disparosMarcianos[i] !== undefined&&this.disparosMarcianos[i] != null){

                        if(this.arrayParapeto.length != 0){
 
                            for(let x = 0 ; x<this.arrayParapeto.length;x++){
                                if(this.arrayParapeto[x].isVivo()){
                                    this.arrayParapeto[x].update();
                                    if(this.disparosMarcianos[i] !== undefined&&!this.disparosMarcianos[i].idBorrar()&&this.disparosMarcianos[i].getRectangulo().colision(this.arrayParapeto[x].getRectangulo())){
                                         this.arrayParapeto[x].vidas1();
                                         this.arrayParapeto[x].update();
                                         this.disparosMarcianos[i].setBorrar(true);
                                         this.disparosMarcianos[i].setEliminado(true);
                                         this.reprintear();
                                    }
                                }
                            }

                        }

                    }
                }
            }
        }

        compararDeisparosNave(){
            if(this.nave.getDisparos().length!=0){
                for(var i = 0;i<this.nave.getDisparos().length;i++){
                    if(this.nave.getDisparosEaspecifico(i) !== undefined){
                        for(var x = 0 ; x<this.marciamos.length;x++){
                            if(this.marciamos[x] != null&&!this.marciamos[x].getMuerto()){
                                if(this.nave.getDisparosEaspecifico(i) !== undefined&&this.nave.getDisparosEaspecifico(i).getRectangulo().colision(this.marciamos[x].getRectangulo())){
                                    this.marciamos[x].setMuerto(true);
                                    this.nave.getDisparosEaspecifico(i).setBorrar(true);
                                    this.nave.getDisparosEaspecifico(i).setEliminado(true);
                                    this.reprintear();
                                }
                            }
                        }
                    }
                }
            }
        }

        /* Crea Los Marcinos e n sus posiciones al inciar el juego */
        crearMarcianos(){
            var x = 0;
            var z = 20;
            for(var i = 0 ;i<z;i++){
                if(dimensionesVentana.ancho-300>50+x){
                    this.marciamos.push(new Marciano(50+x,50,60,36,"img/marciano3_3.png","img/marciano3.png",this.disparosMarcianos));
                    x +=80;
                }
            }
            x = 0;
            for(var i = 0 ;i<z;i++){
                if(dimensionesVentana.ancho-300>50+x){
                    this.marciamos.push(new Marciano(50+x,50+60,60,36,"img/maciano2_2.png","img/maciano2.png",this.disparosMarcianos));
                    x +=80;
                }
            }
            x = 0;
            for(var i = 0 ;i<z;i++){
                if(dimensionesVentana.ancho-300>50+x){
                    this.marciamos.push(new Marciano(50+x,50+60*2,60,36,"img/maciano2_2.png","img/maciano2.png",this.disparosMarcianos));
                    x +=80;
                }
            }
            x = 0;
            for(var i = 0 ;i<z;i++){
                if(dimensionesVentana.ancho-300>50+x){
                    this.marciamos.push(new Marciano(50+x,50+60*3,60,36,"img/maciano2_2.png","img/maciano2.png",this.disparosMarcianos));
                    x +=80;
                }
            }
            x = 0;
            for(var i = 0 ;i<z;i++){
                if(dimensionesVentana.ancho-300>50+x){
                    this.marciamos.push(new Marciano(50+x,50+60*4,60,36,"img/maciano1_2.png","img/maciano1.png",this.disparosMarcianos));
                    x +=80;
                }
            }
            x = 0;
            for(var i = 0 ;i<z;i++){
                if(dimensionesVentana.ancho-300>50+x){
                    this.marciamos.push(new Marciano(50+x,50+60*5,60,36,"img/maciano1_2.png","img/maciano1.png",this.disparosMarcianos));
                    x +=80;
                }
            }
        }

        /* Crear parapetos de la peor forma que se me ocurrio */
        crarParapetos(){        //18 * 17
            var img =["img/1/parapeto1_2_3_4_8.png","img/1/parapeto1_2.png","img/1/parapeto1_3.png","img/1/parapeto1_4.png"];
            var img1 =["img/5/parapeto5.png","img/5/parapeto5_2.png","img/5/parapeto5_3.png","img/5/parapeto5_4.png"];
            var img2 =["img/6/parapeto6.png","img/6/parapeto6_2.png","img/6/parapeto6_3.png","img/6/parapeto6_4.png"];
            var img3 =["img/7/parapeto7.png","img/7/parapeto7_2.png","img/7/parapeto7_3.png","img/7/parapeto7_4.png"];
            var img4 =["img/9/parapet9.png","img/9/parapet9_2.png","img/9/parapet9_3.png","img/9/parapet9_4.png"];
            this.arrayParapeto.push(new Parapeto( img,100,this.nave.getY()-70,18,17,this));
            this.arrayParapeto.push(new Parapeto( img,100,this.nave.getY()-70-17,18,17,this));
            this.arrayParapeto.push(new Parapeto( img1,100+18,this.nave.getY()-70-17,18,17,this));
            this.arrayParapeto.push(new Parapeto( img3,100,this.nave.getY()-70-17-17,18,17,this));

            this.arrayParapeto.push(new Parapeto( img,100+18,this.nave.getY()-70-17-17,18,17,this));
            this.arrayParapeto.push(new Parapeto( img,100+18+18,this.nave.getY()-70-17-17,18,17,this));

            this.arrayParapeto.push(new Parapeto( img2,100+18+18,this.nave.getY()-70-17,18,17,this));
            this.arrayParapeto.push(new Parapeto( img,100+18+18+18,this.nave.getY()-70,18,17,this));
            this.arrayParapeto.push(new Parapeto( img,100+18+18+18,this.nave.getY()-70-17,18,17,this));
            this.arrayParapeto.push(new Parapeto( img4,100+18+18+18,this.nave.getY()-70-17-17,18,17,this));
            if(dimensionesVentana.ancho>400){
                this.arrayParapeto.push(new Parapeto( img,300,this.nave.getY()-70,18,17,this));
                this.arrayParapeto.push(new Parapeto( img,300,this.nave.getY()-70-17,18,17,this));
                this.arrayParapeto.push(new Parapeto( img1,300+18,this.nave.getY()-70-17,18,17,this));
                this.arrayParapeto.push(new Parapeto( img3,300,this.nave.getY()-70-17-17,18,17,this));

                this.arrayParapeto.push(new Parapeto( img,300+18,this.nave.getY()-70-17-17,18,17,this));
                this.arrayParapeto.push(new Parapeto( img,300+18+18,this.nave.getY()-70-17-17,18,17,this));

                this.arrayParapeto.push(new Parapeto( img2,300+18+18,this.nave.getY()-70-17,18,17,this));
                this.arrayParapeto.push(new Parapeto( img,300+18+18+18,this.nave.getY()-70,18,17,this));
                this.arrayParapeto.push(new Parapeto( img,300+18+18+18,this.nave.getY()-70-17,18,17,this));
                this.arrayParapeto.push(new Parapeto( img4,300+18+18+18,this.nave.getY()-70-17-17,18,17,this));
                if(dimensionesVentana.ancho>600){
                    this.arrayParapeto.push(new Parapeto( img,500,this.nave.getY()-70,18,17,this));
                    this.arrayParapeto.push(new Parapeto( img,500,this.nave.getY()-70-17,18,17,this));
                    this.arrayParapeto.push(new Parapeto( img1,500+18,this.nave.getY()-70-17,18,17,this));
                    this.arrayParapeto.push(new Parapeto( img3,500,this.nave.getY()-70-17-17,18,17,this));
    
                    this.arrayParapeto.push(new Parapeto( img,500+18,this.nave.getY()-70-17-17,18,17,this));
                    this.arrayParapeto.push(new Parapeto( img,500+18+18,this.nave.getY()-70-17-17,18,17,this));
    
                    this.arrayParapeto.push(new Parapeto( img2,500+18+18,this.nave.getY()-70-17,18,17,this));
                    this.arrayParapeto.push(new Parapeto( img,500+18+18+18,this.nave.getY()-70,18,17,this));
                    this.arrayParapeto.push(new Parapeto( img,500+18+18+18,this.nave.getY()-70-17,18,17,this));
                    this.arrayParapeto.push(new Parapeto( img4,500+18+18+18,this.nave.getY()-70-17-17,18,17,this));
                    if(dimensionesVentana.ancho>800){
                        this.arrayParapeto.push(new Parapeto( img,700,this.nave.getY()-70,18,17,this));
                        this.arrayParapeto.push(new Parapeto( img,700,this.nave.getY()-70-17,18,17,this));
                        this.arrayParapeto.push(new Parapeto( img1,700+18,this.nave.getY()-70-17,18,17,this));
                        this.arrayParapeto.push(new Parapeto( img3,700,this.nave.getY()-70-17-17,18,17,this));
        
                        this.arrayParapeto.push(new Parapeto( img,700+18,this.nave.getY()-70-17-17,18,17,this));
                        this.arrayParapeto.push(new Parapeto( img,700+18+18,this.nave.getY()-70-17-17,18,17,this));
        
                        this.arrayParapeto.push(new Parapeto( img2,700+18+18,this.nave.getY()-70-17,18,17,this));
                        this.arrayParapeto.push(new Parapeto( img,700+18+18+18,this.nave.getY()-70,18,17,this));
                        this.arrayParapeto.push(new Parapeto( img,700+18+18+18,this.nave.getY()-70-17,18,17,this));
                        this.arrayParapeto.push(new Parapeto( img4,700+18+18+18,this.nave.getY()-70-17-17,18,17,this));
                        if(dimensionesVentana.ancho>1000){
                            this.arrayParapeto.push(new Parapeto( img,900,this.nave.getY()-70,18,17,this));
                            this.arrayParapeto.push(new Parapeto( img,900,this.nave.getY()-70-17,18,17,this));
                            this.arrayParapeto.push(new Parapeto( img1,900+18,this.nave.getY()-70-17,18,17,this));
                            this.arrayParapeto.push(new Parapeto( img3,900,this.nave.getY()-70-17-17,18,17,this));
            
                            this.arrayParapeto.push(new Parapeto( img,900+18,this.nave.getY()-70-17-17,18,17,this));
                            this.arrayParapeto.push(new Parapeto( img,900+18+18,this.nave.getY()-70-17-17,18,17,this));
            
                            this.arrayParapeto.push(new Parapeto( img2,900+18+18,this.nave.getY()-70-17,18,17,this));
                            this.arrayParapeto.push(new Parapeto( img,900+18+18+18,this.nave.getY()-70,18,17,this));
                            this.arrayParapeto.push(new Parapeto( img,900+18+18+18,this.nave.getY()-70-17,18,17,this));
                            this.arrayParapeto.push(new Parapeto( img4,900+18+18+18,this.nave.getY()-70-17-17,18,17,this));
                            if(dimensionesVentana.ancho>1200){
                                this.arrayParapeto.push(new Parapeto( img,1100,this.nave.getY()-70,18,17,this));
                                this.arrayParapeto.push(new Parapeto( img,1100,this.nave.getY()-70-17,18,17,this));
                                this.arrayParapeto.push(new Parapeto( img1,1100+18,this.nave.getY()-70-17,18,17,this));
                                this.arrayParapeto.push(new Parapeto( img3,1100,this.nave.getY()-70-17-17,18,17,this));
                
                                this.arrayParapeto.push(new Parapeto( img,1100+18,this.nave.getY()-70-17-17,18,17,this));
                                this.arrayParapeto.push(new Parapeto( img,1100+18+18,this.nave.getY()-70-17-17,18,17,this));
                
                                this.arrayParapeto.push(new Parapeto( img2,1100+18+18,this.nave.getY()-70-17,18,17,this));
                                this.arrayParapeto.push(new Parapeto( img,1100+18+18+18,this.nave.getY()-70,18,17,this));
                                this.arrayParapeto.push(new Parapeto( img,1100+18+18+18,this.nave.getY()-70-17,18,17,this));
                                this.arrayParapeto.push(new Parapeto( img4,1100+18+18+18,this.nave.getY()-70-17-17,18,17,this));
                                if(dimensionesVentana.ancho>1400){
                                    this.arrayParapeto.push(new Parapeto( img,1300,this.nave.getY()-70,18,17,this));
                                    this.arrayParapeto.push(new Parapeto( img,1300,this.nave.getY()-70-17,18,17,this));
                                    this.arrayParapeto.push(new Parapeto( img1,1300+18,this.nave.getY()-70-17,18,17,this));
                                    this.arrayParapeto.push(new Parapeto( img3,1300,this.nave.getY()-70-17-17,18,17,this));
                    
                                    this.arrayParapeto.push(new Parapeto( img,1300+18,this.nave.getY()-70-17-17,18,17,this));
                                    this.arrayParapeto.push(new Parapeto( img,1300+18+18,this.nave.getY()-70-17-17,18,17,this));
                    
                                    this.arrayParapeto.push(new Parapeto( img2,1300+18+18,this.nave.getY()-70-17,18,17,this));
                                    this.arrayParapeto.push(new Parapeto( img,1300+18+18+18,this.nave.getY()-70,18,17,this));
                                    this.arrayParapeto.push(new Parapeto( img,1300+18+18+18,this.nave.getY()-70-17,18,17,this));
                                    this.arrayParapeto.push(new Parapeto( img4,1300+18+18+18,this.nave.getY()-70-17-17,18,17,this));
                                    if(dimensionesVentana.ancho>1600){
                                        this.arrayParapeto.push(new Parapeto( img,1500,this.nave.getY()-70,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img,1500,this.nave.getY()-70-17,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img1,1500+18,this.nave.getY()-70-17,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img3,1500,this.nave.getY()-70-17-17,18,17,this));
                        
                                        this.arrayParapeto.push(new Parapeto( img,1500+18,this.nave.getY()-70-17-17,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img,1500+18+18,this.nave.getY()-70-17-17,18,17,this));
                        
                                        this.arrayParapeto.push(new Parapeto( img2,1500+18+18,this.nave.getY()-70-17,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img,1500+18+18+18,this.nave.getY()-70,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img,1500+18+18+18,this.nave.getY()-70-17,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img4,1500+18+18+18,this.nave.getY()-70-17-17,18,17,this));
                                    }
                                    if(dimensionesVentana.ancho>1800){
                                        this.arrayParapeto.push(new Parapeto( img,1700,this.nave.getY()-70,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img,1700,this.nave.getY()-70-17,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img1,1700+18,this.nave.getY()-70-17,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img3,1700,this.nave.getY()-70-17-17,18,17,this));
                        
                                        this.arrayParapeto.push(new Parapeto( img,1700+18,this.nave.getY()-70-17-17,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img,1700+18+18,this.nave.getY()-70-17-17,18,17,this));
                        
                                        this.arrayParapeto.push(new Parapeto( img2,1700+18+18,this.nave.getY()-70-17,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img,1700+18+18+18,this.nave.getY()-70,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img,1700+18+18+18,this.nave.getY()-70-17,18,17,this));
                                        this.arrayParapeto.push(new Parapeto( img4,1700+18+18+18,this.nave.getY()-70-17-17,18,17,this));
                                    }
                                }
                            }
                        }
                    }

                }

            }
            console.log(this.arrayParapeto.length+" Cargados")
        }
}
