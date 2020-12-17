'use strict';
// load node standard libraries for filesystem, path and utils
const fs = require('fs');
const path = require('path');
const util = require('util');
// install node package from https://github.com/reg-viz/img-diff-js
const { imgDiff } = require("img-diff-js");
// create log file for our log function, the falg 'w' helps us to overwrite the log every time we run the script (Use 'a' if you want to keep the log file)
let logFile = fs.createWriteStream('log.txt', { flags: 'w' }); 
// create log function to log infos, without spamming the console output
function log(message) {
    logFile.write(util.format.apply(null, arguments) + '\n');
}
// get the current directory and create path for the 
const scriptDir = __dirname;
const newFolder = `${path.join(scriptDir, '/new')}`;
const orgFolder = `${path.join(scriptDir, '/org/')}`;
const diffFolder = `${path.join(scriptDir, '/diff/')}`;
// create some temporary variables for statistics at the end
let numberOfImages = 0;
let numberOfDifferentFiles = 0;
let numberOfSameFiles = 0;
let numberOfUnknownFiles = 0;
// async function to work with the await statement for image diff
async function main() {
    // let the user know the tests are running (going via the process stdout helps us writing the start notification and the end notification in the same line)
    process.stdout.write('\nStart Tests...');
    // read all files from the new folder
    let files = fs.readdirSync(newFolder);
    // check every file from the new folder
    for(let index = 0; index < files.length; index++) {
        // temporary variable for file
        let file = files[index];
        // create strings with the full path for the files to compare
        let fileFromNewToCheck = `${path.join(newFolder, file)}`;
        let fileFromOrgToCheck = `${path.join(orgFolder, file)}`;
        // create string with the full path for the file containing the differences between the two files
        let fileForDif = `${path.join(diffFolder, file)}`;
        // check if the file exist in the old folder   
        if (fs.existsSync(fileFromOrgToCheck)) {
            // if the file exists in the old folder, check if the files are the same
            const result = await imgDiff({
                actualFilename: fileFromNewToCheck,
                expectedFilename: fileFromOrgToCheck,
                diffFilename: fileForDif,
                generateOnlyDiffFile: true,
            });
            // check if the result is the same image
            if(result.imagesAreSame) {
                // if yes, increment the numer of same images
                numberOfSameFiles++;
            } else {
                // if not, increment the numer of different images
                numberOfDifferentFiles++;
            }
            // log the name for the same existing image
            log('Tested: ' + fileFromOrgToCheck);
            // log the result for debugging
            log(JSON.stringify(result));
        } else {
            // log the unknowm file
            log('Unknown: ' + fileFromOrgToCheck);
            // increment the number of unknowm files
            numberOfUnknownFiles++;
        }
        // increment the number of images
        numberOfImages++;
    }
    // let the user know the tests are finished (going via the process stdout helps us writing the start notification and the end notification in the same line)
    process.stdout.write('finished\n\n');
    // printing some statistics
    console.log('Number of images: ' + numberOfImages);
    console.log('Number of diff images: ' + numberOfDifferentFiles);
    console.log('Number of same images: ' + numberOfSameFiles);
    console.log('Number of unknowm images: ' + numberOfUnknownFiles);
    // only for cosmetic
    process.stdout.write('\n');
}
// run the async function
main();