let CowTranslator = {

  TranslationResult: class {
    text = ''; // Human language
    cow = ''; // Cow language
    error = ''; // Error / warning message
    warning = false; // If any warning was found
    success = false; // If the translation was successful
  },

  SUPPORTED_CHARS: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'cV', 'W', 'X', 'Y', 'Z', ' ', '.', ',', '!', '?', ':', ';', '"', '\'', '`', '~', '\\', '/', '|', '=', '-', '_', '+', '(', ')', '[', ']', '{', '}', '\n', '\t', '\r' ],

  MOO: 'moooooo',


  /*
   * This function will
   *
   * convert a string to a binary string (uppercase : 1; lowercase : 0)
   * => "mooOoOo"
   *        ↓ ↓
   * => "0001010"
   */
  stringToBinString: function(input) {
    let output = '';

    input.split('').forEach((char) => {
      output += char.toUpperCase() === char ? '1' : '0';
      /*
       * Char.toUpperCase() === char
       * checks if the char is uppercase
       */
    })
    return output;
  },

  /*
   * This function will
   *
   * convert a binary string to a decimal number
   * => "0001010"
   * => 10
   */
  binStringToDecimal: function(input) {
    return parseInt(input, 2);
  },


  /*
   * This function will :
   *
   * step 1 - convert a string to a binary string (uppercase : 1; lowercase : 0)
   * => "mooOoOo"
   *        ↓ ↓
   * => "0001010"
   *
   * step 2 - Then convert the binary string to a decimal number
   * => "0001010"
   * => 10
   *
   * step 3 - add the specified number to the decimal number
   * => 10 + 5
   * => 15
   *
   * step 4 - convert back the decimal number to a binary string
   * => 15
   * => "0001111"
   *
   * step 5 - and finally convert the binary string to the origin string but with the specified upper/lowercase
   * => "0001111"
   *        ↓↓↓↓
   * => "mooOOOO"
   */
  addToStringLikeBinary: function(input, toAdd) {
    let output = '';
    let inputAsBin;
    let inputAsDecimal;
    let outputAsBin;

    // Step 1

    inputAsBin = this.stringToBinString(input);

    // Step 2

    inputAsDecimal = this.binStringToDecimal(inputAsBin);

    // Step 3

    inputAsDecimal += toAdd;

    // Step 4

    outputAsBin = inputAsDecimal.toString(2);

    while (outputAsBin.length < inputAsBin.length) {
      outputAsBin = '0' + outputAsBin;
    }
    // Step 5
    for (let i = 0; i < outputAsBin.length; i++) {
      let char = input[i];
      let currentBit = outputAsBin[i];

      if (currentBit === '1') {
        output += char.toUpperCase();
      } else {
        output += char.toLowerCase();
      }
    }

    return output;
  },


  textToCow: function(input) {

    let result = new this.TranslationResult();
    result.text = input;
    if (!input) {
      console.warn('No text specified');
      result.error = 'No text specified';

      return result;
    }

    input = input.trim();


    let inputAsNumbers = '';
    let errors = 0;

    input.split('').forEach(function(char) {

      if (this.SUPPORTED_CHARS.indexOf(char) === -1) {
        console.warn('Unsupported character: ' + char);
        result.warning = true;
        result.error = 'Unsupported character: ' + char;
        errors++;
        return;
      }

      let charAsNumber = (this.SUPPORTED_CHARS.indexOf(char) >= 10 ? '' : '0') + this.SUPPORTED_CHARS.indexOf(char);

      inputAsNumbers += charAsNumber;
    }, this)

    if (errors === input.length) {
      result.error = 'No supperted characters found';
      return result;
    }


    let inputAsMoos = '';

    inputAsNumbers.match(/.{1,2}/g).forEach(function(number) {
      let numberAsMoo = this.addToStringLikeBinary(this.MOO, parseInt(number));
      inputAsMoos += numberAsMoo + ' ';
    }, this)


    result.cow = inputAsMoos.trim();
    result.success = true;

    return result;
  },

  cowToText: function(input) {


    let result = new this.TranslationResult();
    result.cow = input;

    if (!input) {
      console.warn('No text specified');
      result.error = 'No text specified';

      return result;
    }

    input = input.trim();


    let moosVec = input.split(' ');

    let inputAsText = '';

    let errors = 0;

    moosVec.forEach(moo => {
      if (moo.toLowerCase() !== this.MOO) {
        errors++;
        console.warn('Invalid moo: ' + moo);
        result.warning = true;
        result.error = 'Invalid moo: ' + moo;

        return;
      }

      let mooAsBin = this.stringToBinString(moo);
      let mooAsDecimal = this.binStringToDecimal(mooAsBin);

      if (this.SUPPORTED_CHARS[mooAsDecimal] === undefined) {
        errors++;
        console.warn('Unsupported char : ' + moo);
        result.warning = true;
        result.error = 'Unsupported char : ' + moo;

        return;
      }

      inputAsText += this.SUPPORTED_CHARS[mooAsDecimal];

    }, this);

    if (errors === moosVec.length) {
      result.error = 'No supperted characters found';
      return result;

    }
    result.text = inputAsText;
    result.success = true;


    return result;
  }
}


if (typeof module !== 'undefined') {
  module.exports = CowTranslator;
}
