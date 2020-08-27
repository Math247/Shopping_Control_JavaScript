var list = [
    {"desc":"rice", "amount":"1","value":"5.40"},
    {"desc":"beer", "amount":"12","value":"1.99"},
    {"desc":"meat", "amount":"1","value":"15.00"}
];

//função pega a lista de objetos e calcula o total da compra
function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    return total;
}

//essa função criou os valores da tabela, criou a variavel table onde recebia o cabeçalho da tabela, e depois
//dinamicamente foi criando os valores na tabela de acordo com a lista;
function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
    for(var key in list){
        table += '<tr><td>'+ list[key].desc +'</td><td>'+ list[key].amount +'</td><td>'+ list[key].value +'</td><td>Edit | Delete</td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
}
setList(list);

console.log(getTotal(list));