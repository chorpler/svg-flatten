// const parseFn     = require('./parse.js')     ;
// const pathifyFn   = require('./pathify.js')   ;
// const transformFn = require('./transform.js') ;
// const flattenFn   = require('./flatten.js')   ;

import { parseFn     } from './parse'     ;
// import { pathifyFn   } from './pathify'   ;
// import { transformFn } from './transform' ;
// import { flattenFn   } from './flatten'   ;
import { XmlDocument } from 'xmldoc';
import { XmlNode } from 'xmldoc';
import { XmlElement } from 'xmldoc';
import * as xmldoc from 'xmldoc';
import * as svgpathimport from 'svgpath';

const svgpath = svgpathimport.default;

export type XmlChunk = XmlDocument|XmlNode|XmlElement;

export class SvgPathify {
  /*jshint singleGroups: false*/

  public _convertEllipse(cx:number, cy:number, rx:number, ry:number):string {
    return "M" + (cx - rx) + "," + cy + "a" + rx + "," + ry + " 0 1,0 " + (rx * 2) + ",0a" + rx + "," + ry + " 0 1,0 " + (rx * -2) + ",0";
  }

  public _convertPoints(points:number[]):string {
    let svgPath = "";

    for(let i=0; i<points.length; i+=2) {
      let prefix = svgPath.length ? ' ' : 'M';
      svgPath += prefix + points[i] + ',' + points[i+1];
    }

    return svgPath;
  }

  public convertGroup(dom:XmlElement):XmlElement {
    let newChildren:XmlNode[] = [];

    dom.children.forEach((child) => {
      let childDoc = (child as XmlDocument);
      let pathifiedChild = this.pathify(childDoc);
      newChildren.push(pathifiedChild);
    });

    dom.children = newChildren;

    if(newChildren.length > 0) {
      dom.firstChild = newChildren[0];
      dom.lastChild = newChildren[newChildren.length - 1];
    }

    return dom;
  }

  public convertCircle(dom:XmlElement):XmlElement {
    let da = dom.attr;
    let cx = Number(da.cx);
    let cy = Number(da.cy);
    let r  = Number(da.r);
    let svgPath = this._convertEllipse(cx, cy, r, r);

    delete dom.attr.cx;
    delete dom.attr.cy;
    delete dom.attr.r;

    dom.name = 'path';
    dom.attr.d = svgPath;

    return dom;
  }

  public convertEllipse(dom:XmlElement):XmlElement {
    let da = dom.attr;
    let cx = Number(da.cx);
    let cy = Number(da.cy);
    let rx = Number(da.rx);
    let ry = Number(da.ry);
    let svgPath = this._convertEllipse(cx, cy, rx, ry);

    delete dom.attr.cx;
    delete dom.attr.cy;
    delete dom.attr.rx;
    delete dom.attr.ry;

    dom.name = 'path';
    dom.attr.d = svgPath;

    return dom;
  }

  public convertLine(dom:XmlElement):XmlElement {
    let da = dom.attr;
    let x1 = Number(da.x1);
    let y1 = Number(da.y1);
    let x2 = Number(da.x2);
    let y2 = Number(da.y2);
    let svgPath = this._convertPoints([x1, y1, x2, y2]);

    delete dom.attr.x1;
    delete dom.attr.y1;
    delete dom.attr.x2;
    delete dom.attr.y2;

    dom.name = 'path';
    dom.attr.d = svgPath;

    return dom;
  }

  public convertPolygon(dom:XmlElement):XmlElement {
    let points = dom.attr.points.trim().split(/[\s,]+/).map(a => Number(a));
    let svgPath = this._convertPoints(points) + "z";

    delete dom.attr.points;

    dom.name = 'path';
    dom.attr.d = svgPath;

    return dom;
  }

  public convertPolyline(dom:XmlElement):XmlElement {
    let points = dom.attr.points.trim().split(/[\s,]+/).map(a => Number(a));
    let svgPath = this._convertPoints(points);

    delete dom.attr.points;

    dom.name = 'path';
    dom.attr.d = svgPath;

    return dom;
  }

  public convertRect(dom:XmlElement):XmlElement {
    let x = Number(dom.attr.x);
    let y = Number(dom.attr.y);
    let width = Number(dom.attr.width);
    let height = Number(dom.attr.height);

    let points:number[] = [];
    points.push(x, y);
    points.push(x + width, y);
    points.push(x + width, y + height);
    points.push(x, y + height);
    let svgPath = this._convertPoints(points) + "z";

    delete dom.attr.x;
    delete dom.attr.y;
    delete dom.attr.width;
    delete dom.attr.height;

    dom.name = 'path';
    dom.attr.d = svgPath;

    return dom;
  }

