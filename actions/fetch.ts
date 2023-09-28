const config = useRuntimeConfig();

const getToken = async () => {
  const tokenResponse = await useFetch(config.public.baseUrl + "/sanctum/csrf-cookie", {
    method: "GET",
    credentials: "include",
  });
  const token = useCookie("XSRF-TOKEN");
  return token.value;
};

export const $get = async (url, data) => {
    const token = await getToken();
    const tokenResponse = await useFetch(config.public.baseUrl + url, {
      method: "GET",
      credentials: "include",
    });
};

export const $post = async (url, data) => {
    const token = await getToken();
    const res = await useFetch(config.public.baseUrl + url, {
      method: "POST",
      credentials: "include",
      headers: {
        'X-XSRF-TOKEN': token,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: data,
    });
    return res;
};
