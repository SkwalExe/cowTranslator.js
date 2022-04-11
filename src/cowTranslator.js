let cowTranslator = class {

    static translationResult = class {
        text = ""; // human language
        cow = ""; // cow language
        error = ""; // error / warning message
        warning = false; // if any warning was found
        success = false; // if the translation was successful
    }

    static SUPPORTED_CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'cV', 'W', 'X', 'Y', 'Z', ' ', '.', ',', '!', '?', ':', ';', '"', '\'', '`',
        '~', '\\', '/', '|', '=', '-', '_', '+', '(', ')', '[', ']', '{', '}', '\n', '\t', '\r',
    ];

    static MOO = "moooooo"


    // This function will
    //
    // convert a string to a binary string (uppercase : 1; lowercase : 0)
    // => "mooOoOo"
    //        ↓ ↓
    // => "0001010"
    static stringToBinString(input) {
        var output = "";

        input.split("").forEach(function(char) {
            output += char.toUpperCase() == char ? "1" : "0";
            // char.toUpperCase() == char
            // checks if the char is uppercase
        })
        return output;
    }

    // This function will
    //
    // convert a binary string to a decimal number
    // => "0001010"
    // => 10
    static binStringToDecimal(input) {
        return parseInt(input, 2);
    }


    // This function will :
    //
    // step 1 - convert a string to a binary string (uppercase : 1; lowercase : 0)
    // => "mooOoOo"
    //        ↓ ↓
    // => "0001010"
    //
    // step 2 - Then convert the binary string to a decimal number
    // => "0001010"
    // => 10
    //
    // step 3 - add the specified number to the decimal number
    // => 10 + 5
    // => 15
    //
    // step 4 - convert back the decimal number to a binary string
    // => 15
    // => "0001111"
    //
    // step 5 - and finally convert the binary string to the origin string but with the specified upper/lowercase
    // => "0001111"
    //        ↓↓↓↓
    // => "mooOOOO"
    static addToStringLikeBinary(input, toAdd) {
        var output = "";
        var inputAsBin;
        var inputAsDecimal;
        var outputAsBin;

        // step 1

        inputAsBin = this.stringToBinString(input);

        // step 2

        inputAsDecimal = this.binStringToDecimal(inputAsBin);

        // step 3

        inputAsDecimal += toAdd;

        // step 4

        outputAsBin = inputAsDecimal.toString(2);

        while (outputAsBin.length < inputAsBin.length) {
            outputAsBin = "0" + outputAsBin;
        }
        // step 5
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



    static textToCow(input) {

        var result = new this.translationResult();
        result.text = input;
        if (!input) {
            console.warn("No text specified");
            result.error = "No text specified";

            return result;
        }

        input = input.trim();


        var inputAsNumbers = "";
        var errors = 0;

        input.split("").forEach(function(char) {

            if (this.SUPPORTED_CHARS.indexOf(char) == -1) {
                console.warn("Unsupported character: " + char);
                result.warning = true;
                result.error = "Unsupported character: " + char;
                errors++;
                return;
            }

            var charAsNumber = (this.SUPPORTED_CHARS.indexOf(char) >= 10 ? "" : "0") + this.SUPPORTED_CHARS.indexOf(char);

            inputAsNumbers += charAsNumber;
        }, this)

        if (errors == input.length) {
            result.error = "No supperted characters found";
            return result;
        }


        var inputAsMoos = "";

        inputAsNumbers.match(/.{1,2}/g).forEach(function(number) {
            var numberAsMoo = this.addToStringLikeBinary(this.MOO, parseInt(number));
            inputAsMoos += numberAsMoo + " ";
        }, this)


        result.cow = inputAsMoos.trim();
        result.success = true;

        return result;
    }

    static cowToText(input) {


        var result = new this.translationResult();
        result.cow = input;

        if (!input) {
            console.warn("No text specified");
            result.error = "No text specified";

            return result;
        }

        input = input.trim();



        var moosVec = input.split(" ");

        var inputAsText = "";

        var errors = 0;

        moosVec.forEach(moo => {
            if (moo.toLowerCase() != this.MOO) {
                errors++;
                console.warn("Invalid moo: " + moo);
                result.warning = true;
                result.error = "Invalid moo: " + moo;

                return;
            }

            var mooAsBin = this.stringToBinString(moo);
            var mooAsDecimal = this.binStringToDecimal(mooAsBin);

            if (this.SUPPORTED_CHARS[mooAsDecimal] == undefined) {
                errors++;
                console.warn("Unsupported char : " + moo);
                result.warning = true;
                result.error = "Unsupported char : " + moo;

                return;
            }

            inputAsText += this.SUPPORTED_CHARS[mooAsDecimal];

        }, this)

        if (errors == moosVec.length) {
            result.error = "No supperted characters found";
            return result;

        }
        result.text = inputAsText;
        result.success = true;


        return result;
    }
}