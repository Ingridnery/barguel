function updateBarcosTable(){
    $.ajax({
        type: "GET",
        url: "/barco/getAll",
        success: function(result){
            var barcos = result;
            var barcosTable = $("#barcosTable");
            barcosTable.empty();
            for(var i=0; i<barcos.length; i++){
                var barco = barcos[i];
                barcosTable.append("<tr><td>"+barco.nome+"</td><td>"+barco.tipoBarco+"</td><td>"+barco.tamanho+"</td><td>"+barco.qtdPassageiros+"</td><td>"+barco.valorDiaria+"</td>");
            }
        }
    });
}



$(document).ready(updateBarcosTable);