const register_route = ({
  router = undefined,
  route = undefined,
  verify_password_req = undefined,
  auth_required = true,
  get_method = undefined,
  post_method = undefined,
  put_method = undefined,
  patch_method = undefined,
  delete_method = undefined,
} = {}) => {
  if (router !== undefined || route !== undefined) {
    const args = [route];

    if (get_method) {
      router.get(...args, get_method);
    }

    if (post_method) {
      router.post(...args, post_method);
    }

    if (put_method) {
      router.put(...args, put_method);
    }

    if (patch_method) {
      router.patch(...args, patch_method);
    }

    if (delete_method) {
      router.delete(...args, delete_method);
    }
  }
};

module.exports = {
  register_route,
};
