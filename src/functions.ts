function notANumber(v: string): boolean{
    return /[^\d^\.]/.test(v);
}

function wrongFormatted(v: string): boolean{
    let m =  v.match(/\./g);
    return m !== null && m.length > 1 || v.endsWith(".");
}

function isZero(v: string): boolean{
    return v.length == 1 && v == '0' || /^0\.0+$/.test(v);
}

function isNeg(v: string): boolean{
    return v.startsWith('-');
}

export function parseInput(v: string): number{
    // If 'v' comes in the form of .123445 etc
    if(/^\.\d+/.test(v)){
        return Number.parseFloat(`0${v}`);
    }
    return Number.parseFloat(v);
}

export function isValidNumber(v: string): boolean{
    let input = v.trim();
    if(input.length == 0 || isZero(v) || isNeg(v) || notANumber(v) || wrongFormatted(v)){
        return false;
    } 
    return true;
}

export function alert(v: string){
    window.alert(v);
}

export function inchesToFeet(v: number): number{
    return v / 12;
}

export function cubicFeetToCubicYards(v: number): number{
    return v / 27;
}

export function toNearestInteger(v: number, offset: number): void{
    
}