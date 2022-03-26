import express from 'express';

//@ts-ignore
import favicon from 'express-favicon';
import path from 'path';


class Application {
    app: express.Application;

    constructor() {
        this.app = express();

        this.use();
        this.get();
    }

    private use(): void {
        this.app.use(express.static(path.join(__dirname, 'dist')))
        this.app.use(favicon(__dirname + '/dist/favicon.ico'));
        this.app.use(express.static(__dirname));
        this.app.use(express.static(path.join(__dirname, 'dist')));
    }

    private get(): void {
        this.app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, 'dist', 'index.html'));
        });
    }
}

const run = (): void => {
    const port = process.env.PORT || 4200;
    const app = new Application();

    app.app.listen(port, () => {
        console.log(
            `Node Express server listening on http://localhost:${port}`
        );
    });
};

run();
