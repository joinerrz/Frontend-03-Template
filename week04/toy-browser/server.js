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
    #app{
        width: 500px;
        height: 300px;
        display: flex;
        background-color: rgb(255, 255, 255);
      }
      #app #myid{
        width: 200px;
        height: 100px;
        background-color: rgb(255, 0, 0);
      }
      #app .test{
        flex: 1;
        background-color: rgb(0, 255, 0);
      }
    </style>
    </head>
    <body>
        <div id="app">
            <div id="myid" ></div>
            <div class="test"></div>
        </div>
    </body>
</html>`
);
            })
    })
    .listen(8088);

console.log("server started at port 8088")