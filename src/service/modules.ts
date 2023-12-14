import axios from "@/api/axios";
import { isUndefined } from "lodash";

export interface NewModule {
  title: string;
  description: string;
}
const MODULE = `/modules`;

const getModuleById = (id: number) => axios.get(`${MODULE}/${id}`);

// const getModulesPublished = (param: ParamGetModule) => {
//   return axios.get(
//     `${GET_MODULE}/list-published/${param.idUser}?pageNo=${
//       isUndefined(param.pageNo) ? 0 : param.pageNo
//     }`,
//     {}
//   );
// };

const getAllMyModules = (creatorId: string) => axios.get(`${MODULE}/creatorId=${creatorId}`);

// const searchModule = (data: string) => axios.get(`${SEARCH_MODULE}${data}`);

const createNewModule = async (dataNewModule: NewModule) => {
  return await axios.post(`${MODULE}`, dataNewModule);
};

const publishModule = async (id: number) => {
  return await axios.put(`${MODULE}/${id}/publish`);
};

export {
  getAllMyModules,
  //   getModulesPublished,
  getModuleById,
  createNewModule,
  //   searchModule,
  publishModule,
};
