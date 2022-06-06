import { useState, useEffect } from "react"
import { useMutation , useQueryClient} from "react-query"
import axios from "axios"

const addItem = async(data:any) => {
    return axios.post("http://localhost:3000/data", data)
}
const AddItem = () => {
    // const query = useQueryClient()
    const[name, setName] = useState("")
    const[surname, setSurname] = useState("")

    const useAddItem = () => {
        return useMutation(addItem)
    }

    const {mutate} = useAddItem()
    console.log(mutate);

    const  handleSubmit = (e:React.FormEvent) => {
        // e.preventDefault()
        mutate({name, surname})
        setName("")
        setSurname("")
        // query.invalidateQueries("data")
    }
    // console.log(data);

    return (
        <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="name" />
                <input value={surname} onChange={(e) => setSurname(e.target.value)} type="text" placeholder="surname" />
                <button type="submit">add item</button>
        </form>
    )
}

export default AddItem