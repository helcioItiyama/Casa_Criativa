function onOff() {
    document.querySelector('#modal').classList.toggle('hide');
    document.querySelector('body').classList.toggle('hideScroll');
    document.querySelector('#modal').classList.toggle('addScroll');
}

function checkFields(event) {
    const keysToCheck = [
        'title',
        'image',
        'category',
        'description',
        'link'
    ]

    const isEmpty = keysToCheck.find((key) => {
        const checkIfIsString = typeof event.target[key].value === 'string';
        const checkIfIsEmpty = !event.target[key].value.trim();

        if(checkIfIsString && checkIfIsEmpty) {
            return true;
        }
    })

    if(isEmpty) {
        event.preventDefault();
        alert("Por favor, preencha todos os campos")
    }
}