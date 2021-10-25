import app from './app'
import config from './utils/config'
import { MoovLogger, prettify } from './utils/logger';
import chalk from 'chalk';

function setupMsListeneres() {
    process.on('unhandledRejection', (error: Error) => {
        MoovLogger.error(`[APP] unhandledRejection: ${error.message}`);
        process.exit(1);
    });

    process.on('uncaughtException', (error: Error) => {
        MoovLogger.error(`[APP] uncaughtException: ${error}`);
        process.exit(1);
    });

    // @ts-ignore
    app.listen(config.port, (err: Error) => {
        if (err) {
            MoovLogger.error(`[APP] listen: ${prettify(err)}`);
        }
        MoovLogger.info(chalk.yellow(`server initialization finished.`));
        MoovLogger.info(chalk.greenBright(`server is listening on ${config.port}`));
    });
}

setupMsListeneres();
