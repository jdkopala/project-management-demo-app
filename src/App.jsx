import { useState } from 'react';

import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from './components/NoProjectSelected';

function App() {
  const [addProject, setAddProject] = useState(false);
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  const handleAddNewProject = () => {
    setAddProject(true);
  };

  const handleCancel = () => {
    setAddProject(false);
  };

  const handleSave = (data) => {
    const newProject = {
      ...data,
      id: projectsState.projects.length
    };
    setProjectsState(prev => {
      const newState = {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject]
      };
      return newState
    });
    setAddProject(false)
    console.log(projectsState.projects)
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onAddProject={handleAddNewProject}
        projects={projectsState.projects}
      />
      {addProject && <NewProject onCancel={handleCancel} onSave={handleSave} />}
      {!addProject && !projectsState.selectedProjectId && <NoProjectSelected onAddProject={handleAddNewProject} />}
    </main>
  );
};

export default App;
