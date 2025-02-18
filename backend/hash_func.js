// hashfunc.js
console.log("Starting the hashing process...");

const bcrypt = require('bcryptjs');
const saltRounds = 10;
const plainPassword = "111";

// Initiate the hash
bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error during hashing:", err);
    throw err;
  }
  console.log("Hashed password:", hash);
});

console.log("Hashing function call initiated.");
