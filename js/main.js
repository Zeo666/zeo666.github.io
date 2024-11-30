$(function () {

    function handleFiles(id, files) {
        for (var i = 0; i < files.length; i++) {

            var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
                file = files.item(i),
                chunkSize = 2097152,                             // Read in chunks of 2MB
                chunks = Math.ceil(file.size / chunkSize),
                currentChunk = 0,
                spark = new SparkMD5.ArrayBuffer(),
                fileReader = new FileReader();

            fileReader.onload = function (e) {
                //console.log('read chunk nr', currentChunk + 1, 'of', chunks);
                spark.append(e.target.result);                   // Append array buffer
                currentChunk++;

                if (currentChunk < chunks) {
                    loadNext();
                } else {
                    var hash = spark.end();

                    //console.log('finished loading');
                    //console.info('computed hash', hash);  // Compute hash

                    $(id + "-md5").html(hash);
                }
            };

            fileReader.onerror = function () {
                console.warn('oops, something went wrong.');
            };

            function loadNext() {
                var start = currentChunk * chunkSize,
                    end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

                fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
            }

            loadNext();
        }
    }

    $("input[type=file]").change(function () {
        handleFiles("#" + $(this).attr('id'), this.files);
    });

    $("#hatform").on("submit", function (event) {
        //alert("Handler for `submit` called.");

        var author = $("#author").val();
        var name = $("#name").val();
        var package = $("#package").val();
        var adaptive = $("#adaptive").is(':checked');
        var bounce = $("#bounce").is(':checked');
        var behind = $("#behind").is(':checked');

        var main_image = $("#main-image").val();
        var main_image_md5 = $("#main-image-md5").html();
        var flip_image = $("#flip-image").val();
        var flip_image_md5 = $("#flip-image-md5").html();
        var back_image = $("#back-image").val();
        var back_image_md5 = $("#back-image-md5").html();
        var backflip_image = $("#backflip-image").val();
        var backflip_image_md5 = $("#backflip-image-md5").html();
        var climb_image = $("#climb-image").val();
        var climb_image_md5 = $("#climb-image-md5").html();

        var myObj = {};
        myObj["author"] = author;
        myObj["name"] = name;
        myObj["package"] = package;

        if (adaptive == true)
            myObj["adaptive"] = adaptive;

        if (bounce == true)
            myObj["bounce"] = bounce;

        if (behind == true)
            myObj["behind"] = behind;

        myObj["resource"] = main_image.replace('C:\\fakepath\\', '');
        myObj["reshasha"] = main_image_md5;

        ////.replace('C:\\fakepath\\', '');

        if (flip_image != "") {
            myObj["flipresource"] = flip_image.replace('C:\\fakepath\\', '');
            myObj["reshashf"] = flip_image_md5;
        }

        if (back_image != "") {
            myObj["backresource"] = back_image.replace('C:\\fakepath\\', '');
            myObj["reshashb"] = back_image_md5;
        }

        if (backflip_image != "") {
            myObj["backflipresource"] = backflip_image.replace('C:\\fakepath\\', '');
            myObj["reshashbf"] = backflip_image_md5;
        }

        if (climb_image != "") {
            myObj["climbresource"] = climb_image.replace('C:\\fakepath\\', '');
            myObj["reshashc"] = climb_image_md5;
        }

        const container = document.createElement("div");
        const pre = document.createElement("pre");
        pre.className = "line-numbers";

        const code = document.createElement("code");
        code.className = "language-json";
        code.textContent = JSON.stringify(myObj, null, '\t');

        pre.appendChild(code);
        container.appendChild(pre);

        $("#json").html(container);

        Prism.highlightAll();

        event.preventDefault();
    });

    $("#visorform").on("submit", function (event) {
        //alert("Handler for `submit` called.");

        var author = $("#author").val();
        var name = $("#name").val();
        var package = $("#package").val();
        var adaptive = $("#adaptive").is(':checked');

        var main_image = $("#main-image").val();
        var main_image_md5 = $("#main-image-md5").html();
        var flip_image = $("#flip-image").val();
        var flip_image_md5 = $("#flip-image-md5").html();

        var myObj = {};
        myObj["author"] = author;
        myObj["name"] = name;
        myObj["package"] = package;

        if (adaptive == true)
            myObj["adaptive"] = adaptive;

        myObj["resource"] = main_image.replace('C:\\fakepath\\', '');
        myObj["reshasha"] = main_image_md5;

        ////.replace('C:\\fakepath\\', '');

        if (flip_image != "") {
            myObj["flipresource"] = flip_image.replace('C:\\fakepath\\', '');
            myObj["reshashf"] = flip_image_md5;
        }

        const container = document.createElement("div");
        const pre = document.createElement("pre");
        pre.className = "line-numbers";

        const code = document.createElement("code");
        code.className = "language-json";
        code.textContent = JSON.stringify(myObj, null, '\t');

        pre.appendChild(code);
        container.appendChild(pre);

        $("#json").html(container);

        Prism.highlightAll();

        event.preventDefault();
    });

    $("#nameplateform").on("submit", function (event) {
        //alert("Handler for `submit` called.");

        var author = $("#author").val();
        var name = $("#name").val();
        var package = $("#package").val();

        var main_image = $("#main-image").val();
        var main_image_md5 = $("#main-image-md5").html();

        var myObj = {};
        myObj["author"] = author;
        myObj["name"] = name;
        myObj["package"] = package;

        myObj["resource"] = main_image.replace('C:\\fakepath\\', '');
        myObj["reshasha"] = main_image_md5;

        ////.replace('C:\\fakepath\\', '');

        const container = document.createElement("div");
        const pre = document.createElement("pre");
        pre.className = "line-numbers";

        const code = document.createElement("code");
        code.className = "language-json";
        code.textContent = JSON.stringify(myObj, null, '\t');

        pre.appendChild(code);
        container.appendChild(pre);

        $("#json").html(container);

        Prism.highlightAll();

        event.preventDefault();
    });
});