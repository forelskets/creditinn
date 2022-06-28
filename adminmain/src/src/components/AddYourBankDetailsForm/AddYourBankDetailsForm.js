import React, { useState } from 'react'
import { Validate } from '../../_helper'
export const BankDetailsForm = (props) => {
    const [note, setNote] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [error, setError] = useState('');
    const SubmitForms = () => {
        let success = 0;
        let obj = { Note: note, ServiceName: serviceName }
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
        setServiceName("");
        setNote("");
    }

    return <div className="tab-pane fade" id="profile">
        <div className="col-md-11 mx-auto">
            <span className="h2 mb-0">Add Your Bank Details</span>
            {/* <form> */}
            <div className="row my-4">
                <div className="col-md-4">
                    <label htmlFor="serviceName">Service Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="serviceName"
                        id="serviceName"
                        value={serviceName}
                        onChange={(e) => { setServiceName(e.target.value); setError("") }}
                    />
                    {error?.ServiceName && <div className='error-msg'>{error.ServiceName}</div>}
                </div>

                <div className="col-md-4">
                    <label htmlFor="note">Note</label>
                    <input
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
                <button className="btn form-btn" onClick={SubmitForms}>
                    Submit
                </button>
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
    field: 'ServiceName',
    fieldName: 'Service Name',
    type: 'string',
    require: true
}]