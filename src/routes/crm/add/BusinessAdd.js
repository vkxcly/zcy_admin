import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  // TimePicker,
  Input,
  InputNumber,
  Select,
  Popover,
  Cascader,
} from 'antd';
import { connect } from 'dva';
import styles from './style.less';

const { TextArea } = Input;
const { Option } = Select;
const optionshz = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

function onChange(value) {
  console.log(value);
}

const fieldLabels = {
  number: '编码',
  businessName: '商机名称',
  customerName: '客户名称',
  customerContact: '客户联系人',
  customerSource: '客户来源',
  businessState: '商机状态',
  customerDemand: '客户需求',
  expectDealDate: '预计成交日期',
  offer: '报价',
  expectTransactionPrice: '预计成交价',
  remarks: '备注',
  assignor: '分配人',
};

const cnumcol = {
  style: {
    paddingLeft: 10,
  },
};

const cpinyincol = {
  style: {
    paddingLeft: 13,
  },
};

const simplenamecol = {
  style: {
    paddingLeft: 72,
  },
};

const companyphonecol = {
  style: {
    paddingLeft: 37,
  },
};

const addresscol = {
  style: {
    paddingLeft: 10,
  },
};
const urlcol = {
  style: {
    paddingLeft: 10,
  },
};

const remarkcol = {
  style: {
    paddingLeft: 34,
  },
};

const companycol = {
  style: {
    paddingLeft: 10,
  },
};

const statuscol = {
  style: {
    paddingLeft: 27,
  },
};

const formhz11 = {
  wrapperCol: {
    style: {
      width: '60%',
    },
  },
  style: {
    width: '50%',
  },
};

const formhz12 = {
  wrapperCol: {
    style: {
      width: '60%',
    },
  },
  style: {
    width: '120%',
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class BusinessAdd extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  };
  render() {
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    return (
      <div>
        <Card>
          <Form layout="inline">
            <Row className={styles['row-h']}>
              <Col span={8}>
                <Form.Item {...formhz11} label={fieldLabels.number}>
                  {getFieldDecorator('number', {
                    rules: [{ required: true, message: '请输入编码' }],
                  })(<Input placeholder="不重复的数字" className={styles['ant-input-lg']} />)}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item {...formhz12} label={fieldLabels.businessName}>
                  {getFieldDecorator('businessName', {
                    rules: [{ required: true, message: '请输入商机名称' }],
                  })(<Input placeholder="商机描述" className={styles['ant-input-lg']} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row className={styles['row-h']}>
              <Col span={16}>
                <Form.Item {...cnumcol} label={fieldLabels.customerName}>
                  {getFieldDecorator('customerName', {
                    rules: [{ required: false, message: '请输入客户名称' }],
                  })(<Input placeholder="请输入客户名称" style={{ width: 200 }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...cpinyincol} label={fieldLabels.customerContact}>
                  {getFieldDecorator('customerContact', {
                    rules: [{ required: false, message: '请输入客户联系人' }],
                  })(<Input placeholder="请输入客户联系人" style={{ width: 200 }} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row className={styles['row-h']}>
              <Col span={8}>
                <Form.Item label={fieldLabels.customerSource}>
                  {getFieldDecorator('customerSource', {
                    rules: [{ required: true, message: '请选择商机来源' }],
                  })(
                    <Select placeholder="请选择商机来源" style={{ width: 200 }}>
                      <Option value="0">电话来访</Option>
                      <Option value="1">客户介绍</Option>
                      <Option value="2">老客户</Option>
                      <Option value="3">代理商</Option>
                      <Option value="4">合作伙伴</Option>
                      <Option value="5">公开招聘</Option>
                      <Option value="6">互联网</Option>
                      <Option value="7">自主开发</Option>
                      <Option value="8">其他</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={fieldLabels.businessState}>
                  {getFieldDecorator('businessState', {
                    rules: [{ required: true, message: '请选择商机状态' }],
                  })(
                    <Select placeholder="请选择商机状态" style={{ width: 200 }}>
                      <Option value="0">请选择</Option>
                      <Option value="1">初期沟通</Option>
                      <Option value="2">立项评估</Option>
                      <Option value="3">需求分析</Option>
                      <Option value="4">方案制定</Option>
                      <Option value="5">招投标/竞争</Option>
                      <Option value="6">商务谈判</Option>
                      <Option value="7">合同签约</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row className={styles['row-h']}>
              <Col>
                <Form.Item label={fieldLabels.customerDemand}>
                  {getFieldDecorator('customerDemand', {
                    rules: [{ required: true, message: '请输入客户需求' }],
                  })(<TextArea placeholder="请输入客户需求" style={{ width: 1000 }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row className={styles['row-h']}>
              <Col span={8}>
                <Form.Item {...urlcol} label={fieldLabels.expectDealDate}>
                  {getFieldDecorator('expectDealDate', {
                    rules: [{ required: false, message: '请输入预计成交日期' }],
                  })(<Input placeholder="请输入预计成交日期" style={{ width: 200 }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...addresscol} label={fieldLabels.offer}>
                  {getFieldDecorator('offer', {
                    rules: [{ required: false, message: '请输入报价' }],
                  })(<Input placeholder="请输入报价" style={{ width: 200 }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...addresscol} label={fieldLabels.expectTransactionPrice}>
                  {getFieldDecorator('expectTransactionPrice', {
                    rules: [{ required: false, message: '请输入预计成交价' }],
                  })(<Input placeholder="请输入预计成交价" style={{ width: 200 }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row className={styles['row-h']}>
              <Col>
                <Form.Item label={fieldLabels.remarks}>
                  {getFieldDecorator('remarks', {
                    rules: [{ required: false, message: '请输入备注' }],
                  })(<TextArea placeholder="请输入备注" style={{ width: 1000 }} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

export default connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(BusinessAdd));
