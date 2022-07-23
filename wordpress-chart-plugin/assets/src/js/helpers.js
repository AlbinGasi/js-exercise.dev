import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";

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
 * @param {URLSearchParams} [dataOpt = undefined]
 * @returns 
 */
export const AJAX = async function(url, dataOpt = undefined) {
    try {
        const fetchData = dataOpt ? await fetch (url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dataOpt
        }) : await fetch(url);

        // return await fetchData.json();
        const res = await Promise.race([fetchData, timeout(TIMEOUT_SEC)])
        const data = await res.json();

        return data;
    } catch (err) {
        throw err;
    }
}

export const arrayMerge = function(target, source) {
    if ( !target ) return source;
    if ( !source ) return target;

    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) Object.assign(source[key], arrayMerge(target[key], source[key]));
    }

    Object.assign(target || {}, source)
    return target;
}

/**
 * Method will check whether string contains shortcode or not
 * @param {string} str 
 * @returns 
 */
export const checkIsShortcode = function(str) {
    return !Number.isInteger(str) && str.includes('#') ? true : false;
}

/**
 * This method is always called after checkIsShortcode(str) method
 * Method will check what output should be
 * If shortcode includes () then the output should be number
 * @param {string} shortcode 
 */
export const isShortcodeOutputNumber = function(shortcode) {
    return shortcode.includes('(');
}

/**
 * Method will replace string with respective variables
 * @param {string} str 
 * @param {number} id 
 * @returns 
 */
export const replaceStringWithVariables = function(str, id) {
    return str.replaceAll('\'$', `window['chartDynamicalOptions_${id}'].`).replaceAll('$\'', '')
}