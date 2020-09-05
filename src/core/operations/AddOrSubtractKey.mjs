/**
 * @author onecool [keynotfoundhotel@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation";
import OperationError from "../errors/OperationError";
import Utils from "../Utils";
import TextTransliteration from "./TextTransliteration";
/**
 * Add or Subtract Key operation
 */
class AddOrSubtractKey extends Operation {

    /**
     * AddOrSubtractKey constructor
     */
    constructor() {
        super();

        this.name = "Add or Subtract Key";
        this.module = "LiberPrimus";
        this.description = "CICADA 3301: Operate on text based on the Gematria Primus.  Valid inputs are Gematria(\u16a2\u16b7\u16aa), Index(0..28), English(F,U,TH,...) and outputs the same.  Can add or subtract values based on the key.";
        this.infoURL = "http://cicada3301.boards.net/thread/38/decrypt-runes-vigen-re-cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
          {
              name: "Input Format",
              type: "option", // the argument data type, see the next section for valid types
              value: ["English", "Index", "Runic", "Prime"] // gematria primus
          },
          {
              name:"Input Space Type",
              type:"option",
              value: ["SPACE", "DASH(-)", "PERIOD(.)", "COMMA", "none"]
          },
          {
              name: "Output Format",
              type: "option", // the argument data type, see the next section for valid types
              value: ["English", "Index", "Runic", "Prime"] // gematria primus
          },
          {
              name:"Out. Space Type",
              type:"option",
              value:  ["SPACE", "DASH(-)", "PERIOD(.)", "COMMA", "none"]
          },
          {
              name: "Operation",
              type: "option",
              value: ["Add","Subtract"]
          },
          {
              name: "Key",
              type: "toggleString",
              value: "",
              toggleValues: ["English", "Index", "Runic", "Prime"] // gematria primus
          }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {

              let inputFormat = Utils.LPformat(args[0]);
              let inputSpaceDelimiter = Utils.spaceDelimiter(args[1]);

              let outputFormat = Utils.LPformat(args[2]);
              let outputSpaceDelimiter = Utils.spaceDelimiter(args[3]);

              let operation = Utils.LPoperation(args[4]);

              let keyFormat = Utils.LPformat(args[5].option);
              let key = args[5].string;



              /*
              Convert everything to same language (index)
              */
              let outFormat = "index";
              let formattedInput = "";
              let formattedKey = "";
              if (inputFormat=== "letter"){
                  formattedInput = Utils._convertEnglish(input, outFormat, inputSpaceDelimiter, "-");
              } else if (inputFormat === "rune"){
                  formattedInput = Utils._convertGematria(input, outFormat, inputSpaceDelimiter, "-");
              } else if (inputFormat === "index"){
                  formattedInput = Utils._convertIndex(input, outFormat, inputSpaceDelimiter, "-");
              }


              if (keyFormat === "letter"){
                  formattedKey = Utils._convertEnglish(key, outFormat, inputSpaceDelimiter, "-");
              } else if (keyFormat === "rune"){
                  formattedKey = Utils._convertGematria(key, outFormat, inputSpaceDelimiter, "-");
              } else if (keyFormat === "index"){
                  formattedKey = Utils._convertIndex(key, outFormat, inputSpaceDelimiter, "-");
              }

              /* Add key + index */
              let returnValIndices = [];
              if (formattedKey.length === 0){
                  return "Enter a valid key";
              }

              formattedInput = Utils._massageText(formattedInput, "-");
              formattedKey = Utils._massageText(formattedKey, "-");

              formattedInput = formattedInput.split(" ");
              formattedKey = formattedKey.split(" ");
              for (let i = 0; i < formattedInput.length; i){
                  if (formattedInput[i] === "-"){
                      returnValIndices.push("-");
                      i++;
                      continue;
                  }
                  for (let j = 0; j < formattedKey.length; j++){
                      if (i >= formattedInput.length){
                          break;
                      } else {
                          let keyIndex = formattedKey[j];
                          let validKeyIndex = !isNaN(parseFloat(keyIndex)) && isFinite(keyIndex);

                          let inputIndex = formattedInput[i];
                          let validInputIndex = Utils._isValid(formattedInput[i]);

                          if (formattedInput[i] === "-" || formattedInput[i] === "29"){
                              returnValIndices.push("-");
                              i++;
                              j--;
                              continue;
                          }

                          if (validInputIndex === false){
                              returnValIndices.push(formattedInput[i]);
                              i++;
                              j--; // keep key in place
                              continue;
                          }

                          if (validKeyIndex === false){
                              continue; //if we hit punctuation, continue without advancing key.  If you'd like to advance key on input, change this.
                          }

                          let indexTotal = 0;
                          if (operation === "_add"){
                              indexTotal = Utils._add(parseInt(inputIndex), parseInt(keyIndex));
                          } else {
                              indexTotal = Utils._sub(parseInt(inputIndex), parseInt(keyIndex));
                          }
                          let modIndex = Utils._mod(indexTotal, 29);
                          returnValIndices.push(modIndex);
                          i++;
                      }
                  }

              }

              returnValIndices = returnValIndices.join(" ");
              let returnVal = returnValIndices;
              if (outputFormat!=="index"){
                  returnVal = Utils._convertIndex(returnValIndices, outputFormat, inputSpaceDelimiter, outputSpaceDelimiter);
              }
              return returnVal;
    }

    /**
     * Highlight Add or Subtract Key
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
     * Highlight Add or Subtract Key in reverse
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

export default AddOrSubtractKey;
