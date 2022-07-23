import { IS_ADMIN, AJAX_URL } from "../config.js";
import ApexCharts from "apexcharts";
import { replaceStringWithVariables, arrayMerge } from "../helpers.js";
import { async } from "regenerator-runtime";
import metaboxView from "./metaboxView.js";
import { prepareAjaxOptions, getData, replaceShortcodeWithValue, stringToObject } from "../model.js";
import View from "./View.js";

class ChartView extends View {
    _chartElements = document.querySelectorAll('.tb-chart');
    _parentElement;

    /**
     * Main handler
     * @param {object} handler 
     */
    addHandlerRender(handler) {
        handler();
    }

    /**
     * Method will check whether any charts exists on the current page
     * @returns
     */
    checkIsChartExist() {
        return this._chartElements.length > 0;
    }

    /**
     * Chart variables: '$variableName$'
     * Chart shortcode: '#[tb-chart id="10220"]#'
     * Chart shortcode output to number: '#([tb-chart id="10220"])#'
     */
    render() {
        this._chartElements.forEach(async el => {
            const id = el.dataset.id;
            if ( !id ) return;

            // Set parent element
            this._parentElement = el;

            // Load spinner
            this.renderSpinner(el);

            // Get options
            // If is admin, load all options immediatelly from fields
            let data = false;
            if ( IS_ADMIN === 'true' ) {
                data = {
                    chartVariables: metaboxView.chartVariables.value,
                    chartDefaultOptions: "", //metaboxView.chartDefaultOptions.value,
                    chartOptions: metaboxView.chartOptions.value
                }
            } 
            
            if ( IS_ADMIN === 'false' ) {
                const ajaxOptions = prepareAjaxOptions(id);
                data = await getData(ajaxOptions);
            }
            if ( !data ) return;
           
            // 1. Create a custom variables and put them to the window object
            // Replace dynamical chart variables strings to real variables
            const dataChartVariablesStringToVar = data.chartVariables ? replaceStringWithVariables(data.chartVariables, id) : {};
            // Convert string to the object
            const dataChartVariables = dataChartVariablesStringToVar ? stringToObject(dataChartVariablesStringToVar) : {};
            // Replace shortocde with values and do a Window variables initialization
            window[`chartDynamicalOptions_${id}`] = await replaceShortcodeWithValue(dataChartVariables, id);

            // 2. Convert default chart options to object 
            // (this comes from the options that are selected from the one of the pre-defined settings)
            // Get pre-defined options value using AJAX
            // const defaultOptionsValue = await ... 
            const defaultOptions = data.chartDefaultOptions ? stringToObject(data.chartDefaultOptions) : {};
            
            // 3. Convert current chart options
            // Replace special characters with real variables
            const replaceOptionsWithVariables = replaceStringWithVariables(data.chartOptions, id);
            // Current chart options
            const options = replaceOptionsWithVariables ? stringToObject(replaceOptionsWithVariables) : {};

            // 4. Merge default with new options
            const newOptions = arrayMerge(defaultOptions, options);

            // 5. Chart initialization
            const chart = new ApexCharts(el, newOptions);
            chart.render();

            // Remove spinner
            this.removeSpinner(el);

            // When is admin then update chart values for live preview
            if ( IS_ADMIN === 'true' ) {
                const adminOptions = newOptions;
                chart.updateSeries(adminOptions.series);
                delete adminOptions.series;
                chart.updateOptions(newOptions);
            }
        });
    }

    /**
     * Method will retrieve all element attributes
     * @param {DOM} element 
     */
    _getElementAttributes(element) {
        console.log(element);
    }

}

export default new ChartView();