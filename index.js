const sharp = require('sharp');
const fs = require('fs');

const config = {
    targets: [
        {
            dirname: 'home-stage-desktop',
            width: 1920,
            height: 750,
            quality: 90,
            progressive: true 
        },
        {
            dirname: 'home-stage-mobile',
            width: 767,
            height: 376,
            quality: 90,
            progressive: true 
        },
        {
            dirname: 'teaser-stage-desktop',
            width: 1920,
            height: 430,
            quality: 90,
            progressive: true 
        },
        {
            dirname: 'teaser-stage-mobile',
            width: 767,
            height: 430,
            quality: 90,
            progressive: true 
        }
    ]
}


fs.readdir('images/master', function(err, items) {
    if(err){
        console.error('[ERROR] ' + err);
        return
    }

    console.log('images:',items.length,'\n');

    config.targets.forEach(target => {
        items.forEach(item => {
            targetDir = 'images/' + target.dirname;
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir);
            }
            sharp('images/master/' + item)
                .resize(target.width,target.height)
                .removeAlpha()
                .jpeg({ 
                    quality: target.quality,
                    progressive: target.progressive
                })
                .toFile('images/' + target.dirname + '/' + item.replace(/\.[^.]+$/, '.jpeg'), (err, info) => { 
                    if(err){
                        console.error('[ERROR]', err);
                    }
                    else {
                        console.log('[INFO]',item ,"=>" ,target.dirname ,info);
                    }
                });
        });
    });
});


function getFileExtension(filename) {
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}