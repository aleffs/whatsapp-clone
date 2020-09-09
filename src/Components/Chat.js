import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonSharpIcon from '@material-ui/icons/InsertEmoticonSharp';
import MicSharpIcon from '@material-ui/icons/MicSharp';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';

function Chat() {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect( () => {
        if( roomId ){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ) );

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map( doc => doc.data() ))
            ));

            setSeed( Math.floor( Math.random() * 5000 ) )

        }
    }, [roomId] );

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You types => ', input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && 'chat__receiver'}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticonSharpIcon />
                <form>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>
                <MicSharpIcon />
            </div>
        </div>
    )
}

export default Chat
