var teclado = {
    teclas: new Array(),
    iniciar:function(){
        //teclado.reiniciar();
        document.onkeydown = teclado.guardarTecla;
        document.onkeyup= teclado.reiniciar;
    },
    guardarTecla:function(e){
        teclado.teclas.push(e.key);
        
       // console.log(e.key+" TeclaPulsada");
    },
    quitarTecla:function(e){
        var index = teclado.teclas.indexOf(e.key);
        if(index > -1){
            teclado.teclas.splice(index,1);
        }
        
       // console.log(e.key+" TeclaPulsada");
    },
    teclaPulsada:function(codigoTecla){
        return(teclado.teclas.indexOf(codigoTecla) !== -1)?true:false;
    },
    reiniciar:function(){
        teclado.teclas = new Array();
       // document.onkeyup = teclado.quitarTecla;
    }
}