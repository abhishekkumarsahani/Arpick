import { Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from "../components/ChatService/WaitingRoom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "../components/ChatService/ChatRoom";
import Layout from '../components/Layout/Layout';
import "./ChatService.css"; // Import custom CSS file

function ChatService() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      // initiate a connection
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:44337/Chat")
        .configureLogging(LogLevel.Information)
        .build();
  
      // set up handler
      conn.on("ReceiveMessage", (sender, msg) => {
        console.log(`${sender}: ${msg}`);
      });
  
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        setMessages((messages) => [...messages, { username, msg, type: 'received' }]);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages((messages) => [...messages, { username, msg, type: 'sent' }]);
      });
  
  
      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });
      setConnection(conn);
    } catch (e) {
      console.log(e);
    }
  };
  
  const sendMessage = async(message) =>{
    try{
      await conn.invoke("SendMessage", message);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <Layout title="Customer-ChatService">
    <div className="chatapp">
      <main>
        <Container>
          <Row className="chatheader px-5 my-5">
            <Col sm='12'>
              <h1>Customer Support </h1>
            </Col>
          </Row>
          { !conn 
         ? <WaitingRoom joinChatRoom={joinChatRoom} />
         : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
          }
        </Container>
      </main>
    </div>
    </Layout>
  );
}

export default ChatService;
