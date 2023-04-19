import terser from "@rollup/plugin-terser";
import scss from "rollup-plugin-scss";
import pkg from "./package.json";

export default {
    input: 'src/js/svi.js',
    plugins: [
        terser(),
        scss({
            fileName: 'svi.min.css',
            outputStyle: 'compressed'
        })
    ],
    output: [
        {
            name: 'svi',
            file: pkg.browser,
            format: 'umd'
        },
        {
            file: pkg.module,
            format: 'es'
        }
    ]
};