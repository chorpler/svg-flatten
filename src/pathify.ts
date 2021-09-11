import { XmlDocument } from 'xmldoc';
import { XmlNode } from 'xmldoc';
import { XmlElement } from 'xmldoc';
import { XmlChunk } from './common';

import * as svgpathimport from 'svgpath';
const svgpath = svgpathimport.default;


export class SvgPathify {
  /*jshint singleGroups: false*/

  public static svgpath = svgpath;

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

  public convertGroup(dom:XmlChunk):XmlDocument {
    let newChildren:XmlNode[] = [];
    dom = (dom as XmlDocument);

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

    return (dom as XmlDocument);
  }

  public convertCircle(dom:XmlChunk):XmlDocument {
    dom = (dom as XmlDocument);
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

    return (dom as XmlDocument);
  }

  public convertEllipse(dom:XmlChunk):XmlDocument {
    dom = (dom as XmlDocument);
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

    return (dom as XmlDocument);
  }

  public convertLine(dom:XmlChunk):XmlDocument {
    dom = (dom as XmlDocument);
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

    return (dom as XmlDocument);
  }

  public convertPolygon(dom:XmlChunk):XmlDocument {
    dom = (dom as XmlDocument);
    let points = dom.attr.points.trim().split(/[\s,]+/).map(a => Number(a));
    let svgPath = this._convertPoints(points) + "z";

    delete dom.attr.points;

    dom.name = 'path';
    dom.attr.d = svgPath;

    return (dom as XmlDocument);
  }

  public convertPolyline(dom:XmlChunk):XmlDocument {
    dom = (dom as XmlDocument);
    let points = dom.attr.points.trim().split(/[\s,]+/).map(a => Number(a));
    let svgPath = this._convertPoints(points);

    delete dom.attr.points;

    dom.name = 'path';
    dom.attr.d = svgPath;

    return (dom as XmlDocument);
  }

  public convertRect(dom:XmlChunk):XmlDocument {
    dom = (dom as XmlDocument);
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

    return (dom as XmlDocument);
  }

  public pathify(dom:XmlChunk):XmlDocument {
    if(dom && (dom as XmlDocument).name != null) {
      dom = (dom as XmlDocument);
      if(dom.name === 'svg') {
        return this.convertGroup(dom);
      } else if(dom.name === 'circle') {
        return this.convertCircle(dom);
      } else if(dom.name === 'ellipse') {
        return this.convertEllipse(dom);
      } else if(dom.name === 'line') {
        return this.convertLine(dom);
      } else if(dom.name === 'polygon') {
        return this.convertPolygon(dom);
      } else if(dom.name === 'polyline') {
        return this.convertPolyline(dom);
      } else if(dom.name === 'rect') {
        return this.convertRect(dom);
      } else if(dom.name === 'g') {
        return this.convertGroup(dom);
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
