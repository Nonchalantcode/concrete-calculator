function notANumber(v: string): boolean{
    return /[^\d^\.]/.test(v);
}

function wrongFormatted(v: string): boolean{
    return /\.+/.test(v);
}

function isZero(v: string): boolean{
    return v.length == 1 && v == '0' || /^0\.0+$/.test(v);
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
    if(input.length == 0 || isZero(v) || notANumber(v) || wrongFormatted(v)){
        return false;
    } 
    return true;
}

