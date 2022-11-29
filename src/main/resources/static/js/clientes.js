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
                clientesTable.append("<tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'><td class='py-4 px-6'>"+cliente.nome+"</td><td class='py-4 px-6'>"+cliente.cpf+"</td><td>"+cliente.email+"</td><td class='py-4 px-6'>"+cliente.arraisAmador+"</td>");
            }
        },
    });
}

function removeModalBackdrop(){
    $("body > div").remove();
}

function create(cliente){
    $.ajax({
        url:'/cliente/save',
        method: 'POST',
        data: JSON.stringify(cliente),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(){
            Swal.fire({
                title: 'Sucesso!',
                text: 'Cliente cadastrado com sucesso!',
                icon: 'success'
            })
            updateClientesTable();
            $("#modal-form")[0].reset();
        }
     })
}


$(document).ready(isLoggedIn() ? updateClientesTable() : window.location.href = "login.html");

$("#modal-form").submit(function(event){
    event.preventDefault();
    let cliente = {
        nome: $("#nome").val(),
        cpf: $("#cpf").val(),
        email: $("#email").val(),
        arraisAmador: $("#arrais").val()
    }
    
    create(cliente);
    const modal = new Modal(document.getElementById('modalCliente'));
    modal.hide();
    removeModalBackdrop();
});