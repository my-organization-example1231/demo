function isParentWindowResized() {
    var initialWidth = window.innerWidth;
    var initialHeight = window.innerHeight;

    // Function to check if the window has been resized after a short delay
    function checkResize() {
        if (window.innerWidth !== initialWidth || window.innerHeight !== initialHeight) {
            return true; // Window has been resized
        }
        return false; // Window has not been resized
    }

    // Check if the window has been resized after a short delay
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(checkResize());
        }, 1000); // Adjust the delay as needed
    });
}
function createForm(conf) {
    window.addEventListener('load', function () {
        var element = conf.callingElement;
        const mode = conf?.mode || "crmone";
        if(element){
            const div = document.createElement('div');
            div.style.height = '100%';
            element.insertAdjacentElement('afterend', div);
            isParentWindowResized().then(resized => {
                if (!resized) {
                    div.innerHTML = `<iframe src=https://form.${mode == "crmone" ? "crmone.com" : "trendev.in"}/form/${conf?.formId} frameborder="0"
                                allowtransparency="true" loading="lazy" width="100%" height="100%"></iframe>`;
                } else {
                    console.log('Iframe not loaded as parent window was resized.');
                }
            });
        }else{
            console.log('element not found');
        }
    });
}
function createCalendar(conf) {
    window.addEventListener('load', function () {
        var element = conf.callingElement;
        const mode = conf?.mode || "crmone";
        if(element){
            const div = document.createElement('div');
            div.style.height = '100%';
            element.insertAdjacentElement('afterend', div);
            isParentWindowResized().then(resized => {
                if (!resized) {
                    div.innerHTML = `<iframe src=https://calendar.${mode == "crmone" ? "crmone.com" : "trendev.in"}/calendar/${conf?.calendarId} frameborder="0"
                                allowtransparency="true" loading="lazy" width="100%" height="100%"></iframe>`;
                } else {
                    console.log('Iframe not loaded as parent window was resized.');
                }
            });
        }else{
            console.log('element not found');
        }
    });
}
function createSurvey(conf) {
    window.addEventListener('load', function () {
        var element = conf.callingElement;
        const mode = conf?.mode || "crmone";
        if(element){
            const div = document.createElement('div');
            div.style.height = '100%';
            element.insertAdjacentElement('afterend', div);
            isParentWindowResized().then(resized => {
                if (!resized) {
                    div.innerHTML = `<iframe src=https://survey.${mode == "crmone" ? "crmone.com" : "trendev.in"}/survey/${conf?.surveyId} frameborder="0"
                                allowtransparency="true" loading="lazy" width="100%" height="100%"></iframe>`;
                } else {
                    console.log('Iframe not loaded as parent window was resized.');
                }
            });
        }else{
            console.log('element not found');
        }
    });
}