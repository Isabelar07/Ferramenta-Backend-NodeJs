import 'dotenv/config';
import app from './app';
import { AddressInfo } from "net";

const server = app.listen(3000, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});