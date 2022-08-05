import View from "./View.js";
import icons from 'url:../../img/icons.svg';
import { RESULT_PER_PAGE } from "../config.js";


class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _errorMessage = '';
    _message = '';

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if ( !btn ) return;

            const goToPage = +btn.dataset.goto;
            
            handler(goToPage);
        });
    }

    _generateMarkup() {
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / RESULT_PER_PAGE);

        // Page 1, and there are other pages
        if ( currentPage === 1 && numPages > 1 ) {
            return `
                <button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1}">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        
        // Last page
        if ( currentPage === numPages && numPages > 1 ) {
            return `
                <button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1}">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
            `;
        }
        
        // Other page
        if ( currentPage < numPages ) {
            return `
                <button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1}">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                <button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1}">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        // Page 1, and there are no other pages
        return '';
    }

}

export default new PaginationView();