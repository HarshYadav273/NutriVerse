import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

const ChatBubble = ({ message, isUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
          isUser
            ? 'bg-accent/30 border border-accent/50'
            : 'bg-emerald-500/20 border border-emerald-500/40'
        }`}
      >
        {isUser ? (
          <User size={16} className="text-accent-light" />
        ) : (
          <Bot size={16} className="text-emerald-400" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-accent text-white rounded-tr-md'
            : 'bg-surface border border-card-border text-white rounded-tl-md'
        }`}
      >
        <p className="text-sm font-body leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <span className="text-[10px] mt-1 block opacity-50">
          {message.timestamp
            ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : ''}
        </span>
      </div>
    </motion.div>
  );
};

export const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex gap-3"
  >
    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
      <Bot size={16} className="text-emerald-400" />
    </div>
    <div className="bg-surface border border-card-border rounded-2xl rounded-tl-md px-4 py-3">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-accent-light"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export default ChatBubble;
