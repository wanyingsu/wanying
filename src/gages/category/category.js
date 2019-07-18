import React, { Component } from 'react'
import {
    Card, 
    Button, 
    Icon, 
    Table,
    message,
    Modal,
    Input
  } from 'antd'
import  LinkButton  from '../../components/link-button'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api'
import AddUpdateForm from './add-update-from';

  
  

export default class Category extends Component {
    state = {
        categorys:[],       //所有分类的列表
        loading:false,      //是否开始发请求
        showStatus: 0,  //0：不显示   1：显示添加  2：显示修改
    }
   

    //点击确定的回调：去添加或修改
    handleOk = ()=>{
       //表单验证
       this.form.validateFields(async (err, values) => {
        if(!err){
            //重置初始值
            this.form.resetFields()
            //验证通过后根据得到的输入数据
            const {categoryName} = values
            const {showStatus} = this.state
            let result
            if(showStatus===1){
                  //发送添加分类的请求
                result = await reqAddCategory(categoryName)
            }else{
                const categoryId = this.category._id
                result = await reqUpdateCategory({categoryId,categoryName})
            }
          
            this.setState({showStatus:0})

            const action = showStatus === 1 ? '添加':'修改'
            //根据响应结果，做不同的处理
            if(result.status ===0){
                this.getCategorys()
                message.success(action+'分类成功')
            }else{
                message.error(action+'分类失败')
            }
        }
       })
    }


        


    
    //点击取消的回调
    handleCancel=()=>{
        this.form.resetFields()
        this.setState({
            showStatus:0
        })
    }

    //初始化table的所有列信息
    initColumns = () =>{
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width:300,
            //   dataIndex: 'address',
              render: (category) => <LinkButton onClick={()=>{
                //   console.log(category)
                this.category = category
                this.setState({showStatus:2})
              }}>修改分类</LinkButton>,
            },
          ];
    }


    getCategorys= async ()=>{       
        this.setState({loading:true})           //更改loading的状态
     const result =  await reqCategorys()       //发送ajax请求
     this.setState({loading:false})
     if(result.status===0){    //获取请求成功，判断状态
        //更新categorys状态数据
     const categorys = result.data          //拿到数据
    //  console.log(result)
        this.setState({
            categorys
        })

     }else{
        message.error('获取分类失败')
     }
    }
//挂载前第一次render之前执行一次
    componentWillMount(){
       this.initColumns()       //初始化table的列信息
    }
//第一次render之后执行一次
    componentDidMount(){
        this.getCategorys()        //发送ajax请求，获取数据
    }


    render() {
        const {categorys, loading, showStatus} = this.state
        const category = this.category || {}
        
        const extra = (
            <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>
                <Icon type="plus"/>
                添加
            </Button>
        )
        return (
                <Card extra={extra} style={{ width: "100%" }}>
                    <Table
                        columns={this.columns} //列表分类
                        dataSource={categorys}   //数据后台
                        rowKey='_id'
                        loading={loading}       //发送请求前的loding状态
                        bordered                //是否有边框，默认为true
                        pagination={{ defaultPageSize: 6, showQuickJumper: true}}  //分页，默认一页显示多少条数据
                    
                    />,
                    <Modal          //这个插件是来显示点击添加和修改的时候的弹窗
                        title={showStatus ===1 ? '添加分类' : '修改分类'}
                        visible={showStatus !==0}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >
                        <AddUpdateForm setForm = {(form)=>this.form =form } categoryName = {category.name}/>
                        </Modal>

                </Card>
        )
    }
}
