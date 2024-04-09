function createForm(conf) {
    window.addEventListener('load', function () {
        const div = document.createElement('div');
        div.style.height = '100%';

        var element = document.getElementById(`${conf.scriptId}`);
        if(conf?.iframe){
           div.innerHTML = `<iframe src=https://form.crmone.com/form/${conf.formId} frameborder="0"
           allowtransparency="true" loading="lazy" width="100%" height="100%"></iframe>`;
        }else{
            if(conf?.noCors){
                fetch(`https://form.crmone.com/form/${conf.formId}`,{
                    mode: 'no-cors'
                  })
                .then(response => {
                    if(response){
                        div.innerHTML = `<iframe src=https://form.crmone.com/form/${conf.formId} frameborder="0"
                    allowtransparency="true" loading="lazy" width="100%" height="100%"></iframe>`;
                    }
                })
            }else{
                fetch(`https://form.crmone.com/form/${conf.formId}`)
                .then(response => {
                    if(response.status == 200){
                        div.innerHTML = `<iframe src=https://form.crmone.com/form/${conf.formId} frameborder="0"
                    allowtransparency="true" loading="lazy" width="100%" height="100%"></iframe>`;
                    }
                })
            }
        }
        // div.innerHTML = `
        // <iframe src=https://form.crmone.com/form/65d2f9f3491ddbceffd601a6></iframe>
        // `;
        element.parentNode.appendChild(div);
    });
}

// TO_DO:NEED TO REMOVE , JUST FOR TESTING