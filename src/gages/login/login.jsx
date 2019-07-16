import React,{Component} from 'react'
import { Form, Icon, Input, Button, message} from 'antd'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import './login.less'




 class Login extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, {username, password}) => {
          if (!err) {
            // try {} catch (error) {}
            // alert(`发登陆的ajax请求, username=${username}, password=${password}`)
            const result = await reqLogin(username, password)
            // 登陆成功
            if (result.status===0) {
              // 将user信息保存到local
              const user = result.data
              // localStorage.setItem('user_key', JSON.stringify(user))
              storageUtils.saveUser(user)
              // 保存到内存中
              memoryUtils.user = user
    
              // 跳转到管理界面
              this.props.history.replace('/admin')
              message.success('登陆成功!')
            } else { // 登陆失败
              message.error(result.msg)
            }
            
    
          } else {
            // alert('验证失败!')
          }
        })
      };


      validatePwd = (rule, value, callback)=>{
        //   console.log(rule)
        value = value.trim()
        if (!value) {
          callback('密码必须输入')
        } else if (value.length<4) {
          callback('密码不能小于4位')
        } else if (value.length>12) {
          callback('密码不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          callback('密码必须是英文、数字或下划线组成')
        } else {
          callback() // 验证通过
        }
      }






    render(){
      const user = memoryUtils.user
      if (user._id) {
        return <Redirect to="/admin" /> // 自动跳转到指定的路由路径
      }
  

        const {getFieldDecorator} = this.props.form;
        return(
            <div className='login'>
                <div className='login-header'>
                    <img src={logo} alt='图片加载失败'></img>
                    <h1>React项目：后台登录页面</h1>
                </div>
                <div className='login-content'>
                    <h1>用户登陆</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                   {
                        getFieldDecorator('username',{
                            initialValue:'',//初始值
                            rules:[
                                { required: true, whitespace: true, message: '用户名是必须' },
                                { min: 4, message: '用户名不能小于4位'},
                                { max: 12, message: '用户名不能大于12位'},
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                            ]
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名" />
                        )
                   }
                    
                    </Form.Item>
                    <Form.Item>
                   {
                        getFieldDecorator('password',{
                            initialValue:'',//初始值
                            rules:[
                                {validator:this.validatePwd}
                            ]
                        })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password" placeholder="密码"/>)
                   }
                    
                    </Form.Item>
                    <Form.Item> 
                    <Button type="primary" htmlType="submit" className="login-form-button"> 登 录</Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>
        )
        
    }
}
const WrapperForm = Form.create()(Login);
export default WrapperForm