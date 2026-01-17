import { Plus, MessageSquare, Menu, Trash2, Code } from 'lucide-react';
import { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Box,
    Typography,
    // useTheme,
} from '@mui/material';
import type { ChatSession } from '../types/chat';

interface SidebarProps {
    onNewChat: () => void;
    sessions: ChatSession[];
    currentSessionId: string | null;
    onSelectSession: (id: string) => void;
    onDeleteSession: (id: string, e: React.MouseEvent) => void;
}

const drawerWidth = 280;

export function Sidebar({ onNewChat, sessions, currentSessionId, onSelectSession, onDeleteSession }: SidebarProps) {
    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
            <Box sx={{ mb: 2 }}>
                <ListItemButton
                    onClick={onNewChat}
                    sx={{
                        borderRadius: 24,
                        bgcolor: 'background.paper',
                        color: 'text.secondary',
                        '&:hover': { bgcolor: 'action.hover', color: 'text.primary' }
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                        <Plus size={20} />
                    </ListItemIcon>
                    <ListItemText primary="New chat" primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }} />
                </ListItemButton>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <Typography variant="caption" sx={{ px: 2, mb: 1, display: 'block', color: 'text.secondary', fontWeight: 500 }}>
                    Recent
                </Typography>
                <List dense>
                    {sessions.map((session) => (
                        <ListItem key={session.id} disablePadding
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" size="small" onClick={(e) => onDeleteSession(session.id, e)} sx={{ opacity: 0.6, '&:hover': { opacity: 1, color: 'error.main' } }}>
                                    <Trash2 size={14} />
                                </IconButton>
                            }
                            sx={{
                                '& .MuiListItemSecondaryAction-root': {
                                    visibility: 'hidden',
                                },
                                '&:hover .MuiListItemSecondaryAction-root': {
                                    visibility: 'visible',
                                }
                            }}
                        >
                            <ListItemButton
                                selected={session.id === currentSessionId}
                                onClick={() => onSelectSession(session.id)}
                                sx={{
                                    borderRadius: 24,
                                    '&.Mui-selected': {
                                        bgcolor: 'action.selected',
                                        '&:hover': { bgcolor: 'action.selected' }
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                                    <MessageSquare size={18} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={session.title || "New Chat"}
                                    primaryTypographyProps={{ fontSize: '0.875rem', noWrap: true }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box sx={{ mt: 'auto', pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <List dense>
                    <ListItem disablePadding>
                        <ListItemButton
                            component="a"
                            href="https://github.com/KevinD33/MyGemini"
                            target="_blank"
                            sx={{ borderRadius: 24 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                                <Code size={20} />
                            </ListItemIcon>
                            <ListItemText primary="Code Source" primaryTypographyProps={{ fontSize: '0.875rem' }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Typography variant="caption" sx={{ px: 2, mt: 1, display: 'block', color: 'text.secondary' }}>
                    MyGEMINIWEB
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
            {/* Mobile Menu Button */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' }, position: 'fixed', top: 12, left: 16, zIndex: 1100 }}
            >
                <Menu />
            </IconButton>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}
