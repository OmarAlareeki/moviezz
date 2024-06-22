// src/components/ShareButton.js
import React from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';

const ShareButton = ({ item }) => {
  const handleShare = () => {
    const url = window.location.href;
    const text = `Check out this movie: ${item.title} \n\n${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button variant="contained" color="primary" startIcon={<ShareIcon />} onClick={handleShare}>
      Share on WhatsApp
    </Button>
  );
};

export default ShareButton;
