/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import {
  Row,
  Col,
  Card,
  Tag,
  Typography,
  Popover,
  Progress,
  Divider,
} from 'antd';
import { API_URL, COLOR } from '../../constant/api';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import useCSVFile from '../../hooks/useCsvFile';
import { useRecursiveRef } from '../../hooks/useRecursiveRef';

const { Title } = Typography;

function CrossRefCSV() {
  const { value } = useSelector((state) => state.homeReducer);
  const { result: list, dispatch: fileDispatcher } = useCSVFile();
  const {
    error,
    isLoading,
    result,
    total,
    index,
    dispatch: dispatcher,
  } = useRecursiveRef(API_URL);

  // handle file upload
  const handleFileUpload = (e) => {
    fileDispatcher(e.target.files[0]);
  };

  const handleRefCSV = () => {
    if (list.length) {
      const key = 'id';
      dispatcher(list, key);
    }
  };
  return (
    <div style={{ margin: '24px' }}>
      <p>{error.message}</p>
      <Title level={2}>{value}</Title>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
      <div
        style={{
          display: 'flex',
          marginTop: '15px',
          width: '50%',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="button"
          className="mdc-button mdc-button--raised"
          onClick={() => handleRefCSV()}
        >
          {isLoading ? (
            <Loader
              type="Puff"
              color={COLOR}
              height={25}
              width={25}
              timeout={3000} // 3 secs
            />
          ) : (
            <span className="mdc-button__label">Submit</span>
          )}
        </button>
      </div>

      <Divider orientation="left">Progress</Divider>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col align="center" className="gutter-row" span={8}>
          <Title level={3}>Ratio of completion</Title>
          <Progress
            type="circle"
            percent={(index / total) * 100}
            format={(percent) => `${index} / ${total}`}
          />
        </Col>
        <Col justify="center" align="center" className="gutter-row" span={8}>
          <Title level={3}>% of passed request</Title>
          <Progress
            type="circle"
            percent={(result.filter((e) => !e.failed).length / total) * 100}
            format={(percent) => `${Math.ceil(percent, 2)} %`}
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <Card title="Status" bordered>
            {result.map((item) => {
              return (
                <Row justify="space-between" key={item.id}>
                  <p>{item.id}: </p>
                  <p>
                    {item.failed ? (
                      <Popover
                        content={
                          <div>
                            <pre>
                              <code>{JSON.stringify(item.error, null, 4)}</code>
                            </pre>
                          </div>
                        }
                        title="Error"
                        trigger="click"
                      >
                        <Tag color="red">Failed</Tag>
                      </Popover>
                    ) : (
                      <Tag color="blue">Success</Tag>
                    )}
                  </p>
                </Row>
              );
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CrossRefCSV;
