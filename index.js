let nome = document.getElementById('nome'),
    email = document.getElementById('email'),
    celular = document.getElementById('celular'),
    telefone = document.getElementById('telefone'),
    endereco = document.getElementById('endereco'),
    form = document.getElementById('form'),
    id = document.getElementById('id');

window.onload = function () {

    if (typeof(Storage) === "undefined") {
        alert('Este browser nao suporta Web Storage');
    }

    document.getElementById('SalvarContato').addEventListener('click', SalvarContato);
    document.getElementById('NovoContato').addEventListener('click', NovoContato);

    let json = [{
        'Id': 1,
        'Nome': 'Pedro Paulo Skakum',
        'Email': 'pedroskakum@gmail.com',
        'Celular': '34996324279',
        'Telefone': '3433130533',
        'Endereco': 'Rua das Hotencias, 904, Jd. California, Uberaba'
    },{
        'Id': 2,
        'Nome': 'Luana Fernandes Pinto',
        'Email': 'luanafernandes@gmail.com',
        'Celular': '34985349157',
        'Telefone': '34333064505',
        'Endereco': 'Rua Miguel Abdanur, 768, Leblon, Uberaba'
    }];
    localStorage.setItem('agenda', JSON.stringify(json));
    AtualizarTabela();
};

function AtualizarTabela(){

    let body = document.body,
        table = document.createElement('table'),
        TabelaAntiga = document.getElementById('table');
        tHead = table.createTHead(),
        tBody = table.createTBody(),
        trHeader = tHead.insertRow();
        table.style.borderCollapse = 'collapse',
        agenda = JSON.parse(localStorage.getItem('agenda'));

    TabelaAntiga.outerHTML = '';
    delete TabelaAntiga;
    table.id = 'table';
    agenda.forEach(function (rows, key) {
        
        let tr = tBody.insertRow();
        for (let index in rows) {
            if(key === 0){
                let tdHeader = trHeader.insertCell();
                tdHeader.innerHTML = index.bold();
                if(index === 'Endereco'){
                    let tdHeader = trHeader.insertCell();
                    tdHeader.innerHTML = 'Ações'.bold();
                }
            }
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(rows[index]));
        }
        let td = tr.insertCell();
        td.appendChild(CreateButton('Editar', rows['Id']));
        td.appendChild(CreateButton('Excluir', rows['Id']));

    }, this);
    body.appendChild(table);
}

function EditarContato() {
    let agenda = JSON.parse(localStorage.getItem('agenda'));
    let Contato = null;

    for (var i=0 ; i < agenda.length ; i++) {
        if (agenda[i]['Id'] == this.value) {
            Contato = agenda[i];
        }
    }
    
    if(!Contato){
        alert('Nao foi possivel encontrar este Contato');
    }

    window.nome.value = Contato.Nome;
    window.email.value = Contato.Email;
    window.celular.value = Contato.Celular;
    window.telefone.value = Contato.Telefone;
    window.endereco.value = Contato.Endereco;
    window.id.value = Contato.Id;
    window.form.style.display = 'block';
}

function NovoContato(){
    window.nome.value = '';
    window.email.value = '';
    window.celular.value = '';
    window.telefone.value = '';
    window.endereco.value = '';
    window.id.value = null;
    
    switch(window.getComputedStyle(form, null).getPropertyValue('display')){
        case 'none':  window.form.style.display = 'block';break;
        case 'block': window.form.style.display = 'none';break;
    }
}

function ExcluirContato() {
    let agenda = JSON.parse(localStorage.getItem('agenda'));
    for (var i=0 ; i < agenda.length ; i++)
    {
        if (agenda[i]['Id'] == this.value) {
            agenda.splice(i, 1);
        }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
    AtualizarTabela();
}

function SalvarContato(){
    let agenda = JSON.parse(localStorage.getItem('agenda'));
    
    if(window.id.value === null || window.id.value === ''){
        let lastId = agenda[agenda.length-1]['Id'],
            row = {
            'Id': lastId + 1,
            'Nome': window.nome.value,
            'Email': window.email.value,
            'Celular': window.celular.value,
            'Telefone': window.telefone.value,
            'Endereco': window.endereco.value
        };
        agenda.push(row);
    }else{
        let Contato = null;
        for (var i=0 ; i < agenda.length ; i++)
        {
            if (agenda[i]['Id'] == window.id.value) {
                agenda[i]['Nome'] = window.nome.value;
                agenda[i]['Email'] = window.email.value;
                agenda[i]['Celular'] = window.celular.value;
                agenda[i]['Telefone'] = window.telefone.value;
                agenda[i]['Endereco'] = window.endereco.value;
                Contato = agenda[i];
            }
        }
        
        if(!Contato){
            alert('Nao foi possivel encontrar este Contato');
        }
    }
    localStorage.removeItem('agenda');
    localStorage.setItem('agenda', JSON.stringify(agenda));
    window.nome.value = '';
    window.email.value = '';
    window.celular.value = '';
    window.telefone.value = '';
    window.endereco.value = '';
    window.form.style.display = 'none';
    AtualizarTabela();
}

function CreateButton(name, id){
    let button = document.createElement('button');
    button.innerHTML = name;
    button.addEventListener('click', window[name + 'Contato'], false);
    button.value = id;
    return button;
}