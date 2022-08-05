import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import * as css from '../css/learndash-video-uploader.css';

import settingsView from './views/settingsView.js';
import * as model from './model.js';
import modalView from './views/modalView';
import modalUploadView from './views/modalUploadView.js';
import modalLibraryView from './views/modalLibraryView';

const controlModal = function() {
    modalView.showModal();
}

export const controlLibrary = async function() {
    modalLibraryView.renderModalSpinner();

    const data = await model.getFiles();

    modalLibraryView.libraryItemsGenerator(data.data);
    modalLibraryView.addHandlerEventfileNameClick();
}

const controlTopicSettings = async function() {
    // If is not topic settings page then return
    if ( ! await model.isSettingsPage() ) return;

    // Create a button in settings
    settingsView.addHandlerButtonRender();

    // Add event on Choose/Upload button click
    settingsView.addHandlerModalEvent(controlModal);

    // Get files from S3
    modalLibraryView.addHandlerLibraryRender(controlLibrary);
}

export const controlVideoUpload = async function(data) {

    modalUploadView.renderModalSpinner('Uploading');

    const videoUpload = await model.uploadVideo(data);
    // console.log(videoUpload);

    if ( videoUpload.success ) {
        modalUploadView.renderModalMessage(videoUpload.message);
        modalUploadView.addHandlerEventSelectObjectUrl();
        settingsView.setObjectUrlToField(videoUpload.objectUrl);

        // Get files from S3
        modalLibraryView.addHandlerLibraryRender(controlLibrary);
    } else {
        const message = 'Something went wrong!';
        modalUploadView.renderModalMessage(message);
    }
}

const learndashVideoUploaderInit = function() {
    settingsView.addHandlerEvent(controlTopicSettings);
}

learndashVideoUploaderInit();