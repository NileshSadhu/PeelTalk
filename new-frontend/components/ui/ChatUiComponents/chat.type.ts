export interface Message {
  messageId: string;
  senderId: string;
  content: string;
  timestamp: string;
  reaction?: string;
}

export interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
  currentUserImage: string;
  partnerImage: string;
  currentUsername: string;
  partnerUsername: string;
  partnerId?: string;
  isPartnerTyping?: boolean;
  onFindPartner?: () => void;
  onDisconnect?: () => void;
  handleSendReaction: (messageId: string, emoji: string) => void;
}

export interface MessageBubbleProps {
  isCurrentUser: boolean;
  avatar: string;
  username: string;
  content: string;
  messageId: string;
  reaction?: string;
  timestamp: string;
  onAvatarClick?: () => void;
  onReact?: (reaction: string, messageId: string) => void;
}
