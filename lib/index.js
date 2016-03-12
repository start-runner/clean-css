const defaultOptions = {
    rebase: false,
    sourceMapInlineSources: true
};

export default (userOptions) => (input) => {
    return function cleanCSS(log) {
        const path = require('path');
        const CleanCSS = require('clean-css');

        return Promise.all(
            input.map(file => {
                const options = {
                    ...defaultOptions,
                    ...userOptions
                };
                // only store a filename in Source Map `sources`
                const fileName = path.basename(file.path);
                const inputObject = {
                    [fileName]: {
                        styles: file.data
                    }
                };

                // input Source Map
                if (options.sourceMap === true && file.map !== null) {
                    inputObject[fileName].sourceMap = JSON.stringify(file.map);
                }

                return new Promise((resolve, reject) => {
                    new CleanCSS(options).minify(inputObject, (error, result) => {
                        if (error) {
                            return reject(error);
                        }

                        result.warnings.forEach(log);
                        result.errors.forEach(log);

                        log(file.path);

                        let sourceMap = null;

                        // output Source Map
                        if (typeof result.sourceMap !== 'undefined') {
                            sourceMap = JSON.parse(result.sourceMap.toString());
                        }

                        resolve({
                            path: file.path,
                            data: result.styles,
                            map: sourceMap
                        });
                    });
                });
            })
        );
    };
};
