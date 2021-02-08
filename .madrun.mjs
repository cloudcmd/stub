import {run} from 'madrun';

export default {
    'test': () => 'tape \'test/*.js\'',
    'watch:test': () => 'nodemon -w lib -w test -x "npm test"',
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => 'nyc npm test',
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
};

