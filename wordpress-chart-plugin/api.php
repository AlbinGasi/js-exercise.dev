<?php

namespace TeachBeaconChart;

/**
 * Class Shared_Class
 *
 * @since 1.0.0
 * @access public
 */
class Shared_Class
{
    /**
     * Maintains the current version of the plugin so that we can use it throughout
     * the plugin.
     *
     * @since  1.0.0
     * @access private
     * @var    string $version The current version of the plugin.
     */
    private $version;

    /**
     * Represents the slug of the plugin that can be used throughout
     * for internationalization and other purposes.
     *
     * @since  1.0.0
     * @access private
     * @var    string $plugin_slug The single, hyphenated string used to identify this plugin.
     */
    private $plugin_slug;

    public function __construct($version, $plugin_slug) {
        $this->version = $version;
        $this->plugin_slug = $plugin_slug;
    }

    public function tbChartAJAX() {
        if ( !isset($_POST) ) return;

        $post_id = $_POST['postID'];
        $data = [];

        if ( isset($_POST['getShortcode']) ) {
            $shortcode = str_replace('\\', '', $_POST['shortcode']);
            $data['shortcode'] = do_shortcode($shortcode);
        } else {
            $chartDefaultOptions = get_post_meta( $post_id, 'tb_chart_default_options', true );
            // Check if pre-defined options are selected
            if ( !empty($chartDefaultOptions) ) {
                // Get pre-defined settings
                
            }

            $chartOptions = get_post_meta( $post_id, 'tb_chart_options', true );
            $chartVariables = get_post_meta( $post_id, 'tb_chart_variables', true );
            
            $data = [
                'postID' => $post_id,
                'chartDefaultOptions' => $chartDefaultOptions,
                'chartOptions' => $chartOptions,
                'chartVariables' => $chartVariables,
            ];
        }

        echo json_encode($data);

        wp_die();
    }

    /**
     * Define all scripts which are going to be used
     */
    public function enqueue_scripts() {

        wp_enqueue_style(
            $this->plugin_slug . '-tb-chart-css',
            plugin_dir_url(__FILE__) . 'assets/dist/tb-chart.css',
            array(),
            strtotime("now"),
            FALSE
        );

        wp_register_script(
            $this->plugin_slug . '-tb-chart-js',
            plugin_dir_url(__FILE__) . 'assets/dist/tb-chart.js',
            array('jquery'),
            strtotime("now"),
            TRUE
        );

        wp_enqueue_script( $this->plugin_slug . '-tb-chart-js' );

        $shared_script_info = [
            'ajaxUrl' => admin_url( 'admin-ajax.php' ),
            'isAdmin' => is_admin() ? 'true' : 'false'
        ];
		wp_localize_script( $this->plugin_slug . '-tb-chart-js', 'tbChartWP', $shared_script_info );
    }

    public function enqueue_admin_scripts($hook) {
        if ( ! get_the_ID() ) {
            return;
        }
        if ( Admin_Class::$postType !== get_post_type( get_the_ID() ) ) {
            return;
        }
    
        if ( 'post.php' === $hook || 'post-new.php' === $hook ) {
            // wp_enqueue_code_editor( [ 'type' => 'application/json' ] );
            wp_enqueue_code_editor( [ 
                'type' => 'text/javascript',
                'codemirror' => [
                    'autoRefresh' => true
                ]
            ]);
        }

    }

    public function set_scripts_type_attribute( $tag, $handle, $src ) {
        if ( $this->plugin_slug . '-tb-chart-js' === $handle ) {
            $tag = '<script type="module" src="'. $src .'"></script>';
        }
        return $tag;
    }

    /** 
     * Renders a template dynamically, so that you do not have to create a new render for each template type.
     * ToDo - Add support for hooks here.  Attributes can also be added to templates here.  IE - for shortcodes. Must
     * add attribute hooks in main class to do so.
     * @param $template_name
     * @return false|string
     * @since 1.0.0
     */
    public function get_template_html($template_name) {
        ob_start();
        include plugin_dir_path(dirname(__FILE__)) . 'public/templates/' . $template_name . '.php';
        $html = ob_get_contents();
        ob_end_clean();

        return $html;
    }
}