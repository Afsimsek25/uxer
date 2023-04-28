import { useState, useEffect, useRef } from "react";
import { Layout, Menu, Button, Input, Dropdown, Modal } from "antd";
import useOutsideClick from "./useOutsideClick";
import {
  SearchOutlined,
  FolderOutlined,
  FolderAddOutlined,
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { FiDatabase } from "react-icons/fi";
import { HiOutlinePuzzle } from "react-icons/hi";
import { IoAppsOutline } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";

const { Sider } = Layout;
const { Search } = Input;
const usr = JSON.parse(localStorage.getItem("token"));

const LeftSideBar = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  const [folders, setFolders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedProject, setSelectedProject] = useState("My Project");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");
  const [hoveredFolderId, setHoveredFolderId] = useState(null);
  const [projects, setProjects] = useState([]);
  const editInputRef = useRef();
  const searchInputRef = useRef();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post(
          "https://gateway-test.u-xer.com/api/Project/search",
          {},
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${usr.token.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setProjects(response.data);
        console.log("projects:", projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        console.error("Error response data:", error.response.data);
      }
    };

    if (selectedProjectId) {
      fetchFolders(selectedProjectId);
    } else {
      fetchProjects();
    }
  }, [selectedProjectId]);
  useEffect(() => {
    if (showSearchInput && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchInput]);

  const fetchFolders = async (projectId) => {
    try {
      const response = await axios.post(
        "https://gateway-test.u-xer.com/api/Folder/search",
        {
          projectId: projectId,
          withTests: true,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFolders(response.data);
      console.log("folders : ", folders);
      return response.data; // Add this line to return the fetched folders
    } catch (error) {
      console.error("Error fetching folders:", error);
      console.error("Error response data:", error.response.data);
    }
  };
  const handleSearch = (value) => {
    setSearchText(value);
  };
  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
    if (!showSearchInput && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  };
  const handleNewFolder = () => {
    setIsModalVisible(true);
  };
  const handleUpdateFolder = async (folderId, newName) => {
    try {
      const response = await axios.put(
        `https://gateway-test.u-xer.com/api/Folder/${folderId}`,
        {
          name: newName,
          description: "",
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Fetch folders again to update the list
      fetchFolders(selectedProjectId);
    } catch (error) {
      console.error("Error updating folder:", error);
      console.error("Error response data:", error.response.data);
    }
  };
  const handleModalOk = async () => {
    try {
      const response = await axios.post(
        "https://gateway-test.u-xer.com/api/Folder",
        {
          name: newFolderName,
          description: "",
          projectId: selectedProjectId,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewFolderName("");
      setIsModalVisible(false);

      // Fetch folders again to update the list
      fetchFolders(selectedProjectId).then((newFolders) => {
        setFolders(newFolders);
      });
    } catch (error) {
      console.error("Error creating folder:", error);
      console.error("Error response data:", error.response.data);
    }
  };
  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleProjectClick = (project) => {
    setSelectedProject(project.name);
    setSelectedProjectId(project.id);
  };
  const handleEditClick = (folderId, folderName) => {
    setIsEditing(true);
    setEditingFolderId(folderId);
    setEditedFolderName(folderName);
  };
  const handleDeleteClick = async (folderId) => {
    try {
      await axios.delete(
        `https://gateway-test.u-xer.com/api/Folder/${folderId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
          },
        }
      );

      // Fetch folders again to update the list
      fetchFolders(selectedProjectId).then((newFolders) => {
        setFolders(newFolders);
      });
    } catch (error) {
      console.error("Error deleting folder:", error);
      console.error("Error response data:", error.response.data);
    }
  };
  const projectMenu = (
    <Menu>
      {projects.map((project) => (
        <Menu.Item key={project.id} onClick={() => handleProjectClick(project)}>
          {project.name}
        </Menu.Item>
      ))}
    </Menu>
  );
  
  useOutsideClick(searchInputRef, () => {
    if (showSearchInput) {
      setShowSearchInput(false);
    }
  }, editInputRef);
  
  useOutsideClick(editInputRef, () => {
    if (isEditing) {
      setIsEditing(false);
      setEditingFolderId(null);
    }
  }, searchInputRef);
  
  

  return (
    <>
      <Sider
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          backgroundColor: "#fff",
        }}
        width={256}
      >
        {/* ... */}

        <Menu
          onClick={onClick}
          style={{ width: 256, height: "100%" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
        >
          <div style={{ padding: "16px" }}>
            <Dropdown overlay={projectMenu} trigger={["click"]}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <span>{selectedProject}</span>
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
          <div style={{ borderTop: "2px solid #f0f0f0" }} />
          <Menu.SubMenu
            key="sub1"
            icon={<FolderOutlined />}
            title="Tests & Jobs"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 35px",
              }}
            >
              {showSearchInput ? (
                <div ref={searchInputRef}>
                  <Input
                    placeholder="Search folders"
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ width: "100%" }}
                    onPressEnter={handleSearch}
                  />
                </div>
              ) : (
                <Button
                  type="link"
                  icon={<FolderAddOutlined />}
                  onClick={handleNewFolder}
                >
                  New Folder
                </Button>
              )}
              <div>
                <SearchOutlined onClick={handleSearchClick} />
              </div>
            </div>
            {filteredFolders.map((folder) => (
              <Menu.Item
                key={folder.id}
                icon={<FolderOutlined />}
                onMouseEnter={() => setHoveredFolderId(folder.id)}
                onMouseLeave={() => setHoveredFolderId(null)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {isEditing && editingFolderId === folder.id ? (
                    <div ref={editInputRef}>
                      <Input
                        value={editedFolderName}
                        onChange={(e) => setEditedFolderName(e.target.value)}
                        onBlur={() => {
                          handleUpdateFolder(editingFolderId, editedFolderName); // Call the update function
                          setIsEditing(false);
                          setEditingFolderId(null);
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        maxWidth: "80%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {folder.name}
                    </div>
                  )}
                  {hoveredFolderId === folder.id && (
                    <span>
                      <EditOutlined
                        onClick={() => handleEditClick(folder.id, folder.name)}
                      />
                      <DeleteOutlined
                        onClick={() => handleDeleteClick(folder.id)}
                      />
                    </span>
                  )}
                </div>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu
            onClick={onClick}
            style={{ width: 256, height: "100%" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="light"
          >
            {/* ... */}
            <Menu.Item
              key="elements"
              icon={<HiOutlinePuzzle />}
              onClick={() => console.log("Elements clicked")}
            >
              Elements
            </Menu.Item>
            <Menu.Item
              key="applications"
              icon={<IoAppsOutline />}
              onClick={() => console.log("Applications clicked")}
            >
              Applications
            </Menu.Item>
            <Menu.Item
              key="data_sources"
              icon={<FiDatabase />}
              onClick={() => console.log("Data Sources clicked")}
            >
              Data Sources
            </Menu.Item>
            <Menu.Item
              key="parameters"
              icon={<BsSliders />}
              onClick={() => console.log("Parameters clicked")}
            >
              Parameters
            </Menu.Item>
          </Menu>
        </Menu>
      </Sider>
      <Modal
        title="Create New Folder"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="Enter folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default LeftSideBar;
