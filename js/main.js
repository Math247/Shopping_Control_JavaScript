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
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ list[key].amount +'</td><td>'+ formatValue(list[key].value) +'</td><td> <button class="btn btn-default" onclick = "setUpdate('+key+');">Edit</button> | Delete</td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
}

//formatando o desc para ter uma letra maiuscula na frente
function formatDesc(desc){
    var str = desc.toLowerCase();
    //pegou a primeira letra e botou em maiusculo e concatenou com o resto da string, o slice pega a string
    //a partir da região especifica, no caso por exemplo de "rice" o slice(1) iria pegar somente o "ice"
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

//formatando o value para ter virgula em vez de ponto, para ter so 2 casas decimais e ter um cifrão na frente
function formatValue(value){
    //transformou pra float, disse que só queria duas casas decimais, e retornou para string concatenando com 
    //nada
    var str = parseFloat(value).toFixed(2) + "";
    //o replace vai fazer com que onde estiver o ponto, vire virgula
    str = str.replace(".", ",");
    str = "$ " + str;
    return str;
}

//adicionando elementos na tabela
function addData(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    
    //unshift adiciona no inicio da tabela
    list.unshift({"desc": desc, "amount": amount, "value": value});
    setList(list);
}

//função do botão Edit, ao apertar, os valores irão para os inputs;
function setUpdate(id){
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
}

//função do botão Cancel, ao apertar, os valores irão desaparecer
function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
}

setList(list);

console.log(getTotal(list));