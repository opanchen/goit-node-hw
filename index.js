const { program } = require('commander');
const colors = require('colors');

const contacts = require('./contacts');
const { log } = require('console');

async function invokeAction({action, id, name, email, phone}) {
    switch (action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            console.log('This is full list of your contacts...'.bgGreen);
            console.table(allContacts);
        break;

        case 'get':
            const foundedContact = await contacts.getContactById(id);

            if (foundedContact === null) return console.log(`The contact with id "${id}" doesn\'t exist.`.bgRed);
            
            console.log('This is the contact you were looking for...'.bgGreen);
            console.table(foundedContact);
        break;

        case 'add':
            const newContact = await contacts.addContact(name, email, phone);
            console.log('This is the contact you\'ve just added to your phonebook...'.bgGreen);
            console.table(newContact);
        break;

        case 'remove':
            const removedContact = await contacts.removeContact(id);

            if (removedContact === null) return console.log(`The contact with id "${id}" doesn\'t exist.`.bgRed);

            console.log('This is the contact you\'ve just removed...'.bgGreen);
            console.table(removedContact);
        break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

program
    .option('-a, --action, <type>')
    .option('-i, --id, <type>')
    .option('-n, --name, <type>')
    .option('-em, --email, <type>')
    .option('-ph, --phone, <type>')

program.parse();

const options = program.opts();

invokeAction(options);