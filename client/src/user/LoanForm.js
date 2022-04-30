import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import toastr from "toastr";
import isNumber from "is-number";
import { Country, State, City } from "country-state-city";
import input from "react-number-format";
import { ToWords } from "to-words";
import { Validate } from "../_helper/Validation/Validate";

var obj = {};
var count = 0 ;


const eye = { fontSize: "15px", height: "0px" };
var basic = 1;
const LoanForm = (props) => {
  const history = useHistory();
  const [formvalidation , setFormvalidation] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const modelRef = useRef(null);
  // const [pan, setPan] = useState('');
  const [itrUpload, setItrUpload] = useState("");
  // const [bankStmt, setBankStmt] = useState('');
  // const [photo, setPhoto] = useState('');
  const [profession, setProfession] = useState("");
  const [professionLabel, setProfessionLabel] = useState("");
  const [gst, setGst] = useState(
    props.userEmpDetailsData.Gst ? props.userEmpDetailsData.Gst : ""
  );
  const [lastYearIncome, setLastYearIncome] = useState(
    props.userEmpDetailsData.Lyst ? props.userEmpDetailsData.Lyst : ""
  );
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
    fname: props.userProfileData.FirstName
      ? props.userProfileData.FirstName
      : "",
    fathername: props.userProfileData.FatherName
      ? props.userProfileData.FatherName
      : "",
    dob: "",
    mobile: props.userProfileData.Mobile ? props.userProfileData.Mobile : "",
    address: props.userProfileData.CurrentAddress
      ? props.userProfileData.CurrentAddress
      : "",
    zip: props.userProfileData.ZIP ? props.userProfileData.ZIP : "",
    companyName: props.userEmpDetailsData.CompanyName
      ? props.userEmpDetailsData.CompanyName
      : "",
    monthlyIncome: props.userEmpDetailsData.MonthlyIncome
      ? props.userEmpDetailsData.MonthlyIncome
      : "",
    adhaarNo: props.userKycData.AdhaarNo ? props.userKycData.AdhaarNo : "",
    panNo: props.userKycData.PanNo ? props.userKycData.PanNo : "",
    firmName: props.userEmpDetailsData.FirmName ? props.userEmpDetailsData.FirmName : "",
    businessExperience:  "",
    currentYearIncome: props.userEmpDetailsData.CurrentYearIncome ? props.userEmpDetailsData.CurrentYearIncome :"",
    totalExperience: "",
    activeLoanAmount: "",
    emi: "",
  });

  const [code, setCode] = useState({
    stateCode: "",
    cityCode: "",
  });

  const state = [];
  const city = [];

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

  const LastYearIncomeHandler = (e) => {
    setLastYearIncome(e.target.value);
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

  const TotalBusinessExperience = [
    { value: "1 or less then years", label: "1 or less then years" },
    { value: "1 to 2  years", label: "1 to 2 years" },
    { value: "2 to 3 years", label: "2 or 3 years" },
    { value: "More than 3 years", label: "More Than 3 years" },
  ];

  const TotalBusinessExperienceHandler = (tat) => {
    setEmployeeProfile({
      ...employeeProfile,
      businessExperience: tat.value,
    });
  };

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
   
      setFormvalidation(false)
    
   
  };

  const ITRUploadHandler = (e) => {
    setItrUpload(e.target.files[0]);
  };

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
              type="number"
              className="form-control"
              id="activeLoanAmount"
              name="activeLoanAmount"
              value={employeeProfile.activeLoanAmount}
              onChange={ProfileChangeHandler}
              placeholder="Active Loan Amount"
            />
            {error?.loanAmount && (
              <div className="error-msg">{error.ActiveLoanAmount}</div>
            )}
          </div>
          <div className="form-group col-md-6">
            <input
              type="number"
              className="form-control"
              id="emi"
              name="emi"
              value={employeeProfile.emi}
              onChange={ProfileChangeHandler}
              placeholder="EMI per Month"
            />
            {error?.emi && (
              <div className="error-msg">{error.Emi}</div>
            )}
          </div>
        </div>
      </>
    );
  };

  const ProfessionLabelSalaried = () => {
    return (
      <>
        <div className="form-row row my-3">
          <div className="form-group col-md-4">
            <label>Employer Name </label>
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
            <label> Total Experience </label>

            <Select
              placeholder="Select"
              id="totalWorkExperience"
              name="totalWorkExperience"
              options={TotalWorkExperience}
              onChange={TotalWorkExperienceHandler}
            />
            {error?.TotalExperience && (
              <div className="error-msg">{error.TotalExperience}</div>
            )}
          </div>
          <div className="form-group col-md-4">
            <label>MonthlyIncome</label>

            <input
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
      </>
    );
  };

  const ProfessionLabelFunc = () => {
    return (
      <>
        <div className="form-row row my-3">
          <div className="form-group col-md-4">
            <label>Firm Name </label>
            <input
              type="text"
              className="form-control"
              id="firmName"
              name="firmName"
              value={employeeProfile.firmName}
              onChange={ProfileChangeHandler}
              disabled={validateSelectOptions()}
            />
            {error?.FirmName && (
              <div className="error-msg">{error.FirmName}</div>
            )}
          </div>

          <div className="form-group col-md-4">
            <label> Total Business years</label>
            
            <Select
              placeholder="Select"
              id="businessExperience"
              name="businessExperience"
              options={TotalBusinessExperience}
              onChange={TotalBusinessExperienceHandler}
            />
            {error?.TotalBusinessExperience && (
              <div className="error-msg">{error.TotalBusinessExperience}</div>
            )}
          </div>
          <div className="form-group col-md-4">
            <label>Current Year Income</label>

            <input
              className="form-control"
              id="currentYearIncome"
              type="number"
              name="currentYearIncome"
              value={employeeProfile.currentYearIncome}
              onChange={ProfileChangeHandler}
              disabled={validateSelectOptions()}
             
            />
            {error?.CurrentYearIncome && (
              <div className="error-msg">{error.CurrentYearIncome}</div>
            )}
          </div>
        </div>
        <div className="form-row my-3 row">
          <div className="form-group col-md-4">
            <label>Last Year Income</label>
            
            <input
              className="form-control"
              id="lastYearIncome"
              type="number"
              name="lastYearIncome"
              value={lastYearIncome}
              onChange={LastYearIncomeHandler}
              disabled={validateSelectOptions()}
              
            />
            {error?.LastYearIncome && (<div className="error-msg">{error.LastYearIncome}</div>)}
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
            {error?.GST && (<div className="error-msg">{error.GST}</div>)}
          </div>
          <div className="form-group col-md-4">
            <label for="itrUploads">ITR Upload</label>
            <input
              type="file"
              className="file-input"
              name="itrUpload"
              id="itrUpload"
              onChange={ITRUploadHandler}
              disabled={validateSelectOptions()}
            />
            {error?.ITRUpload && (<div className="error-msg">{error.ITRUpload}</div>)}
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
    if(count === 0){
      count = count + 1;
    }else{
      count = 0 ;
    }
  
  };

  const LinkClickHandler = () => {
    setError("");
    basic = 0;
    let setstate = "";
    let setcity = "";
    if (stateSelect.value !== undefined) {
      setstate = stateSelect.value;
    }

    if (citySelect.value !== undefined) {
      setcity = citySelect.value;
    }
    let profile = [
      {CompanyName: employeeProfile.companyName},
      {TotalExperience: employeeProfile.totalExperience},
      {MonthlyIncome: employeeProfile.monthlyIncome},
      {loanAmount: loanAmount},
      {loanPurpose: loanPurpose},
      {profession: profession},
      {FirstName: employeeProfile.fname},
      {FatherName: employeeProfile.fathername},
      {DOB: employeeProfile.dob},
      {Mobile: employeeProfile.mobile},
      {CurrentAddress: employeeProfile.address},
      {AdhaarNo: employeeProfile.adhaarNo},
      {PanNo: employeeProfile.panNo},
      {ZIP: employeeProfile.zip},
      {State: setstate},
      {City: setcity},
     
      {FirmName: employeeProfile.firmName},
      {TotalBusinessExperience: employeeProfile.businessExperience},
      {CurrentYearIncome: employeeProfile.currentYearIncome},
      {LastYearIncome: lastYearIncome},
      {GST: gst},
      {ITRUpload: itrUpload}
    ];

    if(!formvalidation){
      obj = Validate(profile.slice(3,16), rules);
      console.log(formvalidation , "formvalidation 1")

   
    } 
    else if(formvalidation){
      if (professionLabel === "Salried"){
        obj = Validate(profile.slice(0,3), rules);
        console.log(formvalidation , "formvalidation 1")
      }else{
        obj = Validate(profile.slice(16 , ), rules);
        console.log(formvalidation , "formvalidation 2")
      }
    
    }
    
    setError(obj);
    console.log(formvalidation)
    console.log(obj);

    console.log(basic, "basic 1");
    setBasicInformation(true);
    Object.keys(obj).map((ele) => {
      console.log(obj[ele], "ooo");
      if (obj[ele] !== "" || obj[ele] === null || obj[ele] === undefined) {
        
        basic = 1;
        console.log(obj[ele])
        
      } else {
       
        
        basic = 0;
        
       
        
      }
    });
   
   if(basic === 0){
     setFormvalidation(true)
   }
    
  };



  
  useEffect(() => {
   
      LinkClickHandler();
    
   
  }, [count , employeeProfile.totalExperience,employeeProfile.businessExperience, itrUpload , lastYearIncome, gst , profession, loanAmount, loanPurpose, stateSelect, citySelect]);

  const SubmitDetails = async () => {
    console.log(professionLabel , "professionLabel")
    let submit = 0;
    let employeeProfileForm = {}
    if(professionLabel === "Salried" ){
    employeeProfileForm = {
      Mobile: employeeProfile.mobile,
        FirstName: employeeProfile.fname,
        FatherName: employeeProfile.fathername,
        DOB: employeeProfile.dob,
        AdhaarNo: employeeProfile.adhaarNo,
        PanNo: employeeProfile.panNo,
        CurrentAddress: employeeProfile.address,
        State: stateSelect.value,
        City: citySelect.value,
        ZIP: employeeProfile.zip,
        CompanyName: employeeProfile.companyName,
        TotalExperience: employeeProfile.totalExperience,
        MonthlyIncome: employeeProfile.monthlyIncome,
        loanAmount: loanAmount,
        loanPurpose: loanPurpose,
        profession: profession,
     
    }}else{
      employeeProfileForm ={
        Mobile: employeeProfile.mobile,
        FirstName: employeeProfile.fname,
        FatherName: employeeProfile.fathername,
        DOB: employeeProfile.dob,
        AdhaarNo: employeeProfile.adhaarNo,
        PanNo: employeeProfile.panNo,
        CurrentAddress: employeeProfile.address,
        State: stateSelect.value,
        City: citySelect.value,
        ZIP: employeeProfile.zip,
        FirmName: employeeProfile.firmName,
        TotalBusinessExperience: employeeProfile.businessExperience,
        CurrentYearIncome: employeeProfile.currentYearIncome,
        LastYearIncome: lastYearIncome,
        GST: gst,
        ITRUpload: itrUpload,
        loanAmount: loanAmount,
        loanPurpose: loanPurpose,
        profession: profession,
     
               
 
      }
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
      
      if (professionLabel === "Bussiness") {
        if (
          employeeProfileForm[key] === "" ||
          employeeProfileForm[key] === null ||
          employeeProfileForm[key] === undefined
        ) {
          submit = 1;
          console.log(submit , "business submit",key)
        }
      } else if (professionLabel === "Salried") {
        if (
          employeeProfileForm[key] === "" ||
          employeeProfileForm[key] === null ||
          employeeProfileForm[key] === undefined
        ) {
          submit = 1;
          console.log(submit , "salried submit")
        }
      }
    });

    console.log("req:", employeeProfileForm);

   

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
          formData.append(key, element);
          console.log(key, element);
        }
        
      }

      if(employeeProfile.activeLoanAmount){
        formData.append("ActiveLoanAmount" , employeeProfile.activeLoanAmount);
        formData.append("Emi" , employeeProfile.emi);
        employeeProfileForm["ActiveLoanAmount"] = employeeProfile.activeLoanAmount
        employeeProfileForm["Emi"] = employeeProfile.emi
      }

      console.log("req111:", employeeProfileForm);
      
      try {
        var upload = {}
        console.log("xios");
        if(professionLabel === 'Salried'){
          upload = await axios.post("/kycDetailSalried", employeeProfileForm , {
            withCredentials: true,
          });   
        }
        else{
          upload = await axios.post("/kycDetails", formData , {
            withCredentials: true,
          });
        }
      

      

        if (upload.data.status === 401) {
          console.log(upload.data.status,"401")
          window.alert(upload.data.message);
        } else if(upload.data.status === 200) {
          console.log(upload.data.status,"200")
          modelRef.current.click();
          setMessage(upload.data.message);
          props.LoanFunc();
          setTimeout(() => {
            console.log("setTimeout");
            history.push("/nav");
          }, 4000);
          props.getApplyLoan();
        }
      } catch (err) {
        console.log("err", err);
      }
    } else {
      toastr.success("please fill all the field carefully");
    }
   
  };

  console.log(error, "errrrr");

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
                    onClick={BasicDetailsFunc}
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
                    <div className="form-row my-3 row"></div>
                    {professionLabel === "Bussiness" ? 
                      ProfessionLabelFunc()
                    : 
                      ProfessionLabelSalaried()
                    }

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
    field: "Mobile",
    fieldName: "Mobile",
    type: "Mobile",
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
    field: "CurrentAddress",
    fieldName: "address",
    type: "CurrentAddress",
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
    field: "ZIP",
    fieldName: "PIN code",
    type: "ZIP",
    required: true,
  },
  {
    field: "FirmName",
    fieldName: "FirmName",
    type: "FirmName",
    required: true,
  },
  {
    field: "TotalBusinessExperience",
    fieldName: "TotalBusinessExperience",
    type: "TotalBusinessExperience",
    required: true,
  },
  {
    field: "CurrentYearIncome",
    fieldName: "CurrentYearIncome",
    type: "CurrentYearIncome",
    required: true,
  },
  {
    field: "LastYearIncome",
    fieldName: "LastYearIncome",
    type: "LastYearIncome",
    required: true,
  },
  {
    field: "GST",
    fieldName: "GST",
    type: "GST",
    required: true,
  },
  {
    field: "ITRUpload",
    fieldName: "ITRUpload",
    type: "ITRUpload",
    required: true,
  },
  
 
  {
    field: "CompanyName",
    fieldName: "CompanyName",
    type: "CompanyName",
    required: true,
  },
  {
    field: "TotalExperience",
    fieldName: "TotalExperience",
    type: "TotalExperience",
    required: true,
  },
  {
    field: "MonthlyIncome",
    fieldName: "MonthlyIncome",
    type: "MonthlyIncome",
    required: true,
  },
];
