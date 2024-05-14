import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
// import { setIsLoading } from "../budgetSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
      dispatch({ type: "budget/setIsLoading", payload: false });
    },
    onError: () => {
      toast.error("Failed to login. Please check your credentials.");

      dispatch({ type: "budget/setIsLoading", payload: false });
    },
  });

  return { login };
}
