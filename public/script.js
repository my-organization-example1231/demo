function createForm(conf) {
    window.addEventListener('load', function () {
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
                }, 500); // Adjust the delay as needed
            });
        }
        isParentWindowResized().then(resized => {
            if (!resized) {
                const div = document.createElement('div');
                div.style.height = '100%';
                var element = document.getElementById(`${conf?.scriptId}`);
                div.innerHTML = `<iframe src=https://form.crmone.com/form/${conf?.formId} frameborder="0"
                            allowtransparency="true" loading="lazy" width="100%" height="100%"></iframe>`;
                element.insertAdjacentElement('afterend', div);
            } else {
                console.log('Iframe not loaded as parent window was resized.');
            }
        });
    });
}

// TO_DO:NEED TO REMOVE , JUST FOR TESTING