import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import authApi from 'src/apis/auth.api';
import { purchasesStatus } from 'src/constant/purchase';
import { AppContext } from 'src/context/app.context';

export default function useLogout() {
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setProfile } = useContext(AppContext);

  const logoutMutation = useMutation({
    mutationFn: authApi.logoutApi,
    onSuccess: () => {
      setIsAuthenticated(false);
      setProfile(null);
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] });
    }
  });

  return logoutMutation.mutate;
}
