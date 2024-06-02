const { compile } = require('nexe');

compile({
    input: './index.js',
    output: './AmongUsModSelector',
    ico: './icon.ico',
    build: true,
}).then(async(err) => {
    if (err) throw err
    console.log('success')
});