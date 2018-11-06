const path = require('path')
const fs = require('fs')

const {
    printFeature,
    parse,
 } = require('./index.js')

describe('printFeature', () => {
    it('should write file as parsed', () => {
        var file = fs.readFileSync(path.join( __dirname, '..', './samples/sample.feature'))
        const feature = parse(file)
        expect(feature).toMatchSnapshot()

        expect(printFeature(feature[0])).toMatch(file.toString())
    })

})