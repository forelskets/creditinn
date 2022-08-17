import { Api } from '../../_helper/service_helper/service_helper';
export const service = async (obj) => {
  let res = await Api('POST', '/service', obj);
  return res;
};

export const AllService = async (obj) => {
  let res = await Api('GET', '/service/getList', obj);
  return res;
};
export const AllCategory = async (obj) => {
  let res = await Api('GET', '/category', obj);
  return res;
};

export const Updateservice = async (id, obj) => {
  let res = await Api('PUT', `/service/${id}`, obj);
  return res;
};
export const ChangeServiceStatus = async (id, obj) => {
  let res = await Api('PUT', `/service/status/${id}`, obj);
  return res;
};
export const ChangeOfferStatus = async (id, obj) => {
  let res = await Api('PUT', `/bank-offer/status/${id}`, obj);
  return res;
};
export const ChangeBankStatus = async (id, obj) => {
  let res = await Api('PUT', `/bank/status/${id}`, obj);
  return res;
};

export const Deleteservice = async (id, obj) => {
  let res = await Api('DELETE', `/service/${id}`, obj);
  return res;
};

export const createBank = async (obj) => {
  let res = await Api('POST', '/bank', obj);
  return res;
};

export const AllBank = async (obj) => {
  let res = await Api('GET', '/bank', obj);
  return res;
};

export const UpdateBanks = async (id, obj) => {
  let res = await Api('PUT', `/bank/${id}`, obj);
  return res;
};

export const DeleteBank = async (id, obj) => {
  let res = await Api('Delete', `/bank/${id}`, obj);
  return res;
};

export const AllBankOffer = async (obj) => {
  let res = await Api('GET', '/bank-offer', obj);
  return res;
};

export const OfferNotifiactionSave = async (obj) => {
  let res = await Api('POST', `/bank-offer/notificationSave`, obj);
  return res;
};

export const saveBankOffer = async (obj) => {
  let res = await Api('POST', '/bank-offer', obj);
  return res;
};

export const DeleteBankOffer = async (id, obj) => {
  let res = await Api('Delete', `/bank-offer/${id}`, obj);
  return res;
};

export const BankOfferTextEditor = async (id, obj) => {
  let res = await Api('POST', `/bank-offer/${id}`, obj);
  return res;
};

export const Applications = async (obj) => {
  let res = await Api('GET', '/application', obj);
  return res;
};

export const ApplicationsStateChange = async (id, obj) => {
  let res = await Api('PUT', '/application/status/' + id, obj);

  return res;
};

export const allortCashback = async (obj) => {
  let res = await Api('POST', '/cashAndearning/create', obj);
  return res;
};

export const getTransactionList = async (obj) => {
  let res = await Api('GET', '/cashAndearning/getTransactionList', obj);
  return res;
};

export const getUserBankDetailsList = async (obj) => {
  let res = await Api('GET', '/userBankDetails', obj);
  return res;
};

export const getAllWishList = async (obj) => {
  let res = await Api('GET', '/wishlist', obj);
  return res;
};

export const getAllWithDrawls = async (obj) => {
  let res = await Api('GET', '/withdrawls', obj);
  return res;
};

export const WithDrawlsStateChange = async (id, obj) => {
  let res = await Api('PUT', `/withdrawls/status/${id}`, obj);
  return res;
};

export const WithDrawlsUpdateTransaction = async (id, obj) => {
  let res = await Api('PUT', `/withdrawls/transaction/${id}`, obj);
  return res;
};
