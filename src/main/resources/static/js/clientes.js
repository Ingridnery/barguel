function updateClientesTable(){
    $.ajax({
        type: "GET",
        url: "/cliente/getAll",
        success: function(result){
            var clientes = result;
            var clientesTable = $("#barcosTable");
            clientesTable.empty();
            for(var i=0; i<clientes.length; i++){
                var cliente = clientes[i];
                //clientesTable.append("<tr><td>"+cliente.nome+"</td><td>"+cliente.tipoBarco+"</td><td>"+barco.tamanho+"</td><td>"+barco.qtdPassageiros+"</td><td>"+barco.valorDiaria+"</td>");
            }
        },
    });
}



$(document).ready(isLoggedIn() ? updateClientesTable() : window.location.href = "login.html");