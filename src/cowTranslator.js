const SUPPORTED_CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '.', ',', '!', '?', ':', ';', '"', '\'', '`',
    '~', '\\', '/', '|', '=', '-', '_', '+', '(', ')', '[', ']', '{', '}', '\n', '\t', '\r',
];

const MOO = "moooooo"

function stringToBinString(input) {
    var output = "";

    input.split("").forEach(function(char) {
        output += char.toUpperCase() == char ? "1" : "0";
    })

    return output;
}

function binStringToDecimal(input) {
    return parseInt(input, 2);
}


function addToStringLikeBinary(input, toAdd) {
    var output = "";
    var inputAsBin;
    var inputAsDecimal;
    var outputAsBin;

    inputAsBin = stringToBinString(input);

    inputAsDecimal = binStringToDecimal(inputAsBin);

    inputAsDecimal += toAdd;


    outputAsBin = inputAsDecimal.toString(2);

    while (outputAsBin.length < inputAsBin.length) {
        outputAsBin = "0" + outputAsBin;
    }
    for (var i = 0; i < outputAsBin.length; i++) {
        var char = input[i];
        var currentBit = outputAsBin[i];

        if (currentBit == "1") {
            output += char.toUpperCase();
        } else {
            output += char.toLowerCase();
        }
    }

    return output;
}

function textToCow(input) {

    input = input.trim();

    if (!input || input.length == 0) {
        console.warn("No text specified as argument");
        return "";
    }

    var inputAsNumbers = "";
    var errors = 0;

    input.split("").forEach(function(char) {
        if (SUPPORTED_CHARS.indexOf(char) == -1) {
            console.warn("Unsupported character: " + char);
            errors++;
            return;
        }

        var charAsNumber = (SUPPORTED_CHARS.indexOf(char) >= 10 ? "" : "0") + SUPPORTED_CHARS.indexOf(char);

        inputAsNumbers += charAsNumber;
    })

    if (errors == input.length)
        return '';


    var inputAsMoos = "";

    inputAsNumbers.match(/.{1,2}/g).forEach(function(number) {
        var numberAsMoo = addToStringLikeBinary(MOO, parseInt(number));
        inputAsMoos += numberAsMoo + " ";
    })

    return inputAsMoos.trim();
}

function cowToText(input) {

    input = input.trim();

    if (!input || input.length == 0) {
        console.warn("No text specified as argument");
        return "";
    }


    var moosVec = input.split(" ");

    var inputAsText = "";

    var errors = 0;

    moosVec.forEach(moo => {
        if (moo.toLowerCase() != MOO) {
            errors++;
            console.warn("Invalid moo: " + moo);
            return;
        }

        var mooAsBin = stringToBinString(moo);
        var mooAsDecimal = binStringToDecimal(mooAsBin);

        if (SUPPORTED_CHARS[mooAsDecimal] == undefined) {
            errors++;
            console.warn("Unsupported char : " + moo);
            return;
        }

        inputAsText += SUPPORTED_CHARS[mooAsDecimal];

    })

    if (errors == moosVec.length)
        return '';

    return inputAsText;
}