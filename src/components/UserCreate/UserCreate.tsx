/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
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
  message,
} from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './userCreate.module.scss';
import IUser from '../../interfaces/user';

type SizeType = Parameters<typeof Form>[0]['size'];

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

type UserCreateProps = {
  isShow: boolean;
  hideModel: () => void;
  handleUser: (user: IUser) => void;
};

const UserCreate: React.FC<UserCreateProps> = ({
  isShow,
  hideModel,
  handleUser,
}: UserCreateProps) => {
  const [componentSize] = useState<SizeType | 'default'>('default');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<any>('');

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (values: IUser) => {
    values.image = imageUrl;
    hideModel();
    handleUser(values);
  };

  const onReset = () => {
    setFirstName('');
    setLastName('');
    setLoading(false);
    setImageUrl('');
    setLoaded(false);
  };

  const onChangeFirstName = (event: any) => {
    setFirstName(event.target.value);
  };

  const onChangeLastName = (event: any) => {
    setLastName(event.target.value);
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (image64: any) => {
        setImageUrl(image64);
        setLoading(false);
        setLoaded(true);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <UploadOutlined />}
      <div>Upload</div>
    </div>
  );

  return (
    <section className={styles.user__create}>
      <Modal
        width={600}
        style={{ top: 70 }}
        visible={isShow}
        onCancel={hideModel}
        closable={false}
        bodyStyle={{ padding: 10 }}
        footer={[]}
      >
        <Form
          name="userForm"
          className={styles.form__user_create}
          labelCol={{ span: 14, offset: 0 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          initialValues={{ size: 'default' }}
          size={componentSize as SizeType}
          onFinish={onFinish}
        >
          <div className={styles.form__title}>
            <p className={styles.form__title_text}>Connect to lobby</p>
          </div>
          <Form.Item
            label="Your first name"
            labelAlign="left"
            labelCol={{ xs: { offset: 0 }, sm: { offset: 2 } }}
            name="firstName"
            className={styles.label__text}
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <Input
              className={styles.form__input}
              id="first-name"
              onChange={onChangeFirstName}
            />
          </Form.Item>
          <Form.Item
            label="Your last name(optional)"
            labelCol={{ xs: { offset: 0 }, sm: { offset: 2 } }}
            name="lastName"
            className={styles.label__text}
          >
            <Input
              className={styles.form__input}
              id="last-name"
              onChange={onChangeLastName}
            />
          </Form.Item>
          <Form.Item
            label="Your job position(optional)"
            name="job"
            labelCol={{ xs: { offset: 0 }, sm: { offset: 2 } }}
            className="label-text"
          >
            <Input className={styles.form__input} />
          </Form.Item>
          <Form.Item>
            <Form.Item
              label="Image"
              labelCol={{ xs: { offset: 0 }, sm: { span: 32, offset: 0 } }}
              wrapperCol={{ span: 32 }}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              {loaded ? (
                <Avatar
                  size={60}
                  src={<Image className={styles.avatar__img} src={imageUrl} />}
                ></Avatar>
              ) : (
                <Avatar className={styles.avatar__text} size={60}>
                  {firstName
                    ? firstName.toLocaleUpperCase().slice(0, 1)
                    : 'User'}
                  {lastName
                    ? lastName.toLocaleUpperCase().slice(0, 1)
                    : firstName.toLocaleUpperCase().slice(-1)}
                </Avatar>
              )}
              <Upload
                listType="picture-card"
                className={styles.avatar__uploader}
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? '' : uploadButton}
              </Upload>
              <Form.Item
                label="Connect as Observer"
                labelCol={{ xs: { offset: 0 }, sm: { span: 8, offset: 1 } }}
                wrapperCol={{ span: 8 }}
                valuePropName="checked"
                className={styles.label__switch}
                name="isObserver"
              >
                <Switch />
              </Form.Item>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Space
              style={{
                margin: '0 auto',
              }}
              size={32}
            >
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="button button__small"
              >
                Confirm
              </Button>
              <Button
                type="default"
                onClick={hideModel}
                size="large"
                className="button button__small"
              >
                Cancel
              </Button>
              <Button
                htmlType="reset"
                onClick={onReset}
                size="large"
                className="button button__small"
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default UserCreate;
