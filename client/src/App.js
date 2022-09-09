import React, {useEffect, useState} from "react";
import {RiContactsBookFill}         from "react-icons/ri";
import {FaSearch}                   from "react-icons/fa";
import ContactItem                  from "./Components/ContactItem";
import Axios                        from "axios";

Axios.defaults.baseURL = 'http://localhost:8000'

function App()
{

    /**
     * State of contacts
     */
    const [allContacts, setAllContacts] = useState([{}]);
    const [filteredContacts, setFilteredContacts] = useState([{}]);

    /**
     * Get all contacts with fetch /api/allContacts/
     * Update the state of allContacts and filteredContacts
     */
    useEffect(() =>
              {
                  Axios.get('/api/allContacts').then(
                      res => {
                          setAllContacts(res.data);
                          setFilteredContacts(res.data);
                      }

                  ).catch(err =>
                          {
                              setAllContacts([{"contacts":[]}]);
                              alert(err + " \n \nCould not obtain contacts. There seems to be a server error.")
                          })
              }, [])

    /**
     * State for Add Contact form.
     */
    const [addContactForm, setAddContactForm] = useState(false);

    /**
     * Allows toggling of the widget.
     */
    function toggleAddContactForm()
    {
        setAddContactForm(!addContactForm);
    }

    /**
     * functionally adds contact to all contacts list
     * @param params
     * @returns {Promise<void>}
     */
    async function addToAllContactsList(params)
    {
        await setAllContacts(prevState => {
            let newState = {...prevState};
            newState.contacts = [...prevState.contacts, params];
            return newState;
        })
    }

    /**
     * functionally adds contact to filtered list
     * @param params
     * @returns {Promise<void>}
     */
    async function addToFilteredContactsList(params)
    {
        await setFilteredContacts(prevState => {
            let newState = {...prevState};
            newState.contacts = [...prevState.contacts, params];
            return newState;
        })
    }

    /**
     * Function to call api to add contact to DB. If successful, the contact will be added to the list
     * @param event
     * @returns ContactItem
     */
    async function addContact(event)
    {
        let inFName = event.target[0].value;
        let inLName = event.target[1].value;
        let inPhoneNum = Number.parseInt(event.target[2].value);

        let addedContact = {id: '', firstName: '', lastName: '', phoneNumber: ''};


        await Axios.post('/api/addContact', {
            firstName: inFName,
            lastName: inLName,
            phoneNumber: inPhoneNum
        }).then((res) =>
                {
                    let id = res.data._id;
                    let firstName = res.data.firstName;
                    let lastName = res.data.lastName;
                    let phoneNumber = res.data.phoneNumber;

                    alert('Added ' + firstName + " " + lastName + " to contact list.");
                    event.target.reset();

                    addedContact.id = id;
                    addedContact.firstName = firstName;
                    addedContact.lastName = lastName;
                    addedContact.phoneNumber = phoneNumber;
                })

        await addToAllContactsList(addedContact);
        await addToFilteredContactsList(addedContact);
    }

    function removeFromArray(arr, value)
    {
        return arr.filter(item => {
            return item._id !== value._id
        })
    }

    async function removeFromAllContactList(id)
    {
        let value = allContacts.contacts.find(contact => contact._id === id);

        if(value !== undefined)
        {
            setAllContacts(prevState => {
                let newState = {...prevState};
                newState.contacts = removeFromArray(prevState.contacts, value);
                return newState;
            })
        }


    }

    async function removeFromFilteredList(id)
    {
        let value = filteredContacts.contacts.find(contact => contact._id === id);

        if(value !== undefined)
        {
            setFilteredContacts(prevState => {
                let newState = {...prevState};
                newState.contacts = removeFromArray(prevState.contacts, value);
                return newState;
            })
        }

    }

    async function deleteContact(id)
    {

        let index = allContacts.contacts.findIndex(contact => contact._id === id);

        if(index === -1)
        {
            return alert("Contact not found.");
        }


        Axios.delete('api/delete/contact', {data: {_id: id}})
            .then(res => {
                if(res.status === 200)
                {
                    return alert("Deleted contact.");
                }

            }).catch(err => {
                alert(err + "\nERROR DELETING CONTACT!!!!");
                window.location.reload();
            })



        await removeFromAllContactList(id);
        await removeFromFilteredList(id);

    }

    /**
     * Function to find and update the contact in All Contacts list
     * @param updatedContact
     * @returns {Promise<void>}
     */
    async function updateAllContactsList(updatedContact)
    {
        await setAllContacts(prevState => {

            let index = prevState.contacts.findIndex(contact => contact._id === updatedContact._id);

            let newState = {...prevState};

            newState.contacts[index] = updatedContact;

            return newState;

        })

    }

    /**
     * Function to find and update the contact in Filtered Contacts List
     * @param updatedContact
     * @returns {Promise<void>}
     */
    async function updateFilteredContactsList(updatedContact)
    {
        await setAllContacts(prevState => {

            let index = prevState.contacts.findIndex(contact => contact._id === updatedContact._id);

            let newState = {...prevState};

            newState.contacts[index] = updatedContact;

            return newState;

        })
    }

    /**
     * Function to handle form requests to update the contact by calling the api.
     * @param evt Event Target - Used to obtain values from the form
     * @param idIn Id of the contact to be updated
     * @returns {Promise<void>}
     */
    async function updateContact(evt, idIn)
    {
        let fName = evt.target[0].value
        let lName = evt.target[1].value
        let phoneNum = evt.target[2].value

        let indexOfUpdated = allContacts.contacts.findIndex(contact => contact._id === idIn);
        let contact = allContacts.contacts[indexOfUpdated];

        if(fName.toLowerCase() === contact.firstName.toLowerCase() &&
            lName.toLowerCase() === contact.lastName.toLowerCase() &&
            Number.parseInt(phoneNum) === Number.parseInt(contact.phoneNumber))
        {
            evt.target.reset();
            return alert("Contact not updated. No changes were made.");
        }

        Axios.put('/api/updateContact', {
            firstName: fName.toString(),
            lastName: lName.toString(),
            phoneNumber: Number.parseInt(phoneNum),
            _id: idIn,
        }).then(r => {
            if(r.status === 200)
            {
                fName = fName.charAt(0).toUpperCase() + fName.slice(1);
                lName = lName.charAt(0).toUpperCase() + lName.slice(1);
                let updatedContact = {_id: idIn, firstName: fName, lastName: lName, phoneNumber: Number.parseInt(phoneNum)};
                updateAllContactsList(updatedContact);
                updateFilteredContactsList(updatedContact);
                evt.target.reset();
            }else {
                alert("Update not successful");
            }
        })
    }

    /**
     * Allows you to search user in the contact list
     * @param evt
     */
    function searchByLastName(evt)
    {
        let searchName = item => item.lastName.toLowerCase().includes(evt.target.value.toLowerCase());

        let tempList = [...allContacts.contacts];

        let filtered = tempList.filter((item) => searchName(item));

        setFilteredContacts(prevState => {
            let newState = {...prevState};
            newState.contacts = filtered;
            return newState;
        })
    }

    /**
     * Mapping function to generate filtered contacts list
     * @returns {JSX.Element | ContactItem[]}
     */
    function filteredContactList()
    {
        if(filteredContacts.contacts.length === 0)
        {
            return <p className={'text-center'}>No contacts found with matching last name...</p>;
        }
        return filteredContacts.contacts.map((contact, index) =>
                                             {
                                                 return <ContactItem
                                                     key={index}
                                                     pFirstName={contact.firstName}
                                                     pLastName={contact.lastName}
                                                     pPhoneNumber={contact.phoneNumber.toString()}
                                                     id={contact._id}
                                                     updateContact={updateContact}
                                                     deleteContact={deleteContact}
                                                 />
                                             })
    }

    /**
     * Mapping function to generate all contacts list
     * @returns {JSX.Element | ContactItem[]}
     */
    function allContactList()
    {
        if(allContacts.contacts.length === 0)
        {
            return <p className={'text-center'}>No contacts found.</p>;
        }
        return allContacts.contacts.map((contact, index) =>
                                             {
                                                 return <ContactItem
                                                     key={index}
                                                     pFirstName={contact.firstName}
                                                     pLastName={contact.lastName}
                                                     pPhoneNumber={contact.phoneNumber.toString()}
                                                     id={contact._id}
                                                     updateContact={updateContact}
                                                     deleteContact={deleteContact}
                                                 />
                                             })
    }

    /**
     * Function to determine if all contacts should be displayed or only the filtered ones
     * @returns {JSX.Element|ContactItem[]}
     */
    function contactList()
    {

        const search = document.getElementById('searchContacts');

        if(search.value.length !== 0)
        {

            return filteredContactList();
        } else
        {

            return allContactList();
        }
    }

    return (
        <div className={'max-h-screen'}>
            <div className={'place-content-center my-auto mx-auto w-1/2 h-1/2 py-3 px-8 bg-[#F6F6F6]'}>
                <div className={'flex text-3xl w-full place-content-center gap-x-4'}>
                    <div className={'flex items-center'}>
                        <RiContactsBookFill/>
                    </div>
                    <h1 className={'font-medium'}>
                        Phone Book App
                    </h1>
                </div>
                <div className={'flex flex-row place-content-between mt-8 w-full'}>
                    <h2 className={'text-2xl'}>Contacts</h2>
                    <button className={'bg-[#357BF6] text-white px-4 py-2 rounded-md'} onClick={toggleAddContactForm}>+
                        Add Contact
                    </button>
                </div>
                <div className={addContactForm ? 'w-full h-fit bg-white mt-4 rounded-xl p-3 ' : 'hidden'}>
                    <form action={'/add'} onSubmit={event =>
                    {
                        event.preventDefault();
                        addContact(event)
                    }}>
                        <div className={'flex flex-row gap-x-3'}>
                            <div className={'grid grid-rows-2 h-full w-full'}>
                                <label htmlFor={'firstName'} className={'text-lg'}>First Name</label>
                                <input id={'firstName'}
                                       className={'font-medium border border-gray-500 text-gray-900 text-md p-2' +
                                           ' rounded-lg placeholder-gray-500'} type={'text'} placeholder={'First Name'}
                                       required={true}/>
                            </div>
                            <div className={'grid grid-rows-2 h-full w-full'}>
                                <label htmlFor={'lastName'} className={'text-lg'}>Last Name</label>
                                <input id={'lastName'}
                                       className={'font-medium border border-gray-500 text-gray-900 text-md p-2' +
                                           ' rounded-lg placeholder-gray-500'} type={'text'} placeholder={'Last Name'}
                                       required={true}/>
                            </div>
                        </div>

                        <div className={'grid grid-rows-2 mt-3'}>
                            <label htmlFor={'telNumber'} className={'text-lg'}>Phone #</label>
                            <input id={'telNumber'} type={'tel'} placeholder={'1234567890'}
                                   className={'font-medium border' +
                                       ' border-gray-500 text-gray-900 text-md p-2' +
                                       ' rounded-lg placeholder-gray-500'} required={true}
                                   pattern={"[0-9]{3}[0-9]{3}[0-9]{4}"} maxLength={10}
                            />
                        </div>
                        <div className={'flex place-content-around mt-2'}>
                            <button className={'bg-green-600 text-white p-2 rounded-md w-1/5'} type={'submit'}>Add
                                Contact
                            </button>
                            <button className={'bg-red-600 text-white p-2 rounded-md w-1/5'} type={'reset'}>Clear
                            </button>
                        </div>
                    </form>
                </div>
                <div className="relative my-8">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <FaSearch className={'w-5 h-5 text-gray-500 dark:text-gray-400 font-bold'}/>
                    </div>
                    <input type="text" id="searchContacts"
                           className=" font-medium border border-gray-500 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 placeholder-gray-500"
                           placeholder="Search for contact by last name..."
                           onChange={evt => searchByLastName(evt)}
                    />
                </div>

                {/*  START OF CONTACTS LIST */}
                <div
                    className={((typeof filteredContacts.contacts === "undefined") ? 'h-fit' : 'h-fit') + ' w-full' +
                        ' max-h-96' +
                        ' bg-white' +
                        ' rounded-md' +
                        ' divide-y' +
                        ' divide-gray-400 border' +
                        ' border-gray-400' +
                        ' overflow-y-auto'}>
                    {(typeof filteredContacts.contacts === 'undefined') ? (
                        <p className={'text-center text-lg'}>Loading contacts...</p>
                    ) : (contactList())}

                </div>
            </div>
        </div>
    );
}

export default App;
