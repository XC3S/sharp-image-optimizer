const sharp = require('sharp');
const fs = require('fs');

const config = {
    targets: [
        {
            dirname: 'teaserDesktop',
            width: 1920,
            height: 750,
            quality: 90,
            progressive: true 
        },
        {
            dirname: 'teaserMobile',
            width: 500,
            height: 376,
            quality: 90,
            progressive: true 
        }
    ]
}


fs.readdir('images\\master', function(err, items) {
    if(err){
        console.error('[ERROR] ' + err);
        return
    }

    console.log('images:',items.length,'\n');

    config.targets.forEach(target => {
        items.forEach(item => {
            targetDir = 'images\\' + target.dirname;
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir);
            }
            sharp('images\\master\\' + item)
                .resize(target.width,target.height)
                .removeAlpha()
                .jpeg({ 
                    quality: target.quality,
                    progressive: target.progressive
                })
                .toFile('images\\' + target.dirname + '\\' + item, (err, info) => { 
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