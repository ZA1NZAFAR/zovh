// Get browser info
const browser = (function () {
    const ua = navigator.userAgent;
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return `IE ${tem[1] || ''}`;
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) {
            return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M.join(' ');
})();

// Get operating system info
const os = (function () {
    let OSName = 'Unknown OS';
    if (navigator.appVersion.includes('Win')) {
        OSName = 'Windows';
    }
    if (navigator.appVersion.includes('Mac')) {
        OSName = 'MacOS';
    }
    if (navigator.appVersion.includes('X11')) {
        OSName = 'UNIX';
    }
    if (navigator.appVersion.includes('Linux')) {
        OSName = 'Linux';
    }
    return OSName;
})();

// Get user's IP address and location
fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
        const ip = data.ip;
        document.getElementById('browser').innerHTML = `Browser: ${browser}`;
        document.getElementById('os').innerHTML = `Operating System: ${os}`;
        document.getElementById('ip').innerHTML = `IP Address: ${ip}`;
        return fetch(`https://ipapi.co/${ip}/json/`);
    })
    .then(res => res.json())
    .then(data => {
        const location = `${data.city}, ${data.region} ${data.postal}, ${data.country_name}`;
        document.getElementById('location').innerHTML = `Location: ${location}`;
    })
    .catch(error => console.error(error));
