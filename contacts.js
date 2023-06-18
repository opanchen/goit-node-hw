const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function updateContacts(contacts) {
   return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const singleContact = contacts.find(({id}) => id === contactId);
    return singleContact || null;
}
  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const indexToRemove = contacts.findIndex(({id}) => id === contactId);

    if (indexToRemove === -1) return null;
    
    const [removedContact] = contacts.splice(indexToRemove, 1);
    await updateContacts(contacts);

    return removedContact;
}
  
async function addContact(name, email, phone) {
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }

    const contacts = await listContacts();
    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}