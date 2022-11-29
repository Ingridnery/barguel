function updateAlugueisTable(){
    $.ajax({
        type: "GET",
        url: "/aluguel/getAll",
        success: function(result){
            var alugueis = result;
            var alugueisTable = $("#alugueisTable");
            alugueisTable.empty();
            for(var i=0; i < alugueis.length; i++){
                var aluguel = alugueis[i];
                alugueisTable.append("<tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'><td class='py-4 px-6'>"+aluguel.cliente.nome+"</td><td class='py-4 px-6'>"+aluguel.barco.nome+"</td><td class='py-4 px-6'>"+aluguel.dataInicio+"</td><td class='py-4 px-6'>"+aluguel.dataFinal+"</td><td class='py-4 px-6'>"+aluguel.qtdPassageiros+"</td>");
            }
        },
    });
}

$(document).ready(isLoggedIn() ? updateAlugueisTable() : window.location.href = "login.html");