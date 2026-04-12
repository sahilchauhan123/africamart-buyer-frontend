
import React from 'react';
import { Search, Menu, MoreVertical, MessageSquare } from 'lucide-react';
import { useMessaging } from '../hooks/MessagingContext';
import ChatSessionView from './ChatSessionView';

interface Props {
    onOpenDrawer?: () => void;
    showChat?: boolean;
    setShowChat: (show: boolean) => void;
}

const BusinessMessagesView: React.FC<Props> = ({ onOpenDrawer, showChat, setShowChat }) => {
    const { conversations, selectedConvId, setSelectedConvId } = useMessaging();
    const selectedChat = conversations.find(c => c.id === selectedConvId) || null;

    const handleChatClick = (chatId: string) => {
        setSelectedConvId(chatId);
        // On mobile, navigate to the full screen chat
        if (window.innerWidth < 1024) {
            setShowChat(true);
        }
    };

    return (
        <div className="flex h-full bg-[#F8FAFC] font-display antialiased overflow-hidden">
            {/* Sidebar / Left Column (Chat List) */}
            <div className={`flex flex-col w-full lg:w-[400px] xl:w-[450px] border-r border-slate-200 bg-white h-full relative z-10 shadow-sm lg:shadow-none ${showChat ? 'hidden lg:flex' : 'flex'}`}>

                {/* Desktop Sidebar Header */}
                <header className="hidden lg:flex flex-col bg-white border-b border-slate-100 flex-none px-6 py-4">
                    <h1 className="text-xl font-black text-slate-800 tracking-tight mb-4 uppercase">Messages</h1>
                    <div className="relative w-full mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-[#0026C0]/20 transition-all font-bold placeholder:uppercase"
                        />
                    </div>
                </header>

                {/* Mobile Header (Only if not showing chat) */}
                <header className="bg-[#0026C0] shadow-md z-40 flex-none lg:hidden shrink-0">
                    <div className="flex items-center justify-between px-4 h-16">
                        <button
                            onClick={onOpenDrawer}
                            className="text-white p-1 rounded-md hover:bg-white/10 transition flex items-center justify-center font-black uppercase text-xs"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-white text-sm font-black tracking-tight uppercase">Messages</h1>
                        <button className="p-2 text-white">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex px-4 lg:px-6 border-b border-slate-100 bg-white lg:bg-transparent overflow-x-auto no-scrollbar">
                    <button className="py-3 lg:py-4 border-b-2 border-[#0026C0] text-[#0026C0] text-[10px] lg:text-xs font-black transition-all whitespace-nowrap mr-6 uppercase tracking-widest">
                        All Inquiries
                    </button>
                    <button className="py-3 lg:py-4 border-b-2 border-transparent text-slate-400 text-[10px] lg:text-xs font-black transition-all whitespace-nowrap uppercase tracking-widest">
                        Unread
                    </button>
                </div>

                {/* Chat List */}
                <main className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F8FAFC]">
                    <div className="divide-y divide-slate-100">
                        {conversations.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => handleChatClick(chat.id)}
                                className={`group transition-all cursor-pointer ${selectedConvId === chat.id ? 'bg-blue-50/70 border-l-4 border-[#0026C0]' : 'bg-white hover:bg-slate-50'}`}
                            >
                                <div className="flex items-center px-4 py-4 sm:px-6 lg:px-6">
                                    <div className="relative flex-shrink-0">
                                        <div className={`h-11 w-11 lg:h-12 lg:w-12 rounded-full flex items-center justify-center border-2 border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100 font-black text-sm lg:text-base text-slate-500`}>
                                            {(chat.seller_business_name || 'S')[0].toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="ml-3 lg:ml-4 flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h2 className={`text-xs tracking-tight truncate pr-2 font-black text-slate-900 uppercase`}>
                                                {chat.seller_business_name || `Seller #${chat.seller_id}`}
                                            </h2>
                                            <span className={`text-[9px] whitespace-nowrap uppercase tracking-tighter text-slate-400 font-black`}>
                                                {new Date(chat.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-[10px] truncate text-slate-400 font-bold uppercase tracking-tight">
                                            Click to view negotiation
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {conversations.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 px-6 text-center opacity-40 grayscale">
                                <MessageSquare size={48} className="text-slate-300 mb-4" />
                                <h3 className="text-slate-800 font-black text-xs uppercase tracking-widest">No conversations</h3>
                                <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Your business inquiries will appear here.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Chat Content / Right Column (Desktop or Active Mobile) */}
            <div className={`flex-1 h-full bg-white relative ${showChat ? 'flex' : 'hidden lg:flex'}`}>
                {selectedChat ? (
                    <ChatSessionView
                        onBack={() => setShowChat(false)}
                        chat={selectedChat}
                        isEmbedded={true}
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                            <div className="grid grid-cols-6 gap-10 rotate-12 scale-150">
                                {Array(36).fill(0).map((_, i) => <MessageSquare key={i} className="w-20 h-20" />)}
                            </div>
                        </div>
                        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center space-y-6 relative z-10 max-w-sm mx-auto">
                            <div className="w-20 h-20 bg-[#0026C0]/10 rounded-3xl flex items-center justify-center text-[#0026C0]">
                                <MessageSquare className="w-10 h-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Negotiation Hub</h3>
                                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest leading-relaxed">Select a conversation to start business negotiation with manufacturers</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessMessagesView;
