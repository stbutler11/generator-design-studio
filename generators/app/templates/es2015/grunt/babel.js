/*global module*/
module.exports = {
    "options": {
        "sourceMap": true,
        "plugins": ["transform-es2015-modules-amd"],
        "moduleIds": true,
        "getModuleId": function(moduleName) {
            return moduleName.slice("src/component/res/es2015/".length);
        },
        "presets": ["es2015"]
    },
    "dist": {
        "files": [
            {
                "expand": true,
                "cwd": "src/component/res/es2015/",
                "src": ["**/*.js"],
                "dest": "src/component/res/js"
            }
        ]
    },
    "test": {
        "files": [
            {
                "expand": true,
                "cwd": "test/unit/es2015/",
                "src": ["**/*.js"],
                "dest": "test/unit/js/"
            }
        ],
        "options": {
            "plugins": []
        }
    }
}