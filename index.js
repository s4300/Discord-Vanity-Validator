const links = require("./links.json"); // just a normal array of vanities you wanna validate
const fs = require("fs");
let validLinks = [];

(async () => {
    for await (const l of links) {
        const vanity = l.replace("https://").replace("discord.gg/", "");
    
        console.log(`Validating vanity "${vanity}"...`);
    
        const res = await fetch(`https://discord.com/api/v9/invites/${vanity}?with_counts=true&with_expiration=true`);
        const resJson = await res.json();
    
        if (resJson.message == "Unknown Invite") {
            console.log(`Vanity "${vanity}" is available!`);
            validLinks.push(vanity);
        } else {
            console.log(`Vanity "${vanity}" is taken.`);
        };

        await new Promise(a => setTimeout(a, 1000));
    };

    fs.writeFileSync("./valid.json", JSON.stringify(validLinks));
    console.log("Valid links have been written to \"valid.json\"!");
})();
