import { Inertia } from "@inertiajs/inertia";

const useDelete = (resource) => {
  function handleDelete(id) {
    Inertia.delete(route(resource, { id }));
  }

  function handleMassDelete(ids = []) {
    if (ids.length === 0) return;
    Inertia.delete(route(resource, { id: ids.join(",") }));
  }

  return { handleDelete, handleMassDelete };
};

export default useDelete;
