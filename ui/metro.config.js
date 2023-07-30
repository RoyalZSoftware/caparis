// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = {
    ...getDefaultConfig(__dirname),
    watchFolders: [
        path.resolve(__dirname, '../core'),
        path.resolve(__dirname, '../appwrite'),
        path.resolve(__dirname, '../ui-components'),
    ],
    resolver: {
        extraNodeModules: new Proxy(
            {},
            {
                get: (target, name) => {
                    if (target.hasOwnProperty(name)) {
                        return target[name]
                    }
                    return path.join(process.cwd(), `node_modules/${name}`)
                },
            },
        ),
    },
    server: {
        rewriteRequestUrl: (url) => {
            if (!url.endsWith('.bundle')) {
                return url;
            }
            // https://github.com/facebook/react-native/issues/36794
            // JavaScriptCore strips query strings, so try to re-add them with a best guess.
            return url + '?platform=ios&dev=true&minify=false&modulesOnly=false&runModule=true';
        }, // ...
    }, // ...
};
