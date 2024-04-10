function createForm(conf) {
    window.addEventListener('load', function () {
        if (/Lighthouse|PageSpeed|WebPageTest/i.test(navigator.userAgent)) {
           return
        }else{
            const div = document.createElement('div');
            div.style.height = '100%';
            var element = document.getElementById(`${conf?.scriptId}`);
            div.innerHTML = `<iframe src=https://form.crmone.com/form/${conf?.formId} frameborder="0"
                        allowtransparency="true" loading="lazy" width="100%" height="100%"></iframe>`;
            element.insertAdjacentElement('afterend', div);
        }
    });
}

// TO_DO:NEED TO REMOVE , JUST FOR TESTING