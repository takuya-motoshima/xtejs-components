export var name = "xtejs-components";
export var version = "1.0.0";
export var description = "JS extension components";
export var main = "dist/build.common.js";
export var module = "dist/build.esm.js";
export var browser = "dist/build.js";
export var types = "types/index.d.ts";
export var scripts = {"watch":"rollup -c --watch","prewatch":"rm -rf dist types && json2module package.json > src/package.ts","build":"rollup -c","prebuild":"rm -rf dist types && json2module package.json > src/package.ts","test":"jest","start":"ts-node -r tsconfig-paths/register -P tsconfig.json -O '{\"module\":\"commonjs\"}' -e \"import * as index from '~/index';console.log(index);\"","prestart":"json2module package.json > src/package.ts"};
export var repository = {"type":"git","url":"git+https://github.com/takuya-motoshima/xtejs-components.git"};
export var files = ["dist/*.js","types/*.d.ts","package.json"];
export var keywords = ["browser","javascript","js","library","lib","module","typescript","ts","esm","es6"];
export var author = "Takuya Motoshima <developer.takuyamotoshima@gmail.com> (https://twitter.com/TakuyaMotoshima)";
export var license = "MIT";
export var bugs = {"url":"https://github.com/takuya-motoshima/xtejs-components/issues","email":"developer.takuyamotoshima@gmail.com"};
export var homepage = "https://github.com/takuya-motoshima/xtejs-components#readme";
export var devDependencies = {"@types/jest":"^24.0.23","fetch-mock":"^8.0.0","jest":"^24.9.0","json2module":"0.0.3","rollup":"^1.27.2","rollup-plugin-commonjs":"^10.1.0","rollup-plugin-javascript-obfuscator":"^1.0.4","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-postcss":"^2.2.0","rollup-plugin-terser":"^5.1.2","rollup-plugin-typescript2":"^0.25.2","ts-jest":"^24.1.0","ts-node":"^8.5.2","tsconfig-paths":"^3.9.0","typescript":"^3.8.3"};
export var dependencies = {"xtejs-utils":"github:takuya-motoshima/xtejs-utils#develop"};
