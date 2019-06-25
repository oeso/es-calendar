var path = require('path');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        port: 8888,
        https: false,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "./node_modules/es-library/src/assets/sass/main.scss";
                `,
                sourceMap: true,
            },
            postcss: {
                sourceMap: true
            }
        }
    },
    chainWebpack: (config) => {
        config.module.rules.delete('eslint');
        config.module.rule('vue').use('vue-loader').loader('vue-loader').tap((options) => {
            if (!options.hasOwnProperty('loaders')) {
                options.loaders = {};
            }
            options.loaders.ts = 'ts-loader!tslint-loader';
            return options;
        });
        // config.module.rule('ts').use('ts-loader').loader('ts-loader').tap((options) => {
        //     options.appendTsSuffixTo = [/\.ts\.vue$/];
        //     options.appendTsxSuffixTo = [/\.tsx\.vue$/];
        //     options.transpileOnly = true;
        //     return options;
        // });
    }
}

