import * as path from 'path';
import * as dotenv from 'dotenv';
import chalk from 'chalk';

if (process.env.NODE_ENV !== 'production') {
    const envFile = path.resolve(__dirname + '/../.env');
    dotenv.config({ path: envFile });
}

export default {
    port: process.env.serverPort || 8080,
    backendTimeout: Number(process.env.backendTimeout),
    backendProtocol: process.env.backendProtocol,
    backendHost: process.env.backendHost,
    backendPort: process.env.backendPort,
    logging: {
        outputFile: process.env.outputFile,
        outputFileLogLevel: process.env.outputFileLogLevel
    }
};

if (!process.env.backendProtocol) {
    console.log(chalk.red(`[MOOV] Failed to read env file!`));
    console.log(chalk.yellow(`[MOOV] path is:` + __dirname + '/../.env'));
    console.log(chalk.yellow(`[MOOV] envFile is:` + path.resolve(__dirname + '/../.env')));

} else {
    console.log(chalk.green(`[MOOV] Successfully read env file.`));
    console.log(chalk.green(`[MOOV] Debug level is: ${process.env.WINSTON_LOG_LEVEL}`));
}
