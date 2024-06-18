import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect, Stack } from "expo-router"


const AuthStack = () => {
  const { session } = useAuth()
  if (session) {
    return <Redirect href={'/'} />
  }
  return (
    <Stack />
     
  )
}

export default AuthStack;