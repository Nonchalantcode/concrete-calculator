type Collection = {
    length: number,
    [propIndex: number]: any
}

class DOM{
    static f(sel: string, context: (Document | Element) = document): null | Element{
        return context.querySelector(sel);
    };

    static fall(sel: string, context: (Document | Element) = document): NodeListOf<Element>{
        return context.querySelectorAll(sel);
    }
    static create(domString: string): Element | Element[]{
        let __temporal = document.createElement("div") as Element;
        __temporal.innerHTML = domString;
        return __temporal.children.length == 1 ? 
                __temporal.children[0].cloneNode(true) as Element : 
                (_ => {
                    let elements: Element[] = []
                    for(let i = 0; i < __temporal.children.length; i++){
                        elements.push(__temporal.children[i].cloneNode(true) as Element);
                    }
                    return elements;
                })()
    }
    
    static setAttr(el: Element, attr: string, val: string): Element{
        el.setAttribute(attr, val);
        return el;
    }
    static getAttr(el: Element, attr: string): string | null{
        return el.getAttribute(attr);
    }
    static style(el: Element, cssRules: {[cssProp: string]: string | number}): Element{
        let styles = [];
        for(let rule in cssRules){
            styles.push(`${rule}: ${cssRules[rule]};`);
        }
        return DOM.setAttr(el, 'style', styles.join(''));
    }
    static append(child: Element, parent: Element){
        return parent.appendChild(child);
    }
    static remove(child: Element, parent: Element){
        return parent.removeChild(child);
    }
}

class Fns{
    static first(v: any[]): any{
        return v[0];
    }
    static second(v: any[]): any{
        return v[1];
    }
    static nth(n: number, v: (Collection[] | any[])): any{
        return v[n];
    }
    static doTimes(n: number, fn: Function){
        if(n <= 0) return;
        for(let i: number = 0; i < n; i++){
            fn(i);
        }
    }
    static thread(v: any, ...fns: any[][]): any{
        return fns.reduce((acc, curr) => {
            let [fn, ...args] = curr;
            acc = fn(acc, ...args);
            return acc;
        }, v);
    }
    static once(fn: Function): Function{
        let called = false,
          __ret: any;
        return (...args: any[]) => {
          if (called) {
            return __ret;
          }
          called = !called;
          __ret = fn(...args);
          return __ret;
        }
    }
    static noOp(){}
    static partition<T>(coll: T[], n: number): T[][]{
        let result: T[][] = [];
        let partialResults: T[] = [];
        if (n <= 0 || coll.length == 0) {
          return result;
        }
        if (n >= coll.length) {
          return [coll];
        }
        for (
          let iterTimes = Math.ceil(coll.length / n),
          currIndex = 0,
          i = 0;
          i < iterTimes;
          i++
        ){
          for (let j = 0; j < n && currIndex < coll.length; j++){
            partialResults.push(coll[currIndex++]);
          }
          result.push(partialResults);
          partialResults = [];
        }
        return result;
    }
}


export {DOM as dom, Fns as u};