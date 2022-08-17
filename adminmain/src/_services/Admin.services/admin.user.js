import { Api } from '../../_helper/service_helper/service_helper';

export const AllUsers = async (obj) => {
  let res = await Api('GET', '/user/getAllUsers', obj);
 
  return res;
};

export const ChangeStatus = async (id, obj) => {
  let res = await Api('PUT', `/user/update/${id}`, obj);
  return res;
};

export const AllRefrals = async (obj) => {
  let res = await Api('GET', '/user/getAllRefrals', obj);
  return res;
};

export const Products = async (obj) => {
  let res = await Api('GET', '/user/getAllProducts', obj);
  return res;
};

export const ProductStateChange = async (id, obj) => {
  let res = await Api('PUT', `/user/statusUpdate/${id}`, obj);
  return res;
};

export const AdminLogin = async (obj) => {
  let res = await Api('POST', '/admin/login', obj);
  return res;
};
export const getAllUserEmis = async (obj) => {
  let res = await Api('GET', '/useremi', obj);
  return res;
};

export const getSettingList = async (obj) => {
  let res = await Api('GET', '/admin/settingList', obj);
  return res;
};
export const getAdmins = async (obj) => {
  let res = await Api('GET', '/admin', obj);
  return res;
};

export const AddAdmin = async (obj) => {
  let res = await Api('POST', '/admin/addAdmin', obj);
  return res;
};

export const UpdateSubAdmin = async (id, obj) => {
  let res = await Api('PATCH', `/admin/udateSubAdmin/${id}`, obj);
  return res;
};

export const DeleteSubAdmin = async (id) => {
  let res = await Api('DELETE', `/admin/deleteSubAdmin/${id}`);
  return res;
};

export const UpdateSettingList = async (obj) => {
  let res = await Api('POST', '/admin/settingUpdate', obj);
  return res;
};

export const addLoan = async (obj, id) => {
  let res = await Api('POST', `/useremi/loan/${id}`, obj);
  return res;
};

export const addInsurance = async (obj, id) => {
  let res = await Api('POST', `/useremi/insurance/${id}`, obj);
  return res;
};

export const addCreditCard = async (obj, id) => {
  let res = await Api('POST', `/useremi/creditCard/${id}`, obj);
  return res;
};
