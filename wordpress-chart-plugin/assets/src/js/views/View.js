import icons from 'url:../../img/icons.svg';

export default class View {

    renderSpinner(el = this._parentElement) {
        const markup = `
            <div class="tb-chart-spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;

        el.insertAdjacentHTML('afterbegin', markup);
    }

    removeSpinner(el = this._parentElement) {
        el.querySelector('.tb-chart-spinner')?.remove();
    }

}