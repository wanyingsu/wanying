import React, { Component } from 'react'
import {Card,Select,Input,Button,Icon,Table} from 'antd'
import LinkButton from '../../components/link-button'
import {reqProducts} from '../../api'

const Option = Select.Option
export default class Product extends Component {
    state = {
        loading:false,
        products:[],
        total:0     //商品的总数量
    }
    

    initColumns = ()=>{
        this.columns = 
            [
                {
                  title: '商品名称',
                  dataIndex: 'name'
                },
                {
                  title: '商品描述',
                  dataIndex: 'desc'
                },
                {
                  title: '价格',
                  dataIndex: 'price',
                  render: (price) => '¥' + price
                },
                {
                  title: '状态',
                  width: 100,
                  dataIndex: 'status',
                  render: (status) => {
                    let btnText = '下架'
                    let text = '在售'
                    if (status === 2) {
                      btnText = '上架'
                      text = '已下架'
                    }
                    return (
                      <span>
                        <button>{btnText}</button><br />
                        <span>{text}</span>
                      </span>
                    )
                  }
                },
                {
                  title: '操作',
                  render: (product) => (
                    <span>
                      <LinkButton>详情</LinkButton>
                      <LinkButton>修改</LinkButton>
                    </span>
                  )
                },
              ]
        
    }


    //异步获取指定页码商品列表
    getProducts =async (pageNum)=>{
        //获取数据
     const result =  await reqProducts(pageNum,2)
     //判断数据
     if(result.status===0){
        const {total,list} = result.data
        this.setState({
            products:list,
            total
        })
     }
    }

    componentWillMount(){
        this.initColumns()
    }
    componentDidMount(){
        this.getProducts(1)

    }

    render() {
        const {loading,products,total } = this.state
       const title = (
            <span>
                <Select style={{width:"200px"}} value = "2">
                    <Option value="1">按名称搜索</Option>
                    <Option value="2">按描述搜索</Option>
                </Select>
                <Input style={{width:"200px",margin:"0 10px"}} placeholder="关键字"/>
                <Button type="primary">搜索</Button>
            </span>
        )
      const  extra = (
            <Button type="primary">
                <Icon type="plus"/>
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                 <Table
                        columns={this.columns} //列表分类
                        dataSource={products}   //数据后台
                        rowKey='_id'
                        loading={loading}       //发送请求前的loding状态
                        bordered                //是否有边框，默认为true
                        pagination={{total, defaultPageSize: 2, showQuickJumper: true, onChange:this.getProducts}}  //分页，默认一页显示多少条数据
                    
                    />,  
            </Card>
        )
    }
}
