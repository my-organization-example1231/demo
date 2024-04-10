function createForm(conf) {
    window.addEventListener('load', function () {
        var element = conf.callingElement;
        if(element){
            const div = document.createElement('div');
            div.style.height = '100%';
            element.insertAdjacentElement('afterend', div);
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
            isParentWindowResized().then(resized => {
                if (!resized) {
                    div.innerHTML = `<iframe src=https://form.crmone.com/form/${conf?.formId} frameborder="0"
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