import { async } from "regenerator-runtime";
import { AJAX_URL } from "./config";
import { AJAX } from "./helpers";

export const isSettingsPage = async function() {
    const currentHref = await getCurrentHref();
    return currentHref.includes('sfwd-topic-settings');
}

export const getCurrentHref = async function() {
    const currentHref = new Promise((resolve) => {
        setTimeout(function() {
            resolve(window.location.href);
        }, 300);
    });

    return await currentHref;
}

export const uploadVideo = async function(uploadData) {
    const newData = new FormData();
    newData.append('video', uploadData.videoFile);
    newData.append('action', 's3Client');

    const data = await AJAX(AJAX_URL, newData, 'videoUpload');
    return data;

}

export const getFiles = async function() {
    
    const dataOpt = new URLSearchParams({
        action: 's3ClientGetFiles',
    });

    const data = await AJAX(AJAX_URL, dataOpt);
    return data;
}