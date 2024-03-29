import Comment from './Comment';
import { Commentary, PropTypes } from '../../types';
import { Typography, Box } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function CommentSection({ comments }: PropTypes): any {
  return comments.map((comment: Commentary) => (
    <Box
      key={comment.id}
      sx={{ mt: 3, gap: 1, width: 1, overflow: 'hidden' }}
      display="flex"
      flexDirection={'column'}
    >
      <Box display="flex" alignItems="center">
        <AccountCircleRoundedIcon
          sx={{ color: '#555', mr: 1 }}
          fontSize="large"
        />
        <Typography variant="h6">{comment.by}</Typography>
      </Box>
      <Typography
        variant="subtitle2"
        fontWeight={'regular'}
        sx={{ pb: 1, color: '#777' }}
      >
        {`Commented - ${new Date(comment.time * 1000).toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })}`}
      </Typography>
      <Typography variant="body1" fontWeight={'regular'}>
        {comment.text}
      </Typography>
      {comment.kids?.length !== 0 && comment.kids?.length !== undefined ? (
        <Comment comment={comment} />
      ) : null}
    </Box>
  ));
}
