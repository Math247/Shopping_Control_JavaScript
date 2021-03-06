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
    document.getElementById("totalValue").innerHTML = formatValue(total);
}

//essa função criou os valores da tabela, criou a variavel table onde recebia o cabeçalho da tabela, e depois
//dinamicamente foi criando os valores na tabela de acordo com a lista;
function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td> <button class="btn btn-default" onclick = "setUpdate('+key+');">Edit</button> | <button class="btn btn-default" onclick = "deleteData('+key+');">Delete</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

//formatando o desc para ter uma letra maiuscula na frente
function formatDesc(desc){
    var str = desc.toLowerCase();
    //pegou a primeira letra e botou em maiusculo e concatenou com o resto da string, o slice pega a string
    //a partir da região especifica, no caso por exemplo de "rice" o slice(1) iria pegar somente o "ice"
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatAmount(amount){
    return parseInt(amount);
}

//formatando o value para ter virgula em vez de ponto, para ter so 2 casas decimais e ter um cifrão na frente
function formatValue(value){
    //transformou pra float, disse que só queria duas casas decimais, e retornou para string concatenando com 
    //nada
    var str = parseFloat(value).toFixed(2) + "";
    //o replace vai fazer com que onde estiver o ponto, vire virgula
    str = str.replace(".", ",");
    str = "R$ " + str;
    return str;
}

//adicionando elementos na tabela
function addData(){
    if(!validation()){
        return;
    }
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

    document.getElementById("inputIdUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">';
}

//função do botão Cancel, ao apertar, os valores irão desaparecer
function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIdUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

//ao apertar o botão salvar, irá tirar os valores dos inputs e atualizar na tabela
function updateData(){
    if(!validation()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc": desc, "amount": amount, "value": value};
    resetForm();
    setList(list);
}

//ao apertar o botão Delete, irá apagar o item desejado
function deleteData(id){
    //manda uma mensagem de confirmação
    if(confirm("Delete this item?")){
        if(id === list.length - 1){
            list.pop();
        }else if(id === 0){
            list.shift();
        }else{
            var arrAuxIni = list.slice(0,id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);

    }
}

//essa função emite um erro para o usuario caso digite algo errado nos campos
function validation(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";
    document.getElementById("errors").style.display = "none";
    if(desc === ""){
        errors += '<p>Fill out description</p>';
    }
    if(amount === ""){
        errors += '<p>Fill out a quantity</p>';
    }else if(amount != parseInt(amount)){
        errors += '<p>Fill out a valid amount</p>';
    }
    if(value === ""){
        errors += '<p>Fill out a value</p>';
    }else if(value != parseFloat(value)){
        errors += '<p>Fill out a valid value</p>';
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "block";   
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";   
        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
        return 0;
    }else{
        return 1;
    }
}

//ao apertar o botão delete, irá deletar a lista toda
function deleteList(){
    if(confirm("Delete this list?")){
        list = [];
        setList(list);
    }
}

//salvando a lista no local storage
function saveListStorage(list){
    //a função transforma o array em um string para poder salvar no local storage, pois só aceita string
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}

//verificando se tem uma lista salva no local storage e mostrando caso tenha
function initListStorage(){
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage();