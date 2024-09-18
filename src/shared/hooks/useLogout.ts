import { useLogOutMutation } from "@/services";
import { useRouter } from "next/router";
import { PATH } from "../utils";

export function useLogout() {
  const router = useRouter()
  const [logOut, { isLoading: isLoadingLogout, isError: isErrorLogout, isSuccess: isSuccessLogout }] = useLogOutMutation();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      router.replace(PATH.AUTH.SIGNIN)
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return { handleLogout, isLoadingLogout, isErrorLogout, isSuccessLogout };
}
