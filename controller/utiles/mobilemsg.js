const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const msg =(information , mobileno)=>{
  console.log(information , mobileno)
    fetch('http://mobicomm.dove-sms.com//REST/sendsms/', {method:"POST",headers:{"Content-Type":"application/json"}, body: JSON.stringify({
        "listsms":
      [
      {"sms": information,
      "mobiles": mobileno,
      "senderid":"ABCDEF",
      "clientSMSID":"1947692308",
      "accountusagetypeid":"1"},
      ],
      "password":"dddb337a6aXX","user":"rahulinf"})})
      .then((res) => res.json())
      .then((json) => console.log(json))
}

module.exports = msg;