<!doctype html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <title>Stock Management System</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <!-- build:css(.) styles/vendor.css -->
        <!-- bower:css -->
        <!-- endbower -->
        <!-- endbuild -->
        <!-- build:css(.tmp) styles/main.css -->
        <link rel="stylesheet" href="/public/admin/css/main.css">
        <!-- endbuild -->
    </head>
    <body ng-app="yapp">
        <!--[if lt IE 7]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Angular application content -->
        <div class="">
            <div ui-view></div>
        </div>
        
        <!-- Load framework javascript files -->
        <script src="/public/admin/js/vendor.js"></script>

        <!-- Load angular bootstrap for modal integration -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.13.4/ui-bootstrap-tpls.min.js"></script>
        
        <!-- Grunt setup to minify javascript files -->
        <!-- build:js({.tmp,app}) scripts/scripts.js -->
        <script src="/public/admin/js/app.js"></script>
        <script src="/public/admin/js/controllers/login.js"></script>
        <script src="/public/admin/js/controllers/dashboard.js"></script>
        <script src="/public/admin/js/controllers/countries.js"></script>
        <script src="/public/admin/js/controllers/clinics.js"></script>
        <script src="/public/admin/js/controllers/products.js"></script>
        <script src="/public/admin/js/controllers/tax.js"></script>
        <script src="/public/admin/js/controllers/vendor.js"></script>
        <script src="/public/admin/js/controllers/low_stock.js"></script>
        <script src="/public/admin/js/controllers/order_stock.js"></script>
        <!-- endbuild -->
    </body>
</html>