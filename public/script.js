(function() {
    const currentScript = document.currentScript;

    const COOKIE_NAME = "CrmExternalTracking";
    const API_ENDPOINT = "http://localhost:8080/external-form-tracking"; // Replace with your endpoint

    const business_id = currentScript ? currentScript.dataset.businessId : null;

     function getUrlParameters() {
        const params = {};
        const urlParams = new URLSearchParams(window.location.search);
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    }

    // Function to capture headers
    function getHeaders() {
        const headers = {};

        // Capture the Referer header and extract the hostname
        const referrer = document.referrer;
        if (referrer) {
            const url = new URL(referrer);
            headers["Referer"] = url.hostname;
        }

        // Capture other headers of interest
        headers["User-Agent"] = navigator.userAgent;
        headers["Accept-Language"] = navigator.language;

        return headers;
    }

    // 1. Cookie Helper
    function setCookie(name, value, days = 30) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${d.toUTCString()};`;
    }

    // 2. Common Event Tracker
    async function trackEvent(eventType, data = {}) {
        const urlParams = getUrlParameters();
        const headers = getHeaders();
        const currentUrl = (window.location.host.includes('filesusr.com')) ? document.referrer : window.location.href;

        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(COOKIE_NAME + '='))
            ?.split('=')[1];
        const existingContactId = cookieValue && JSON.parse(cookieValue).contact_id;

        try {
            const response = await fetch(`${API_ENDPOINT}?business_id=${business_id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_type: eventType,
                    data: {
                        ...data,
                        contact_id : existingContactId
                    },
                    urlParams,
                    attribution_headers: headers,
                    currentUrl,
                    business_id
                })
            });
            if (response.ok) {
                const result = await response.json();
                if (result.contact_id) {
                    setCookie(COOKIE_NAME, JSON.stringify({contact_id: result.contact_id}));
                }
            }
        } catch (error) {
            console.error("Tracking Error:", error);
        }
    }

    // 3. Form Submission Listener
    document.addEventListener("submit", async function(event) {
        const form = event.target;

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        await trackEvent('form_submission', payload);
    });

    // 3. Optional: Logic to handle a returning visitor
    window.addEventListener("load", async function() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(COOKIE_NAME + '='))
            ?.split('=')[1];

        const existingId = cookieValue && JSON.parse(cookieValue).contact_id;

        if (existingId) {
            await trackEvent('form_view');
            // Here you could fetch user data from your DB using this ID
            // to greet them or pre-fill fields.
        }
    });
})();