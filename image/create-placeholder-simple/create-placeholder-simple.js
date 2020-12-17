'use strict';
// load node standard libraries for filesystem, path and utils
const fs = require('fs');
const path = require('path');
const util = require('util');
// create log file for our log function, the falg 'w' helps us to overwrite the log every time we run the script (Use 'a' if you want to keep the log file)
let logFile = fs.createWriteStream('log.txt', { flags: 'w' }); 
// create log function to log infos, without spamming the console output
function log(message) {
    logFile.write(util.format.apply(null, arguments) + '\n');
}
// get the current directory and create path for the 
const scriptDir = __dirname;
const placeholderJPEG = `${path.join(scriptDir, '/placeholder.jpg')}`;
const placeholderPNG = `${path.join(scriptDir, '/placeholder.png')}`;
const destinationPath = `${path.join(scriptDir, '/placeholder/')}`;
// determine the output format, you can use either 'jpg' or 'png' to specify the fileformat used to generate the placeholder images
const placeholderOutputFormat = 'jpg';          
const placeholderImage = (placeholderOutputFormat === 'jpg') ? placeholderJPEG : placeholderPNG; 
// a example list/array of names for the placeholder images.
const listOfPlaceholderFilenames = [
    { filename: 'placeholder1' },
    { filename: 'placeholder2' },
    { filename: 'placeholder3' },
    { filename: 'placeholder4' },
    { filename: 'placeholder5' },
    { filename: 'placeholder6' },
    { filename: 'placeholder7' },
    { filename: 'placeholder8' },
    { filename: 'placeholder9' },
    { filename: 'placeholder10' },
];   
// create some temporary variables for statistics at the end
let numberOfImages = 0;
let numberOfFailedImages = 0;
// async function to work with the await statement, if needed
async function main() {
    // let the user know the gereration of the placeholder images are running (going via the process stdout helps us writing the start notification and the end notification in the same line)
    process.stdout.write('\nStart placeholder generation...');
    // check if the destination folder does not exist
    if(!fs.existsSync(destinationPath)) {
        // if there is no destination folder, we will create on
        fs.mkdirSync(destinationPath);
    }
    // check every file from the new folder
    for(let index = 0; index < listOfPlaceholderFilenames.length; index++) {
        // temporary variable for file
        let entry = listOfPlaceholderFilenames[index];
        // create the full path to the destination folder with the filename
        let placeholderImageDestinationPath = `${path.join(destinationPath, `/${entry.filename}.${placeholderOutputFormat}`)}`;
        // read the source file into a buffer
        try { 
            let data = fs.readFileSync(placeholderImage);
            // next we want to copy the data buffer into the destination path via the base64 operation
            try { 
                fs.writeFileSync(placeholderImageDestinationPath, data, { encoding: "base64", flag: "w" });
            } catch(err) { 
                // if data is a string we want to log the error
                log(`Failed to create Placeholderimage: ${placeholderImageDestinationPath}`);
                log(err);
                // increment the number of failed images
                numberOfFailedImages++;
                // and want to continue the loop
                continue; 
            }
        } catch(err) { 
            // if data is a string we want to log the error
            log(`Failed to create Placeholderimage: ${placeholderImageDestinationPath}`);
            log(err);
            // increment the number of failed images
            numberOfFailedImages++;
            // and want to continue the loop
            continue; 
        }
        // log success
        log(`Created Placeholderimage: ${placeholderImageDestinationPath}`);
        // increment the number of images
        numberOfImages++;
    }
    // let the user know the tests are finished (going via the process stdout helps us writing the start notification and the end notification in the same line)
    process.stdout.write('finished\n\n');
    // printing some statistics
    console.log('Number of images: ' + numberOfImages);
    console.log('Number of failed images: ' + numberOfFailedImages);
    // only for cosmetic
    process.stdout.write('\n');
}
// run the async function
main();