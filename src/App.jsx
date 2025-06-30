import { useState } from 'react';

import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from './components/NoProjectSelected';
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectID: undefined,
    selectedProject: undefined,
    projects: []
  });

  const handleAddNewProject = () => {
    setProjectsState((prev) => {
      const newState = {
        ...prev,
        selectedProject: undefined,
        selectedProjectID: -1
      };
      return newState;
    })
  };

  const handleCancel = () => {
    setProjectsState((prev) => {
      const newState = {
        ...prev,
        selectedProject: undefined,
        selectedProjectID: undefined
      };
      return newState;
    })
  };

  const handleSelectProject = (projectID) => {
    const selectedProject = projectsState.projects.find((project) => project.id === projectID);
    setProjectsState((prev) => {
      const newState = {
        ...prev,
        selectedProject,
        selectedProjectID: projectID
      }
      return newState;
    })
  };

  const handleSave = (data) => {
    const newProject = {
      ...data,
      id: projectsState.projects.length
    };
    setProjectsState(prev => {
      const newState = {
        ...prev,
        selectedProjectID: undefined,
        selectedProject: undefined,
        projects: [...prev.projects, newProject]
      };
      return newState;
    });
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onAddProject={handleAddNewProject}
        onSelectProject={handleSelectProject}
        projects={projectsState.projects}
      />
      {projectsState.selectedProjectID === undefined && <NoProjectSelected onAddProject={handleAddNewProject} />}
      {projectsState.selectedProjectID < 0 && <NewProject onCancel={handleCancel} onSave={handleSave} />}
      {projectsState.selectedProjectID >= 0 && projectsState.selectedProject && <SelectedProject project={projectsState.selectedProject} />}
    </main>
  );
};

export default App;
