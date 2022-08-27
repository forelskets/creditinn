import React, { useState, useRef, useEffect } from "react";
import { productDataSave } from "../_services/Admin.services/index";
import { Button } from "react-bootstrap";
import { Validate } from "../_helper/Validation/Validate";

const ProductModal = (props) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const ProductmodalRef = useRef();
  // const [submitDis , SetSubmitDis] = useState(true)
  let obj = {};
  console.log(props.productmodal, "productModal");
  const HandleSubmit = async () => {
    let basic = 0;
    console.log(props.profile._id, name, mobile, product, email);
    obj = Validate({ name, mobile, product, email }, rules);
    setError(obj);
    Object.keys(obj).map((ele) => {
      if (obj[ele] !== "" || obj[ele] === null || obj[ele] === undefined) {
        basic = 1;
      }
    });
    if (basic === 0) {
      const response = await productDataSave(props.profile._id, {
        name,
        mobile,
        product,
        email,
      });
      setName("");
      setMobile("");
      setEmail("");
      setProduct("");
      if (response.status === 1) {
        console.log(response.message, "dddd");
        setResponseMsg(response.message);
      }
    }
  };

  useEffect(() => {
    if (props.productmodal) {
      ProductmodalRef.current.click();
      console.log("produceModal useEffeect");
    }
  }, [props.productmodal]);
  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ProductmodalRef}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Apply For Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => props.ProductModalStatus(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {error?.name && <div className="error-msg">{error?.name}</div>}
                <input
                  type="text"
                  value={name}
                  name="name"
                  className="form-control mb-3"
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
                  value={mobile}
                  name="mobile"
                  className="form-control mb-3"
                  placeholder="Enter Your Mobile"
                  onChange={(e) => {
                    setMobile(e.target.value);
                    obj = Validate({ mobile: e.target.value }, rules);

                    setError({ ...error, mobile: obj.mobile });
                  }}
                />
                {error?.email && (
                  <div className="error-msg">{error?.email}</div>
                )}
                <input
                  type="text"
                  value={email}
                  name="email"
                  className="form-control mb-3"
                  placeholder="Enter Your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    obj = Validate({ email: e.target.value }, rules);

                    setError({ ...error, email: obj.email });
                  }}
                />
                {error?.product && (
                  <div className="error-msg">{error?.product}</div>
                )}
                <select
                  onChange={(e) => {
                    setProduct(e.target.value);
                    obj = Validate({ product: e.target.value }, rules);

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

export default ProductModal;

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
    field: "email",
    fieldName: "Your Email",
    type: "email",
    required: true,
  },
  {
    field: "product",
    fieldName: "Your Insurance Type",
    type: "product",
    required: true,
  },
];
