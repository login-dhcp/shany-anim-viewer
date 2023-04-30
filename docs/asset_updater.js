const { resolve } = require("path");
const { readdir } = require('fs').promises;
const fs = require("fs");

async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

;(async () => {
    var result = {};
    var filesList = [];

    for await (const f of getFiles('./spine')) {
        filesList.push(f);

        if (f.split(".")[1] != "atlas") continue;
        var str = f.split("spine/")[1];
        var values = str.split("/");

        const basedir = values[0];
        const assetType = values[1];
        const clothesID = values.slice(2, values.length-1).join("/");

        if (result[basedir] === undefined) {
            result[basedir] = {};
        }
        if (result[basedir][assetType] === undefined) {
          result[basedir][assetType] = [];
        }
        result[basedir][assetType].push(clothesID);
    }
    console.log(result);
    fs.writeFile("./asset.json",
        JSON.stringify(result, null, 3),
        function (data) {
            console.log(data);
            process.exit(0);
        }
    );
})()
