const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: {
                    drop_console: true, // удалить console.log
                },
                output: {
                    comments: false, // убрать комментарии
                },
                mangle: true // обфускация имен
            }
        })],
    }
};
