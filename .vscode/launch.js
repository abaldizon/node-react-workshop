{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug local",
            "preLaunchTask": "npm: build:dev",
            "program": "${workspaceRoot}/dist/index.js",
            "cwd": "${workspaceRoot}",
            "outFiles": [
                "${workspaceFolder}/dist/**/*.js"
            ],
            "sourceMaps": true
        }
    ]
}