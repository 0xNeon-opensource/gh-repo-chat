import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import remarkGfm from "remark-gfm";
import { useRef, useEffect } from 'react';

type Message = {
    type: "apiMessage" | "userMessage";
    message: string;
    isStreaming?: boolean;
};

type ChatBoxProps = {
    chatMessages: (Message | {
        type: string;
        message: string;
    })[]
    loading: boolean;
};

const ChatBox: React.FC<ChatBoxProps> = ({ chatMessages, loading }) => {
    const messageListRef = useRef<HTMLDivElement>(null);

    // Auto scroll chat to bottom
    useEffect(() => {
        const messageList = messageListRef.current;
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div ref={messageListRef} className={styles.messagelist}>
            {chatMessages.map((message, index) => {
                let icon;
                let className;

                if (message.type === "apiMessage") {
                    icon = <Image src="/chatIcon.png" alt="AI" width="30" height="30" className={styles.boticon} priority />;
                    className = styles.apimessage;
                } else {
                    icon = <Image src="/usericon.png" alt="Me" width="30" height="30" className={styles.usericon} priority />

                    // The latest message sent by the user will be animated while waiting for a response
                    className = loading && index === chatMessages.length - 1
                        ? styles.usermessagewaiting
                        : styles.usermessage;
                }
                return (
                    <div key={index} className={className}>
                        {icon}
                        <div className={styles.markdownanswer}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                linkTarget="_blank"
                            >
                                {message.message}
                            </ReactMarkdown>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ChatBox;