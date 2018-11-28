(function (window) {
    window._env = window._env || {};
    //localStorage.setItem("ls.alias","amazon");
    //localStorage.setItem("ls.division","206")
    //boolean for ionic.  Do not change
    window._env.isIonic = false;
    window._env.isIonicDevice = false;

    window._env._environment = localStorage.getItem("_environment") || "";
    if(window._env._environment && window._env._environment !== ""){
        window._env._environment = "-" + window._env._environment;
    }

    window._env.commuterApiUrl = 'https://commuterapi' + window._env._environment + '.mvtransit.com/api/';
    window._env.oneMVApiUrl = 'https://onemvapis' + window._env._environment + '.mvtransit.com/api/';
	window._env.oneMVFixedRouteApiUrl = 'https://onemvapi' + window._env._environment + '.mvtransit.com/api/fr/';
    window._env.authServerUrl = 'https://mvauth' + window._env._environment + '.mvtransit.com/api/';
    window._env.reservationsAllowed = true;
	window._env.audience = '099153c2625149bc8ecb3e85e03f0022';
	 window._env.captchaPublicKey = '6LchDRUTAAAAAP9C_1GnrfxTmOe70wzkJJXHOJPJ';
	 window._env.oneMVApiOrgUrl='https://onemvapi' + window._env._environment + '.mvtransit.com/api/';//https://onemvapi-dev.mvtransit.com/api/';     

    Object.freeze(window._env);
})(this);