  public pathify(dom:XmlChunk):XmlDocument {
    if(dom && (dom as XmlDocument).name != null) {
      dom = (dom as XmlDocument);
      if(dom.name === 'svg') {
        return convertGroup(dom);
      } else if(dom.name === 'circle') {
        return convertCircle(dom);
      } else if(dom.name === 'ellipse') {
        return convertEllipse(dom);
      } else if(dom.name === 'line') {
        return convertLine(dom);
      } else if(dom.name === 'polygon') {
        return convertPolygon(dom);
      } else if(dom.name === 'polyline') {
        return convertPolyline(dom);
      } else if(dom.name === 'rect') {
        return convertRect(dom);
      } else if(dom.name === 'g') {
        return convertGroup(dom);
      } else {
        return (dom as XmlDocument);
      }
    } else {
      return (dom as XmlDocument);
    }
  }

  public static pathify(dom:XmlChunk):XmlDocument {
    let p = new SvgPathify();
    return p.pathify(dom);
  }
}

export class SvgTransform {

  public static transformGroup(dom:XmlChunk):XmlDocument {
    let newChildren:XmlNode[] = [];
    dom = (dom as XmlDocument);

    dom.children.forEach((child) => {
      newChildren.push(SvgTransform.transform((child as XmlDocument)));
    });

    dom.children = newChildren;

    if (newChildren.length > 0) {
      dom.firstChild = newChildren[0];
      dom.lastChild = newChildren[newChildren.length - 1];
    }

    return (dom as XmlDocument);
  }

  public static transformPath(dom:XmlChunk):XmlDocument {
    if(dom && (dom as XmlDocument).name != null) {
      dom = (dom as XmlDocument);
      dom.attr.d = svgpath(dom.attr.d).transform(dom.attr.transform)
        .round(10)
        .toString();

      delete dom.attr.transform;

      return (dom as XmlDocument);
    } else {
      return (dom as XmlDocument);
    }
  }

  public static transform(dom:XmlChunk):XmlDocument {
    if(dom && (dom as XmlDocument).name != null) {
      dom = (dom as XmlDocument);
      if (dom.name === 'path' && dom.attr.transform) {
        return SvgTransform.transformPath(dom);
      } else if (dom.name === 'svg' || dom.name === 'g') {
        return SvgTransform.transformGroup(dom);
      } else {
        return (dom as XmlDocument);
      }
    } else {
      return (dom as XmlDocument);
    }
  }
}

export class SvgFlatten {

  public static flattenSvg(dom:XmlChunk):XmlDocument {
    let newChildren:XmlNode[] = [];
    dom = (dom as XmlDocument);
    dom.children.forEach((child) => {
      newChildren.push(SvgFlatten.flatten(child));
    });

    dom.children = newChildren;

    if(newChildren.length > 0) {
      dom.firstChild = newChildren[0];
      dom.lastChild = newChildren[newChildren.length - 1];
    }

    return (dom as XmlDocument);
  }

  public static flattenGroup(dom:XmlChunk):XmlDocument {
    let svgPath = new xmldoc.XmlDocument('<path/>');
    dom = (dom as XmlDocument);

    svgPath.attr = dom.attr;
    svgPath.attr.d = "";

    dom.children.forEach((child) => {
      let flatChild = SvgTransform.transform(SvgFlatten.flatten(child));
      if(flatChild.attr.d) {
        let prefix = svgPath.attr.d.length ? " " : "";
        svgPath.attr.d += prefix + flatChild.attr.d;
      }
    });

    return svgPath;
  }

  public static flatten(dom:XmlChunk):XmlDocument {
    dom = (dom as XmlDocument);
    if(dom.name === 'svg') {
      return SvgFlatten.flattenSvg(dom);
    } else if (dom.name === 'g') {
      return SvgFlatten.flattenGroup(dom);
    } else {
      return (dom as XmlDocument);
    }
  }

}

export class SvgMod {
  public _value:XmlDocument;

  constructor(source:string|XmlDocument) {
    this._value = this.parseInput(source);
  }

  public parseInput(source:string|XmlDocument) {
    if(!source) {
      throw new TypeError("SvgMod: Input type must be a string or parsed XmlDocument object");
    }
    let parsedOutput:XmlDocument;
    if(typeof source === 'string') {
      parsedOutput = parseFn(source);
      return parsedOutput;
    } else {
      parsedOutput = source;
      return parsedOutput;
    }
  }

  public parse(source:string) {
    try {
      return new xmldoc.XmlDocument(source);
    } catch(err:any) {
      const dom = new xmldoc.XmlDocument('<invalid />');
      dom.attr.reason = err.toString();
      return dom;
    }
  }

  public pathify(source?:string):XmlDocument {
    if(source) {
      this._value = this.parseInput(source);
    }
    return SvgPathify.pathify(this._value);
  }

  public transform(source:string):XmlDocument {
    if(source) {
      this._value = this.parseInput(source);
    }
    return SvgPathify.pathify(this._value);
  }

  public flatten(source?:string):XmlDocument {
    if(source) {
      this._value = this.parseInput(source);
    }
    return SvgPathify.pathify(this._value);
  }

}