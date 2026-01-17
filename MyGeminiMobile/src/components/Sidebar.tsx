import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, SafeAreaView } from 'react-native';
import { Plus, MessageSquare, Trash2, X, Code } from 'lucide-react-native';
import { theme } from '../theme';
import type { ChatSession } from '../types/chat';

interface SidebarProps {
    visible: boolean;
    onClose: () => void;
    onNewChat: () => void;
    sessions: ChatSession[];
    currentSessionId: string | null;
    onSelectSession: (id: string) => void;
    onDeleteSession: (id: string) => void;
}

export function Sidebar({ visible, onClose, onNewChat, sessions, currentSessionId, onSelectSession, onDeleteSession }: SidebarProps) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>MyGemini</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color={theme.colors.text.primary} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.newChatButton} onPress={() => { onNewChat(); onClose(); }}>
                        <Plus size={20} color={theme.colors.text.primary} />
                        <Text style={styles.newChatText}>New chat</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>Recent</Text>

                    <ScrollView style={styles.sessionList}>
                        {sessions.map((session) => (
                            <TouchableOpacity
                                key={session.id}
                                style={[
                                    styles.sessionItem,
                                    session.id === currentSessionId && styles.selectedSession
                                ]}
                                onPress={() => { onSelectSession(session.id); onClose(); }}
                            >
                                <MessageSquare size={18} color={theme.colors.text.secondary} />
                                <Text style={styles.sessionTitle} numberOfLines={1}>
                                    {session.title || "New Chat"}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => onDeleteSession(session.id)}
                                    style={styles.deleteButton}
                                >
                                    <Trash2 size={16} color={theme.colors.error.main} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.footerLink}>
                            <Code size={20} color={theme.colors.text.secondary} />
                            <Text style={styles.footerText}>Code Source</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* Touchable area to close modal by clicking outside */}
                <TouchableOpacity style={styles.outsideTouch} onPress={onClose} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
    },
    container: {
        width: '80%',
        backgroundColor: theme.colors.background.paper,
        height: '100%',
        padding: 16,
    },
    outsideTouch: {
        width: '20%',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        color: theme.colors.text.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    newChatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background.default,
        padding: 12,
        borderRadius: 24,
        marginBottom: 24,
    },
    newChatText: {
        color: theme.colors.text.primary,
        marginLeft: 12,
        fontWeight: '500',
    },
    sectionTitle: {
        color: theme.colors.text.secondary,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        paddingHorizontal: 12,
    },
    sessionList: {
        flex: 1,
    },
    sessionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 24,
        marginBottom: 4,
    },
    selectedSession: {
        backgroundColor: theme.colors.action.selected,
    },
    sessionTitle: {
        color: theme.colors.text.primary,
        marginLeft: 12,
        flex: 1,
        fontSize: 14,
    },
    deleteButton: {
        padding: 4,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.divider,
        paddingTop: 16,
    },
    footerLink: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    footerText: {
        color: theme.colors.text.secondary,
        marginLeft: 12,
    }
});
