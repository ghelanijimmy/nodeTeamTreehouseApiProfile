const profile = require('./profile');

// SET VARIABLES
const users = process.argv.slice(2);

//Loop through any users and pass to function to print
users.forEach(profile.get);