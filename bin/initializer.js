/**

    Module to create basic working environment for puerf.
    Will create a folder for route files and create basic version.

    options {
        mockFolder,     Specifies the folder to use for mock files (default: mock)
        noMock,         If ture, does not create mock files
        templateFolder, Specifies the folder to use for template files (default: templates)
        noTemplate      If true, does not create template files
    }
}

*/

var logger = require('./logger');
var helper = require('./helper')
var fs = require('fs');
var path = require('path');

module.exports = function createInitializer() {

    /**
     *   Starts setting up basic files to work with puerF.
     */
    function startInitialization(options) {
        logger.info('Initializing a basic setup for puerf');
        if (!options.noMock) {
            createMockFiles(options.mockFolder);
        } else {
            logger.info('Will not create mock files')
        }
        if (!options.noTemplate) {
            createTemplateFiles(options.templateFolder);
        } else {
            logger.info('Will not create template files')
        }
    }

    /**
     *   Creates std. mock files if none exist.
     */
    function createMockFiles(folder) {
        if (folder === undefined) {
            folder = 'mock';
        }
        var folderPath = helper.absolutePath(folder);
        helper.guarantyFolder(folderPath);
        var routesFile = path.join(folderPath, 'routes.js');
        var ftlRoutesFile = path.join(folderPath, 'ftlRoutes.js');
        createFileIfNotExist(routesFile, stdRoutesContent);
        createFileIfNotExist(ftlRoutesFile, stdFtlContent);
        logger.info('Created basic mock files.')
    }

    /**
     *   Creates a std. template file.
     */
    function createTemplateFiles(folder) {
        if (folder === undefined) {
            folder = 'templates';
        }
        var folderPath = helper.absolutePath(folder);
        helper.guarantyFolder(folderPath);
        var testTemplate = path.join(folderPath, 'test.ftl');
        createFileIfNotExist(testTemplate, testTemplContent);
    }

    /**
     *   Saves a file if no such file exists.
     */
    function createFileIfNotExist(file, contents) {
        try {
            fs.accessSync(file);
        } catch (e) {
            fs.writeFileSync(file, contents);
        }
    }

    var stdRoutesContent = `module.exports = {

    "GET /test/:id": function(req, res, next){

        // response json format
        res.send({
            title: "title here",
            id: req.params.id
        })

    },
    // PUT POST DELETE is the same
    "PUT /test/:id": function(){

    }\n\n};`;

    var stdFtlContent = `module.exports = {

    'GET /': {
        template: 'test.ftl',
        data: {
            name: 'THE USERS NAME'
        }
    }\n\n};`;

    var templateString = '${name}';
    var testTemplContent = `<html>
    <head>
      <title>Welcome!</title>
    </head>
    <body>
      <h1>Welcome ${templateString}!</h1>
      <p>Enjoy using puerF, it does work for you ;)</p>
    </body>\n</html>`;

    return {
        init: startInitialization
    }

}();