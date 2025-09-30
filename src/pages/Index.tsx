import { useEffect } from "react";

const chatOptions = {
  webhookUrl: "https://mattyang8.app.n8n.cloud/webhook/9f9f23bd-17fc-40e8-bd10-f53c42aee42f/chat",
  webhookConfig: {
    method: "POST",
    headers: {},
  },
  target: "#n8n-chat",
  mode: "fullscreen",
  chatInputKey: "chatInput",
  chatSessionKey: "sessionId",
  loadPreviousSession: true,
  metadata: {},
  showWelcomeScreen: false,
  defaultLanguage: "en",
  initialMessages: [
    "Hi there! 👋",
    "My name is Nathan. How can I assist you today?",
  ],
  i18n: {
    en: {
      title: "Hi there! 👋",
      subtitle: "Start a chat. We're here to help you 24/7.",
      footer: "",
      getStarted: "New Conversation",
      inputPlaceholder: "Type your question..",
    },
  },
  enableStreaming: false,
};

const Index = () => {
  useEffect(() => {
    // Inject the CDN stylesheet
    if (!document.getElementById("n8n-chat-style")) {
      const link = document.createElement("link");
      link.id = "n8n-chat-style";
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
      document.head.appendChild(link);
    }

    // Inject the CSS variables for chat customization
    if (!document.getElementById("n8n-chat-custom-vars")) {
      const style = document.createElement("style");
      style.id = "n8n-chat-custom-vars";
      style.innerHTML = `
        :root {
          --chat--color-primary: #e74266;
          --chat--color-primary-shade-50: #db4061;
          --chat--color-primary-shade-100: #cf3c5c;
          --chat--color-secondary: #20b69e;
          --chat--color-secondary-shade-50: #1ca08a;
          --chat--color-white: #ffffff;
          --chat--color-light: #f2f4f8;
          --chat--color-light-shade-50: #e6e9f1;
          --chat--color-light-shade-100: #c2c5cc;
          --chat--color-medium: #d2d4d9;
          --chat--color-dark: #101330;
          --chat--color-disabled: #777980;
          --chat--color-typing: #404040;
          --chat--spacing: 1rem;
          --chat--border-radius: 0.25rem;
          --chat--transition-duration: 0.15s;
          --chat--window--width: 400px;
          --chat--window--height: 600px;
          --chat--header-height: auto;
          --chat--header--padding: var(--chat--spacing);
          --chat--header--background: var(--chat--color-dark);
          --chat--header--color: var(--chat--color-light);
          --chat--header--border-top: none;
          --chat--header--border-bottom: none;
          --chat--heading--font-size: 2em;
          --chat--subtitle--font-size: inherit;
          --chat--subtitle--line-height: 1.8;
          --chat--textarea--height: 50px;
          --chat--message--font-size: 1rem;
          --chat--message--padding: var(--chat--spacing);
          --chat--message--border-radius: var(--chat--border-radius);
          --chat--message-line-height: 1.8;
          --chat--message--bot--background: var(--chat--color-white);
          --chat--message--bot--color: var(--chat--color-dark);
          --chat--message--bot--border: none;
          --chat--message--user--background: var(--chat--color-secondary);
          --chat--message--user--color: var(--chat--color-white);
          --chat--message--user--border: none;
          --chat--message--pre--background: rgba(0, 0, 0, 0.05);
          --chat--toggle--background: var(--chat--color-primary);
          --chat--toggle--hover--background: var(--chat--color-primary-shade-50);
          --chat--toggle--active--background: var(--chat--color-primary-shade-100);
          --chat--toggle--color: var(--chat--color-white);
          --chat--toggle--size: 64px;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          20% { transform: translateY(-12px);}
          40% { transform: translateY(-20px);}
          60% { transform: translateY(-12px);}
          80% { transform: translateY(-4px);}
        }
        .bouncy-pizza {
          display: inline-block;
          animation: bounce 1.2s infinite;
        }
      `;
      document.head.appendChild(style);
    }

    // Inject the chat script and initialize chat
    if (!window.hasOwnProperty("__n8nChatLoaded")) {
      const script = document.createElement("script");
      script.type = "module";
      script.innerHTML = `
        import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
        window.__n8nChatInstance = createChat(${JSON.stringify(chatOptions)});
        window.__n8nChatLoaded = true;
      `;
      document.body.appendChild(script);
    } else if (window.__n8nChatInstance && window.__n8nChatInstance.destroy) {
      // If chat already exists, destroy and re-create (for hot reload)
      window.__n8nChatInstance.destroy();
      // eslint-disable-next-line no-undef
      import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js').then(({ createChat }) => {
        window.__n8nChatInstance = createChat(chatOptions);
      });
    }
    // Cleanup on unmount
    return () => {
      if (window.__n8nChatInstance && window.__n8nChatInstance.destroy) {
        window.__n8nChatInstance.destroy();
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#101330" }}>
      <h1 className="text-white text-2xl font-bold mb-8 mt-8 select-none">
        I'm Matt Yang{" "}
        <span className="bouncy-pizza" role="img" aria-label="pizza">
          🍕
        </span>
        {" "}and this is my Agent.
      </h1>
      <div
        className="flex items-center justify-center rounded-lg shadow-lg"
        style={{
          width: 400,
          height: 600,
          background: "#101330",
          position: "relative",
        }}
      >
        <div
          id="n8n-chat"
          style={{
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};

export default Index;