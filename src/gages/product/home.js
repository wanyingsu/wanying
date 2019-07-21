import React, { Component } from 'react'
import {Card,Select,Input,Button,Icon,Table,message} from 'antd'
import LinkButton from '../../components/link-button'
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/Constants'
import memoryUtils from '../../utils/memoryUtils'


const Option = Select.Option
export default class Product extends Component {
    state = {
        loading:false,
        products:[],
        total:0,     //商品的总数量
        searchType:"productName",
        searchName: '', // 搜索的关键字
    }
    

    updateStatus =async (productId,status)=>{
        //计算更新后的状态值
        status = status ===1? 2:1
// console.log(status)
        const result = await reqUpdateStatus(productId,status)
        // console.log(result)
        if(result.status===0){
            message.success('更新成功')
            this.getProducts(this.pageNum)
        }
        
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
                //   dataIndex: 'status',
                  render: ({_id,status}) => {
                    let btnText = '下架'
                    let text = '在售'
                    if (status === 2) {
                        // console.log(1)
                      btnText = '上架'
                      text = '已下架'
                    }
                    return (
                      <span>
                        <button onClick={()=>{this.updateStatus(_id,status)}}>{btnText}</button><br />
                        <span>{text}</span>
                      </span>
                    )
                  }
                },
                {
                  title: '操作',
                  width:100,
                  render: (product) => (
                    <span>
                      <LinkButton onClick = {()=>{
                         memoryUtils.product = product 
                        this.props.history.push('/product/detail')
                     }}
                          >详情
                          </LinkButton>
                      <LinkButton>修改</LinkButton>
                    </span>
                  )
                },
              ]
        
    }


    //异步获取指定页码商品列表
    getProducts =async (pageNum)=>{
        const {searchName,searchType} = this.state
        let result
        if(!searchName){
               //获取数据
             result =  await reqProducts(pageNum,2)
        }else{
            result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        
        
        }
     
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
        const {loading,products,total ,searchType,searchName} = this.state
       const title = (
            <span>
                <Select style={{width:"200px"}} 
                value = {searchType}
                onChange = {(value)=>{this.setState({searchType:value})}}
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input style={{width:"200px",margin:"0 10px"}} 
                placeholder="关键字"
                value = {searchName}
                onChange = {(event)=>{this.setState({searchName:event.target.value})}}
                />
                <Button type="primary" onClick={()=>{this.getProducts(1)}}>搜索</Button>
            </span>
        )
      const  extra = (
            <Button type="primary" onClick={()=>{
              this.props.history.push('/product/addupdate')
            }}>
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
                        pagination={{total, defaultPageSize: PAGE_SIZE, showQuickJumper: true, onChange:this.getProducts,current:this.pageNum
                        
                        }}  //分页，默认一页显示多少条数据
                    
                    />,  
            </Card>
        )
    }
}
