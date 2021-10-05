import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
export class Routes {
    static init(router: Router) {
        fs.readdirSync(__dirname)
            .filter((file: string) => ['index.ts', 'index.js'].indexOf(file) === -1 && ['ts', 'js'].indexOf(file.split('.').pop()) !== -1)
            .map((file: string) => path.join(__dirname, file))
            .filter((file: string) => fs.statSync(file).isFile())
            .forEach((file: string) => {
                const model = module.require(file);
                if ('init' in model) {
                    model.init(router);
                }
            });
    }
}