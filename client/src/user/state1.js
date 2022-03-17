import React, { useState, useEffect } from 'react'
import { Country, State, City } from 'country-state-city';
import Select from 'react-select'


const State1 = () => {
    const [code, setCode] = useState({

        stateCode: "",
        cityCode: ""
    })


    const state = [];
    const city = [];


    console.log(Country.getCountryByCode('IN'));
    console.log(State.getStatesOfCountry('IN'));
    console.log(City.getCitiesOfState('IN', 'UP'));






    State.getStatesOfCountry("IN").map((item) => {
        state.push({ value: item.name, label: item.name, isoCode: item.isoCode })
    })

    const stateChange = (tat) => {
        console.log(tat)
        setCode({
            ...code,
            stateCode: tat.isoCode
        })
    }
    City.getCitiesOfState("IN", code.stateCode).map((item) => {
        city.push({ value: item.name, label: item.name, isoCode: item.isoCode })
    })

    const cityChange = (tat) => {
        console.log(tat)

    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <h2>ReactJS Dependent Dropdown - Country , State and City</h2>

                    <div className='form-Select'>
                        <label>State</label>
                        <Select
                            placeholder="Select-State"
                            id="state"
                            name="state"
                            options={state}
                            onChange={stateChange}
                        />

                    </div>
                    <div className='form-group'>
                        <label>City</label>
                        <Select isDisabled={!code.stateCode}
                            placeholder="city"
                            id="workExperience"
                            name="workExperience"
                            options={city}
                            onChange={cityChange}
                        />
                    </div>
                    <button type="submit" className='btn btn-success'>Submit</button>
                </div>
            </div>
        </>
    )
}

export default State1;