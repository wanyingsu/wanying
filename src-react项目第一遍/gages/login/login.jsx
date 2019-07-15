import React,{Component} from 'react'
import { Form, Icon, Input, Button, message} from 'antd'
import logo from './images/logo.png'
import {reqLogin} from '../../api'
import './login.less'




 class Login extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, {username, password}) => {
            if (!err) {
             const result = await reqLogin(username, password)
             if(result.status == 0){
                this.props.history.replace('/admin')
             }else{
                message.error(result.msg)
             }
            

            //   alert(`发登陆的ajax请求, username=${username}, password=${password}`)
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