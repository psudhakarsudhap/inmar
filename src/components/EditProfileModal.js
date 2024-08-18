import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  MenuItem,
  Box,
  TableContainer,
  Paper,
  Menu,
  IconButton,
  TableHead,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfileModal = ({ open, onClose, avatar, onApply }) => {
  const [skills, setSkills] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("skill"); // Default filter

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
    setSearchTerm("");
  };

  const filteredSkills = skills.filter((item) => {
    if (filterBy === "skill" && searchTerm !== "") {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === "rating" && searchTerm !== "") {
      return item.rating.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return skills;
  });

  useEffect(() => {
    if (open) {
      setSkills(JSON.parse(JSON.stringify(avatar.skills)));
    }
  }, [open, avatar]);

  const handleAddSkill = () => {
    setSkills([
      ...skills,
      { name: "", rating: "", isEditing: true, isNew: true },
    ]);
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedSkillIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSkillIndex(null);
  };

  const handleApply = () => {
    if (
      skills[selectedSkillIndex].name === "" ||
      skills[selectedSkillIndex].rating === ""
    ) {
      toast.error("Skill and rating cannot be empty");
      handleMenuClose();
      return;
    }
    const updatedSkills = [...skills];
    updatedSkills[selectedSkillIndex].isEditing = false;
    updatedSkills[selectedSkillIndex].isNew = false;
    setSkills(updatedSkills);
    handleMenuClose();
  };

  const handleEdit = () => {
    const updatedSkills = [...skills];
    updatedSkills[selectedSkillIndex].isEditing = true;
    setSkills(updatedSkills);
    handleMenuClose();
  };

  const handleRemove = () => {
    const updatedSkills = skills.filter(
      (_, index) => index !== selectedSkillIndex
    );
    setSkills(updatedSkills);
    handleMenuClose();
  };

  const handleUpdate = () => {
    if (
      skills[selectedSkillIndex].name === "" ||
      skills[selectedSkillIndex].rating === ""
    ) {
      toast.error("Skill and rating cannot be empty");
      handleMenuClose();
      return;
    }
    const updatedSkills = [...skills];
    updatedSkills[selectedSkillIndex].isEditing = false;
    setSkills(updatedSkills);
    handleMenuClose();
  };

  const handleApplyChanges = () => {
    onApply(skills.filter((skill) => !skill.isNew));
    setSkills([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <ToastContainer />
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box display="flex" margin={2}>
          <Box sx={{ flex: 1 }}>
            <img
              src={avatar.url}
              alt={avatar.name}
              style={{
                float: "left",
                marginRight: 20,
                width: 300,
                height: 400,
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ flex: 2 }}
            gap={2}
            justifyContent="space-between"
          >
            <Box display="flex" gap={2}>
              <TextField
                label="Search"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <TextField
                label="Filter By"
                select
                fullWidth
                value={filterBy}
                onChange={handleFilterChange}
              >
                <MenuItem value="skill">Skill</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </TextField>
            </Box>
            <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Skill</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSkills.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No skills.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSkills.map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            value={skill.name}
                            onChange={(e) =>
                              handleSkillChange(index, "name", e.target.value)
                            }
                            fullWidth
                            disabled={!skill.isEditing}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={skill.rating}
                            onChange={(e) =>
                              handleSkillChange(index, "rating", e.target.value)
                            }
                            fullWidth
                            disabled={!skill.isEditing}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="more"
                            onClick={(event) => handleMenuClick(event, index)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={
                              Boolean(anchorEl) && selectedSkillIndex === index
                            }
                            onClose={handleMenuClose}
                          >
                            {skill.name === "" && skill.rating === "" ? (
                              <MenuItem onClick={handleApply}>Apply</MenuItem>
                            ) : skill.isEditing ? (
                              <MenuItem onClick={handleUpdate}>Update</MenuItem>
                            ) : (
                              <MenuItem onClick={handleEdit}>Edit</MenuItem>
                            )}
                            <MenuItem onClick={handleRemove}>Remove</MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={handleAddSkill}>Add Skill</Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyChanges}
        >
          Apply
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
