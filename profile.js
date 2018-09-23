//PRINT MESSAGE TO CONSOLE
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

// SET REQUIRES
const https = require('https');
const http = require('http');

// Print error messages
function printError(error) {
    console.error(error.message);
}

// Connect to the API URL (https://teamtreehouse.com/username.json)
function get(username) {

    try {

        const request = https.get('https://teamtreehouse.com/' + username + '.json', response => {

            // Check for response code 200
            if (response.statusCode === 200) {

                console.log(response.statusCode);

                let body = "";
                // Read the data
                response.on('data', data => {
                    body += data;
                });

                response.on('end', () => {
                    // Parse the data
                    try {
                        const profile = JSON.parse(body);
                        // Print the data
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (error) {
                        // Print error
                        printError(error);
                    }
                });
                // IF RESPONSE CODE IS NOT 200 print error message
            } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });

        // CHECK ERROR WITH REQUEST URL and print error
        request.on('error', error => printError(error));
    } catch (error) {
        printError(error);
    }

}

module.exports.get = get;