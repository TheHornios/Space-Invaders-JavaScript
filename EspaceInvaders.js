document.addEventListener('DOMContentLoaded',function(){
    inicio.iniciarJuego();
},false);

var inicio = {
    iniciarJuego:function(){
        console.log("Juego Iniciado");
        teclado.iniciar();
        dimensionesVentana.iniciar();
        var htmlInicial = document.getElementById("juego").innerHTML;
        var juego = new Juego1(htmlInicial);
        bucleprincipal.iniciar(juego);
        bucleprincipal.iterar();
    },
  /*  recargarTiles:function(){
        document.getElementById("juego").innerHTML = ""
        for(var i = 0 ;i<dimensionesVentana.obtnerTilesVerticales();i++){
            for(var x= 0 ; x<dimensionesVentana.obtnerTilesHorizontales();x++){
                var r = new Rectangulo(x * dimensionesVentana.ladoTiles, i * dimensionesVentana.ladoTiles,dimensionesVentana.ladoTiles,dimensionesVentana.ladoTiles);
            }
        }
    }*/

};