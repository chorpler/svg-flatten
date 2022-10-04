import { XmlDocument } from 'xmldoc';
import { XmlNode } from 'xmldoc';
import { XmlElement } from 'xmldoc';
import { XmlChunk } from './common';

import { SvgPathify } from './pathify';

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
      dom.attr.d = SvgPathify.svgpath(dom.attr.d).transform(dom.attr.transform)
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
      if(dom.name === 'path' && dom.attr.transform) {
        return SvgTransform.transformPath(dom);
      } else if (dom.name === 'svg' || dom.name === 'g') {
        console.log(`Transform.transform(): Transforming element name ${dom.name}`);
        return SvgTransform.transformGroup(dom);
      } else {
        return (dom as XmlDocument);
      }
    } else {
      return (dom as XmlDocument);
    }
  }
}

