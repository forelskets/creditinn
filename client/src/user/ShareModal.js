import React, { useRef, useEffect, useState } from "react";
import { ShareRefralDataSave } from "../_services/Admin.services/index";
import { Button } from "react-bootstrap";
import { Validate } from "../_helper/Validation/Validate";
const ShareModal = (props) => {
  const modalRef = useRef();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [product, setProduct] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");

  //  const [submitDis , SetSubmitDis] = useState(true)

  let obj = {};
  const HandleSubmit = async () => {
    let basic = 0;
    const refral = props.refral;

    obj = Validate({ name, mobile, product }, rules);

    setError(obj);
    Object.keys(obj).map((ele) => {
      if (obj[ele] !== "" || obj[ele] === null || obj[ele] === undefined) {
        basic = 1;
      }
    });
    if (basic === 0) {
      const response = await ShareRefralDataSave(props.id, {
        name,
        mobile,
        product,
        refral,
      });
      setName("");
      setMobile("");
      if (response.status === 1) {
        console.log(response.message, "dddd");
        setResponseMsg(response.message);
      }
    }
  };

  useEffect(() => {
    if (props.sharemodal) {
      modalRef.current.click();
    }
  }, [props.sharemodal]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={modalRef}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Share Referal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => props.ShareModalStatus(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {error?.name && <div className="error-msg">{error?.name}</div>}
                <input
                  type="text"
                  className="form-control mb-3"
                  value={name}
                  name="name"
                  placeholder="Enter Your Name"
                  onChange={(e) => {
                    setName(e.target.value);
                    obj = Validate({ name: e.target.value }, rules);

                    setError({ ...error, name: obj.name });
                  }}
                />
                {error?.mobile && (
                  <div className="error-msg">{error?.mobile}</div>
                )}
                <input
                  type="text"
                  className="form-control mb-3"
                  value={mobile}
                  name="mobile"
                  placeholder="Enter Your Mobile"
                  onChange={(e) => {
                    setMobile(e.target.value);

                    obj = Validate({ mobile: e.target.value }, rules);

                    setError({ ...error, mobile: obj.mobile });
                  }}
                />
                {error?.product && (
                  <div className="error-msg">{error?.product}</div>
                )}
                <select
                  onChange={(e) => {
                    obj = Validate({ product: e.target.value }, rules);
                    setProduct(e.target.value);
                    setError({ ...error, product: obj.product });
                  }}
                  className="form-control mb-3"
                  name="product"
                >
                  <option value="ddd">Selected</option>
                  <option value="Health Insurance">Health Insurance</option>
                  <option value="Life Insurance">Life Insurance</option>
                  <option value="Car Insurance">Car Insurance</option>
                  <option value="Bike Insurance">Bike Insurance</option>
                  <option value="Eductaion Insurance">
                    Eductaion Insurance
                  </option>
                  <option value="Home Insurance">Home Insurance</option>
                </select>

                <Button type="button" className="btn-3" onClick={HandleSubmit}>
                  Submit
                </Button>
                {responseMsg ? responseMsg : ""}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;

const rules = [
  {
    field: "name",
    fieldName: "Your Name",
    type: "name",
    required: true,
  },
  {
    field: "mobile",
    fieldName: "Your Mobile Number",
    type: "mobile",
    required: true,
  },
  {
    field: "product",
    fieldName: "Your Insurance Type",
    type: "product",
    required: true,
  },
];
