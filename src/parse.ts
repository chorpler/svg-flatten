import * as xmldoc from 'xmldoc';

export const parseFn = function(source:string) {
    try {
        return new xmldoc.XmlDocument(source);
    } catch(err:any) {
        const dom = new xmldoc.XmlDocument('<invalid />');
        dom.attr.reason = err.toString();
        return dom;
    }
};