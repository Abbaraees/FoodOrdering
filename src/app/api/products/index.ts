import { supabase } from "@/src/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/src/types";

export const useProductList = () => useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const { data, error } = await supabase.from("products").select("*")
    if (error) {
      throw new Error(error.message)
    }

    return data
  }
})

export const useProduct = (id: number) => useQuery({
  queryKey: ['products', id],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }
})

export const useInsertProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    async mutationFn(data: any) {
      const { error } = await supabase.from("products").insert({
        name: data.name,
        image: data.image,
        price: data.price
      }).single()

      if (error) {
        throw error
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['products'])
    },
    onError(error) {
      console.log(error)
    }
  })
}

export const useUpdateProduct = (id: number) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    async mutationFn({ id, ...update}: Product) {
      const { data, error } = await supabase
        .from("products")
        .update(update)
        .eq('id', id)
        .select()


      if (error) {
        throw error
      }

      return data
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['products'])
      await queryClient.invalidateQueries(['products', id])
    },
    onError(error) {
      console.log(error)
    }
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }
    },
    async onSuccess(){
      queryClient.invalidateQueries(['products'])
    }
  })
}