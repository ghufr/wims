const usePermission = (can, entity) => {
  return {
    create: can[`create_${entity}`] != null,
    update: can[`update_${entity}`] != null,
    view: can[`view_${entity}`] != null,
    viewAll: can[`viewAll_${entity}`] != null,
    delete: can[`delete_${entity}`] != null,
  };
};

export default usePermission;
