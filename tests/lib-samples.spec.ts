/*jshint mocha: true*/

import * as fs from 'graceful-fs';
import { expect } from 'chai';
import { describe } from 'mocha';
import { it } from 'mocha';
import { XmlDocument } from 'xmldoc';
import * as xmldoc from 'xmldoc';

import { SvgMod } from '../src/index';
import { getNode } from '../src/index';
import { XmlChunk } from '../src/index';

// test
describe('svg-flatten: test samples', function () {
    var samples = ["sample1", "sample2", "sample3"];

    samples.forEach(function(basename) {
        it('should give accurate results (' + basename + ')', function () {
            var sample = fs.readFileSync(__dirname + '/samples/' + basename + '.svg', 'utf8');
            var expectedResult = fs.readFileSync(__dirname + '/samples/' + basename + '_result.svg', 'utf8');

            var svgfile = new SvgMod(sample);
            // test with string
            var result = svgfile.flatten(sample)
              .pathify()
              .flatten()
              .transform()
              .value();

            expect(result).to.be.equal(expectedResult);

            // test with dom
            var sampleDom = new xmldoc.XmlDocument(sample);
            var expectedResultDom = new xmldoc.XmlDocument(expectedResult);

            var svgfile2 = new SvgMod(sampleDom);
            var resultDom = svgfile2.flatten(sampleDom)
              .pathify()
              .flatten()
              .transform()
              .value();

            expect(resultDom.toString()).to.be.equal(expectedResultDom.toString());
        });
    });
});
