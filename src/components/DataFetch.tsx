import { useQuery, useMutation, useQueryClient } from "react-query"
import axios from "axios"
import AddItem from "./AddItem"

type itemTypes = {
    id:number,
    name:string,
    surname:string
}

const dataFetching = () => {
    return axios.get("http://localhost:3000/data")
}
const removeData = async(id:number) => {
    return await fetch (`http://localhost:3000/data/${id}`,{method: "DELETE"})
}
const DataFetch = () => {
    const queryClient = useQueryClient()
    const {mutateAsync} = useMutation(removeData)
    const {data, isError, isLoading} = useQuery("data", dataFetching, {
        refetchInterval: 0
    })
    if(isLoading) {
        return <h5>Loading...</h5>
    }
    if(isError) {
        return <h5>Oops something went wrong, 404!</h5>
    }


    const handleDelete = async(id:number) => {
        await mutateAsync(id)
        queryClient.invalidateQueries("data")
    }

    return(
        <div>
            <AddItem/>
            {
                data?.data.map((item:itemTypes) => (
                    <div key={item.id}>
                        <h4 >{item.name}  -- {item.surname}</h4>
                        <button onClick={()=> handleDelete(item.id)}>delete</button>
                        <hr/>
                    </div>
                ))
            }
        </div>
    )
}

export default DataFetch