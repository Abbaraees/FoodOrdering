import { supabase } from "@/src/lib/supabase"
import { useAuth } from "@/src/providers/AuthProvider"
import { InsertTables, OrderStatus } from "@/src/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"



export const useAdminOrders = ({archived = false}: {archived: boolean}) => {
    const statuses: OrderStatus[] = archived 
        ? ['Delivered'] 
        : ['New', 'Cooking', 'Delivering']
    return useQuery({
        queryKey: ['orders', {archived}],
        queryFn: async () => {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .in('status', statuses)
            .order('created_at', {ascending: false})
            
        if (error) {
            throw new Error(error.message)
        }
    
        return data
        }
    })}


export const useMyOrders = () => {
    const { profile } = useAuth()
    
    return useQuery({
        queryKey: ['orders', {userId: profile.id}],
        queryFn: async () => {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq('user_id', profile.id)
            .order('created_at', {ascending: false})
        if (error) {
            throw new Error(error.message)
        }
    
        return data
        }
    })
}

export const useOrderDetail = (id: number) => useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items (*, products(*)) ")
        .eq('id', id)
        .single()
  
      if (error) {
        throw new Error(error.message)
      }
  
      return data
    }
  })


export const useInsertOrder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(newData: InsertTables<'orders'>) {
            const {data, error} =  await supabase
                .from("orders")
                .insert(newData)
                .select()
                .single()

            if (error) {
                throw error
            }

            return data
        },
        
        async onSuccess() {
            await queryClient.invalidateQueries(['orders'])
        },
        
        onError(error) {
            console.log(error)
        }
    }
    )
}