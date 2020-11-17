document.querySelector('button1').onclick = function(){
    let FIO = " " + document.querySelector('.FIO').value;
    let Adress = " " + document.querySelector('.Adress').value;
    let Nomer = " " +document.querySelector('.Nomer').value+ " ";
    const token = '1249011433:AAGuJmxq6DyXBiinWwxy6raKiSzkl7acOqk';
    let url = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=-467019156&text='
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",url + FIO +  Adres +  Nomer , true);
    xhttp.send();
}