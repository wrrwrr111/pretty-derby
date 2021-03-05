import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = "http://localhost:4000/"

const http = {}

// http.get = async function(api,data){
//     let params = qs.stringify(data)
//     return new Promise((resolve,reject)=>{
//         await axios.get(api,params).then((res)=>{
//             resolve(res)
//         })
//     })
// }

export default http