
import React, { useEffect, useRef } from 'react';
import { useMessaging } from '../hooks/MessagingContext';
import {
    ArrowLeft,
    MapPin,
    ShieldCheck,
    Send,
    MoreVertical,
    MessageSquare
} from 'lucide-react';

import { Conversation } from '../hooks/MessagingContext';

interface Props {
    onBack: () => void;
    chat?: Conversation | null;
    chatId?: string;
    isEmbedded?: boolean;
}

const ChatSessionView: React.FC<Props> = ({ onBack, chat, chatId, isEmbedded = false }) => {
    const { conversations, messages, loading, selectedConvId, setSelectedConvId, handleSendMessage } = useMessaging();
    const [inputText, setInputText] = React.useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Synchronize internal hook state with passed chat prop or chatId from parent
    useEffect(() => {
        const targetId = chat?.id || chatId;
        if (targetId && selectedConvId !== targetId) {
            setSelectedConvId(targetId);
        }
    }, [chat?.id, chatId, selectedConvId, setSelectedConvId]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]); // Scroll on new messages

    const onSend = async () => {
        if (!inputText.trim()) return;
        await handleSendMessage(inputText);
        setInputText('');
    };

    if (isEmbedded && !chat) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 text-slate-400 p-10 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare size={32} className="opacity-20 translate-x-1 -translate-y-1" />
                </div>
                <h3 className="text-lg font-bold text-slate-600 uppercase tracking-tight">Select a conversation</h3>
                <p className="text-xs font-bold uppercase tracking-widest max-w-xs mt-2">Pick a chat from the left to start messaging manufacturers.</p>
            </div>
        );
    }

    return (
        <div className={`bg-[#f3f4f6] font-display antialiased flex flex-col overflow-hidden text-gray-900 ${isEmbedded ? 'absolute inset-0' : 'fixed inset-0 z-50 h-full'}`}>
            {/* Immersive Header */}
            <header className={`bg-white shadow-sm z-30 flex-none ${isEmbedded ? '' : 'pt-2'}`}>
                <div className={`flex items-center justify-between px-4 sm:px-6 ${isEmbedded ? 'lg:px-6' : 'lg:px-10'} py-3 border-b border-gray-200`}>
                    <div className="flex items-center flex-1 min-w-0 mr-2">
                        <button
                            onClick={onBack}
                            className="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-base font-black text-gray-900 truncate leading-tight uppercase">
                                {chat?.seller_business_name || `Seller #${chat?.seller_id}`}
                            </h1>
                            <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-[#0026C0] mt-0.5 space-x-2">
                                <span className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                                    Active Supplier
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </header>

            {/* Chat Messages */}
            <main
                ref={chatContainerRef}
                className="flex-1 min-h-0 overflow-y-auto bg-[#f3f4f6] px-4 sm:px-6 lg:px-6 py-4 space-y-4 no-scrollbar relative"
            >
                {loading && <div className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest my-4">Loading messages...</div>}

                {messages.map((msg, idx) => {
                    const isOwn = msg.sender_type === 'buyer';
                    return (
                        <div key={msg.id} className={`flex flex-col space-y-1 ${isOwn ? 'items-end' : 'items-start'}`}>
                            <div className={`${isOwn ? 'bg-[#0026C0] text-white' : 'bg-white text-gray-800'} px-4 py-3 rounded-2xl ${isOwn ? 'rounded-tr-none' : 'rounded-tl-none'} shadow-sm max-w-[85%] lg:max-w-[70%] border ${isOwn ? 'border-[#0026C0]' : 'border-white'}`}>
                                <p className="text-sm leading-relaxed font-bold">{msg.content}</p>
                            </div>
                            <span className={`text-[9px] text-gray-400 ${isOwn ? 'pr-1' : 'pl-1'} font-black uppercase`}>
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    );
                })}
                {messages.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-full opacity-30 grayscale">
                        <MessageSquare className="w-16 h-16 mb-4 text-slate-300" />
                        <p className="font-black text-sm uppercase">Say hello to the manufacturer</p>
                    </div>
                )}
            </main>

            {/* Chat Input Footer */}
            <footer className="bg-white border-t border-gray-200 flex-none z-30">
                <div className={`px-4 sm:px-6 ${isEmbedded ? 'lg:px-6 px-4' : 'lg:px-10'} py-3 flex items-end space-x-2`}>
                    <div className="flex-1 bg-slate-50 rounded-2xl flex items-center border border-slate-200 focus-within:border-[#0026C0] focus-within:bg-white transition-all">
                        <textarea
                            className="w-full bg-transparent border-none focus:ring-0 text-gray-900 pr-2 pl-4 py-3 text-sm max-h-32 resize-none rounded-3xl placeholder-gray-400 font-bold"
                            placeholder="Type a message..."
                            rows={1}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onSend();
                                }
                            }}
                        />
                    </div>
                    <button
                        onClick={onSend}
                        disabled={!inputText.trim()}
                        className="w-10 h-10 lg:w-12 lg:h-12 bg-[#0026C0] text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center disabled:opacity-50"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChatSessionView;
