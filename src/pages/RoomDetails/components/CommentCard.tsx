import React from 'react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import type { Comment } from '../../SearchResults/types';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const username = comment.name || 'Anonymous';
  const userInitial = username.charAt(0).toUpperCase();

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        bgcolor: 'rgba(248, 250, 252, 0.8)',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 36,
            height: 36,
            fontSize: '0.9rem',
          }}
        >
          {userInitial}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {comment.text}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CommentCard;
