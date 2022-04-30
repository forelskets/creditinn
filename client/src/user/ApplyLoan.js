import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import LoanForm from "./LoanForm";
import Apply from "./Apply";
import Bank from "./Bank";
import Emi from "./emi";
import axios from "axios";
import ShareModalc from "./ShareModal";
import ProductModal from "./ProductModal";
import { Card, Button } from "react-bootstrap";
import { ApplyLoans } from "../_services/Admin.services/index";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
} from "react-share";
var id = "";

const ApplyLoan = () => {
  const shareUrl = "www.creditsin.com/form ";
  const [profile, setProfile] = useState({});
  const [lstatus, setLstatus] = useState(false);
  const [sharemodal, setSharemodal] = useState(false);
  const [productmodal, setProductmodal] = useState(false);
  const [userKycData, setUserKycData] = useState({});
  const [userEmpDetailsData, setUserEmpDetailsData] = useState({});
  const [userProfileData, setUserProfileData] = useState({});
  const [profileImage ,setProfileImage] = useState();

  const ShareModal = () => {
    console.log("shareModal");
    setProductmodal(false);
    setSharemodal(!sharemodal);
  };
  const ProductModals = () => {
    console.log("productModalApplyLoanr");
    setSharemodal(false);
    setProductmodal(true);
    console.log(productmodal, "productMOdal");
  };
  const LoanFunc = () => {
    setLstatus(!lstatus);
  };
  const getApplyLoan = async () => {
  
    console.log(profile._id, "dddddddddddd");
    const res = await ApplyLoans(profile._id);
    if (res.status === 1) {
      setUserKycData(res.data.kycData[0]);
      console.log(res.data.kycData, "kycData");

      setUserEmpDetailsData(res.data.empDetailsData[0]);
      setUserProfileData(res.data.profileData[0]);
    }
  };
  console.log(
    "userkyc",
    userKycData,
    "useremployeeDetails",
    userEmpDetailsData,
    "userProfile",
    userProfileData
  );

  useEffect(() => {
   if(!profile._id){
     callUserMainPage();
   }

   else if(profile._id){
      getApplyLoan();
      console.log("use efffect")
   }
    
  },[profile._id]);

  const history = useHistory();
  const callUserMainPage = async (req, res) => {
    try {
      const res = await fetch("/userMain", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      
      console.log(res);
      if (res.status === 401) {
        history.push("/");
      }
      setProfile(data);
      const Img  = JSON.parse(data.PhotoURL);
      setProfileImage(Img)
      id = data._id;
    } catch (err) {
      console.log(err);
    }
  };

  const ImageUploader = async (e) =>{
    console.log(e.target.files[0],"gggg")
    const formdata = new FormData();
    formdata.append('profileImag', e.target.files[0])
   
    const response = await axios.post('/user/propfileImgUpdate',formdata)
    if(response.status === 1){
      alert(response.message)
    }else if(response.status === 0){
      alert(response.message)
    }
  }

  return (
    <div>
      {console.log(profileImage?.filePath, profile , "Profileeeeeee")}
      <section>
        <div className="home-content">
          <div className="container">
            <div className="row">
              <div className="sales-boxes">
                <div className="col-sm-9 ">
                  <div className="row">
                    <div className="overview-boxes">
                      <div className=" col-sm-4">
                        <Card style={{ width: "19rem" }}>
                          <Card.Img variant="top" src=" images/1.png" />
                          <Card.Body>
                            {/* <Card.Title>Card Title</Card.Title> */}

                            <Button className="btn-3" onClick={ProductModals}>
                              Apply{" "}
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className=" col-sm-4">
                        <Card style={{ width: "19rem" }}>
                          <Card.Img variant="top" src=" images/2.png" />
                          <Card.Body>
                            {/* <Card.Title>Card Title</Card.Title> */}

                            <Button className="btn-3" onClick={ProductModals}>
                              Apply{" "}
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className=" col-sm-4">
                        <Card style={{ width: "19rem" }}>
                          <Card.Img variant="top" src=" images/3.png" />
                          <Card.Body>
                            {/* <Card.Title>Card Title</Card.Title> */}

                            <Button className="btn-3" onClick={ProductModals}>
                              Apply{" "}
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>

                      {/* <div className="box col-sm-4">
                        <img
                          src="images/home.webp"
                          style={{ height: "120px", width: "300px" }}
                        />
                      </div> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="overview-boxes">
                      <div className=" col-sm-4">
                        <Card style={{ width: "19rem" }}>
                          <Card.Img variant="top" src=" images/4.png" />
                          <Card.Body>
                            {/* <Card.Title>Card Title</Card.Title> */}

                            <Button className="btn-3" onClick={ProductModals}>
                              Apply{" "}
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>

                      <div className=" col-sm-4">
                        <Card style={{ width: "19rem" }}>
                          <Card.Img variant="top" src=" images/5.png" />
                          <Card.Body>
                            {/* <Card.Title>Card Title</Card.Title> */}

                            <Button className="btn-3" onClick={ProductModals}>
                              Apply{" "}
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className=" col-sm-4">
                        <Card style={{ width: "19rem" }}>
                          <Card.Img variant="top" src=" images/6.png" />
                          <Card.Body>
                            {/* <Card.Title>Card Title</Card.Title> */}

                            <Button className="btn-3" onClick={ProductModals}>
                              Apply{" "}
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row pb-5">
                    <div className="recent-sales box ">
                      <div
                        className="row-title  py-3"
                        style={{ cursor: "pointer" }}
                        onClick={ProductModals}
                      >
                        Apply For Products
                      </div>
                      
                    </div>
                  </div> */}
                  <div className="row pb-5">
                    <div className="recent-sales box ">
                      <div
                        className="row-title mb-3 py-3"
                        style={{ cursor: "pointer" }}
                        onClick={LoanFunc}
                      >
                        Apply For Loans
                      </div>
                      {lstatus ? (
                        <LoanForm
                          userProfileData={userProfileData}
                          userKycData={userKycData}
                          userEmpDetailsData={userEmpDetailsData}
                          getApplyLoan = {getApplyLoan}
                          LoanFunc={LoanFunc}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row pb-5">
                    <div className="recent-sales box">
                      <Emi />
                    </div>
                  </div>
                  <div className="row pb-5">
                    <div className="recent-sales box">
                      <Apply />
                    </div>
                  </div>

                  <div className="row">
                    <div className="recent-sales box">
                      <Bank />
                    </div>
                  </div>
                </div>

                <div className="top-sales box profile-card col-sm-3">
                  <div className="col">
                   
                  </div>

                  <div className="title">Profile</div>
                  <ul className="top-sales-details">
                    <li>
                      <NavLink to="#">
                        
                        <img src={profileImage?.filePath} alt="" />
                        
                        <span className="profile-name">{profile.Name}</span>
                      </NavLink>
                      <input type='file' name="profileImage" accept="image/*" onChange={ImageUploader}/>
                    </li>

                    <Button className="btn-3">{profile.RefralNo}</Button>

                    <FacebookShareButton
                      url={"www.creditsin.com"}
                      quote={"HI " + profile.RefralNo}
                      style={{ padding: 10 }}
                    >
                      <FacebookIcon size={40} />
                    </FacebookShareButton>
                    <EmailShareButton
                      url={profile.RefralNo}
                      subject="subject"
                      body={"hey there, pls share my referal code"}
                    >
                      <EmailIcon size={40} />
                    </EmailShareButton>

                    <WhatsappShareButton
                      url={profile.RefralNo}
                      subject="subject"
                      body={"hey there, pls share my referal code"}
                      style={{ padding: 10 }}
                    >
                      <WhatsappIcon size={40} />
                    </WhatsappShareButton>

                    <Button className="btn-3" onClick={ShareModal}>
                      Share Refral{" "}
                    </Button>
                    <br />
                    {/* <button type="button" onClick={ProductModals}>Product</button> */}

                    <br />
                    <li>
                      <span className="left-text"> name </span>
                      <input
                        type="text"
                        className="input-area"
                        value={profile.Name}
                        disabled
                      />
                    </li>
                    <li>
                      <span className="left-text">mobile no.</span>
                      <input
                        type="text"
                        className="input-area"
                        value={profile.Mobile}
                        disabled
                      />
                    </li>
                    <li>
                      <span className="left-text">EMAIL ID</span>
                      <input
                        type="text"
                        className="input-area"
                        value={profile.Email}
                        disabled
                      />
                    </li>
                    <li>
                      <span className="left-text">password </span>
                      <input
                        type="password"
                        className="input-area"
                        value={profile.password}
                        disabled
                      />
                    </li>
                  </ul>
                  {/* <button className="btns">Edit</button> */}

                  <div className="col">
                    <div className="overview-boxes">
                      <div className="box1 col-sm-12">
                        <div className="right-side">
                          <div className="box-topic">Active Loans</div>
                          <div className="number">0</div>
                        </div>
                        <i className="fas fa-money-bill-wave-alt"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {console.log(profile.RefralNo, "ccc", productmodal)}
      {sharemodal ? (
        <ShareModalc
          sharemodal={sharemodal}
          InputValue="SHAREINPUT"
          id={profile._id}
          refral={profile.RefralNo}
        />
      ) : (
        ""
      )}
      {productmodal ? (
        <ProductModal
          productmodal={productmodal}
          InputValue="PRODUCTINPUT"
          profile={profile}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ApplyLoan;
