import React from 'react';
import { Card, CardColumns, Col, Row } from 'react-bootstrap';
import styles from './ChatRoom.module.scss';
import Image from 'next/image';
import dayjs from 'dayjs';

export const ChatLog: React.FC<any> = (props) => {
  return (
    <Card className={styles['chatLogCard']}>
      <Row noGutters>
        <Col className={`pl-2 pt-3 pr-0`} md={1}>
          <Image
            src={
              props.sender.avatarFile
                ? props.sender.avatarFile.path
                : '/images/user/user.svg'
            }
            width="50"
            height="50"
            layout="intrinsic"
          />
        </Col>
        {/* Content */}
        <Col className={`p-0 m-0`} xs={9} md={11}>
          <Card.Body>
            <Row>
              <Col className={`p-0 m-0`} xs={8} md={8}>
                <h5 className="card-title">{props.sender.firstname}</h5>
              </Col>
              <Col className="text-right" md={4}>
                <small>
                  {dayjs(props.createdAt).format('MMM D, YYYY h:mm a')}
                </small>
              </Col>
            </Row>

            <Row>
              <Col className={`p-0 m-0`} xs={8} md={12}>
                {props.message}
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ChatLog;
