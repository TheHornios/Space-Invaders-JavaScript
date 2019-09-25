var dimensionesVentana ={
    ancho:window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    alto:window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    ladoTiles:50,
    escala:1,
    iniciar: function(){
        window.addEventListener("resize",function(e){
            dimensionesVentana.ancho = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            dimensionesVentana.alto = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            
           // document.getElementById("juego").style.transform ="scale("+dimensionesVentana.obtenerFactorEscalaEjeX()+","+ dimensionesVentana.obtenerFactorEscalaEjeY()+")";
           // console.log("Ancho: "+dimensionesVentana.obtenerFactorEscalaEjeX()+" | Alto: "+dimensionesVentana.obtenerFactorEscalaEjeY());
            //inicio.recargarTiles();
        });
    },
    obtnerTilesHorizontales:function(){
        var ladoFinal = dimensionesVentana.ladoTiles * dimensionesVentana.escala;
        return Math.ceil((dimensionesVentana.ancho-ladoFinal)/ladoFinal);
    },
    obtnerTilesVerticales:function(){
        var ladoFinal = dimensionesVentana.ladoTiles * dimensionesVentana.escala;
        return Math.ceil((dimensionesVentana.alto-ladoFinal)/ladoFinal);
    },
    obtenerTotalTitles:function(){
        return dimensionesVentana.obtnerTilesHorizontales() * dimensionesVentana.obtnerTilesVerticales();
    },
    obtenerFactorEscalaEjeX:function(){
        return this.ancho/1920;
    },
    obtenerFactorEscalaEjeY:function(){
        return this.alto/969;
    }
    
}