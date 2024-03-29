import { useState, useEffect } from 'react';
import { Commentary } from '../../types';
import axios from 'axios';
import { Button, Box, Collapse, Divider } from '@mui/material';
import DeepComments from './DeepComments';

export default function Comment({ comment }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deepComments, setDeepComments] = useState<Commentary[]>([]);

  useEffect(() => {
    async function fetchStoryList() {
      const deepCommentPromises: any = [];
      comment.kids.forEach((id: number) =>
        deepCommentPromises.push(
          axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((res) => res.data)
        )
      );

      let deepCommentResponse: Awaited<Promise<Commentary[]>> =
        await Promise.all(deepCommentPromises);
      setDeepComments(deepCommentResponse);
    }
    fetchStoryList();
  }, []);

  return (
    <Box>
      <Button
        variant="text"
        sx={{ pl: { xs: 0, md: 1 } }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen === true ? 'hide comments' : 'view comments'}
      </Button>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box display="flex">
          <Divider
            orientation="vertical"
            flexItem
            color="#666"
            sx={{ width: '2px', borderRadius: 4, bgcolor: '#F86E03', mr: 2 }}
          />
          <Box display="flex" sx={{ flexDirection: 'column' }}>
            <DeepComments deepComments={deepComments} />
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
