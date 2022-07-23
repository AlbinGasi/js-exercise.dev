import 'core-js/stable'; // ECM5
import 'regenerator-runtime/runtime'; // polyflying async and await
import * as css from './../css/tb-chart.css';

import metaboxView from './views/metaboxView.js';
import chartView from './views/chartView.js';
import dashboardView from './views/dashboardView.js';
import { IS_ADMIN } from './config';

// tb-chart.js - controller

/**
 * Controler method is used in admin dashboard
 * @returns 
 */
const controlMetaboxFields = function() {
    if ( ! chartView.checkIsChartExist() ) return;
    chartView.render();
}

/**
 * Controler method - check and call the charts
 * @returns 
 */
const controlChartView = function() {
    if ( ! chartView.checkIsChartExist() ) return;
    chartView.render();
}

const controlAdminMenuFix = function() {
    // 1. Check whether current page is one that should be fixed
    const isPageDefineNewSettings = dashboardView.checkDoesPageContainClasses(['post-new-php', 'post-type-tb-chart-predefined']);

    // 2. Fix the issue with current class on admin menu
    if ( isPageDefineNewSettings ) dashboardView.setCurrentActiveMenuClass(false, true, '',  'Define New Settings');

}

const tbChartInit = function() {
    // Admin custom metabox fields handler
    metaboxView.addHandlerMetaboxChart();

    metaboxView.addHandlerRender(controlMetaboxFields);
    chartView.addHandlerRender(controlChartView);
    if (IS_ADMIN === 'true') dashboardView.addHandlerFixActiveMenu(controlAdminMenuFix);
}

tbChartInit();