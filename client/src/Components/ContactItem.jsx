import React, {useState}          from 'react';
import {FaPhoneAlt}               from "react-icons/fa";
import {BsTrashFill, BsSave2Fill} from "react-icons/bs";
import {GiCancel}                 from "react-icons/gi";

import Axios from "axios";

Axios.defaults.baseURL = 'http://localhost:8000'

export default function ContactItem(props)
{

    const {id, pFirstName, pLastName, pPhoneNumber, updateContact, deleteContact} = props

    // function deleteContact(evt)
    // {
    //     console.log(evt);
    // }

    // function editContact(evt)
    // {
    //     let fName = evt.target[0].value
    //     let lName = evt.target[1].value
    //     let phoneNum = evt.target[2].value
    //     let id = param.id;
    //
    //     Axios.put('/api/updateContact', {
    //         firstName: fName,
    //         lastName: lName,
    //         phoneNumber: phoneNum,
    //         id: id,
    //     }).then(r => {
    //         if(r.status === 200)
    //         {
    //             setPFirstName(fName);
    //             setPLastName(lName);
    //             setPPhoneNumber(phoneNum);
    //         }
    //     })
    //
    //
    // }

    function formattedNumber()
    {
        if(typeof pPhoneNumber === 'string')
        {
            return pPhoneNumber.slice(0,3) + "-" + pPhoneNumber.slice(3,6) + "-" + pPhoneNumber.slice(6);
        }


        if(typeof pPhoneNumber === 'number')
        {
            let phoneNumString = pPhoneNumber.toString();
            return phoneNumString.slice(0,3) + "-" + phoneNumString.slice(3,6) + "-" + phoneNumString.slice(6);
        }


    }

    const [editInfo, setEditInfo] = useState(false);

    function toggleInfo(evt)
    {
        if(evt.target.tagName === 'DIV')
        {
            setEditInfo(!editInfo);
        }

    }

    return(
        <div>
            <div className={'p-3 flex flex-row place-content-between hover:bg-gray-200 cursor-pointer'} onClick={evt => toggleInfo(evt)}>
                <div>
                    <p className={'text-lg font-semibold'}>
                        {pFirstName + " " + pLastName}
                    </p>
                    <div className={'inline-flex space-x-2 text-sm'}>
                        <div className={'flex items-center '}>
                            <FaPhoneAlt className={'fill-gray-400'}/>
                        </div>
                        <p className={'text-gray-400 font-semibold'}>
                            {formattedNumber()}
                        </p>
                    </div>
                </div>
                <div className={'flex place-items-center'}>
                    <button type={'submit'} className={'p-2 bg-[#CB444A] rounded-md h-fit hover:bg-red-500'} onClick={evt => {evt.preventDefault(); deleteContact(id)}}>
                        <BsTrashFill className={'fill-white'} />
                    </button>
                </div>
            </div>

            <div className={'bg-slate-200'}>
                <form id={id} className={!editInfo? 'hidden' : 'w-full p-3 flex place-content-around'} onSubmit={evt => {evt.preventDefault(); updateContact(evt, id)}}>
                    <input type={'text'} id={'firstNameEdit'} className={'border border-gray-500 text-gray-900 text-sm' +
                    ' p-1' +
                    ' rounded placeholder-gray-500'} defaultValue={pFirstName} placeholder={'First Name'} required={true}/>
                    <input type={'text'} id={'lastNameEdit'} className={'border border-gray-500 text-gray-900 text-sm p-1' +
                        ' rounded placeholder-gray-500'} defaultValue={pLastName} placeholder={'Last Name'} required={true}/>
                    <input id={'telNumberEdit'} type={'tel'} placeholder={pPhoneNumber} className={'border' +
                        ' border-gray-500 text-gray-900 text-sm p-1' +
                        ' rounded placeholder-gray-500'} required={true} defaultValue={pPhoneNumber}
                           pattern={"[0-9]{3}[0-9]{3}[0-9]{4}"} maxLength={10}

                    />
                    <div className={'flex place-items-center gap-x-1'}>
                        <button className={'p-2 bg-green-500 rounded-md h-fit hover:bg-green-700'} type={'submit'}>
                            <BsSave2Fill className={'fill-white'}/>
                        </button>
                        <button onClick={evt=>toggleInfo(evt)} className={'p-2 bg-blue-500 rounded-md h-fit' +
                            ' hover:bg-blue-700 cancelButton'} type={'reset'}>
                            <GiCancel className={'fill-white cancelButton'}/>
                        </button>
                    </div>
                </form>
            </div>

        </div>

    )
}