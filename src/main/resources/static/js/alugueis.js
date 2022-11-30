function updateAlugueisTable(){
    $.ajax({
        type: "GET",
        url: "/aluguel/getAll",
        success: function(result){
            var alugueis = result;
            var alugueisTable = $("#alugueisTable");
            alugueisTable.empty();
            for(var i=0; i < alugueis.length; i++) {
                var aluguel = alugueis[i];
                alugueisTable.append("<tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'><td class='py-4 px-6'>" + aluguel.cliente.nome + "</td><td class='py-4 px-6'>" + aluguel.barco.nome + "</td><td class='py-4 px-6'>" + aluguel.dataInicio + "</td><td class='py-4 px-6'>" + aluguel.dataFinal + "</td><td class='py-4 px-6'>" + aluguel.qtdPassageiros + "</td><td id='" + aluguel.id + "'><a href='#' onclick='edit(event)' data-modal-toggle='modalAluguel' type='button' data-modal-toggle='modalAluguel' class='edit font-medium text-blue-600 dark:text-blue-500 hover:underline' ><i class='fa-solid fa-lg fa-pen-to-square'></i></a><a href='#' onclick='remove(event)' class='font-medium text-red-600 ml-3 dark:text-red-500 hover:underline'><i class='fa-solid fa-lg fa-trash'></i></a></td></tr>");

            }
            },
    });
}

$(document).ready(function (){
    isLoggedIn() ? updateAlugueisTable() : window.location.href = "login.html";

    $.ajax({
        type: "GET",
        url: "/cliente/getAll",
        success: function (result) {
            var clientes = result;
            var clienteOption = $("#cliente");
            for (var i = 0; i < clientes.length; i++) {
                var cliente = clientes[i];
                clienteOption.append("<option value='" + cliente.id + "'>" + cliente.nome + "</option>");
                console.log()
            }
        }
    });
    $.ajax({
        type: "GET",
        url: "/barco/getAll",
        success: function (result) {
            var barcos = result;
            var barcoOption = $("#barco");
            for (var i = 0; i < barcos.length; i++) {
                var barco = barcos[i];
                barcoOption.append("<option value='" + barco.id + "'>" + barco.nome + "</option>");
            }
        }
    });
});


function update(aluguel,id){
    $.ajax({
        url:'/aluguel/update/'+id,
        method: 'PUT',
        data: JSON.stringify(aluguel),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(){
            updateAlugueisTable();
            $("#modal-form")[0].reset();
            const modal = new Modal(document.getElementById('modalAluguel'));
            modal.hide();
        }
    })
}

function create(aluguel){
    $.ajax({
        url:'/aluguel/save',
        method: 'POST',
        data: JSON.stringify(aluguel),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(){
            Swal.fire({
                title: 'Sucesso!',
                text: 'Aluguel cadastrado com sucesso!',
                icon: 'success'
            })
            updateClientesTable();
            $("#modal-form")[0].reset();
        }
    })
}

function remove(event){
    let id = $(event.currentTarget.parentNode).attr('id');
    $.ajax({
        url:'http://localhost:8080/aluguel/delete/'+ id,
        method: 'DELETE',
        success: function(){
            updateAlugueisTable();
        }
    })
}

$("#btnAddAluguel").click(function(){
    $("#typeOfOperation").val("CREATE");
});

$("#modal-form").submit(function(event){
    event.preventDefault();
    let aluguel = {
        cliente : $("#cliente").val(),
        barco : $("#barco").val(),
        qtdPassageiros: $("#passageiros").val(),
        dataInicio : $("#inicio").val(),
        dataFim : $("#fim").val()
    }
    let typeOfOperation = $("#typeOfOperation").val();
    if(typeOfOperation === 'CREATE')
        create(aluguel);
    else if(typeOfOperation === 'UPDATE')
        update(aluguel, $("#aluguelId").val());
    else
        alert('Invalid operation');

    const modal = new Modal(document.getElementById('modalAluguel'));
    modal.hide();
    removeModalBackdrop();
});

function edit(event)
{
    event.preventDefault();
    let id = $(event.currentTarget.parentNode).attr('id');
    $.ajax({
        url: 'http://localhost:8080/aluguel/findBy/' + id,
        method: 'GET',
        success: function (data) {
           $("#cliente").val(data.cliente);
           $("#barco").val(data.barco);
            $("#passageiros").val(data.qtdPassageiros);
            $("#inicio").val(data.dataInicio);
            $("#fim").val(data.dataFinal);
            $("#typeOfOperation").val("UPDATE");
            $("#aluguelId").val(id);
            const modal = new Modal(document.getElementById('modalAluguel'));
            modal.show();
        }
    })
}
function removeModalBackdrop(){
    $("body > div").remove();
}