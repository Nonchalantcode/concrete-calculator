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
    slabQuantityInput = dom.f(`${slabCalculatorParent} #slab-quantity`)! as input,
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
    footingQuantityInput = dom.f(`${footingCalculatorParent} #footing-quantity`)! as input,
    footingSubmitBtn = dom.f(`${footingCalculatorParent} #footing-calc-submit`)! as HTMLButtonElement,
    footingCalcResults = dom.f(`${footingCalculatorParent} .result`)!,
    fortyPoundBagsFooting = dom.f(`${footingCalculatorParent} .forty-pound-bags`)!,
    sixtyPoundBagsFooting = dom.f(`${footingCalculatorParent} .sixty-pound-bags`)!,
    eightyPoundBagsFooting = dom.f(`${footingCalculatorParent} .eighty-pound-bags`)!;    

/*  Column calculator selectors */

let columnCalculatorParent = "#column-calculator",
    columnDiameterInput = dom.f(`${columnCalculatorParent} #column-diameter`)! as input,
    columnHeightInput = dom.f(`${columnCalculatorParent} #column-height`)! as input,
    columnQuantityInput = dom.f(`${columnCalculatorParent} #column-quantity`)! as input,
    columnSubmitBtn = dom.f(`${columnCalculatorParent} #column-calc-submit`)! as HTMLButtonElement,
    columnCalcResults = dom.f(`${columnCalculatorParent} .result`)!,
    fortyPoundBagsColumn = dom.f(`${columnCalculatorParent} .forty-pound-bags`)!,
    sixtyPoundBagsColumn = dom.f(`${columnCalculatorParent} .sixty-pound-bags`)!,
    eightyPoundBagsColumn = dom.f(`${columnCalculatorParent} .eighty-pound-bags`)!;

/* Steps calculator selectors */

let stepCalculatorParent = "#steps-calculator",
    stepPlatformDepth = dom.f(`${stepCalculatorParent} #platform-depth`)! as input,
    stepRiseHeight = dom.f(`${stepCalculatorParent} #steps-height`)! as input,
    stepRunDepth = dom.f(`${stepCalculatorParent} #steps-run`)! as input,
    stepWidth = dom.f(`${stepCalculatorParent} #steps-width`)! as input,
    stepQuantity = dom.f(`${stepCalculatorParent} #steps-quantity`)! as input,
    stepSubmitBtn = dom.f(`${stepCalculatorParent} #steps-calc-submit`)!,
    stepCalcResults = dom.f(`${stepCalculatorParent} .result`)!,
    fortyPoundBagsStep = dom.f(`${stepCalculatorParent} .forty-pound-bags`)!,
    sixtyPoundBagsStep = dom.f(`${stepCalculatorParent} .sixty-pound-bags`)!,
    eightyPoundBagsStep = dom.f(`${stepCalculatorParent} .eighty-pound-bags`)!;

function sumFirstN(n: number): number{
    return n * (n + 1) / 2;
}

