import 'core-js/stable';
import 'regenerator-runtime/runtime';

class VanillaSimpleSlider {
    _slides;
    _btnLeft;
    _btnRight;
    _dotContainer;
    _maxSlide;
    _curSlide = 0;

    constructor() {
        // Define DOM elements
        this._elementsInitialization();

        // Set max slide
        this._maxSlide = this._slides.length;

        // Set current slide
        this._curSlide = 0;

        // Define event handlers
        this._addEventHandlers();

        // Init
        // Create dots
        this._createDots();

        // Set default slide 0
        this._goToSlide(0);

        // Set active dot 0
        this._activateDots(0);

    }

    _elementsInitialization() {
        this._slides = document.querySelectorAll('.jsv__slide');
        this._btnLeft = document.querySelector('.slider__btn--left');
        this._btnRight = document.querySelector('.slider__btn--right');
        this._dotContainer = document.querySelector('.jsv__slide--dots');
    }

    _createDots() {
        this._slides.forEach((_, i) => {
            const btn = `<button class="slider__dots__dot" data-slide="${i}"></button>`;
            this._dotContainer.insertAdjacentHTML('beforeend', btn);
        });
    }

    _activateDots(slide) {
        // Remove active class
        [...this._dotContainer.children].forEach(dot => dot.classList.remove('slider__dots__dot--active'));

        // Add active class to the current slide
        this._dotContainer.querySelector(`.slider__dots__dot[data-slide="${slide}"]`).classList.add('slider__dots__dot--active');
    }

    _addEventHandlers() {
        this._btnLeft.addEventListener('click', this._prevSlide.bind(this));
        this._btnRight.addEventListener('click', this._nextSlide.bind(this));

        // Event delegation for dots
        this._dotContainer.addEventListener('click', this._dotSlide.bind(this));
    }

    _nextSlide() {
        if ( this._curSlide == this._maxSlide - 1 ) {
            this._curSlide = 0;
        } else {
            this._curSlide++;
        }

        this._goToSlide(this._curSlide);
        this._activateDots(this._curSlide);
    }
    
    _prevSlide() {
        if ( this._curSlide == 0 ) {
            this._curSlide = this._maxSlide - 1;
        } else {
            this._curSlide--;
        }

        this._goToSlide(this._curSlide);
        this._activateDots(this._curSlide);
    }

    _dotSlide(e) {
        const dot = e.target.closest('.slider__dots__dot');

        if ( !dot ) return;

        console.log(dot.dataset.slide);
        this._curSlide = dot.dataset.slide;

        this._goToSlide(this._curSlide);
        this._activateDots(this._curSlide);
    }

    _goToSlide(slide) {
        this._slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
    }
}

const vanillaSimpleSlider = new VanillaSimpleSlider();