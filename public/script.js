function createForm(conf) {
    window.addEventListener('load', function () {
        
        const div = document.createElement('div');
        div.style.height = '100%';
        var element = document.getElementById(`${conf?.scriptId}`);
        div.innerHTML = `<embed src=https://form.crmone.com/form/${conf?.formId} width="100%" height="100%"></embed>`;
        element.insertAdjacentElement('afterend', div);
    });
}

// TO_DO:NEED TO REMOVE , JUST FOR TESTING