'use client'

import { authService } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => router.push('/auth')
  })

  return <div className="flex items-center">
    <button
      className="opacity-20 hover:opacity-100 transition-opacity duration-300 "
      onClick={() => mutate()}
    >
      <LogOut size={35} />
    </button>
  </div>
}