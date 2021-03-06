/**
* THIS FILE IS AUTOMATICALLY GENERATED BY src/core/config/scripts/generateConfig.mjs
*
* @author n1474335 [n1474335@gmail.com]
* @copyright Crown Copyright 2019
* @license Apache-2.0
*/
import Bzip2Decompress from "../../operations/Bzip2Decompress";
import Gunzip from "../../operations/Gunzip";
import Gzip from "../../operations/Gzip";
import RawDeflate from "../../operations/RawDeflate";
import RawInflate from "../../operations/RawInflate";
import Tar from "../../operations/Tar";
import Untar from "../../operations/Untar";
import Unzip from "../../operations/Unzip";
import Zip from "../../operations/Zip";
import ZlibDeflate from "../../operations/ZlibDeflate";
import ZlibInflate from "../../operations/ZlibInflate";

const OpModules = typeof self === "undefined" ? {} : self.OpModules || {};

OpModules.Compression = {
    "Bzip2 Decompress": Bzip2Decompress,
    "Gunzip": Gunzip,
    "Gzip": Gzip,
    "Raw Deflate": RawDeflate,
    "Raw Inflate": RawInflate,
    "Tar": Tar,
    "Untar": Untar,
    "Unzip": Unzip,
    "Zip": Zip,
    "Zlib Deflate": ZlibDeflate,
    "Zlib Inflate": ZlibInflate,
};

export default OpModules;
