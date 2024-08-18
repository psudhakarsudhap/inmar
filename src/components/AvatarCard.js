import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";

const AvatarCard = ({ avatar, onEditProfile }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={avatar.url}
        alt={avatar.name}
      />
      <CardContent>
        <Box display="flex" justifyContent="center">
          <Button variant="contained" onClick={() => onEditProfile(avatar)}>
            Edit Profile
          </Button>
        </Box>
        {avatar.skills?.map((skill, index) => (
          <Typography key={index}>
            {skill.name}: {skill.rating}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default AvatarCard;
