import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import AdminSideBar from './AdminSideBar';
import { Applications, ApplicationsStateChange } from '../_services/Admin.services'
import toastr from 'toastr'

const AdminApplication = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    callEffect();
  }, []);

  const callEffect = async () => {
    let res = await Applications()
    if (res?.status === 1 && Array.isArray(res?.data?.applications)) {
      setData(res?.data?.applications);
    }
  };

  return (
    <>
      <AdminSideBar />
      <section class="homes-section">
        <AdminNavBar />
        <div className="home-content">
          <div className="table-box">
            <div className="recent-table box">
              <span className="title ">User Data</span>
              <section className="ftco-section">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-wrap">
                        <table className="table">
                          <thead className="thead-primary">
                            <tr>
                              <th>SNo</th>
                              <th>Name</th>
                              <th>Mobile No</th>
                              <th>ApplicationNo</th>
                              <th>Aadhar No</th>
                              <th>Pan No</th>
                              <th>Amount</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(data) &&
                              data.map((d, i) => {
                                return (
                                  <tr>
                                    <th scope="row" className="scope">
                                      {i + 1}
                                    </th>
                                    <td>{d?.UserId?.Name}</td>
                                    <td>{d?.UserId?.Mobile}</td>
                                    <td>{d?.ApplicationNo}</td>
                                    <td>{d?.KycId?.AdhaarNo}</td>
                                    <td>{d?.KycId?.PanNo}</td>
                                    <td>{d?.Amount}</td>
                                    <td>{d?.createdAt}</td>
                                    <td>
                                      <Status status={d?.status} id={d._id} ApiUpdate={callEffect}></Status>
                                    </td>
                                    <td>
                                      <NavLink
                                        to="#"
                                        className="btn btn-primary"
                                      >
                                        Sign Up
                                      </NavLink>
                                      <NavLink
                                        to="#"
                                        className="btn btn-secondary"
                                      >
                                        {' '}
                                        log in
                                      </NavLink>
                                      <NavLink
                                        to="#"
                                        className="btn btn-danger"
                                      >
                                        Credit Up
                                      </NavLink>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminApplication;
const statusArry = ["Pending", "Approved", "Processing", "Reject"]
const Status = (props) => {
   const [value, setValue] = useState("")
   const [loader, setLoader] = useState(false)
  useEffect(()=>{
    setValue(props?.status)
  },[props?.status])
  const onChange = (e) => {
    const { value } = e.target
    setLoader(true)
    ApplicationsStateChange(props.id, { status: value }).then(res => {
      if(res?.status === 1){
        toastr.success("Success")
        setValue(value)
        setLoader(false)
        if(props.ApiUpdate){
          props.ApiUpdate()
        }
      }else{
        setLoader(false)
      }
    })
  }

  return <>
    {/* <p>{props?.status}</p> */}
    <select value={value} onChange={e => onChange(e)}>
      {statusArry.map((obj) => {
        return <option value={obj}>{obj}</option>
      })}
    </select>
    {loader && <div>Loading...</div>}
  </>
}
