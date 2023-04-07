var fs = require('fs');
console.log('Incrementing build number...');
fs.readFile('src/metadata.json',function(err,content) {
    if (err) throw err;
    var metadata = JSON.parse(content);
    metadata.buildRevision = metadata.buildRevision + 1;
    fs.writeFile('src/metadata.json',JSON.stringify(metadata),function(err){
        if (err) throw err;
        console.log(`Updated build number: ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`);

        var builddata = '' + metadata.buildMajor + metadata.buildMinor + metadata.buildRevision + metadata.buildTag;
        fs.writeFile('src/builddata.txt', builddata, function(err){
            if (err) throw err;
            console.log(`deployed build commit: ${builddata}`);
        })
    })
    
});