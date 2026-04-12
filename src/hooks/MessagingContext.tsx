'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { fetchConversations, fetchMessages, sendChatMessage, MESSAGING_WS_URL } from '../lib/api';

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: number;
    sender_type: string;
    content: string;
    created_at: string;
    is_read: boolean;
}

export interface Conversation {
    id: string;
    buyer_id: number;
    seller_id: number;
    buyer_name: string;
    buyer_phone: string;
    seller_business_name: string;
    created_at: string;
    updated_at: string;
}

interface MessagingContextType {
    conversations: Conversation[];
    messages: Message[];
    selectedConvId: string | null;
    loading: boolean;
    setSelectedConvId: (id: string | null) => void;
    handleSendMessage: (content: string) => Promise<void>;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const MessagingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const selectedConvIdRef = useRef<string | null>(null);

    useEffect(() => {
        selectedConvIdRef.current = selectedConvId;
    }, [selectedConvId]);

    // Initial load
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetchConversations();
                const d = await res.json();
                if (d.status === 200) setConversations(d.data || []);
            } catch (err) {
                console.error("Failed to fetch conversations:", err);
            }
        };
        load();
    }, []);

    // Persistent WebSocket
    useEffect(() => {
        let socket: WebSocket | null = null;
        let retryTimeout: NodeJS.Timeout;

        const connect = () => {
            socket = new WebSocket(MESSAGING_WS_URL);
            socket.onopen = () => console.log("Global Buyer Messaging WebSocket Connected");
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'message') {
                    const newMsg: Message = data.message;
                    setMessages(prev => {
                        if (prev.some(m => m.id === newMsg.id)) return prev;
                        if (newMsg.conversation_id === selectedConvIdRef.current) {
                            return [...prev, newMsg];
                        }
                        return prev;
                    });
                    setConversations(prev => {
                        const updated = prev.map(c =>
                            c.id === newMsg.conversation_id ? { ...c, updated_at: newMsg.created_at } : c
                        );
                        return updated.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
                    });
                }
            };
            socket.onclose = () => {
                console.log("Global Buyer WebSocket Disconnected. Retrying...");
                retryTimeout = setTimeout(connect, 3000);
            };
            ws.current = socket;
        };

        connect();
        return () => {
            if (socket) socket.close();
            clearTimeout(retryTimeout);
        };
    }, []);

    // Load messages when selection changes
    useEffect(() => {
        if (!selectedConvId) return;
        const load = async () => {
            setLoading(true);
            try {
                const res = await fetchMessages(selectedConvId);
                const d = await res.json();
                if (d.status === 200) setMessages(d.data || []);
            } catch (err) {
                console.error("Failed to fetch messages:", err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [selectedConvId]);

    const handleSendMessage = async (content: string) => {
        if (!selectedConvId) return;
        const conv = conversations.find(c => c.id === selectedConvId);
        if (!conv) return;
        try {
            await sendChatMessage(conv.seller_id, content);
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    return (
        <MessagingContext.Provider value={{
            conversations,
            messages,
            selectedConvId,
            loading,
            setSelectedConvId,
            handleSendMessage
        }}>
            {children}
        </MessagingContext.Provider>
    );
};

export const useMessaging = () => {
    const context = useContext(MessagingContext);
    if (context === undefined) {
        throw new Error('useMessaging must be used within a MessagingProvider');
    }
    return context;
};
