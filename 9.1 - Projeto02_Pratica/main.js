document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var table = document.getElementById('contactsTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    var nameCell = newRow.insertCell(0);
    var phoneCell = newRow.insertCell(1);
    nameCell.textContent = name;
    phoneCell.textContent = phone;
    document.getElementById('contactForm').reset();
});

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