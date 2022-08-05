import { controlLibrary, controlVideoUpload } from '../learndash-video-uploader.js';
import modalLibraryView from './modalLibraryView.js';
import modalUploadView from './modalUploadView.js';
import View from './View.js';

class ModalView extends View {

    _modalElement;
    _modalTabs;
    _modalCloseBtn;
    _message = '';
    contentElement;

    addHandlerModalRender() {
        const bodyEl = document.querySelector('body');
        const modalMarkup = `
            <div id="learndash-video-uploader-modal">
                <div class="modal-body-content-wrapper">
                    <span class="modal-close-btn">x</span>
                    <div class="modal-tabs">
                        <a href="#upload" data-id="upload-item" class="modal-item modal-item-active">Upload</a>
                        <a href="#choose" data-id="choose-item" class="modal-item">Choose from library</a>
                    </div>
                    <div class="modal-body-content">
                        <div id="upload-item" class="modal-content modal-content-active">
                            <div class="file-upload-wrapper" data-text="Select your file!">
                                <form id="upload-video-form">
                                    <input type="file" name="videoFile" id="videoFile">
                                    <input type="submit" value="Upload">
                                </form>
                            </div>
                            <div class="modal-content-status"></div>
                        </div>
                        <div id="choose-item" class="modal-content">
                            <div class="library-items"></div>
                            <div class="modal-content-status"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if ( bodyEl.querySelector('#learndash-video-uploader-modal') === null  ) {
            bodyEl.insertAdjacentHTML('afterbegin', modalMarkup);
            this._modalElement = document.querySelector('#learndash-video-uploader-modal');
            this._modalCloseBtn = document.querySelector('.modal-close-btn');
            this._modalTabs = document.querySelector('.modal-tabs');

            modalUploadView.uploadVideoForm = document.querySelector('#upload-video-form');
            modalUploadView.contentElement = document.querySelector('#upload-item > .modal-content-status');
            modalLibraryView.contentElement = document.querySelector('#choose-item > .library-items');
            
            // Events initialization
            this._addhandlerEvents();
            modalUploadView.addhandlerEvents();
        }
    }

    _addhandlerEvents() {
        this._modalCloseBtn.addEventListener('click', this._addHandlerEventBtnClose.bind(this));
        this._modalTabs.addEventListener('click', this._addHandlerEventTabs.bind(this));
    }

    _addHandlerEventBtnClose(event) {
        event.preventDefault();
        this._modalElement.classList.remove('show-modal');
    }

    _addHandlerEventTabs(event) {
        event.preventDefault();
        const click = event.target.closest('.modal-item');
        
        if ( !click ) return;

        const modalContentId = click.dataset.id;

        // Hide modal content
        document.querySelectorAll('.modal-content')?.forEach(el => el.classList.remove('modal-content-active'));

        // Remove active class on tabs
        document.querySelectorAll('a.modal-item')?.forEach(el => el.classList.remove('modal-item-active'));

        // Set active tab item class
        event.target.classList.add('modal-item-active');

        // Show specific modal content
        document.querySelector(`#${modalContentId}`)?.classList.add('modal-content-active');
    }

    showModal() {
        this._modalElement.classList.add('show-modal');
    }

}

export default new ModalView();