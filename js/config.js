//essa função setou o titulo da pagina e na navbar, em vez de fazer no html. 
//isso facilita, pois na hora de trocar o titulo, altero somente a variavel na função.
function setConfig(){
    var texts = {
        "tilte": "Shopping Control"
    };
    document.title = texts.tilte;
    document.getElementById("navTitle").innerHTML = texts.tilte;
}

setConfig();