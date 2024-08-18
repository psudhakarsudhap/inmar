import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AvatarCard from "../components/AvatarCard";
import EditProfileModal from "../components/EditProfileModal";
import { fetchAvatars, updateUser } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAvatars().then((response) => setAvatars(response.data));
  }, []);

  const handleEditProfile = (avatar) => {
    setSelectedAvatar(avatar);
    setIsModalOpen(true);
  };

  const handleApplySkills = (skills) => {
    updateUser({ ...selectedAvatar, skills })
      .then((response) => {
        setAvatars(
          avatars.map((user) =>
            user.id === response.data.id ? response.data : user
          )
        );
        setSelectedAvatar(null); // Clear the selected user
        toast.success("User updated successfully!"); // Show success toast
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
        toast.error("Failed to update user!"); // Show error toast
      });

    setIsModalOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} padding={5}>
        {avatars.map((avatar) => (
          <Grid item key={avatar.id} xs={12} sm={4} md={3}>
            <AvatarCard avatar={avatar} onEditProfile={handleEditProfile} />
          </Grid>
        ))}
      </Grid>
      {selectedAvatar && (
        <EditProfileModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          avatar={selectedAvatar}
          onApply={handleApplySkills}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default HomePage;
