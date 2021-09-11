import React, { useState } from 'react'
import {
  Modal,
  Space,
  Form,
  Input,
  Button,
  Upload,
  Switch,
  Avatar,
  Image,
  message
} from 'antd'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'

type SizeType = Parameters<typeof Form>[0]['size']

function getBase64 (img: any, callback: any) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload (file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const UserCreate: React.FC = () => {
  const [componentSize] = useState<SizeType | 'default'>('default')
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<any>('')
  const [form] = Form.useForm()

  const styleInput = {
    width: 467,
    maxWidth: '100%',
    fontSize: 24,
    borderRadius: '0 0 0 10px'
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const onFinish = (values: any) => {
    setIsModalVisible(false)
    console.log('Received values of form: ', values)
  }

  const onReset = () => {
    form.resetFields()
    setFirstName('')
    setLastName('')
    setLoading(false)
    setImageUrl('')
    setLoaded(false)
  }

  const onChangeFirstName = (event: any) => {
    setFirstName(event.target.value)
    console.log('Received values of form: ', event.target.value)
  }

  const onChangeLastName = (event: any) => {
    setLastName(event.target.value)
    console.log('Received values of form: ', event.target.value)
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl)
        setLoading(false)
        setLoaded(true)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <UploadOutlined style={{ width: 300 }} />
      )}
      <div>Upload</div>
    </div>
  )

  return (
    <>
      <section className='user-create'>
        <Button type='primary' onClick={showModal}>
          User Create
        </Button>
        <Modal
          width={833}
          visible={isModalVisible}
          onCancel={handleCancel}
          closable={false}
          bodyStyle={{ padding: 10 }}
          footer={[]}
        >
          <Form
            form={form}
            className='form-user-create'
            labelCol={{ span: 14, offset: 0 }}
            wrapperCol={{ span: 14 }}
            layout='vertical'
            initialValues={{ size: 'default' }}
            size={componentSize as SizeType}
            onFinish={onFinish}
          >
            <div className='form-title'>
              <p className='form-title-text'>Connect to lobby</p>
              <Form.Item
                label='Connect as Observer'
                labelCol={{ xs: { offset: 0 }, sm: { span: 14, offset: 4 } }}
                wrapperCol={{ span: 4, offset: 6 }}
                valuePropName='checked'
                className='label-switch'
                name='switch'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: 0,
                  margin: 0,
                  width: 250,
                  maxWidth: '100%'
                }}
              >
                <Switch />
              </Form.Item>
            </div>
            <Form.Item
              label='Your first name'
              labelAlign='left'
              labelCol={{ xs: { offset: 1 }, sm: { offset: 5 } }}
              name='firstName'
              tooltip='This is a required field'
              className='label-text'
              rules={[
                { required: true, message: 'Please input your first name!' }
              ]}
            >
              <Input
                style={styleInput}
                id='first-name'
                onChange={onChangeFirstName}
              />
            </Form.Item>
            <Form.Item
              label='Your last name(optional)'
              labelCol={{ xs: { offset: 1 }, sm: { offset: 5 } }}
              name='lastName'
              className='label-text'
            >
              <Input
                style={styleInput}
                id='last-name'
                onChange={onChangeLastName}
              />
            </Form.Item>
            <Form.Item
              label='Your job position(optional)'
              name='job'
              labelCol={{ xs: { offset: 1 }, sm: { offset: 5 } }}
              className='label-text'
            >
              <Input style={styleInput} />
            </Form.Item>
            <Form.Item
              name='image'
              label='Image'
              labelCol={{ xs: { offset: 1 }, sm: { span: 6, offset: 5 } }}
              wrapperCol={{ span: 7, offset: 5 }}
              valuePropName='fileList'
              getValueFromEvent={normFile}
            >
              <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? '' : uploadButton}
              </Upload>
              {loaded ? (
                <Avatar
                  src={
                    <Image
                      style={{
                        minWidth: 70,
                        minHeight: 70,
                        display: 'block'
                      }}
                      src={imageUrl}
                    />
                  }
                  size={70}
                  style={{
                    fontSize: 10
                  }}
                ></Avatar>
              ) : (
                <Avatar
                  size={70}
                  style={{
                    fontSize: 50,
                    backgroundColor: '#60DABF',
                    color: 'white'
                  }}
                >
                  {firstName
                    ? firstName.toLocaleUpperCase().slice(0, 1)
                    : 'User'}
                  {lastName
                    ? lastName.toLocaleUpperCase().slice(0, 1)
                    : firstName.toLocaleUpperCase().slice(-1)}
                </Avatar>
              )}
            </Form.Item>
            <Form.Item name='buttons'>
              <Space
                style={{
                  margin: '0 auto'
                }}
                size={32}
              >
                <Button type='primary' htmlType='submit' size='large'>
                  Confirm
                </Button>
                <Button type='default' onClick={handleCancel} size='large'>
                  Cancel
                </Button>
                <Button htmlType='button' onClick={onReset} size='large'>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </section>
    </>
  )
}

export default UserCreate
