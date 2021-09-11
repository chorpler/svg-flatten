import { XmlDocument } from 'xmldoc';
import { XmlNode } from 'xmldoc';
import { XmlElement } from 'xmldoc';
import { XmlChunk } from './common';
import * as xmldoc from 'xmldoc';

import { SvgTransform } from './transform';
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

