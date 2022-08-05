import View from "./View.js";

class ModalLibraryView extends View {

    contentElement;

    addHandlerLibraryRender(handler) {
        handler();
    }

    libraryItemsGenerator(data) {
        const markup = `
            <div class="lvu-library-files">
                <p>Click on item will automatically copy the link in the clipboard.</p>
                ${Object.keys(data).map(item => `<a target="_blank" class="lvu-file-item" href="${data[item].url}">${data[item].fileName}</a><br>`).join('')}
            </div>
        `;

        this._clearModalMessage();
        this.contentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerEventfileNameClick() {
        const objectElement = document.querySelector('.lvu-library-files');

        objectElement.addEventListener('click', function(e) {
            e.preventDefault();
            const itemEl = e.target.closest('.lvu-file-item');

            if ( !itemEl ) return;

            navigator.clipboard.writeText(itemEl.getAttribute('href'));
        });

    }
}

export default new ModalLibraryView();