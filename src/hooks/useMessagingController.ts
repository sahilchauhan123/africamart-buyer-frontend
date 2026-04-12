import { useMessaging } from './MessagingContext';

export const useMessagingController = () => {
    const {
        conversations,
        messages,
        selectedConvId,
        loading,
        setSelectedConvId,
        handleSendMessage
    } = useMessaging();

    const selectedChat = conversations.find(c => c.id === selectedConvId) || null;

    return {
        state: {
            conversations,
            messages,
            selectedConvId,
            selectedChat,
            loading
        },
        actions: {
            setSelectedConvId,
            handleSendMessage
        }
    };
};
