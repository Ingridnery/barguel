function updateClientesTable(){
    $.ajax({
        type: "GET",
        url: "/cliente/getAll",
        success: function(result){
            var clientes = result;
            var clientesTable = $("#clientesTable");
            clientesTable.empty();
            for(var i=0; i<clientes.length; i++){
                var cliente = clientes[i];
                clientesTable.append("<tr><td>"+cliente.nome+"</td><td>"+cliente.cpf+"</td><td>"+cliente.email+"</td><td>"+cliente.arraisAmador+"</td>");
            }
        },
    });
}



$(document).ready(isLoggedIn() ? updateClientesTable() : window.location.href = "login.html");