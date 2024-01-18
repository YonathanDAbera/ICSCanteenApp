import {useParams,useHistory} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {useStorage} from '../context/useStorage'



export default function useUserOrderDetails(){

    const {setIsLoading,token,isLoading} = useStorage()

let history = useHistory()
let {orderID}=  useParams()


 const [thisOrder,setThisOrder] = useState({})

 useEffect(()=>{


  const controller = new AbortController()
 const signal = controller.signal

  const fechOrder= async () =>{
  try{

     const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


    const setting = {
          method: 'GET',
          headers: headers,
signal,
        }

     let res = await fetch(`/api/orders/${orderID}`,setting)


   if(res.status === 404) {
            setIsLoading(false)
      return history.push('/notFound')
     }
      let json = await res.json()

    setThisOrder(json.data)

     setIsLoading(false)

  }catch(err){
    if(err.name === 'AbortError'){
   console.log('Fetch Canceled: caught abort')
 }else{

     console.log(err)
    for(let i = 0; i < 6 ;i++){
    fechOrder()

        }

  }
}
  }

  fechOrder()


  return () =>{
     controller.abort()
   }

 },[orderID, history,setIsLoading, token])



return {thisOrder,isLoading}

}