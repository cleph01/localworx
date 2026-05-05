import useSWR from "swr";
import { useDebounce } from "use-debounce";

const fetcher = (url: string) =>
  fetch(url, { credentials: "same-origin" }).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });

export const useUsernameAvailability = (username: string) => {
  const [debouncedUsername] = useDebounce(username, 400);

  const shouldFetch = debouncedUsername && debouncedUsername.length > 2;

  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `/api/alby/wallet/check-username?username=${debouncedUsername}`
      : null,
    fetcher
  );

  return {
    available: data?.available ?? null,
    loading: isLoading,
    error,
  };
};
