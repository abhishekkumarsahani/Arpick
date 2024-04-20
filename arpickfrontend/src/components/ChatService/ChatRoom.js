import { Col, Row } from 'react-bootstrap';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';
import "./ChatRoom.css"; // Import the CSS file for styling

const ChatRoom = ({ messages, sendMessage }) => {
 
  return (
    <div className="chat-room">
      <Row className="header">
        <Col sm={10}>
          <h2>ChatRoom</h2>
        </Col>
      </Row>
      <Row className="content">
        <Col sm={12}>
          <MessageContainer messages={messages} />
        </Col>
        <Col sm={12}>
          <SendMessageForm sendMessage={sendMessage} />
        </Col>
      </Row>
    </div>
  );
};

export default ChatRoom;
