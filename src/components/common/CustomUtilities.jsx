import Alert from 'react-s-alert';

export function sortByDisplayOrder(array) {
    array.sort(function(a, b) {
        return a.displayOrder - b.displayOrder;
    });
    var nonOutliers = [], outliers = [];
    for (var i = 0; i < array.length; i++) {
        if(array[i].displayOrder) {
            nonOutliers.push(array[i]);
        } else {
            outliers.push(array[i]);
        }
    }
    array = nonOutliers.concat(outliers);
    return array;
}

export function getQueryStringValue(key) {  
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
} 

export function fetchPromise(url, options) {
    return fetch(url, options)
    .then(response => {
        if(response.status === 401) {
            window.location.reload(true);
        } else if(response.status === 403) {
            //displayCustomPopup({msg: response.msg || 'Unauthorised for current operation'}, 'error');
            //the error message comes from API response, hence will show from API response. 
        }
        return response.json();
    }).then(response => {
        if(response.status === 'FORBIDDEN') {
            displayCustomPopup({msg: response.msg || 'Unauthorised for current operation', detailedMsg: response.detailedMsg || ''}, 'error');
            //return null to the caller function so that no further processing should happen in caller function
            return null;
        } else if(response.status === 'FAILED' || response.status === 'Not Modified') {
            displayCustomPopup(response, 'error');
            return null;
        } else if(response.status === 'SUCCESS') {
            displayCustomPopup(response, 'success');
        } else if(response.status === 'WARN') {
            displayCustomPopup(response, 'warning');
        }
        if(response.data) {
            return response.data;
        }
        return response;
    });
}

export function getSortOrder(prop) {
    return function (a, b) {
    if (a[prop] < b[prop]) {
        return 1;
    } else if (a[prop] > b[prop]) {
        return -1;
    }
    return 0;
    }
}

export function getSortOrderReverse(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export function displayCustomPopup(response, type) {
    switch(type) {
        case 'error': 
            Alert.error(response.msg, {
                position: 'bottom-right',
                html: true,
                effect: 'slide',
                timeout: 30000,
                customFields: {
                    detailedError: response.detailedMsg,
                    heading: 'Error',
                    type: 'error'
                }
            });
            break;
        case 'success':
            Alert.success(response.msg, {
                position: 'bottom-right',
                html: true,
                effect: 'slide',
                timeout: 30000,
                customFields: {
                    detailedError: response.detailedMsg,
                    heading: 'Success',
                    type: 'success'
                }
            });
            break;
        case 'info':
            Alert.info(response.msg, {
                position: 'bottom-right',
                html: true,
                effect: 'slide',
                timeout: 30000,
                customFields: {
                    detailedError: response.detailedMsg,
                    heading: 'Info',
                    type: 'info'
                }
            });
            break;
        case 'warning':
            Alert.warning(response.msg, {
                position: 'bottom-right',
                html: true,
                effect: 'slide',
                timeout: 30000,
                customFields: {
                    detailedError: response.detailedMsg,
                    heading: 'Warning',
                    type: 'warning'
                }
            });
            break;
    }
}