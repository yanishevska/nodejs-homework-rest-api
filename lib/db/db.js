import pkg from 'mongoose'
import MESSAGES from '../messages/messages';

const { connect, connection} = pkg

const uri = process.env.URI_DB;

const db= connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection.on('connected', () => {
    console.log(`${MESSAGES.CONNECTED}`);
})

connection.on('err', (err) => {
    console.log(`${MESSAGES.ERROR}: ${err.message}`)
})

connection.on('disconnected', () => {
    console.log(`${MESSAGES.DISCONNECTED}`)
})

process.on('SIGINT', async () => {
    connection.close()
    console.log(`${MESSAGES.CLOSE}`)
    process.exit(1)
});

export default db