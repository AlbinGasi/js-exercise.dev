import modalView from "./modalView.js";

class SettingsView {

    _settingsTabsWrapper = document.querySelector('.ld-tab-buttons');
    _buttonElement;

    addHandlerEvent(handler) {
        window.addEventListener('load', handler);

        // Event delegation
        this._settingsTabsWrapper?.addEventListener('click', this._addEventSettingsTab.bind(this, handler));
    }

    _addEventSettingsTab(handler, event) {
        event.preventDefault();
        const click = event.target.closest('.button');
        if ( ! click ) return;

        handler();
    }

    async addHandlerButtonRender() {
        // Select video row on settings page
        const videoElement = document.querySelector('#learndash-topic-display-content-settings_lesson_video_url_field');
        if ( videoElement === null ) return;

        // Create a button html
        const buttonMarkup = `
            <div class="upload-button-wrapper">
                <button id="video-uploader-btn" class="button button-primary">Choose/Upload media</button>
            </div>        
        `;

        // c´Check if there is already button added
        if ( videoElement.querySelector('#video-uploader-btn') === null ) {
            // Add button
            videoElement?.children[1].insertAdjacentHTML('afterbegin', buttonMarkup);
            this._buttonElement = document.querySelector('#video-uploader-btn');

            // Add modal html
            modalView.addHandlerModalRender();
            // resolve(true);
        }

    }

    addHandlerModalEvent(handler) {
        this._buttonElement.addEventListener('click', handler);
    }

    setObjectUrlToField(objectUrl) {
        const fieldElement = document.querySelector('#learndash-topic-display-content-settings_lesson_video_url');
        fieldElement.value = objectUrl;
    }

}

export default new SettingsView();