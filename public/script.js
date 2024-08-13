const DOMAIN = "crmone.com"
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
    window.addEventListener('DOMContentLoaded', function () {
        var element = conf?.callingElement;
        const mode = conf?.mode || "trendev";
        if(element || conf?.form_type){
            const div = document.createElement('div');
            var dialog = document.createElement('div');
            var overlay = document.createElement('div');
            overlay.addEventListener('click', function() {
                dialog.style.display = "none";
                document.body.removeChild(overlay)
            });

            if(conf?.form_type){
                var closeButton = document.createElement('span');
                closeButton.innerHTML = '&times;';
                closeButton.style.color = '#000000';
                closeButton.style.right = 0;
                closeButton.style.fontSize = '28px';
                closeButton.style.marginRight = '4px';
                closeButton.style.cursor = 'pointer';
                closeButton.style.position = 'absolute';
                closeButton.style.background = '#eee';
                closeButton.style.width = '26px';
                closeButton.style.height = '26px';
                closeButton.style.borderRadius = "26px"
                closeButton.style.display = "flex";
                closeButton.style.alignItems = "center",
                closeButton.style.justifyContent = "center";
                closeButton.style.lineHeight = "12px";
                closeButton.addEventListener('click', function() {
                    dialog.style.display = "none";
                    div.style.display = "none";
                    if(conf?.form_type == "popup"){
                        document.body.removeChild(overlay)
                    }
                });
                closeButton.addEventListener('mouseenter', function() {
                    closeButton.style.background = '#000000';
                    closeButton.style.color = '#eee';
                });
                closeButton.addEventListener('mouseleave', function() {
                    closeButton.style.background = '#eee';
                    closeButton.style.color = '#000000';
                });
                div.style.height = conf?.customHeight ? conf?.customHeight : "auto";
                dialog.style.height = conf?.customHeight ? conf?.customHeight : "auto";
            }
            if(conf?.form_type == "left_box"|| conf?.form_type == "right_box" || conf?.form_type == "banner"){
                div.style.width = '100%';
                div.style.maxHeight = conf?.form_type == "banner" ? "64%" :'70%';;
                div.style.maxWidth = conf?.form_type == "banner" ? "100%" :'400px';
                div.style.minHeight = "280px";
                div.style.position = 'fixed';
                div.style.background = '#fff';
                div.style.borderTopStyle = "solid";
                div.style.borderColor = "#3288E6";
                div.style.border = "5px 0 0 0 0"
                div.style.left = (conf?.form_type == "right_box" || conf?.form_type == "banner") ? "auto" : 0;
                div.style.right = (conf?.form_type == "left_box" || conf?.form_type == "banner") ? "auto" : 0;
                div.style.bottom = conf?.form_type == "banner" ? "auto" :0;
                div.style.top =  conf?.form_type == "banner" ? 0 : "auto";
                div.style.zIndex = 1000;
                div.style.display = "flex";
                div.style.transition = "transform 1s ease";
                div.style.transform = conf?.form_type == "banner" ? "translateY(-100%)" : "translateY(100%)";

                div.appendChild(closeButton)
            }
            if(conf?.form_type == "popup"){
                dialog.appendChild(closeButton);

                dialog.style.width = '100%';
                dialog.style.minHeight = "280px";
                dialog.style.maxHeight = '64%';
                dialog.style.maxWidth = '400px';
                dialog.style.position = 'fixed';
                dialog.style.background = '#fff';
                dialog.style.border = "5px 0 0 0 0"
                dialog.style.borderTopStyle = "solid";
                dialog.style.borderColor = "#3288E6";
                dialog.style.zIndex = 10001;
                dialog.style.top = 0;
                dialog.style.left = 0;
                dialog.style.display = "flex";
                dialog.style.transition = "transform 1s ease";
                dialog.style.transform = "translate(-100%, -100%)";

                overlay.style.width = '100%';
                overlay.style.height= '100%';
                overlay.style.position = 'fixed';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                overlay.style.zIndex = 1000;
                overlay.style.top = 0;
                overlay.style.left = 0;
            }
            isParentWindowResized().then(resized => {
                if (!resized) {
                    if(conf?.form_type == "left_box" || conf?.form_type == "right_box" || conf?.form_type == "banner"){
                        setTimeout(() => {
                            div.style.transform = conf?.form_type == "banner" ? "translateY(0%)" : "translateY(0%)";
                        }, 500);
                    }
                    if(conf?.form_type == "popup"){
                        setTimeout(() => {
                            dialog.style.transform = "translate(-50%, -50%)";
                            dialog.style.top = "50%";
                            dialog.style.left = "50%";
                        }, 500);
                    }
                    const divToSet = conf?.form_type == "popup" ? dialog : div;
                    var iframeElement = document.createElement("iframe");
                    iframeElement.setAttribute("src",`https://form.${DOMAIN}/form/${conf?.formId}`)
                    iframeElement.setAttribute("frameborder","0")
                    iframeElement.setAttribute("allowtransparency","true")
                    // iframeElement.setAttribute("loading","lazy")
                    iframeElement.setAttribute("width","100%")
                    iframeElement.setAttribute("height","100%")
                    iframeElement.setAttribute("title",`form-${conf?.formId}`)
                    iframeElement.style.minHeight = "280px"
                    divToSet.appendChild(iframeElement);
                    if(conf?.form_type){
                        document.body.appendChild(divToSet)
                        if(conf?.form_type == "popup"){
                            document.body.appendChild(overlay)
                        }
                    }else{
                        divToSet.style.width = '100%';
                        divToSet.style.height = '100%';
                        element.insertAdjacentElement('afterend', divToSet);
                    }
                } else {
                    console.log('content not loaded as parent window was resized.');
                }
            });
        }else{
            console.log('element not found');
        }
    });
}
function createCalendar(conf) {
    window.addEventListener('DOMContentLoaded', function () {
        var element = conf.callingElement;
        const mode = conf?.mode || "trendev";
        if(element){
            const div = document.createElement('div');
            div.style.height = '100%';
            element.insertAdjacentElement('afterend', div);
            isParentWindowResized().then(resized => {
                if (!resized) {
                    div.innerHTML = `<iframe src=https://calendar.${DOMAIN}/calendar/${conf?.calendarId} frameborder="0"
                                allowtransparency="true" loading="lazy" width="100%" height="100%" title="calendar-${conf?.calendarId}"></iframe>`;
                } else {
                    console.log('content not loaded as parent window was resized.');
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
        const mode = conf?.mode || "trendev";
        if(element){
            const div = document.createElement('div');
            div.style.height = '100%';
            element.insertAdjacentElement('afterend', div);
            isParentWindowResized().then(resized => {
                if (!resized) {
                    div.innerHTML = `<iframe src=https://survey.${DOMAIN}/survey/${conf?.surveyId} frameborder="0"
                                allowtransparency="true" loading="lazy" width="100%" height="100%" title="survey-${conf?.surveyId}"></iframe>`;
                } else {
                    console.log('content not loaded as parent window was resized.');
                }
            });
        }else{
            console.log('element not found');
        }
    });
}

//need to add
function createBot(conf) {
    function loadBot(){
        const div = document.createElement('div');
        div.style.position = "fixed";
        div.style.overflow = "hidden"
        div.style.border = "none"
        div.style.bottom = "0";
        div.style.zIndex = "9999"
        div.style.width = "30px";
        div.style.height = "30px";
        div.id = "chatbot-iframe-container"
        div.className = "chatbotIframeContainer"
        const contactDetail = conf.contactDetail ? JSON.stringify(conf.contactDetail) : undefined

        document.body.appendChild(div);
        let query = contactDetail ? `?contactDetail=${encodeURIComponent(contactDetail)}`  : "" 
        
        isParentWindowResized().then(resized => {
            if (!resized) {
                div.innerHTML = `
                                <iframe id='chatbot-iframe' src='https://chatbot.${DOMAIN}/chatbot/${conf?.botId}${query}'  
                                    frameborder="0" allowtransparency="true" height="100%" width="100%">
                                </iframe>
                                `;
            } else {
                console.log('content not loaded as parent window was resized.');
            }
        });
    }

   
    window.addEventListener('message', function (event) {
        const div = document.getElementById("chatbot-iframe-container")
        div.style.height = event?.data?.height + "px";
        div.style.width = event?.data?.width + "px";
        div.style.position = "fixed";
        if (event.data.right !== undefined) {
            div.style.right = 0
        } else if (event.data.left !== undefined) {
            console.log("left", 0);
            div.style.left = 0
        }
    })

    if(conf?.internalLoad)
    {
        loadBot()
        return;
    }

    window.addEventListener('load', function () {
        loadBot()
    });
}

