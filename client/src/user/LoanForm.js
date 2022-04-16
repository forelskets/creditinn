import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import toastr from "toastr";
import isNumber from "is-number";
import { Country, State, City } from "country-state-city";
import NumberFormat from "react-number-format";
import { ToWords } from "to-words";
import { Validate } from "../_helper/Validation/Validate";
var obj = {};
var count = 0;

const eye = { fontSize: "15px", height: "0px" };
var basic = 1;
const LoanForm = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const modelRef = useRef(null);
  // const [pan, setPan] = useState('');
  const [adhaar, setAdhaar] = useState("");
  // const [bankStmt, setBankStmt] = useState('');
  // const [photo, setPhoto] = useState('');
  const [profession, setProfession] = useState("");
  const [professionLabel, setProfessionLabel] = useState("");
  const [gst, setGst] = useState("");
  const [lyst, setLyst] = useState("");
  const EmployeeDatails = useRef(null);
  const BasicDetails = useRef(null);
  const KYCDetails = useRef(null);
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const [citySelect, setCitySelect] = useState({});
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [stateSelect, setStateSelect] = useState({});
  //const [loanAmount, setState] = useState();
  const [output, setOutput] = useState();
  
  const [basicInformation, setBasicInformation] = useState(true);
  const [employeeProfile, setEmployeeProfile] = useState({
    fname: "",

    fathername: "",

    dob: "",
    mobile: "",
    address: "",

    zip: "",
    companyName: "",

    totalExperience: "",
    monthlyIncome: "",

    adhaarNo: "",
    panNo: "",

    loanAmount: "",
    emi: "",
  });

  const [code, setCode] = useState({
    stateCode: "",
    cityCode: "",
  });

  const state = [];
  const city = [];

  console.log(Country.getCountryByCode("IN"));
  console.log(State.getStatesOfCountry("IN"));
  console.log(City.getCitiesOfState("IN", "UP"));

  State.getStatesOfCountry("IN").map((item) => {
    state.push({ value: item.name, label: item.name, isoCode: item.isoCode });
  });

  const stateChange = (tat) => {
    setStateSelect(tat);
    setCode({
      ...code,
      stateCode: tat.isoCode,
    });
  };
  City.getCitiesOfState("IN", code.stateCode).map((item) => {
    city.push({ value: item.name, label: item.name, isoCode: item.isoCode });
  });

  const cityChange = (tat) => {
    setCitySelect(tat);
  };

  const LYSTHandler = (e) => {
    setLyst(e.target.value);
  };
  const GSTHandler = (e) => {
    setGst(e.target.value);
  };

  const TotalWorkExperience = [
    { value: "1 or less then years", label: "1 or less then years" },
    { value: "1 to 2  years", label: "1 to 2 years" },
    { value: "2 to 3 years", label: "2 or 3 years" },
    { value: "More than 3 years", label: "More Than 3 years" },
  ];

  const TotalWorkExperienceHandler = (tat) => {
    setEmployeeProfile({
      ...employeeProfile,
      totalExperience: tat.value,
    });
  };
  // const WorkExperience = [
  //   { value: '1 or less then yrs', label: '1 or less then yrs' },
  //   { value: '1 to 2  yrs', label: '1 to 2 yrs' },
  //   { value: '2 to 3 yrs', label: '2 or 3 yrs' },
  //   { value: '3 to 4 yrs', label: '3 or 4 yrs' },
  //   { value: '4 to 5 yrs', label: '4 or 5 yrs' },
  // ];

  // const WorkExperienceHandler = (tat) => {
  //   setEmployeeProfile({
  //     ...employeeProfile,
  //     currentCompanyExperience: tat.value,
  //   });
  // };

  // const AnnualIncome = [
  //   { value: '1,00,000', label: '1,00,000' },
  //   { value: '2,00,000', label: '2,00,000' },
  //   { value: '3,00,000', label: '3,00,000' },
  //   { value: 'up to 5,00,000', label: 'up to 5,00,000' },
  // ];

  // const AnnualIncomeHandler = (tat) => {
  //   setEmployeeProfile({
  //     ...employeeProfile,
  //     annualIncome: tat.value,
  //   });
  // };
  // const options = [
  //   { value: 'Delhi', label: 'Delhi' },
  //   { value: 'UP', label: 'UP' },
  //   { value: 'Bihar', label: 'Bihar' },
  // ];

  const LoanPurposeHandler = (tat) => {
    setLoanPurpose(tat.value);
  };

  const ProfessionHandler = (tat) => {
    setProfession(tat.value);
    setProfessionLabel(tat.status);
  };

  const validateSelectOptions = () => {
    let disable = true;
    if (loanPurpose && profession && loanAmount) {
      disable = false;
    }
    return disable;
  };

  // const OptionHandler = (tat) => {
  //   setStateSelect(tat);
  // };

  // const options1 = [
  //   { value: 'Aligarh', label: 'Aligarh' },
  //   { value: 'Agra', label: 'Agra' },
  //   { value: 'MuradaBad', label: 'MuradaBad' },
  // ];

  // const OptionHandler1 = (tat) => {
  //   setCitySelect(tat);
  // };

  const LoanPurpose = [
    { value: "Education Loan", label: "Education Loan" },
    { value: "Personal Loan", label: "Personal Loan" },
    { value: "Home Loan", label: "Home Loan" },
    { value: "Business Loan", label: "Business Loan" },
    { value: "Flexi Loan", label: "Flexi Loan/Overdraft Loan" },
  ];

  const Profession = [
    { value: "Salaried", label: "Salaried", status: "Salried" },
    {
      value: "Self Employed (Business)",
      label: "Self Employed (Business)",
      status: "Bussiness",
    },
    {
      value: "Self Employed (Professional)",
      label: "Self Employed (Professional)",
      status: "Bussiness",
    },
  ];

  const changeBox = () => {
    setCheckBoxStatus(!checkBoxStatus);
  };

  const ClickEmployeeDetails = () => {
    EmployeeDatails.current.click();
  };

  const BasicDetailsFunc = () => {
    BasicDetails.current.click();
  };

  const AdhaarUpload = (e) => {
    setAdhaar(e.target.files[0]);
  };
  // const PanUpload = (e) => {
  //   setPan(e.target.files[0]);
  // };
  // const PhotoUpload = (e) => {
  //   setPhoto(e.target.files[0]);
  // };
  //  const BankStmtUpload = (e) => {
  //    setBankStmt(e.target.files[0]);
  //  };
  var numone =
    "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(
      " "
    );
  var tens = "twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
  // const [loanAmount, setState] = useState();
  // const [output, setOutput] = useState();

  // const handleChange = (e) => {
  //   var num = e.target.value;
  //   setState(e.target.value);
  //   num = num.toString();
  //   // convertNumberToWords();
  //   // setOutput(e.target.value);
  //   // if (checkIsValid() === true) {
  //   var str = number2words(num);
  //   setOutput(str);
  //   // }
  // };
  const LoanAmountHandler = (e) => {
    setLoanAmount(e.target.value);
    var num = e.target.value;
    // setState(e.target.value);
    num = num.toString();
    // convertNumberToWords();
    // setOutput(e.target.value);
    // if (checkIsValid() === true) {
    var str = number2words(num);
    setOutput(str);
  };
  function number2words(n) {
    if (n < 20) {
      return numone[n];
    } else {
      var digit = n % 10;
      if (n < 100) {
        return tens[~~(n / 10) - 2] + (digit ? "-" + numone[digit] : "");
      } else if (n < 1000) {
        return (
          numone[~~(n / 100)] +
          " hundred" +
          (n % 100 === 0 ? "" : " and " + number2words(n % 100))
        );
      } else {
        if (n < 100000) {
          // return('less than 100000');
          return (
            number2words(~~(n / 1000)) +
            " thousand" +
            (n % 1000 !== 0 ? " " + number2words(n % 1000) : "")
          );
        } else {
          if (n < 10000000) {
            // return('less than 100000');
            return (
              number2words(~~(n / 100000)) +
              " lakh" +
              (n % 100000 !== 0 ? " " + number2words(n % 100000) : "")
            );
          } else {
            return (
              number2words(~~(n / 10000000)) +
              " Crore" +
              (n % 10000000 !== 0 ? " " + number2words(n % 10000000) : "")
            );
          }
        }
      }
    }

    // return (
    //   number2words(~~(n / 100000)) +
    //   " lakh" +
    //   (n % 100000 !== 0 ? " " + number2words(n % 100000) : "")
    // )
  }

  // const convertNumberToWords = () => {
  //   if (isNumber(loanAmount)) {
  //     const numberName = convertor.toWords(loanAmount);
  //     const final = upperCaseFirst(numberName);
  //     setOutput(final);
  //   }
  // };

  const checkIsValid = () => {
    if (loanAmount === undefined) {
      alert("Please Enter a value");
      return false;
    } else if (isNumber(loanAmount)) {
      return true;
    } else if (loanAmount.length >= 15) {
      alert("Number Is Too Long");
      return false;
    } else if (!isNumber(loanAmount)) {
      alert("Please Enter a Valid Number");
      return false;
    }
  };

  const checkFunc = () => {
    return (
      <>
        <div className="form-row my-3 row">
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              id="loanAmount"
              name="loanAmount"
              value={employeeProfile.loanAmount}
              onChange={ProfileChangeHandler}
              placeholder="Active Loan Amount"
            />
            {error?.loanAmount && (
              <div className="error-msg">{error.loanAmount}</div>
            )}
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              id="emi"
              name="emi"
              value={employeeProfile.emi}
              onChange={ProfileChangeHandler}
              placeholder="EMI per Month"
            />
            {error?.loanAmount && (
              <div className="error-msg">{error.loanAmount}</div>
            )}
          </div>
        </div>
      </>
    );
  };

  const professionLabelFunc = () => {
    return (
      <>
        <div className="form-row my-3 row">
          <div className="form-group col-md-4">
            <label>Last Year Income</label>
            {/* 
              <input
                type="text"
                className="form-control"
                id="lyst"
                name="lyst"
                value={lyst}
                onChange={LYSTHandler}
                disabled={validateSelectOptions()}
              /> */}
            <NumberFormat
              className="form-control"
              id="lyst"
              type="number"
              name="lyst"
              value={lyst}
              onChange={LYSTHandler}
              disabled={validateSelectOptions()}
              thousandSeparator={true}
            />
            {error?.LYST && <div className="error-msg">{error.LYST}</div>}
          </div>
          <div className="form-group col-md-4">
            <label>GST NO.</label>

            <input
              type="text"
              className="form-control"
              id="gst"
              name="gst"
              value={gst}
              onChange={GSTHandler}
              disabled={validateSelectOptions()}
            />
            {error?.GST && <div className="error-msg">{error.GST}</div>}
          </div>
          <div className="form-group col-md-4">
                        <label for="adhar">ITR Upload</label>
                        <input
                          type="file"
                          className="file-input"
                          name="adhaar"
                          id="adhaar"
                          onChange={AdhaarUpload}
                          disabled={validateSelectOptions()}
                        />
                      </div>
        </div>
      </>
    );
  };
  const ProfileChangeHandler = (e) => {
    e.preventDefault();
   
    const { name, value } = e.target;
    setEmployeeProfile({
      ...employeeProfile,
      [name]: value,
    });
    count = count + 1;  
   
  };
  
  const LinkClickHandler = () =>{
    basic = 0;
    let setstate = ""
    let setcity = "" 
    if(stateSelect.value !== undefined){
      setstate = stateSelect.value
    }
    
    if(citySelect.value !== undefined){
        setcity = citySelect.value
    }
    let profile = {
     loanAmount:loanAmount,
     loanPurpose:loanPurpose,
     profession:profession,
     FirstName: employeeProfile.fname,
     FatherName: employeeProfile.fathername,
     DOB: employeeProfile.dob,
     Mobile: employeeProfile.mobile,
     CurrentAddress: employeeProfile.address,
     AdhaarNo: employeeProfile.adhaarNo,
     PanNo: employeeProfile.panNo,
     ZIP: employeeProfile.zip,
     State: setstate,
     City: setcity,
   };

   
    obj = Validate(profile, rules.slice(0, 13));
    setError(obj);
   console.log(obj)
   
    console.log(basic,'basic 1')
   setBasicInformation(true)
   Object.keys(obj).map((ele)=>{
     console.log(obj[ele],'ooo')
       if(obj[ele] !== "" ||
       obj[ele] === null ||
       obj[ele] === undefined ){
         basic = 1 ;
        
       }
       else {
         basic = 0;
       }
     })
    //  if(!basic){
    //    console.log(basic,'basic 3')
    //    console.log(basicInformation,'basicinfo3')
    //    setBasicInformation(false);
    //    console.log(basicInformation,'basicinfo4')
      
    //      }

  }
 useEffect(()=>{
  LinkClickHandler();
 },[count , profession , loanAmount , loanPurpose , stateSelect , citySelect ])
  

  const SubmitDetails = async () => {
    let submit = 0;
    let employeeProfileForm = {
      FirstName: employeeProfile.fname,

      FatherName: employeeProfile.fathername,

      DOB: employeeProfile.dob,
      Mobile: employeeProfile.mobile,
      CurrentAddress: employeeProfile.address,

      State: stateSelect.value,
      City: citySelect.value,
      ZIP: employeeProfile.zip,
      CompanyName: employeeProfile.companyName,

      TotalExperience: employeeProfile.totalExperience,
      MonthlyIncome: employeeProfile.monthlyIncome,

      AdhaarNo: employeeProfile.adhaarNo,
      adhaar: adhaar,
      PanNo: employeeProfile.panNo,

      loanPurpose: loanPurpose,
      loanAmount: loanAmount,
      profession: profession,
      GST: gst,
      LYST: lyst,
    };
    const toWords = new ToWords({
      localeCode: "en-IN",
      converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: false,
      },
    });
    Object.keys(employeeProfileForm).map((key) => {
      console.log(gst + "" + lyst);
      if (professionLabel === "Bussiness") {
        if (
          employeeProfileForm[key] === "" ||
          employeeProfileForm[key] === null ||
          employeeProfileForm[key] === undefined
        ) {
          submit = 1;
        }
      } else if (professionLabel === "Salried") {
        if (
          employeeProfileForm[key] === "" ||
          employeeProfileForm[key] === null ||
          employeeProfileForm[key] === undefined
        ) {
          submit = submit + 1;
        }
      }
    });

    console.log("req:", employeeProfileForm);

    if (submit === 2) {
      submit = 0;
    }

    let obj = Validate(employeeProfileForm, rules);
    Object.keys(obj).map((key) => {
      if (obj[key] !== "") {
        submit = 1;
      }
      return true;
    });

    setError(obj);

    console.log(error, "error");
    if (submit === 0) {
      const formData = new FormData();
      for (const key in employeeProfileForm) {
        const element = employeeProfileForm[key];
        if ([key] !== undefined) {
          formData.append([key], element);
        }
        console.log([key]);
      }

      console.log("req111:", formData);

      try {
        console.log("xios");
        const upload = await axios.post("/kycDetails", formData, {
          withCredentials: true,
        });

        console.log(upload.data.status, upload.data.status === 401, "upload");
        setEmployeeProfile({
          ...employeeProfile,
          fname: "",
          // lname: '',
          fathername: "",
          // email: '',
          dob: "",
          mobile: "",
          address: "",
          // address2: '',
          zip: "",
          companyName: "",
          // designation: '',
          // currentCompanyExperience: '',
          totalExperience: "",
          monthlyIncome: "",
          // annualIncome: '',
          adhaarNo: "",
          panNo: "",
          // bankName: '',
          // accountNo: '',
          // IFSCcode: '',
          loanAmount: "",
          emi: "",
        });
        // setPan('');
        setAdhaar("");
        // setBankStmt('');
        // setPhoto('');
        setLoanPurpose("");
        setLoanAmount("");
        setProfession("");
        if (upload.data.status === 401) {
          window.alert(upload.data.message);
        } else if (upload.data.status === 200) {
          modelRef.current.click();
          setMessage(upload.data.message);
        }
      } catch (err) {
        console.log("err", err);
      }
    } else {
      toastr.success("please fill all the field carefully");
    }
  };

 
  

  console.log(error,'errrrr')

  return (
    <>
      <div className="form-padding">
        <div className="row my-3">
          <div className="form-group col-md-4">
            <Select
              placeholder="Loan Types"
              id="loanPurpose"
              name="loanPurpose"
              options={LoanPurpose}
              onChange={LoanPurposeHandler}
            />
            {error?.loanPurpose && (
              <div className="error-msg">{error.loanPurpose}</div>
            )}
          </div>
          <div className="form-group col-md-4">
            <Select
              placeholder="Profession"
              id="profession"
              name="profession"
              options={Profession}
              onChange={ProfessionHandler}
            />
            {error?.profession && (
              <div className="error-msg">{error.profession}</div>
            )}
          </div>
          <div className="form-group col-md-4">
            <input
              type="number"
              className="form-control"
              id="loanAmount"
              name="loanAmount"
              onChange={LoanAmountHandler}
              maxlength="9"
              value={loanAmount}
              placeholder="Loan Amount"
            />
            {error?.loanAmount && (
              <div className="error-msg">{error.loanAmount}</div>
            )}
            <span style={{ fontWeight: "bold", fontSize: "4px" }}></span>
            {output}
          </div>
        </div>
        <div>
          <div className="col-12 m-auto">
            <form action="" id="registration" encType="multipart/form-data">
              <nav className="recent-sales-box-nav">
                <div
                  className="nav nav-pills nav-fill"
                  id="nav-tab"
                  role="tablist"
                >
                  <Link
                    className="nav-link active recent-nav-tab"
                    id="step1-tab"
                    data-bs-toggle="tab"
                    to="#step1"
                    ref={BasicDetails}
                  >
                    Basic Information
                  </Link>
                  <Link
                    className="nav-link  recent-nav-tab"
                    id="step2-tab"
                    data-bs-toggle="tab"
                    to="#step2"
                    ref={EmployeeDatails}
                    disabled={basic}
                    onClick={LinkClickHandler}
                    
                  >
                    Employement Details
                  </Link>
                </div>
              </nav>

              <div className="tab-content ">
                <div className="tab-pane fade show active" id="step1">
                  <div className="form-1">
                    <div className="form-row row">
                      <div className="form-group col-md-3">
                        <label>Mobile Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="mobile"
                          name="mobile"
                          value={employeeProfile.mobile}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                        {error?.Mobile && (
                          <div className="error-msg">{error.Mobile}</div>
                        )}
                      </div>
                      <div className="form-group col-md-3">
                        <label>Name (As Per Pan)</label>
                        <input
                          type="text"
                          className="form-control "
                          id="fname"
                          name="fname"
                          value={employeeProfile.fname}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                        {error?.FirstName && (
                          <div className="error-msg">{error.FirstName}</div>
                        )}
                      </div>

                      <div className="form-group col-md-3">
                        <label>Father's Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fathername"
                          name="fathername"
                          value={employeeProfile.fathername}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                        {error?.FatherName && (
                          <div className="error-msg">{error.FatherName}</div>
                        )}
                      </div>
                      <div className="form-group col-md-3">
                        <label>Date Of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          id="dob"
                          maxDate="new Date()"
                          name="dob"
                          value={employeeProfile.dob}
                          onChange={ProfileChangeHandler}
                          placeholder="Date Of Birth"
                          disabled={validateSelectOptions()}
                        />
                        {error?.DOB && (
                          <div className="error-msg">{error.DOB}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-row row my-3">
                      <div className="form-group col-md-4">
                        <label>Aadhar Card no.</label>
                        <input
                          type="text"
                          className="form-control"
                          id="adhaarNo"
                          name="adhaarNo"
                          placeholder="Adhar Card number"
                          value={employeeProfile.adhaarNo}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                        {error?.AdhaarNo && (
                          <div className="error-msg">{error.AdhaarNo}</div>
                        )}
                      </div>

                      <div className="form-group col-md-4">
                        <label>PAN Card no.</label>
                        <input
                          type="text"
                          className="form-control"
                          id="panNo"
                          name="panNo"
                          value={employeeProfile.panNo}
                          onChange={ProfileChangeHandler}
                          placeholder="PAN-Card number"
                          disabled={validateSelectOptions()}
                        />
                        {error?.PanNo && (
                          <div className="error-msg">{error.PanNo}</div>
                        )}
                      </div>
                      <div className="form-group  col-md-4">
                        <label>address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={employeeProfile.address}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                        {error?.CurrentAddress && (
                          <div className="error-msg">
                            {error.CurrentAddress}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-row my-3 row">
                    <div className="form-row my-3 row">
                      <div className="form-group col-md-4">
                        <label>State</label>
                        <Select
                          placeholder="Select-State"
                          id="state"
                          name="state"
                          options={state}
                          onChange={stateChange}
                        />
                        {error?.State && (
                          <div className="error-msg">{error.State}</div>
                        )}
                      </div>
                      <div className="form-group col-md-4">
                        <label>City</label>
                        <Select
                          isDisabled={!code.stateCode}
                          placeholder="city"
                          id="workExperience"
                          name="workExperience"
                          options={city}
                          onChange={cityChange}
                        />
                        {error.City && (
                          <div className="error-msg">{error.City}</div>
                        )}
                      </div>
                      <div className="form-group col-md-4">
                        <label>PIN Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          name="zip"
                          value={employeeProfile.zip}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                        {error?.ZIP && (
                          <div className="error-msg">{error.ZIP}</div>
                        )}
                      </div>
                    </div>
                    <div className="row justify-content-between my-3">
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn form-btn"
                          data-enchanter="next"
                          onClick={ClickEmployeeDetails}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="step2">
                  <div className="form-2">
                    <div className="form-row row my-3">
                      <div className="form-group col-md-4">
                        <label>
                          {professionLabel === "Salried"
                            ? "Employer Name"
                            : "Firm Name"}
                          {/* {(professionLabel === 'Bussiness') ? "Employer" : "Firm Name"} */}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="companyName"
                          name="companyName"
                          value={employeeProfile.companyName}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                        {error?.CompanyName && (
                          <div className="error-msg">{error.CompanyName}</div>
                        )}
                      </div>

                      <div className="form-group col-md-4">
                        <label>
                          {professionLabel === "Salried"
                            ? "Total Experience "
                            : "Total Business years"}
                        </label>

                        <Select
                          placeholder="Select"
                          id="totalExperience"
                          name="totalExperience"
                          options={TotalWorkExperience}
                          onChange={TotalWorkExperienceHandler}
                        />
                        {error?.TotalExperience && (
                          <div className="error-msg">
                            {error.TotalExperience}
                          </div>
                        )}
                      </div>
                      <div className="form-group col-md-4">
                        <label>
                          {professionLabel === "Salried"
                            ? "MonthlyIncome"
                            : "Current Year Income"}
                        </label>

                        <NumberFormat
                          className="form-control"
                          id="montlyIncome"
                          type="number"
                          name="monthlyIncome"
                          value={employeeProfile.monthlyIncome}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                          thousandSeparator={true}
                        />
                        {error?.MonthlyIncome && (
                          <div className="error-msg">{error.MonthlyIncome}</div>
                        )}
                      </div>
                      
                    </div>
                    <div className="form-row my-3 row"></div>
                    {professionLabel === "Bussiness"
                      ? professionLabelFunc()
                      : ""}

                    <div className="form-row my-3 row">
                      <div className="form-group col-md-6">
                        <input
                          type="checkbox"
                          id="HaveLoan"
                          name="HaveLoan"
                          value="1"
                          onChange={changeBox}
                          disabled={validateSelectOptions()}
                        />
                        <label for="vehicle1">already have a Loan</label>
                        <br />
                      </div>
                    </div>
                    {checkBoxStatus ? checkFunc() : ""}
                    <div className="row justify-content-between my-3">
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn form-btn"
                          onClick={BasicDetailsFunc}
                        >
                          Previous
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn form-btn"
                          onClick={SubmitDetails}
                        >
                          Finish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="step3">
                  <div className="form-3">
                    <div className="form-row row my-3"></div>
                    <div className="form-row row my-3"></div>
                    <div className="form-row row my-3"></div>
                    <div className="form-row row my-3"></div>
                  </div>
                </div>
              </div>
            </form>
            <label>Note: if you don't have any info type NA or 0 </label>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary d-none"
        ref={modelRef}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                status
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{message}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanForm;

const rules = [
  {
    field: "loanAmount",
    fieldName: "Loan Amount",
    type: "loanAmount",
    required: true,
  },
  {
    field: "loanPurpose",
    fieldName: "Loan Types",
    type: "loanPurpose",
    required: true,
  },
  {
    field: "profession",
    fieldName: "Profession",
    type: "profession",
    required: true,
  },
  {
    field: "FirstName",
    fieldName: "FirstName",
    type: "FirstName",
    required: true,
  },
  {
    field: "FatherName",
    fieldName: "FatherName",
    type: "FatherName",
    required: true,
  },
  {
    field: "DOB",
    fieldName: "DOB",
    type: "DOB",
    required: true,
  },
  {
    field: "Mobile",
    fieldName: "Mobile",
    type: "Mobile",
    required: true,
  },
  {
    field: "CurrentAddress",
    fieldName: "address",
    type: "CurrentAddress",
    required: true,
  },
  {
    field: "AdhaarNo",
    fieldName: "AdhaarNo",
    type: "AdhaarNo",
    required: true,
  },
  {
    field: "PanNo",
    fieldName: "PAN-Card number",
    type: "PanNo",
    required: true,
  },
  {
    field: "ZIP",
    fieldName: "PIN code",
    type: "ZIP",
    required: true,
  },
  {
    field: "State",
    fieldName: "State",
    type: "State",
    required: true,
  },
  {
    field: "City",
    fieldName: "City",
    type: "City",
    required: true,
  },
  {
    field: "CompanyName",
    fieldName: "CompanyName",
    type: "CompanyName",
    required: true,
  },

  {
    field: "GST",
    fieldName: "GST",
    type: "CompanyName",
    required: true,
  },
  {
    field: "LYST",
    fieldName: "LYST",
    type: "LYST",
    required: true,
  },

  {
    field: "MonthlyIncome",
    fieldName: "MonthlyIncome",
    type: "MonthlyIncomeg",
    required: true,
  },

  {
    field: "TotalExperience",
    fieldName: "TotalExperience",
    type: "TotalExperience",
    required: true,
  },

  
];
