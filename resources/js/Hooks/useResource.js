import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

const useResource = (resource) => {
  const findById = (id) => {
    return axios.get(route(`${resource}.show`, id));
  };

  const findAll = () => {
    return axios.get(route(`${resource}`));
  };

  const create = async (data) => {
    return Inertia.post(route(`${resource}.store`), data);
  };

  const update = async (id, data) => {
    return Inertia.put(route(`${resource}.update`, id), data);
  };

  const destroy = (id) => {
    return Inertia.delete(route(`${resource}.destroy`, id));
  };

  const destroyMany = (ids) => {
    return Inertia.delete(route(`${resource}.destroy`, { id: ids.join(",") }));
  };

  return { findById, findAll, create, update, destroy, destroyMany };
};

export default useResource;
