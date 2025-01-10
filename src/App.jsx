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

  function handleAddNewProject() {
    setAddProject(true);
  };

  function handleCancel() {
    setAddProject(false);
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar 
        onAddProject={handleAddNewProject}
      />
      {addProject && <NewProject onCancel={handleCancel}/>}
      {!addProject && !projectsState.selectedProjectId && <NoProjectSelected onAddProject={handleAddNewProject} />}
    </main>
  );
};

export default App;
