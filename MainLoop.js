var bucleprincipal = {
    idEjecucion:null,
    ultimosRegistro:0,
    aps:0,
    fps:0,
    juego:null, //725--657
    cronometreo:null,
    iniciar:function(valor){
        juego = valor;
        bucleprincipal.cronometreo = new Cronometro();
        bucleprincipal.cronometreo.run(40);
    },
    iterar:function(registroTemporal){
        bucleprincipal.idEjecucion = window.requestAnimationFrame(bucleprincipal.iterar);

        bucleprincipal.update(registroTemporal);
        bucleprincipal.draw(registroTemporal);
        if(registroTemporal - bucleprincipal.ultimosRegistro > 999){
            bucleprincipal.ultimosRegistro = registroTemporal;
          //  console.log("APS: "+bucleprincipal.aps+" | FPS: "+bucleprincipal.fps);
            bucleprincipal.aps = 0;
            bucleprincipal.fps = 0;
        }
    },
    detener:function(){

    },
    update:function(registroTemporal){
        

     //   bucleprincipal.cronometreo.update();
        
     //  && if(!bucleprincipal.cronometreo.isEncendido()){
            
         //   teclado.reiniciar();
           // console.log(bucleprincipal.cronometreo.isEncendido());
        //    bucleprincipal.cronometreo.run(40);
            //console.log(bucleprincipal.cronometreo.isEncendido());
      //  }
        juego.update();
        bucleprincipal.aps++;
    },
    draw:function(registroTemporal){
        //juego.draw();
        bucleprincipal.fps++;
    }
};