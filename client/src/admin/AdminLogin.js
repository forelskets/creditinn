import React, { useState } from 'react'
import { NavLink , useHistory} from 'react-router-dom'

const AdminLogin = () => {
 const history = useHistory()
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const loginSubmit = async() =>{
    const response = await fetch('/login',{
      method: 'POST',
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify({email , password})
    })
    const data = await response.json()

    if(response.status === 400){
      alert(data)
    }else if(response.status === 200){
      history.push('/admin')
    }
  }
  return (
    <div>
        <section className="vh-100 login-form">
      <div className="container py-5 h-100 .login-container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card .login-card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://source.unsplash.com/random

                    "
                    alt="login form"
                    className="img-fluid"
                    style={{borderRadius: "1rem 0 0 1rem"}}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <img src="images/projectLogo.png" />
                        <span className="h1 fw-bold mb-0">CreditIn</span>
                      </div>
                      <div className="d-flex align-items-center mb-3 pb-1"></div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{letterSpacing: "1px"}}
                      >
                        Sign into your account
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="form2Example17">Email address</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="form2Example27">Password</label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn login-btn btn-lg btn-block"
                          type="button" onClick={loginSubmit}>
                          Login
                        </button>
                      </div>

                      <NavLink className="small text-muted" to="#!">Forgot password?</NavLink>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default AdminLogin