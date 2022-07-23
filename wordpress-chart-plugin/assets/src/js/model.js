import { AJAX_URL } from "./config.js";
import { AJAX, checkIsShortcode, isShortcodeOutputNumber } from "./helpers.js";

/**
* @param  {number} id
* @param  {string} type
* @param  {string} shortcode
* @returns 
*/
export const prepareAjaxOptions = function(id, type = 'default', shortcode = '') {
   if ( type === 'default' ) {
       return new URLSearchParams({action: 'tbChartAJAX', postID: id});
   }

   if ( type === 'getShortcode' ) {
       return new URLSearchParams({action: 'tbChartAJAX', postID: id, getShortcode: true, shortcode: shortcode});
   }
}

/**
 * 
 * @param {object} options 
 * @returns 
 */
export const getData = async function(options) {
    const data = await AJAX(AJAX_URL, options);
    return data;
}

/**
 * Method will take a shortcode and will provide the value of it
 * @param {number} id 
 * @param {string} shortcode 
 * @returns 
 */
export const getShortcodeValue = async function(id, shortcode) {
    const ajaxOptions = prepareAjaxOptions(id, 'getShortcode', shortcode);
    const data = await getData(ajaxOptions);

    return data?.shortcode;
}

/**
 * Method will loop through the object and it will replace shortcode with the value
 * @param {object} obj 
 * @param {number} id 
 * @returns 
 */
export const replaceShortcodeWithValue = async function(obj, id) {
    const newObj = {};

    for (const item of Object.entries(obj)) {
        if ( checkIsShortcode(item[1]) ) {
            let shortcode = item[1].replaceAll('#', '');

            if ( isShortcodeOutputNumber(shortcode) ) {
                shortcode = shortcode.replaceAll('(', '').replaceAll(')', '');
                const newVar = await getShortcodeValue(id, shortcode);
                newObj[item[0]] = Number.parseFloat(newVar);
            } else {
                newObj[item[0]] = await getShortcodeValue(id, shortcode);
            }
        } else {
            newObj[item[0]] = item[1];
        }
    }

    return newObj;
}

/**
 * Method will convert string to the object
 * @param {string} string 
 * @returns 
 */
 export const stringToObject = function(string) {
    return Function(`'use strict'; return (${string})`)();
}