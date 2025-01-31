/*jshint mocha: true*/
/*jshint expr: true*/
/*jshint multistr: true*/
import { expect } from 'chai';
import { describe } from 'mocha';
import { it } from 'mocha';
import { XmlDocument } from 'xmldoc';
import * as xmldoc from 'xmldoc';

import { SvgMod } from '../src/index';
import { getNode } from '../src/index';
import { XmlChunk } from '../src/index';

// var SvgMod.parse = require('../src/parse.js');

// sample files
var file1 = '<?xml version="1.0" encoding="utf-8"?> \
<!-- Generator: Adobe Illustrator 19.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> \
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> \
<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 1920.7 1133.7" style="enable-background:new 0 0 1920.7 1133.7;" xml:space="preserve"> \
    <rect x="804.5" y="83" class="st0" width="112.5" height="112.5"/> \
</svg>';

var file2 = '<?xml version="1.0" encoding="utf-8"?> \
<!-- Generator: Adobe Illustrator 19.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> \
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> \
<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 1920.7 1133.7" style="enable-background:new 0 0 1920.7 1133.7;" xml:space="preserve"> \
    <style type="text/css"> \
        .st0{fill:#E83F46;} \
    </style> \
    <rect x="804.5" y="83" class="st0" width="112.5" height="112.5"/> \
    <rect x="1585" y="139.2" transform="matrix(0.866 0.5 -0.5 0.866 327.0608 -829.6074)" class="st0" width="253.3" height="112.5"/> \
    <rect x="804.5" y="268.7" class="st0" width="112.5" height="112.5"/> \
    <rect x="804.5" y="454.4" class="st0" width="112.5" height="112.5"/> \
    <path class="st0" d="M976.7,262v294.4h294.4V262H976.7z M1221,506.4h-97.1v-97.1h97.1V506.4z"/> \
    <rect x="1100" y="83" class="st0" width="112.5" height="112.5"/> \
    <g transform="translate(0, 100)"> \
        <path class="st0" d="M1422,416.1c-6.3-40.5,83.3-114,173-108c90.1,6,173.9,92,175,188c1,85.5-64.1,140.2-79,152 c-97.2,76.6-220.5,30.1-236,24c-84.8-33.6-153-114.3-138-142c22.1-40.7,210.4,57.4,263-10c21.5-27.5,16-77-2-87 c-19.5-10.8-44.9,29.6-91,26C1458.8,456.8,1425.5,438.3,1422,416.1z"/> \
        <path class="st0" d="M471.6,694.4c-51.8-19.9-94.6-50.8-127.2-91.8c5.8-8.3,12.1-16.3,18.9-24.1c24.2,6.1,43.3,8.1,52.4,8.8l1.2-16 c-7.5-0.6-22.3-2.2-41.3-6.4c7.9-8.2,16.4-16.1,25.4-23.7c46.1-39,90.2-56.3,90.6-56.5l-5.8-14.9c-1.9,0.7-47,18.4-95.2,59.2 c-11.8,10-22.7,20.5-32.8,31.5c-9.5-2.7-19.7-5.9-30.2-10c-6.9-2.7-13.7-5.5-20.3-8.6c-4.1-9.2-7.7-18.5-10.8-28.1 c6.4-36.8,19.8-71.4,39.9-103.1c16.9-26.6,38.6-51.1,64.5-73c46.1-39,90.2-56.3,90.6-56.5l-5.8-14.9c-1.9,0.7-47,18.4-95.2,59.2 c-27.1,22.9-49.9,48.7-67.6,76.7c-15.5,24.4-27.3,50.5-35.1,78c-5.5-28.5-7-58.6-4.5-89.5c5-60.2,24-103.6,24.1-104l-14.6-6.5 c-0.8,1.9-20.2,46.3-25.5,109.2c-2.9,35.4-0.8,69.7,6.4,102c1.8,8,3.9,15.9,6.3,23.7c0,0.3-0.1,0.5-0.1,0.8c-0.6,3.7-1.1,7.3-1.5,11 c-33.9-20.2-62.6-46.4-85.7-78.1c-22.9-31.5-38.8-66.7-47.2-104.8c-6.8-30.8-8.9-63.5-6.1-97.2c5-60.2,24-103.6,24.1-104L149,136 c-0.8,1.9-20.2,46.3-25.5,109.2c-2.9,35.4-0.8,69.7,6.4,102c8.9,40.2,25.7,77.5,49.9,110.7c25.9,35.5,58.4,64.4,97,86.2 c-2.5,40.6,3.1,81.1,17,120.9c-6.3,17.5-10.9,35.6-13.8,54.2c-9.4,59.4-1.1,118.7,24.5,176.4c18.7,42.2,41.8,71.3,50.8,81.8 l12.1-10.4c-8.6-10-30.5-37.7-48.4-77.9c-24.4-54.8-32.2-111.1-23.3-167.4c1.8-11.2,4.2-22.2,7.3-33c0.5,1.1,1,2.2,1.5,3.3 c18.7,42.2,41.8,71.3,50.8,81.8l12.1-10.4c-8.6-10-30.5-37.7-48.4-77.9c-3-6.8-5.8-13.6-8.3-20.4c6.4-16.9,14.5-33.1,24.2-48.6 c34,41.3,77.9,72.5,130.7,92.8c43.1,16.6,79.9,20.8,93.8,21.9l1.2-16C547.7,714.2,512.7,710.2,471.6,694.4z M323,605.6 c-7.4,11.7-14,23.8-19.7,36.2c-8.3-29.6-11.9-59.4-10.8-89.4c0.9,0.5,1.8,0.9,2.8,1.4c7.9,16.8,17.4,32.9,28.5,48.1 c0.3,0.4,0.6,0.8,0.9,1.2C324.1,603.9,323.5,604.8,323,605.6z M334.3,589.1c-5.7-8.1-11-16.5-15.8-25.1c1.1,0.4,2.3,0.9,3.4,1.3 c8.4,3.2,16.6,6,24.4,8.4C342.1,578.7,338.1,583.9,334.3,589.1z"/> \
    </g> \
    <path class="st0" d="M1100,939c-80.2-4-242.2-24-239.2-96s151-104,151-104l160.8,54"/> \
    <polyline class="st0" points="1357.7,989 1457.7,1037 1611.7,1027 1611.7,859 1445.7,795 1387.7,813 1295.7,851 "/> \
</svg>';

