import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Layout, Menu, Button, Input, Dropdown, Modal, Popover } from "antd";
import useOutsideClick from "./useOutsideClick";
import {
  SearchOutlined,
  FolderOutlined,
  FolderAddOutlined,
  DownOutlined,
  AppstoreAddOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  TeamOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { FiDatabase } from "react-icons/fi";
import { HiOutlinePuzzle } from "react-icons/hi";
import { IoAppsOutline } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";
import { TiDelete, TiEdit } from "react-icons/ti";
import { useSelector } from "react-redux";
import {
  addFolder,
  editFolder,
  listFolder,
  deleteFolder,
} from "../redux/actions/folderActions";

const { Sider } = Layout;
const usr = JSON.parse(localStorage.getItem("token"));

const LeftSideBar = () => {
  const onClick = (e) => {};

  const [searchText, setSearchText] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");
  const [hoveredFolderId, setHoveredFolderId] = useState(null);
  const dispatch = useDispatch();
  const editInputRef = useRef();
  const searchInputRef = useRef();
  const folders = useSelector((state) => state.folder.folders);

  useEffect(() => {
    if (selectedProjectId) {
      dispatch(listFolder(selectedProjectId));
    } else {
      fetchProjects().then((fetchedProjects) => {
        if (fetchedProjects && fetchedProjects.length > 0) {
          setSelectedProject(fetchedProjects[0].name);
          setSelectedProjectId(fetchedProjects[0].id);
          dispatch({
            type: "UPDATE_PUBLIC_PROJECT_ID",
            payload: fetchedProjects[0].id,
          });
        }
      });
    }
  }, [selectedProjectId]);
  const filteredFolders = folders.filter((folder) =>
    //folder.name.toLowerCase().includes(searchText.toLowerCase())
    true
  );
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
      return response.data; // Bu satırı ekleyin, projeleri döndürün
    } catch (error) {
      console.error("Error fetching projects:", error);
      console.error("Error response data:", error.response.data);
    }
  };
  const fetchFolders = async (projectId) => {
    dispatch(listFolder(projectId));
  };
  const handleSearch = (value) => {
    setSearchText(value);
  };
  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
  };
  const handleNewFolder = () => {
    setIsModalVisible(true);
  };
  const handleUpdateFolder = async (folderId, newName) => {
    dispatch(editFolder(folderId, newName, selectedProjectId));
  };
  const handleModalOk = async () => {
    const data = {
      name: newFolderName,
      description: "",
      projectId: selectedProjectId,
    };
    dispatch(addFolder(data));
    fetchFolders(selectedProjectId);
    setIsModalVisible(false);
  };
  const handleDeleteClick = async (folderId) => {
    dispatch(deleteFolder(folderId));
    fetchFolders(selectedProjectId);
  };
  const handleProjectClick = (project) => {
    setSelectedProject(project.name);
    setSelectedProjectId(project.id);
    dispatch({ type: "UPDATE_PUBLIC_PROJECT_ID", payload: project.id });
  };
  function handleEditClick(folderId, folderName) {
    setIsEditing(true);
    setEditingFolderId(folderId);
    setEditedFolderName(folderName);
  }

  ///////////////// Projects ///////////////////
  const [isProjectInputVisible, setIsProjectInputVisible] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [isEditProjectModalVisible, setIsEditProjectModalVisible] =
    useState(false);
  const [editedProjectDescription, setEditedProjectDescription] = useState("");

  const openEditProjectModal = (projectId, projectName, projectDescription) => {
    setEditingProjectId(projectId);
    setEditedProjectName(projectName);
    setEditedProjectDescription(projectDescription || "");
    setIsEditProjectModalVisible(true);
  };
  const handleEditProjectModalOk = () => {
    handleUpdateProject(
      editingProjectId,
      editedProjectName,
      editedProjectDescription
    );
    setIsEditProjectModalVisible(false);
  };

  const moreProjectOptions = (project) => (
    <Menu>
      <Menu.Item
        key="project_edit"
        icon={<EditOutlined />}
        onClick={(e) => {
          openEditProjectModal(project.id, project.name, project.description);
        }}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="project_duplicate"
        icon={<CopyOutlined />}
        onClick={() => handleDuplicateProject(project.id)}
      >
        Duplicate
      </Menu.Item>
      <Menu.Item key="users" icon={<TeamOutlined />}>
        Users
      </Menu.Item>
      <Menu.Item key="reports" icon={<PieChartOutlined />}>
        Reports
      </Menu.Item>
      <Menu.Item
        key="delproject_delete"
        icon={<DeleteOutlined />}
        onClick={() => handleDeleteProject(project.id)}
      >
        Delete
      </Menu.Item>
    </Menu>
  );
  const handleNewProjectClick = () => {
    setIsProjectInputVisible(true);
  };
  const handleUpdateProject = async (projectId, newName) => {
    await handleEditProject(projectId, newName);
    setEditingProjectId(null);
  };
  const handleCreateProject = async (projectName) => {
    try {
      const response = await axios.post(
        "https://gateway-test.u-xer.com/api/Project",
        {
          name: projectName,
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

      // Fetch projects again to update the list
      fetchProjects().then((newProjects) => {
        setProjects(newProjects);
        // Select the newly added project
        const newProject = newProjects.find(
          (proj) => proj.name === projectName
        );
        if (newProject) {
          handleProjectClick(newProject);
        }
      });
    } catch (error) {
      console.error("Error creating project:", error);
      console.error("Error response data:", error.response.data);
    }
  };
  const handleEditProject = async (projectId, newName) => {
    try {
      const response = await axios.put(
        `https://gateway-test.u-xer.com/api/Project/${projectId}`,
        {
          name: newName,
          description: "string",
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Fetch projects again to update the list
      fetchProjects().then((fetchedProjects) => {
        setProjects(fetchedProjects);
      });
    } catch (error) {
      console.error("Error updating project:", error);
      console.error("Error response data:", error.response.data);
    }
  };
  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(
        `https://gateway-test.u-xer.com/api/Project/${projectId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
          },
        }
      );

      // Fetch projects again to update the list
      fetchProjects().then((fetchedProjects) => {
        setProjects(fetchedProjects);
        // Select the first project after deletion
        if (fetchedProjects.length > 0) {
          handleProjectClick(fetchedProjects[0]);
        }
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      console.error("Error response data:", error.response.data);
    }
  };
  const handleDuplicateProject = async (projectId) => {
    try {
      const response = await axios.put(
        `https://gateway-test.u-xer.com/api/Project/duplicate/${projectId}`,
        {},
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
          },
        }
      );

      // Fetch projects again to update the list
      fetchProjects().then((fetchedProjects) => {
        setProjects(fetchedProjects);
      });
    } catch (error) {
      console.error("Error duplicating project:", error);
      console.error("Error response data:", error.response.data);
    }
  };
  const handleSelectedFolder = async (folderId) => {
    dispatch({ type: "SELECTED_FOLDER_ID", payload: folderId });
  }
  const projectMenu = (
    <Menu
      style={{
        zIndex: 5,
      }}
    >
      <Menu.Divider />

      {isProjectInputVisible ? (
        <Input
          placeholder="Enter project name"
          onPressEnter={(e) => {
            handleCreateProject(e.target.value);
            setIsProjectInputVisible(false);
          }}
        />
      ) : (
        <Button
          type="link"
          icon={<AppstoreAddOutlined />}
          onClick={handleNewProjectClick}
        >
          New Project
        </Button>
      )}
      {projects.map((project) => (
        <Menu.Item
          key={project.id}
          onMouseEnter={() => setHoveredProjectId(project.id)}
          onMouseLeave={() => setHoveredProjectId(null)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span onClick={() => handleProjectClick(project)}>
              {project.name}
            </span>
            {hoveredProjectId === project.id &&
              editingProjectId !== project.id && (
                <span>
                  <Popover
                    content={moreProjectOptions(project)}
                    trigger="click"
                    placement="bottom"
                    overlayStyle={{ zIndex: 1050 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreOutlined />
                  </Popover>
                </span>
              )}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  useOutsideClick(
    editInputRef,
    () => {
      if (isEditing) {
        setIsEditing(false);
        setEditingFolderId(null);
      }
    },
    searchInputRef
  );

  return (
    <>
      <Sider
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          backgroundColor: "#fff",
        }}
        width={350}
      >
        {/* ... */}

        <Menu
          onClick={onClick}
          style={{ width: 350, height: "100%" }}
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
                onClick={() => handleSelectedFolder(folder.id)}
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
                      <TiEdit
                        onClick={() => {
                          if (editedFolderName !== folder.name) {
                            handleEditClick(folder.id, folder.name);
                          }
                        }}
                      />
                      <TiDelete onClick={() => handleDeleteClick(folder.id)} />
                    </span>
                  )}
                </div>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu
            onClick={onClick}
            style={{ width: 350, height: "100%" }}
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
      <Modal
        title="Edit Project"
        visible={isEditProjectModalVisible}
        onOk={handleEditProjectModalOk}
        onCancel={() => setIsEditProjectModalVisible(false)}
      >
        <Input
          placeholder="Enter project name"
          value={editedProjectName}
          onChange={(e) => setEditedProjectName(e.target.value)}
        />
        <Input.TextArea
          placeholder="Enter project description"
          value={editedProjectDescription}
          onChange={(e) => setEditedProjectDescription(e.target.value)}
          style={{ marginTop: "16px" }}
        />
      </Modal>
    </>
  );
};

export default LeftSideBar;
