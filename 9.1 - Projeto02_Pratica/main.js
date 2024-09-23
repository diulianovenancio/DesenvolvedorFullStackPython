document.addEventListener('DOMContentLoaded', function() {
    loadContacts();
});
/*
Explicação:
1. Carregar Contatos ao Carregar a Página
DOMContentLoaded: Este evento é disparado quando o documento HTML inicial foi completamente carregado e analisado.
loadContacts(): Chama a função loadContacts para carregar os contatos salvos no localStorage e exibi-los na tabela.
*/

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    addContact(name, phone);
    document.getElementById('contactForm').reset();
});
/*
Explicação:
2. Adicionar Contato ao Submeter o Formulário
event.preventDefault(): Impede o comportamento padrão do formulário de recarregar a página ao ser submetido.
addContact(name, phone): Chama a função addContact para adicionar o novo contato ao localStorage.
reset(): Limpa os campos do formulário após a submissão.
*/

document.getElementById('phone').addEventListener('input', function(event) {
    var input = event.target;
    var value = input.value.replace(/\D/g, '');
    var formattedValue = '';

    if (value.length > 0) {
        formattedValue += '(' + value.substring(0, 2);
    }
    if (value.length > 2) {
        formattedValue += ') ' + value.substring(2, 7);
    }
    if (value.length > 7) {
        formattedValue += '-' + value.substring(7, 11);
    }

    input.value = formattedValue;
});
/*
Explicação:
3. Formatar o Campo de Telefone
replace(/\D/g, ''): Remove todos os caracteres não numéricos do valor do campo.
Formatação: Adiciona parênteses e hífen para formatar o número de telefone no padrão brasileiro.
*/

document.getElementById('search').addEventListener('input', function(event) {
    var searchValue = event.target.value.toLowerCase();
    var rows = document.querySelectorAll('#contactsTable tbody tr');
    rows.forEach(function(row) {
        var name = row.cells[0].textContent.toLowerCase();
        var phone = row.cells[1].textContent.toLowerCase();
        if (name.includes(searchValue) || phone.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
/*
Explicação:
4. Buscar Contatos
Busca: Filtra as linhas da tabela de contatos com base no valor digitado no campo de busca. Mostra apenas as linhas que contêm o texto buscado no nome ou telefone.
*/

function addContact(name, phone) {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push({ name: name, phone: phone });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}
/*
Explicação:
5. Adicionar Contato ao localStorage
JSON.parse: Converte a string JSON armazenada no localStorage em um array de objetos.
push: Adiciona o novo contato ao array.
JSON.stringify: Converte o array de contatos de volta para uma string JSON e armazena no localStorage.
loadContacts(): Atualiza a tabela de contatos.
*/

function loadContacts() {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    var tableBody = document.querySelector('#contactsTable tbody');
    tableBody.innerHTML = '';
    contacts.forEach(function(contact, index) {
        var row = tableBody.insertRow();
        var nameCell = row.insertCell(0);
        var phoneCell = row.insertCell(1);
        var actionsCell = row.insertCell(2);
        nameCell.textContent = contact.name;
        phoneCell.textContent = contact.phone;
        actionsCell.innerHTML = '<button class="delete-btn" onclick="deleteContact(' + index + ')"><i class="fas fa-trash"></i></button>';
    });
}
/*
Explicação:
6. Carregar Contatos do localStorage
innerHTML = '': Limpa a tabela antes de adicionar os contatos.
insertRow e insertCell: Adiciona uma nova linha e células à tabela para cada contato.
Botão Deletar: Adiciona um botão de deletar com um ícone de lixeira para cada contato.
*/

function deleteContact(index) {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}
/*
Explicação:
7. Deletar Contato
splice: Remove o contato do array de contatos pelo índice.
loadContacts(): Atualiza a tabela de contatos após a remoção.
*/