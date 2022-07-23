const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const Phone = async (otpCode, Mobile) => {
  const Fetch = await fetch(
    `http://mobicomm.dove-sms.com//submitsms.jsp?user=rahulinf&key=dddb337a6aXX&mobile=+91${Mobile}&message=${otpCode} is your OTP, Please do not share it with anyone. Thanks conquer info&senderid=CRDSIN&accusage=1&entityid=1101488060000036290&tempid=1207165043401833763`
  );
  console.log(Fetch);
};

module.exports = Phone;