// test
describe('svg-flatten: parse function', function() {
    it('should successfully parse a simple svg', function() {
        let dom = SvgMod.parse(file1);
        dom = (dom as XmlDocument);
        // test root node
        expect(dom.name).to.be.equal('svg');
        expect(dom.attr.viewBox).to.be.equal('0 0 1920.7 1133.7');

        // test child nodes
        expect(dom.children.length).to.be.equal(1);
        expect(getNode(dom.children[0]).name).to.be.equal('rect');
    });

    it('should successfully parse a complex svg', function() {
        var dom = SvgMod.parse(file2);

        // test root node
        expect(dom.name).to.be.equal('svg');
        expect(dom.attr.viewBox).to.be.equal('0 0 1920.7 1133.7');

        // test child nodes
        expect(dom.children.length).to.be.equal(10);
        expect(getNode(dom.children[0]).name).to.be.equal('style');
        expect(getNode(dom.children[1]).name).to.be.equal('rect');
        expect(getNode(dom.children[7]).attr.transform).to.be.equal('translate(0, 100)');
    });

    it('should not fail when the source is invalid', function() {
        var dom = SvgMod.parse("invalid input");

        // test root node
        expect(dom.name).to.be.equal('invalid');
        expect(dom.attr.reason).not.to.be.empty;
    });
});
