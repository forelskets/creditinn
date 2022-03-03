import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { Validate } from '../../_helper'
import { AllBank, AllService } from '../../_services/Admin.services'
export const OfferForm = (props) => {
    const [note, setNote] = useState('');
    const [BankName, setBankName] = useState('');
    const [error, setError] = useState('');
    const [bankArray, setBankArray] = useState([]);
    const [serviceArray, setServiceArr] = useState([]);
    const [services, setservices] = useState('');
    useEffect(() => {
        callEffect()
    }, [])

    const callEffect = async () => {
        let res = await AllBank()
        if (res?.status === 1 && Array.isArray(res?.data?.services)) {
            setBankArray(res.data.services)
        }
        let allservice = await AllService()
        if (allservice?.status === 1 && Array.isArray(allservice?.data?.services)) {
            setServiceArr(allservice.data.services)
        }
    };

    const SubmitForms = () => {
        let success = 0;
        let obj = {
            Note: note, BankName: BankName ? BankName.value : "",
            BankService: Array.isArray(services) ? services.map(x => (x.value)) : null,
        }
        let Obj = Validate(obj, rules)
        Object.keys(Obj).map(key => {
            if (Obj[key] !== "") {
                success = 1
            }
        })
        setError(Obj)
        if (success === 0) {
            props.callApi(obj, callback)
        }
    }

    const callback = () => {
        setBankName("");
        setNote("");
        setservices("")
    }

    const onChangeBank = (e) => {
        setBankName(e)
    }

    const onChangeServices = (e) => {
        setservices(e)
    }

    return <div className="tab-pane fade" id="add">
        <div className="col-md-11 mx-auto">
            <span className="h2 mb-0">Add Your Bank Details</span>
            {/* <form action=""> */}
            <div className="row my-4">
                <div className="col-md-4">
                    <label htmlFor="bankName">Bank Name</label>
                    <Select
                        placeholder="Select Bank"
                        id="bank"
                        name="bank"
                        className="bank"
                        options={bankArray.map(x => ({ label: x.BankName ? x.BankName : "", value: x._id ? x._id : "" }))}
                        onChange={onChangeBank}
                        value={BankName}
                    />
                    {error?.BankName && <div className='error-msg'>{error.BankName}</div>}
                </div>
                <div className="form-group col-md-4">
                    <label for="inputState">Select Service</label>
                    <Select
                        placeholder="Select Services"
                        id="service"
                        name="service"
                        className="Service"
                        options={serviceArray.map(x => ({ label: x.ServiceName ? x.ServiceName : "", value: x._id ? x._id : "" }))}
                        isMulti
                        onChange={onChangeServices}
                        value={services}
                    />
                    {error?.BankService && <div className='error-msg'>{error.BankService}</div>}
                </div>
                <div className="col-md-4">
                    <label htmlFor="bankNote">Note</label>
                    <input
                        placeholder='Note'
                        type="text"
                        className="form-control"
                        name="note"
                        id="note"
                        value={note}
                        onChange={(e) => { setNote(e.target.value); setError("") }}
                    />
                    {error?.Note && <div className='error-msg'>{error.Note}</div>}
                </div>
            </div>

            <div className="btn-div">
                <button className="btn yellow-btn">Cancel</button>
                <button className="btn form-btn" onClick={SubmitForms}>Submit</button>
            </div>
            {/* </form> */}
        </div>
    </div>
}

const rules = [{
    field: 'Note',
    fieldName: 'Note',
    type: 'string',
    require: true
}, {
    field: 'BankName',
    fieldName: 'Bank Name',
    type: 'string',
    require: true
}, {
    field: 'BankService',
    fieldName: 'Service',
    type: 'string',
    require: true
}]