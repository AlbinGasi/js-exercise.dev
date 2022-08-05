import { controlVideoUpload } from "../learndash-video-uploader.js";
import View from "./View.js";

class ModalUploadView extends View {

    uploadVideoForm;
    contentElement;

    addhandlerEvents() {
        this.uploadVideoForm.addEventListener('submit', this._addHandlerEventFormSubmit.bind(this, controlVideoUpload));

        // On change file
        document.querySelector('#videoFile').addEventListener('change', function(e) {
            let keyName = this.value.replace(/.*(\/|\\)/, '');
            if ( this.value === '' ) keyName = 'Select your file!';
            this.closest('.file-upload-wrapper').setAttribute('data-text', keyName);
        });
    }

    _addHandlerEventFormSubmit(handler, event) {
        event.preventDefault();
        const dataArray = [...new FormData(event.target)];
        const data = Object.fromEntries(dataArray);

        handler(data);
    }

    /**
     * Method will select and copy the URL from server response
     */
     addHandlerEventSelectObjectUrl() {
        const objectEllement = document.querySelector('input.lvu-object-url');

        objectEllement?.addEventListener('click', function(e) {
            this.select();
            navigator.clipboard.writeText(this.value);
        });
    }
}

export default new ModalUploadView();