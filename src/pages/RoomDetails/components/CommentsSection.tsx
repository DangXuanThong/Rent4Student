import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material';
import type { Comment } from '../../SearchResults/types';
import CommentCard from './CommentCard';

interface CommentsSectionProps {
  comments: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  // Filter out invalid comments (missing text)
  const validComments = comments.filter((comment) => comment && comment.text);

  if (validComments.length === 0) {
    return (
      <>
        <Divider sx={{ mt: 4, mb: 3 }} />
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <ChatBubbleOutline sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Chưa có bình luận nào cho phòng trọ này
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Divider sx={{ mt: 4, mb: 3 }} />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ChatBubbleOutline sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight={600}>
          Bình luận ({validComments.length})
        </Typography>
      </Box>

      <Stack spacing={2}>
        {validComments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))}
      </Stack>
    </>
  );
};

export default CommentsSection;
