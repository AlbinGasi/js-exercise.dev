import icons from 'url:../../img/icons.svg';

export default class View {

    renderModalMessage(message = this._message) {
        const markup = `
            <div class="message">
                <p>${message}</p>
            </div>
        `;

        this._clearModalMessage();
        this.contentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderModalSpinner(message = '', el = this.contentElement) {
        const markup = `
            <div class="modal-spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
                <p>${message}</p>
            </div>
        `;
    
        this._clearModalMessage();
        el.insertAdjacentHTML('afterbegin', markup);
    }

    _clearModalMessage(el = this.contentElement) {
        el.innerHTML = '';
    }
    
}