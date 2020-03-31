import {dom, u as util} from "./index";
import {isValidNumber as isValidInput, parseInput, alert, inchesToFeet, cubicFeetToCubicYards} from "./functions";

type input = HTMLInputElement;

enum BagSizes  {
    FortyPoundBag = 0.011,
    SixtyPoundBag = 0.017,
    EightyPoundBag = 0.022
}

/* Slab calculator selectors */

let slabCalculatorParent = "#concrete-slab-calculator",
    slabThicknessInput = dom.f(`${slabCalculatorParent} #slab-thickness`)! as input,
    slabWidthInput = dom.f(`${slabCalculatorParent} #slab-width`)! as input,
    slabLengthInput = dom.f(`${slabCalculatorParent} #slab-length`)! as input,
    slabSubmitBtn = dom.f(`${slabCalculatorParent} #slab-calc-submit`)! as HTMLButtonElement,
    slabCalcResults = dom.f(`${slabCalculatorParent} .result`)!,
    fortyPoundBagsSlab = dom.f(`${slabCalculatorParent} .forty-pound-bags`)!,
    sixtyPoundBagsSlab = dom.f(`${slabCalculatorParent} .sixty-pound-bags`)!,
    eightyPoundBagsSlab = dom.f(`${slabCalculatorParent} .eighty-pound-bags`)!;

/* Footing calculator selectors */    

let footingCalculatorParent = "#concrete-footing-calculator",
    footingThicknessInput = dom.f(`${footingCalculatorParent} #footing-thickness`)! as input,
    footingWidthInput = dom.f(`${footingCalculatorParent} #footing-width`)! as input,
    footingLengthInput = dom.f(`${footingCalculatorParent} #footing-length`)! as input,
    footingSubmitBtn = dom.f(`${footingCalculatorParent} #footing-calc-submit`)! as HTMLButtonElement,
    footingCalcResults = dom.f(`${footingCalculatorParent} .result`)!,
    fortyPoundBagsFooting = dom.f(`${footingCalculatorParent} .forty-pound-bags`)!,
    sixtyPoundBagsFooting = dom.f(`${footingCalculatorParent} .sixty-pound-bags`)!,
    eightyPoundBagsFooting = dom.f(`${footingCalculatorParent} .eighty-pound-bags`)!;    

/*  Column calculator selectors */


let columnCalculatorParent = "#column-calculator",
    columnDiameterInput = dom.f(`${columnCalculatorParent} #column-diameter`)! as input,
    columnHeightInput = dom.f(`${columnCalculatorParent} #column-height`)! as input,
    columnSubmitBtn = dom.f(`${columnCalculatorParent} #column-calc-submit`)! as HTMLButtonElement,
    columnCalcResults = dom.f(`${columnCalculatorParent} .result`)!,
    fortyPoundBagsColumn = dom.f(`${columnCalculatorParent} .forty-pound-bags`)!,
    sixtyPoundBagsColumn = dom.f(`${columnCalculatorParent} .sixty-pound-bags`)!,
    eightyPoundBagsColumn = dom.f(`${columnCalculatorParent} .eighty-pound-bags`)!;

function calculateSlab(thicknessInput: input, widthInput: input, lengthInput: input, resultsBox: Element, type: string = 'slab'): number | undefined{
    let thickness, width, length, results;
    
        if(isValidInput(thicknessInput.value)){
            thickness = parseInput(thicknessInput.value)
        }else{
            window.alert(`Enter a valid value for ${type} thickness.`);
            return;
        }
        if(isValidInput(widthInput.value)){
            width = parseInput(widthInput.value);
        }else{
            window.alert(`Enter a valid value for ${type} width.`);
            return;
        }
        if(isValidInput(lengthInput.value)){
            length = parseInput(lengthInput.value);
        }else{
            window.alert(`Enter a valid value for ${type} length.`);
            return;
        }
        // results in ft^3
        results = width * length * (thickness * (1/12));
        // results in yd^3
        results = results / 27;
        resultsBox.textContent = results.toFixed(4);
        return results;
}

function calculateBags(v: number, bagSize: BagSizes): number{
    switch(bagSize){
        case BagSizes.FortyPoundBag: {
            return v / BagSizes.FortyPoundBag;
        }
        case BagSizes.SixtyPoundBag: {
            return v / BagSizes.SixtyPoundBag;
        }
        case BagSizes.EightyPoundBag: {
            return v / BagSizes.EightyPoundBag;
        }
    }
}

slabSubmitBtn.addEventListener('click', ev => {
    let cubicYards = calculateSlab(slabThicknessInput, slabWidthInput, slabLengthInput, slabCalcResults);
    if(cubicYards !== undefined){
        fortyPoundBagsSlab.textContent = `${Math.ceil(calculateBags(cubicYards, BagSizes.FortyPoundBag))}`;
        sixtyPoundBagsSlab.textContent = `${Math.ceil(calculateBags(cubicYards, BagSizes.SixtyPoundBag))}`;
        eightyPoundBagsSlab.textContent = `${Math.ceil(calculateBags(cubicYards, BagSizes.EightyPoundBag))}`
    }
});

footingSubmitBtn.addEventListener('click', ev => {
    let cubicYards = calculateSlab(footingThicknessInput, footingWidthInput, footingLengthInput, footingCalcResults, 'footing');
    if(cubicYards !== undefined){
        fortyPoundBagsFooting.textContent = `${Math.ceil(calculateBags(cubicYards, BagSizes.FortyPoundBag))}`;
        sixtyPoundBagsFooting.textContent = `${Math.ceil(calculateBags(cubicYards, BagSizes.SixtyPoundBag))}`;
        eightyPoundBagsFooting.textContent = `${Math.ceil(calculateBags(cubicYards, BagSizes.EightyPoundBag))}`
    }
})

function calculateColumn(diameterInput: input, heightInput: input, resultsBox: Element): number | undefined{
    let radius: number,
        height: number,
        result: number;
    const PI = Math.PI;

    if(isValidInput(diameterInput.value)){
        radius = inchesToFeet(parseInput(diameterInput.value)) / 2;
    }else{
        alert(`Enter a valid value for column diameter.`);
        return;
    }
    if(isValidInput(heightInput.value)){
        height = parseInput(heightInput.value);
    }else{
        alert(`Enter a valid value for columnn height`);
        return;
    }
    result = cubicFeetToCubicYards(PI * Math.pow(radius, 2) * height);
    resultsBox.textContent = `${result.toFixed(4)}`
    return  result;
}

columnSubmitBtn.addEventListener("click", ev => {
    let concreteCubicYards = calculateColumn(columnDiameterInput, columnHeightInput, columnCalcResults);
    if(concreteCubicYards == undefined){
        return;
    }

    let [fortyPoundBags, sixtyPoundBags, eightyPoundBags] = 
    [BagSizes.FortyPoundBag,
     BagSizes.SixtyPoundBag, 
     BagSizes.EightyPoundBag].map(bagsize => `${Math.ceil(calculateBags(concreteCubicYards!, bagsize))}`)

     fortyPoundBagsColumn.textContent = fortyPoundBags;
     sixtyPoundBagsColumn.textContent = sixtyPoundBags;
     eightyPoundBagsColumn.textContent = eightyPoundBags;

})