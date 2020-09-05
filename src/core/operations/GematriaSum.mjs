/**
 * @author onecool [keynotfoundhotel@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation";
import OperationError from "../errors/OperationError";
import Gematria from "../config/Gematria.json";

/**
 * gematriaSum operation
 */
class GematriaSum extends Operation {

    /**
     * GematriaSum constructor
     */
    constructor() {
        super();

        this.name = "Gematria Sum";
        this.module = "LiberPrimus";
        this.description = "CICADA 3301: Converts english words into their 'Gematria' sum according to the prime values of the Gematria Primus. If you'd like to find the Gematria Sum of a phrase, remove all the spaces.  Example:  PATIENCEISAVIRTUE  will sum to 761";
        this.infoURL = "http://uncovering-cicada.wikia.com/wiki/Gematria_Primus";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    _lookup(input, outputFormat) {

        let returnVal = input;
        if (Gematria[input]) {
            returnVal = Gematria[input][outputFormat];
        }
        return returnVal;
    }

    _massageText(input, spaceDelimiter) {
        input = input.toUpperCase();
        input = input.replace(/v/gi, "U");
        input = input.replace(/q/gi, "CU");
        input = input.replace(new RegExp(/[.\.,\/ -\"\n\r\t;:<>\?\\\'\[\]\{\}]/, "g"), " $& ");
        input = input.replace(new RegExp(" {2}", "g"), " ");

        return input;

    }

    //Takes an english word as input, generates the gematria sum as the output
    _englishToGematriaSum(word) {
        var re = new RegExp('[a-zA-Z]');
        if (word.match(re)) {
            let outputFormat = "prime";
            let branchLetters = ["T", "E", "O", "I", "N", "A"];
            let doubleLetters = ["TH", "EA", "AE", "EO", "OE", "IA", "IO", "NG"];
            let sum = 0;
            for (let i = 0; i < word.length; i++) {
                let returnVal = "";
                let letter = word[i];
                if (branchLetters.indexOf(letter) !== -1) { //Consider looking at the next letters
                    if (i + 3 <= word.length) { //ING
                        let threegram = word.substring(i, i + 3);
                        let twogram = word.substring(i, i + 2);
                        if (threegram === "ING") {
                            returnVal += this._lookup(threegram, outputFormat);
                            i += 2;
                        } else if (doubleLetters.indexOf(twogram) !== -1) {
                            returnVal += this._lookup(twogram, outputFormat);
                            i += 1;
                        } else {
                            returnVal += this._lookup(letter, outputFormat);
                        }
                    } else if (i + 2 <= word.length) {
                        let twogram = word.substring(i, i + 2);
                        if (doubleLetters.indexOf(twogram) !== -1) {
                            returnVal += this._lookup(twogram, outputFormat);
                            i += 1;
                        } else {
                            returnVal += this._lookup(letter, outputFormat);
                        }
                    } else {
                        returnVal += this._lookup(letter, outputFormat);
                    }
                } else {
                    returnVal += this._lookup(letter, outputFormat);
                }
                sum += parseInt(returnVal);
            }
            return sum;
        }
        return word; //if not letters, just return it
    }
    _sumGematriaWords(input) {
        let returnVal = "";
        input = this._massageText(input, "SPACE");
        let words = input.split(" ");
        let outputWords = [];
        let self = this;
        words.forEach(function(word) {
            if (word !== "") {
                let gematriaSum = self._englishToGematriaSum(word);
                outputWords.push(gematriaSum);
            }
        });
        returnVal = outputWords.join(" ");
        return returnVal;
    }


    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        // const [firstArg, secondArg] = args;
        let returnVal = "";
      //  console.log(JSON.stringify(Gematria));
        returnVal = this._sumGematriaWords(input);
        return returnVal;
        throw new OperationError("Test");
    }

    /**
     * Highlight gematriaSum
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight gematriaSum in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default GematriaSum;
