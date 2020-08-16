const http = require('http');

http
    .createServer((request, response) => {
        let body = [];
        request
            .on('error', (err) => {
                console.error(err);
            })
            .on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.end(
`<html maa=a lang="en">
<head>
    <style>
body div .test.test2 {
    background-color: #ff5000;
}

body div img {
    width: 30px;
    background-color: #ffffff;
}
    </style>
    </head>
    <body>
        <div>
            <img class="test test1 test2" id="myid" />
            <img />
        </div>
    </body>
</html>`
);
            })
    })
    .listen(8088);

console.log("server started at port 8088")