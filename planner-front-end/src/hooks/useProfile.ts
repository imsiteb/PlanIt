import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['getProfile'],
    queryFn: () => userService.getProfile()
  })

  return { data, isLoading, isSuccess }
}