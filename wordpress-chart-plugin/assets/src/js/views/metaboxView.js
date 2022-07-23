import { async } from "regenerator-runtime";

class MetaboxView {
    _metaboxChartFields = document.querySelectorAll('.chart-option-field');
    _chartPreviewBtn = document.querySelector('#chart-preview');

    _editors = [];

    // Fields defined in dashboard when adding or editing the chart
    chartVariables = document.querySelector('#tb_chart_variables');
    chartOptions = document.querySelector('#tb_chart_options');
    chartDefaultOptions = document.querySelector('#tb_chart_default_options');

    /**
     * Published-Subscriber pattern
     * Handler will reload the charts
     * @param {object} handler 
     */
    addHandlerRender(handler) {
        this._chartPreviewBtn?.addEventListener('click', this._getChartPreview.bind(this, handler));
    }

    async _getChartPreview(handler, event) {
        event.preventDefault();

        // Create a new array with promises
        const editors = this._editors.map(async editor => this._setCurentMetaboxValue(editor));
        
        // Wait for all promises to be executed
        // at this moment, we are executing the method _setCurentMetaboxValue(editor)
        await Promise.all(editors);

        // After Promises.all has been executed we can call handler
        handler();
    }

    _setCurentMetaboxValue(editor) {
        return new Promise((resolve, reject) => {
            const curVal = editor.codemirror.getValue();

            if ( ! curVal ) reject(new Error('Not valid data!'));

            const element = editor.codemirror.getTextArea();
            
            if ( element.getAttribute('id') === 'tb_chart_options' ) {
                this.chartOptions.value = curVal;
            }
    
            if ( element.getAttribute('id') === 'tb_chart_variables' ) {
                this.chartVariables.value = curVal;
            }
            resolve(curVal);
        });
        
    }

    /**
     * Method will initialize the custom metabox fields
     */
    addHandlerMetaboxChart() {
        if ( this._metaboxChartFields.length > 0 ) {
            this._metaboxChartFields.forEach(el => {
                const editorSettings = wp?.codeEditor?.defaultSettings ? _.clone( wp?.codeEditor?.defaultSettings ) : {};
                editorSettings.codemirror = _.extend(
                    {},
                    editorSettings.codemirror,
                    {
                        indentUnit: 2,
                        tabSize: 2,
                    }
                );
                const editor = wp?.codeEditor?.initialize( el, editorSettings );
                this._editors.push(editor);
            });
            
        }
    }
}

export default new MetaboxView();