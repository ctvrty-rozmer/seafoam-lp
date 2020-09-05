/**
 * @author onecool [keynotfoundhotel@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation";
import OperationError from "../errors/OperationError";
import Utils from "../Utils";
import Gematria from "../config/Gematria.json";
/**
 * Gematria Atbash operation
 */
class GematriaAtbash extends Operation {

    /**
     * GematriaAtbash constructor
     */
    constructor() {
        super();

        this.name = "Gematria Atbash";
        this.module = "LiberPrimus";
        this.description = "CICADA 3301: Applies the 'Reverse Gematria', a.k.a. Atbash Cipher, to the text.  Input must be 'Gematria', output will be 'Gematria'. This is because applying reverse gematria to english doesn't work when going back to ciphertext. </br><code>//CIRCUMFERENCE        </br>//DEADIANEAIAIMDI        </br>//d e A D IA N EA I A I M D I        </br>//C I R C U  M F  E R E N C E</code>. Use Text Transliteration to convert your input and output.";
        this.infoURL = "https://vignette.wikia.nocookie.net/uncovering-cicada/images/6/66/Runes-warning.jpg/revision/latest?cb=20140108163159";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [{
            name: "Key Alphabet",
            type: "string",
            value: "EA IA Y AE A D OE NG L M E B T S X P EO J I N H W G C R O TH U F",
        }, {
            name: "Input Format",
            type: "option", // the argument data type, see the next section for valid types
            value: ["English", "Index", "Runic", "Prime"] // gematria primus
        }, {
            name: "Input Space Type",
            type: "option",
            value: ["SPACE", "DASH(-)", "PERIOD(.)", "COMMA", "none"]
        }];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        // const [firstArg, secondArg] = args;
        let key = args[0];
        let inputFormat = Utils.LPformat(args[1]);
        let inputSpaceDelimiter = Utils.spaceDelimiter(args[2]);

        console.log("input: " + input)
        console.log("key: " + key);
        let keyIndices = "";
        keyIndices = Utils._convertEnglish(key, "index", " ", "-");
        keyIndices = Utils._massageText(keyIndices, "-");
        keyIndices = Utils.replaceAll(keyIndices, " - ", ",");
        keyIndices = Utils.replaceAll(keyIndices, " ", "").split(",");
        keyIndices = Utils._without(keyIndices, ",");
        console.log(keyIndices);

        //CIRCUMFERENCE
        //DEADIANEAIAIMDI
        //d e A D IA N EA I A I M D I
        //C I R C U  M F  E R E N C E
        let inputIndices = "";
        let outFormat = "index";
        if (inputFormat === "letter") {
            inputIndices = Utils._convertEnglish(input, outFormat, inputSpaceDelimiter, "-");
        } else if (inputFormat === "rune") {
            inputIndices = Utils._convertGematria(input, outFormat, inputSpaceDelimiter, "-");
        } else if (inputFormat === "index") {
            inputIndices = Utils._convertIndex(input, outFormat, inputSpaceDelimiter, "-");
        }

        inputIndices = Utils._massageText(inputIndices, "-");
        inputIndices = inputIndices.split(" ");

        console.log(inputIndices);
        let output = "";
        for (let i = 0; i < inputIndices.length; i++) {
            if (keyIndices.includes(inputIndices[i])) {
                let reversedLetter = Gematria[keyIndices[inputIndices[i]]]["rune"];
                output += reversedLetter;
                console.log("Reversed letter :" + reversedLetter);
            } else {
                console.log("adding :" + inputIndices[i]);
                output += inputIndices[i];
            }
        }
        return output;
    }

    /**
     * Highlight Gematria Atbash
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
     * Highlight Gematria Atbash in reverse
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

export default GematriaAtbash;
