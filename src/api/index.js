import ajax from './ajax'
import jsonp from 'jsonp'  // axios不能发jsonp请求
import { message } from 'antd';
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

// 发送jsonp请求得到天气信息
export const reqWeather = (city) => {

    // 执行器函数: 内部去执行异步任务, 
    // 成功了调用resolve(), 失败了不调用reject(), 直接提示错误
    return new Promise((resolve, reject) => { 
      const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      jsonp(url, {}, (error, data) => {
        if (!error && data.error===0) { // 成功的
          const {dayPictureUrl, weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl, weather})
        } else { // 失败的
          message.error('获取天气信息失败')
        }
  
      })
    })
    
  }
  
  //获取分类列表
  export const reqCategorys = ()=>ajax(BASE + '/manage/category/list')

  //添加分类
  export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add', {
    categoryName
  })

  //更新分类列表
  export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(BASE + '/manage/category/update', {
    categoryId,
    categoryName
  })
  //获取商品分页列表
  export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {
    params: { // 包含所有query参数的对象
      pageNum,
      pageSize
    }
  })

  //根据Name/desc搜索产品分页列表
  export const reqSearchProducts = ({pageNum,
        pageSize,
        searchName,
        searchType // 它的值是'productName'或者'productDesc') = > ajax(
    })=> ajax(BASE + '/manage/product/search', {
        // method: 'GET',
        params: {
          pageNum,
          pageSize,
          [searchType]: searchName,
       }})

       /* 对商品进行上架/下架处理 */
     export const  reqUpdateStatus = ( productId,status) =>ajax(BASE + '/manage/product/updateStatus',{
       method:'post',
       data:{
         productId,
         status
       }

     })

     // 根据分类id获取分类
    export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {
      params: {
        categoryId
      }
    })

    //删除图片
    export const reqDeleteImg = (name) =>ajax.post(BASE+'/manage/img/delete')