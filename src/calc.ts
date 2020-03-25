import {dom, u as util} from "./index";
import {isValidNumber as isValidInput, parseInput} from "./functions";


enum BagSizes  {
    FortyPoundBag = 0.011,
    SixtyPoundBag = 0.017,
    EightyPoundBag = 0.022
}

/* Slab calculator selectors */

let slabCalculatorParent = "#concrete-slab-calculator",
    slabThicknessInput = dom.f(`${slabCalculatorParent} #slab-thickness`)! as HTMLInputElement,
    slabWidthInput = dom.f(`${slabCalculatorParent} #slab-width`)! as HTMLInputElement,
    slabLengthInput = dom.f(`${slabCalculatorParent} #slab-length`)! as HTMLInputElement,
    slabSubmitBtn = dom.f(`${slabCalculatorParent} #slab-calc-submit`)! as HTMLButtonElement,
    slabCalcResults = dom.f(`${slabCalculatorParent} .result`)!,
    fortyPoundBags = dom.f(`${slabCalculatorParent} .forty-pound-bags`)!,
    sixtyPoundBags = dom.f(`${slabCalculatorParent} .sixty-pound-bags`)!,
    eightyPoundBags = dom.f(`${slabCalculatorParent} .eighty-pound-bags`)!;

function calculateSlab(): number | undefined{
    let thickness, width, length, results;
    
        if(isValidInput(slabThicknessInput.value)){
            thickness = parseInput(slabThicknessInput.value)
        }else{
            window.alert("Enter a valid value for slab thickness.");
            return;
        }
        if(isValidInput(slabWidthInput.value)){
            width = parseInput(slabWidthInput.value);
        }else{
            window.alert("Enter a valid value for slab width.");
            return;
        }
        if(isValidInput(slabLengthInput.value)){
            length = parseInput(slabLengthInput.value);
        }else{
            window.alert("Enter a valid value for slab length.");
            return;
        }
        // results in ft^3
        results = width * length * (thickness * (1/12));
        // results in yd^3
        results = results / 27;
        slabCalcResults.textContent = results.toFixed(4);
        return results;
}

function calculateSlabBags(v: number, bagSize: BagSizes): number{
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
    let cubicYards = calculateSlab();

    if(cubicYards !== undefined){
        fortyPoundBags.textContent = `${Math.ceil(calculateSlabBags(cubicYards, BagSizes.FortyPoundBag))}`;

        sixtyPoundBags.textContent = `${Math.ceil(calculateSlabBags(cubicYards, BagSizes.SixtyPoundBag))}`;

        eightyPoundBags.textContent = `${Math.ceil(calculateSlabBags(cubicYards, BagSizes.EightyPoundBag))}`
    }

});