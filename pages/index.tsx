import ChatBox from '@/components/ChatBox';
import ChatInputBar from '@/components/ChatInputBar';
import Footer from '@/components/Footer';
import HeadTag from '@/components/HeadTag';
import NavBar from '@/components/NavBar';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';

type Message = {
  type: "apiMessage" | "userMessage";
  message: string;
  isStreaming?: boolean;
}

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageState, setMessageState] = useState<{ messages: Message[], pending?: string, history: [string, string][] }>({
    messages: [{
      "message": "Hi, I'm an AI assistant for the repository you chose. How can I help you?",
      "type": "apiMessage"
    }],
    history: []
  });
  const { messages, pending, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [pending]);

  // Focus on text field on load
  useEffect(() => {
    textAreaRef.current?.focus();
  }, [loading]);

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const question = userInput.trim();
    if (question === "") {
      return;
    }

    setMessageState(state => ({
      ...state,
      messages: [...state.messages, {
        type: "userMessage",
        message: question
      }],
      pending: undefined
    }));

    setLoading(true);
    setUserInput("");
    setMessageState(state => ({ ...state, pending: "" }));

    const ctrl = new AbortController();

    fetchEventSource('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        history
      }),
      signal: ctrl.signal,
      onmessage: (event) => {
        if (event.data === "[DONE]") {
          setMessageState(state => ({
            history: [...state.history, [question, state.pending ?? ""]],
            messages: [...state.messages, {
              type: "apiMessage",
              message: state.pending ?? "",
            }],
            pending: undefined
          }));
          setLoading(false);
          ctrl.abort();
        } else {
          const data = JSON.parse(event.data);
          setMessageState(state => ({
            ...state,
            pending: (state.pending ?? "") + data.data,
          }));
        }
      }
    });
  }

  // Prevent blank submissions and allow for multiline input
  const handleEnter = (e: any) => {
    if (e.key === "Enter" && userInput) {
      if (!e.shiftKey && userInput) {
        handleSubmit(e);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const chatMessages = useMemo(() => {
    return [...messages, ...(pending ? [{ type: "apiMessage", message: pending }] : [])];
  }, [messages, pending]);


  return (
    <>
      <HeadTag />
      <NavBar />
      <main className={styles.main}>
        <div className={styles.cloud}>
          <ChatBox chatMessages={chatMessages} loading={loading} />
        </div>
        <div className={styles.center}>
          <div className={styles.cloudform}>
            <ChatInputBar
              handleSubmit={handleSubmit}
              handleEnter={handleEnter}
              userInput={userInput}
              setUserInput={setUserInput}
              loading={loading}
            />
          </div>
          <Footer />
        </div>
      </main>
    </>
  )
}
