import { async } from "regenerator-runtime";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

/**
 * 
 * @param {string} url 
 * @param {URLSearchParams} [bodyOptions = undefined]
 * @returns 
 */
 export const AJAX = async function(url, bodyOptions = undefined, type = 'default') {
    try {
        
        let fetchData;

        if ( type === 'videoUpload' ) {
            fetchData = bodyOptions ? await fetch (url, {
                method: 'POST',
                body: bodyOptions
            }) : await fetch(url);
        } else {
            fetchData = bodyOptions ? await fetch (url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: bodyOptions
            }) : await fetch(url);
        }
        

        // return await fetchData.json();
        const res = await Promise.race([fetchData, timeout(10)])
        const data = await res.json();

        return data;
    } catch (err) {
        throw err;
    }
}
