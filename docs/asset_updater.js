var fs = require("fs");

const result = {};

fs.readdir("./spine", function(error, filelist) {
    for (file of filelist) {
        result[file] = {};
        var basedir = "./spine/" + file;
        fs.readdir(basedir + "/cb", function (error, filelist2) {
            result[file].cb = filelist2;
            fs.readdir(basedir + "/cb_costume", function (error, filelist3) {
                result[file].cb_costume = filelist3;
                fs.readdir(basedir + "/stand", function (error, filelist4) {
                    result[file].stand = filelist4;
                    fs.readdir(basedir + "/stand_costume", function (error, filelist5) {
                        result[file].stand_costume = filelist5;
                        console.log(result);
                        fs.writeFile(
                            "./asset.json",
                            JSON.stringify(result, null, 3),
                            function (data) {
                                console.log(data);
                                process.exit(0);
                            }
                        );
                    });
                });
            });
        });
    }
});