function displayBagSizeResults(fortyContainer: Element, sixtyContainer: Element, eightyContainer: Element, volume: number): void{
    let [f, s, e] = 
    [BagSizes.FortyPoundBag, BagSizes.SixtyPoundBag, BagSizes.EightyPoundBag]
    .map(bag => Math.ceil(calculateBags(volume, bag)));

    fortyContainer.textContent = `${f}`;
    sixtyContainer.textContent = `${s}`;
    eightyContainer.textContent = `${e}`;
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

function calculateSlab(thicknessInput: input, widthInput: input, lengthInput: input, resultsBox: Element, quantity: input, type: string = 'slab'): number | undefined{
    let thickness, width, length, results;
    let slabsQuantity: number;
    
        if(quantity.value == ""){
            slabsQuantity = 1;
        }else{
            if(isValidInput(quantity.value)){
                slabsQuantity = parseInput(quantity.value);
            }else{
                window.alert(`Enter a valid ${type} quantity`);
                return;
            }
        }
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
        results = cubicFeetToCubicYards(width * length * inchesToFeet(thickness)) * slabsQuantity;
        resultsBox.textContent = results.toFixed(4);
        return results;
}

function calculateColumn(diameterInput: input, heightInput: input, resultsBox: Element, quantity: input): number | undefined{
    let radius: number,
        height: number,
        result: number;
    let columnsQuantity: number;
    const PI = Math.PI;

    if(quantity.value == ""){
        columnsQuantity = 1;
    }else{
        if(isValidInput(quantity.value)){
            columnsQuantity = parseInput(quantity.value);
        }else{
            alert(`Enter a valid value for quantity.`);
            return;
        }
    }
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
    result = cubicFeetToCubicYards(PI * Math.pow(radius, 2) * height) * columnsQuantity;
    resultsBox.textContent = `${result.toFixed(4)}`
    return  result;
}

function calculateSteps(steps: input, height: input, width: input, platformDepth: input, runDepth: input, resultsBox: Element): number | undefined{
    // base case is where steps = 1
    let numberOfSteps: number,
        stepsHeight: number,
        stepsWidth: number,
        stepsPlatformDepth: number,
        stepsRunDepth: number;

    let calculation: number;

    if(isValidInput(steps.value)){
        numberOfSteps = parseInput(steps.value);
    }else{
        alert("Enter a valid number of steps");
        return;
    }
    if(isValidInput(height.value)){
        stepsHeight = inchesToFeet(parseInput(height.value));
    }else{
        alert("Enter a valid value for height");
        return;
    }
    if(isValidInput(width.value)){
        stepsWidth = parseInput(width.value);
    }else{
        alert("Enter a valid value for width");
        return;
    }
    if(isValidInput(platformDepth.value)){
        stepsPlatformDepth = inchesToFeet(parseInput(platformDepth.value));
    }else{
        alert("Enter a valid value for platform depth");
        return;
    }
    if(isValidInput(runDepth.value)){
        stepsRunDepth = inchesToFeet(parseInput(runDepth.value));
    }else{
        alert("Enter a valid value for run depth");
        return;
    }
    if(numberOfSteps == 1){
        calculation = cubicFeetToCubicYards(stepsHeight * stepsWidth * stepsPlatformDepth);
        resultsBox.textContent = `${calculation.toFixed(4)}`;
        return calculation;
    }
    calculation = (numberOfSteps * stepsHeight * stepsWidth * stepsPlatformDepth) + 
                    (stepsHeight * stepsWidth * stepsRunDepth * (sumFirstN(numberOfSteps - 1)));

    calculation = cubicFeetToCubicYards(calculation);
    resultsBox.textContent = `${calculation.toFixed(4)}`;
    return calculation;
}

slabSubmitBtn.addEventListener('click', ev => {
    let cubicYards = calculateSlab(slabThicknessInput, slabWidthInput, slabLengthInput, slabCalcResults, slabQuantityInput);
    if(cubicYards == undefined) return;
    displayBagSizeResults(fortyPoundBagsSlab, sixtyPoundBagsSlab, eightyPoundBagsSlab, cubicYards);
});

footingSubmitBtn.addEventListener('click', ev => {
    let cubicYards = calculateSlab(footingThicknessInput, footingWidthInput, footingLengthInput, footingCalcResults, footingQuantityInput, 'footing');
    if(cubicYards == undefined) return;
    displayBagSizeResults(fortyPoundBagsFooting, sixtyPoundBagsFooting, eightyPoundBagsFooting, cubicYards);
})

columnSubmitBtn.addEventListener("click", ev => {
    let concreteCubicYards = calculateColumn(columnDiameterInput, columnHeightInput, columnCalcResults, columnQuantityInput);
    if(concreteCubicYards == undefined) return;
     displayBagSizeResults(fortyPoundBagsColumn, sixtyPoundBagsColumn, eightyPoundBagsColumn, concreteCubicYards);

});

stepSubmitBtn.addEventListener('click', ev => {
    let calcResults = calculateSteps(stepQuantity, stepRiseHeight, stepWidth, stepPlatformDepth, stepRunDepth, stepCalcResults);
    if (calcResults == undefined) return;
    displayBagSizeResults(fortyPoundBagsStep, sixtyPoundBagsStep, eightyPoundBagsStep, calcResults);
})