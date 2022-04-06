import {run} from 'madrun';

export default {
    'test': () => `tape 'test/*.js'`,
    'test:dts': () => 'check-dts',
    'watch:test': () => 'nodemon -w lib -w test -x "npm test"',
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => 'c8 npm test',
    'report': () => 'c8 report --reporter=lcov',
    'wisdom': () => run(['lint', 'coverage', 'test:dts']),
};

