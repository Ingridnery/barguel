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
                barcosTable.append("<tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'><td class='py-4 px-6'>"+barco.nome+"</td><td class='py-4 px-6'>"+barco.tipoBarco+"</td><td class='py-4 px-6'>"+barco.tamanho+"</td><td class='py-4 px-6'>"+barco.qtdPassageiros+"</td><td class='py-4 px-6'>"+barco.valorDiaria+"</td><td class='hidden'>"+barco.id+"</td>");
            }
        }
    });
}

function removeModalBackdrop(){
    $("body > div").remove();
}

function create(barco){
    $.ajax({
        url:'/barco/save',
        method: 'POST',
        data: JSON.stringify(barco),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(){
            Swal.fire({
                title: 'Sucesso!',
                text: 'Barco cadastrado com sucesso!',
                icon: 'success'
            })
            updateBarcosTable();
            $("#modal-form")[0].reset();
        }
     })
}

function displayLoggedInOptions(){
    // aqui manda mostrar a coluna de editar e excluir
    $("#btnAddBarco").show();
}

function hideLoggedInOptions(){
    $("#btnAddBarco").addClass("hidden");
}


$(document).ready(function(){
    isLoggedIn() ? displayLoggedInOptions() : hideLoggedInOptions();
    updateBarcosTable();
});


$("#modal-form").submit(function(event){
    event.preventDefault();
    let barco = {
        nome: $("#nome").val(),
        tipoBarco: $("#tipoBarco").val(),
        tamanho: $("#tamanho").val(),
        qtdPassageiros: $("#qtdPassageiros").val(),
        valorDiaria: $("#valorDiaria").val()
    }

    create(barco);
    const modal = new Modal(document.getElementById('modalBarco'));
    modal.hide();
    removeModalBackdrop();
});