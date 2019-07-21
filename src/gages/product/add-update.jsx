import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button
} from 'antd'
import LinkButton from '../../components/link-button'
const Item = Form.Item
const Option = Select.Option

class ProductAddUpdate extends Component {
  render() {
    const {getFieldDecorator} = this.props.form

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>添加商品</span>
      </span>
    )


    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }
    return (
      
      <Card title={title}>
        <Form {...formLayout}>
          <Item label="商品名称">
            {getFieldDecorator('name', {
                initialValue:'',
                rules: [
                  { required: true, message: '必须输入商品名称!' }
                ],
              })(<Input placeholder="商品名称"/>)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator('desc', {
                initialValue:'',
                rules: [
                  { required: true, message: '必须输入商品描述!' }
                ],
              })(<Input placeholder="商品描述"/>)}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator('price', {
                initialValue:'',
                rules: [
                  { required: true, message: '必须输入商品价格!' }
                ],
              })(<Input type="number" placeholder="商品价格" addonAfter="元"/>)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator('desc', {
                initialValue:'',
                rules: [
                  { required: true, message: '必须输入商品描述!' }
                ],
              })(<Select>
                <Option value=''>未选择</Option>
                
              </Select>)}
          </Item>
          <Item label="商品图片">
           <div> 商品图片</div>
          </Item>
          <Item label="商品详情">
            <div>商品详情组件</div>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(ProductAddUpdate)
