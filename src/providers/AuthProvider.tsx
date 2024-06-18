import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null,
  loading: boolean,
  profile: any,
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false
})

export default function AuthProvider({ children }: PropsWithChildren) {

  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }  } = await supabase.auth.getSession()
      if (session) {
        setSession(session)
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
        setProfile(data || null)
      }

      setLoading(false)
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    fetchSession()
  }, [])

  return (
    <AuthContext.Provider value={{session, loading, profile, isAdmin: profile?.group === 'ADMIN'}}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
