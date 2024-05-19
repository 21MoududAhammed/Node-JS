const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(`
        <html>
            <head>
                <title>Form</title>
            </head>
         <body>
            <form method='post' action='/process'>
                <input name='message'/>
            </form>
        </body>
        </html>`);
    res.end();
  } else if (req.url === "/process" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      console.log("Steam Finished!");
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      res.write("Thank you for submitting.");
      res.end();
    });
  } else {
    res.write("Not Found!");
  }
});

server.listen(3000);

console.log("Listening port on 3000");
