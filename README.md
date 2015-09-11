# Coding challenge

The following web view is the MVP for stock order management system. Technologies utilised is Angular.js for frontend, Twitter Bootstrap for responsive layout and Lumen PHP Framework for backend.

- Lumen was chosing to ensure a RESTful approach with frontend.
- Angular.js was chosen to display new technology learned and double binding nature

Laravel Lumen is a stunningly fast PHP micro-framework for building web applications with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Lumen attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as routing, database abstraction, queueing, and caching.

Documentation for the framework can be found on the [Lumen website](http://lumen.laravel.com/docs).

## Further developement
Lumen repo can be extended to write internal or extern apis.

ie.e

api and api.v2 alongside admin repo

## Demo
http://176.32.230.251/codingchallenge.co.za/

## Navigation
- Low stock:
- Admin Setup:
--   a

## Repository explained
1) .htaccess redirects all incoming http calls for admin repo to index.php via apache rewrite rules

2) index.php creates Lumen application instance and executes the instance
- bootstrap/app.php

3) bootstap/app.php bootstraps all libraries and does the following
- autoload dependencies
- enable DB connection methods
- loads app config file .env


## .env explained
// sets the database php driver
DB_CONNECTION=mysql 

// sets the database host
DB_HOST=localhost

// sets the database port
DB_PORT=3306

// sets the database name
DB_DATABASE=stock_management

// sets the database user
DB_USERNAME=root

// sets the database password
DB_PASSWORD=root

// sets the setting to determine what the minimum quantity on hand is to be considered low stock
LOW_STOCK=5

// the apps caching driver
CACHE_DRIVER=database

// the apps session driver
SESSION_DRIVER=database

// the apps processing queue driver
QUEUE_DRIVER=database

## Included
- Lumen repo with front views
- MySQL workbench db diagram (admin->docs)
- sql scipt(admin-docs)

## Not Included in this MVP - for MVP phase 2
- Validation on Forms
- Admin login
- Admin regstration
- Invoice to Patient
- Automation on low stock email to procurement manager.
