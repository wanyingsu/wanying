import ajax from './ajax'

const BASE = ''
// export function reqLogin(username,password){
//   return  ajax({
//         method:'post',
//         url:BASE+"/login",
//         data:{
//             username,
//             password
//         }
//     })
// }
export const reqLogin= (username,password)=>{return ajax.post(BASE+"/login",{username,password})}