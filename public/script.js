function createForm(conf) {
    window.addEventListener('load', function () {
        
        const div = document.createElement('div');
        div.style.height = '100%';
        var element = document.getElementById(`${conf?.scriptId}`);
        const iframeElement = document.createElement('iframe');
        iframeElement.setAttribute("frameborder","0")
        iframeElement.setAttribute("allowtransparency","lazy")
        iframeElement.setAttribute("loading","true")
        iframeElement.setAttribute("width","100%")
        iframeElement.setAttribute("height","100%")
        div.appendChild(iframeElement);
        element.insertAdjacentElement('afterend', div);

        var iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
        iframeDocument.body.innerHTML = `
                    <embed src=https://form.crmone.com/form/${conf?.formId} width="100%" height="100%"></embed>`;

    });
}

// TO_DO:NEED TO REMOVE , JUST FOR TESTING