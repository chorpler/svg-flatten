// const parseFn     = require('./parse.js')     ;
// const pathifyFn   = require('./pathify.js')   ;
// const transformFn = require('./transform.js') ;
// const flattenFn   = require('./flatten.js')   ;

// import { parseFn     } from './parse'     ;
// import { pathifyFn   } from './pathify'   ;
// import { transformFn } from './transform' ;
// import { flattenFn   } from './flatten'   ;
import { XmlDocument } from 'xmldoc';
import { XmlNode } from 'xmldoc';
import { XmlElement } from 'xmldoc';
import * as xmldoc from 'xmldoc';
import { XmlChunk } from './common';

import { SvgPathify } from './pathify';
import { SvgTransform } from './transform';
import { SvgFlatten } from './flatten';

export const getNode = function(dom:XmlChunk):XmlDocument {
  return (dom as XmlDocument);
}


export class SvgMod {
  public _value:XmlDocument;

  constructor(source?:string|XmlDocument) {
    this._value = this.parseInput(source);
  }

  public static parse(source:string):XmlDocument {
    const svgmod = new SvgMod(source);
    return svgmod.parseFn(source);
  }

  public parseFn(source:string):XmlDocument {
    try {
        return new xmldoc.XmlDocument(source);
    } catch(err:any) {
        const dom = new xmldoc.XmlDocument('<invalid />');
        dom.attr.reason = err.toString();
        return dom;
    }
};

  public parseInput(source?:string|XmlDocument) {
    if(!source) {
      throw new TypeError("SvgMod: Input type must be a string or parsed XmlDocument object");
    }
    let parsedOutput:XmlDocument;
    if(typeof source === 'string') {
      parsedOutput = this.parseFn(source);
      return parsedOutput;
    } else {
      parsedOutput = source;
      return parsedOutput;
    }
  }

  public value():string {
    // return this._value.toStringWithIndent("  ");
    return this._value.toString();
  }

  public static flatten(source?:string|XmlDocument):SvgMod {
    let svg = new SvgMod(source);
    svg.flatten(source);
    return svg;
  }

  public static pathify(source?:string|XmlDocument):SvgMod {
    let svg = new SvgMod(source);
    svg.pathify(source);
    return svg;
  }

  public static transform(source?:string|XmlDocument):SvgMod {
    let svg = new SvgMod(source);
    svg.transform(source);
    return svg;
  }

  public parse(source:string):XmlDocument {
    try {
      return new xmldoc.XmlDocument(source);
    } catch(err:any) {
      const dom = new xmldoc.XmlDocument('<invalid />');
      dom.attr.reason = err.toString();
      return dom;
    }
  }

  public pathify(source?:string|XmlDocument):SvgMod {
    if(source) {
      this._value = this.parseInput(source);
    }
    this._value = SvgPathify.pathify(this._value);
    return this;
  }

  public transform(source?:string|XmlDocument):SvgMod {
    if(source) {
      this._value = this.parseInput(source);
    }
    this._value = SvgTransform.transform(this._value);
    return this;
  }

  public flatten(source?:string|XmlDocument):SvgMod {
    if(source) {
      this._value = this.parseInput(source);
    }
    this._value = SvgFlatten.flatten(this._value);
    return this;
  }
}

// export class SvgModCli {
//   constructor()
// }