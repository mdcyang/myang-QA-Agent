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
    <div className="min-h-screen flex flex-col items-center" style={{ background: "#101330" }}>
      <h1 className="text-white text-2xl font-bold mb-8 mt-8 select-none">
        I'm Matt Yang{" "}
        <span className="bouncy-pizza" role="img" aria-label="pizza">
          🍕
        </span>
        {" "}and this is my Agent.
      </h1>
      <div className="flex flex-row items-center justify-center gap-8">
        {/* Matt Yang Image - hidden on md and below */}
        <div className="hidden lg:block pt-[50px] pr-[30px]">
          <img
            src="/matt-yang.png"
            alt="Matt Yang with pizza"
            className="rounded-2xl shadow-lg object-cover"
            style={{
              width: 530,
              height: 580,
              objectFit: "cover",
              background: "#22263a",
            }}
          />
        </div>
        {/* Chat Container */}
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
      {/* Info Card Section */}
      <div className="w-full flex justify-center px-2 sm:px-0 mt-12 mb-12">
        <div className="bg-white rounded-2xl shadow-lg max-w-5xl w-full px-4 py-8 sm:px-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            Building an Orchestration Agent for Q&amp;A and Calendar Booking
          </h2>
          <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
            I designed and deployed a multi-agent system that can both answer questions about me and assist with booking intro calls directly on my calendar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2" style={{ color: "rgb(0 81 255)" }}>Architecture</h3>
                <p className="text-gray-700 mb-2">
                  The solution is built around an <span className="font-semibold">Orchestration Agent</span> that intelligently routes requests to specialized sub-agents:
                </p>
                <ol className="list-decimal list-inside text-gray-700 mb-2 pl-4">
                  <li>
                    <span className="font-semibold">Q&amp;A Agent</span> – handles questions about me using RAG (retrieval-augmented generation).
                  </li>
                  <li>
                    <span className="font-semibold">Calendar Agent</span> – checks availability and books meetings in Google Calendar.
                  </li>
                </ol>
                <p className="text-gray-700">
                  The orchestration agent ensures that the correct tool is invoked based on user intent, rather than overloading one model with multiple roles.
                </p>
              </div>
              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2" style={{ color: "rgb(0 81 255)" }}>Deployment</h3>
                <ul className="list-disc list-inside text-gray-700 mb-2 pl-4">
                  <li>
                    Embedded via CDN onto a website built with Dyad’s Vibe coding environment.
                  </li>
                  <li>
                    Recruiters can ask questions (Q&amp;A agent) and book intro calls (Calendar agent).
                  </li>
                </ul>
                <p className="text-gray-700">
                  This creates a seamless, interactive experience that demonstrates my technical abilities while making it easy for recruiters to connect with me.
                </p>
              </div>
            </div>
            {/* Right Column */}
            <div className="flex flex-col gap-6">
              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2" style={{ color: "rgb(0 81 255)" }}>Core Components</h3>
                <p className="mb-2">
                  <span className="font-semibold">Orchestration Agent:</span>
                  <ul className="list-disc list-inside pl-4 text-gray-700">
                    <li>Built with OpenAI’s LLM as the underlying chat model.</li>
                    <li>Uses a Simple Memory module for context across turns.</li>
                    <li>Tools: Q&amp;A Agent, Calendar Agent, Think Tool (for reasoning).</li>
                    <li>Prompting strategy: orchestrator only routes, never executes tasks.</li>
                  </ul>
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Q&amp;A Agent (with RAG):</span>
                  <ul className="list-disc list-inside pl-4 text-gray-700">
                    <li>Docs uploaded from Google Drive, chunked &amp; embedded with OpenAI, stored in vector DB.</li>
                    <li>Retrieves relevant chunks for grounded answers.</li>
                    <li>Prompt ensures professional, on-topic responses.</li>
                  </ul>
                </p>
                <p>
                  <span className="font-semibold">Calendar Agent:</span>
                  <ul className="list-disc list-inside pl-4 text-gray-700">
                    <li>Checks availability and books via Google Calendar (OAuth secured).</li>
                    <li>Never commits to availability without checking.</li>
                  </ul>
                </p>
              </div>
              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2" style={{ color: "rgb(0 81 255)" }}>Key Technical Highlights</h3>
                <ul className="list-disc list-inside pl-4 text-gray-700">
                  <li>Agent orchestration: Decoupled routing logic ensures clean separation of concerns.</li>
                  <li>RAG (vector search): Provides grounded, context-aware answers.</li>
                  <li>OAuth integration: Secured Google Calendar access for real scheduling.</li>
                  <li>Memory management: Maintains natural, flowing conversations across turns.</li>
                  <li>Web deployment: Embedded agent on a public-facing site with minimal developer overhead.</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Agent Workflow Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 text-center mb-6">Agent Workflow</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <img
                src="/orchestration.png"
                alt="Orchestration workflow"
                className="rounded-lg shadow-md bg-gray-200 object-contain w-full h-64"
                style={{ background: "#22263a" }}
              />
              <img
                src="/qna-agent.png"
                alt="Q&A agent workflow"
                className="rounded-lg shadow-md bg-gray-200 object-contain w-full h-64"
                style={{ background: "#22263a" }}
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/calendar-agent.png"
                alt="Calendar agent workflow"
                className="rounded-lg shadow-md bg-gray-200 object-contain w-full md:w-2/3 h-80"
                style={{ background: "#22263a" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;