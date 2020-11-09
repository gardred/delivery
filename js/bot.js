document.querySelector('button1').onclick = function(){
    let FIO = document.querySelector('.FIO').value;
    let Adress = document.querySelector('.Adress').value;
    let Nomer = document.querySelector('.Nomer').value;
    const token = '1494638480:AAHhGPrOgOLJeN0TpvKAPfHFbW6d1RQQPxg';
    let url = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=-1001412599279&text='
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",url + FIO +  Adress +  Nomer , true);
    xhttp.send();
}

//https://api.telegram.org/bot1494638480:AAHhGPrOgOLJeN0TpvKAPfHFbW6d1RQQPxg/sendMessage?chat_id=-1001412599279&text=nu_zdarova_ebat