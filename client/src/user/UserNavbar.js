import React from "react";

import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { success } from "toastr";
import { ApplicationsById } from "../_services/Admin.services";
import { myrefral } from "../_services/Refral.services/index";
var Success = 0;

const UserNavbar = () => {
  const modelRef = useRef(false);
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [refralMessage, setRefralMessage] = useState("");
  const [applicationMessage, setApplicationMessage] = useState("");
  const [refralData, setRefralData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const profileFunc = async () => {
    const response = await fetch("/profile", {
      method: "GET",
      headers: {
        Accept: "application/josn",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    setProfile(data);
  };
  const logOutFunc = async () => {
    const response = await fetch("/userLogout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      history.push("/");
    }
  };

  useEffect(() => {
    profileFunc();
    Success = 1;
  }, []);

  if (Success === 1 && profile) {
    const getMyRefral = async (req, res) => {
      console.log(profile);
      console.log(profile._id);
      var response = await myrefral(profile._id);

      if (response.status === 0) {
        setRefralMessage(response.message);
      } else {
        setRefralData(response.data.referraldata);
      }
    };
    getMyRefral();

    const getApplications = async (req, res) => {
      var response = await ApplicationsById(profile._id);

      if (response.status === 0) {
        setApplicationMessage(response.message);
        console.log(response.message, "resmessage");
        console.log(applicationMessage, "appmsg");
      } else {
        setApplicationData(response.data.service);
      }
    };

    getApplications();

    Success = 0;
  }

  const ModelRef = () => {
    modelRef.current.click();
  };

  return (
    <>
      <nav>
        <div>
          <div className="logo-container">
            <img
              style={{ height: "70px" }}
              src="images/logo.png"
              className="d-inline-block align-top"
              alt=""
            />
          </div>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <i className="bx fas fa-search bx-search"></i>
        </div>
        <div className="dropdown">
          <div className="profile-details">
            <img src="images/545.png" alt="" />

            <span
              className="admin_name"
              style={{ textTransform: "capitalize" }}
            >
              {profile.Name}
            </span>
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
            >
              <li className="dropdown-item" href="#">
                <i className="fas fa-sign-in-alt"></i> <span>action</span>
              </li>
              <li className="dropdown-item" href="#" onClick={logOutFunc}>
                Logout
              </li>
              <li className="dropdown-item" href="#" onClick={ModelRef}>
                Application
              </li> 
            </div>
          </div>
        </div>
      </nav>
      
<button type="button" className="btn btn-primary d-none" ref={modelRef} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">My account</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="row">
                        <h3>My Referrals</h3>
                        <div className="col">
                          <table className="table">
                            <thead className="title">
                              <tr>
                                <th>S.no.</th>
                                <th>Name</th>
                                <th>Email</th>
                              </tr>
                            </thead>
                            <tbody style={{ textAlign: "center" }}>
                              {refralData
                                ? refralData.map((item, ind) => {
                                    return (
                                      <>
                                        <tr>
                                          <td>{ind + 1}</td>
                                          <td>{item.Name}</td>
                                          <td>{item.Email}</td>
                                          {/* <td>{item.RefralNo}</td> */}
                                        </tr>
                                      </>
                                    );
                                  })
                                : ""}
                              {refralMessage ? refralMessage : ""}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <h3>Application Table</h3>
                        <div className="col">
                          <table className="table">
                            <thead className="title">
                              <tr>
                                <th>S.no.</th>
                                <th>Application No.</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody style={{ textAlign: "center" }}>
                              {applicationData.map((item, ind) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{ind + 1}</td>
                                      <td>{item.ApplicationNo}</td>
                                      <td>{item.status}</td>
                                      {/* <td>{item.RefralNo}</td> */}
                                    </tr>
                                    {applicationData
                                      ? applicationData.map((item, ind) => {
                                          return (
                                            <>
                                              <tr>
                                                <td>{ind + 1}</td>
                                                <td>{item.ApplicationNo}</td>
                                                <td>{item.status}</td>
                                                {/* <td>{item.RefralNo}</td> */}
                                              </tr>
                                            </>
                                          );
                                        })
                                      : ""}
                                  </>
                                );
                              })}
                              {applicationMessage ? applicationMessage : ""}
                            </tbody>
                          </table>
                        </div>
                      </div>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default UserNavbar;
