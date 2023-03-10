import path from 'node:path';
import url from 'url';
import express from 'express';
import bodyParser from 'body-parser';
// INTERFACES
// CONSTANTS & VARIABLES
const space = '\n';
const app = express();
let __dirname;
// MIDDLEWARE
const initBodyParser = () => {
    app.use(bodyParser.urlencoded({ extended: false }));
};
// FUNCTIONS
const productRoutes = () => {
    // product page
    app.get('/products', (req, res) => {
        console.log(space, 'Middleware is in Product Page');
        res.send(`
      <h1>Product Page</h1>
      <form action="/products" , method="POST">
        <input type="text" name="title" />
        <button type="submit">Add Product</button>
      </form>
    `);
    });
    app.post('/products', (req, res) => {
        console.log(space, 'Adding product middleware');
        // debugger;
        console.log(req.body);
        res.redirect('./products');
    });
};
const userRoutes = () => {
    app.use('/users', (req, res) => {
        console.log(space, 'Middleware is in User Page');
        res.send('<h1>user Page</h1>');
    });
};
const triggerRoutes = () => {
    // Integrating Body Parser
    initBodyParser();
    app.use((req, res, next) => {
        console.log(space, 'Always run middleware');
        next();
    });
    productRoutes();
    userRoutes();
    app.use('/', (req, res) => {
        console.log(space, 'In the default middleware');
        res.send('<h1> Hello from Express </h1>');
    });
};
const practiceMiddleware = () => {
    // **USE** allows to add a new middleware function
    app.use((req, res, next) => {
        console.log(space, 'In the middleware');
        next(); // Allows the request to continue to the next middleware in line
    });
    app.use((req, res) => {
        console.log(space, 'In the 2nd middleware');
        res.send('<h1> Hello from Express </h1>');
        // const data = fs.readFileSync('index.html');
        // const htmlData = data.toString();
        // console.log('HTML Data: ', htmlData);
        // res.send(htmlData);
        // res.send({ some: 'json' });
        // res.send(Buffer.from(data));
        // res.sendFile(path.join(__dirname, './index.html'));
    });
};
const createServer = () => {
    triggerRoutes();
    // const server = http.createServer(app);
    // server.listen(3000);
    // OR
    app.listen(3000);
};
const getDirectoryPath = () => {
    const filePath = url.fileURLToPath(import.meta.url);
    const dirPath = path.dirname(filePath);
    // __dirname = dirPath.split('/dist')[0];
    // OR
    __dirname = path.join(dirPath, '../');
    console.log('Dirname: ', __dirname);
};
const main = () => {
    getDirectoryPath();
    // practiceMiddleware();
    createServer();
};
// CODE WHICH RUNS ON EXECUTING THE FILE
main();
export { app, space, __dirname };
