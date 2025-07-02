import { useState, useMemo } from 'react';

import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from './components/NoProjectSelected';
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectID: undefined,
    projects: [],
    tasks: []
  });

  const handleAddNewProject = () => {
    setProjectsState((prev) => {
      const newState = {
        ...prev,
        selectedProjectID: -1
      };
      return newState;
    });
  };

  const handleCancel = () => {
    setProjectsState((prev) => {
      const newState = {
        ...prev,
        selectedProjectID: undefined
      };
      return newState;
    });
  };

  const handleSelectProject = (projectID) => {
    setProjectsState((prev) => {
      const newState = {
        ...prev,
        selectedProjectID: projectID
      }
      return newState;
    });
  };

  const handleSave = (data) => {
    const newProject = {
      ...data,
      id: Math.round(Math.random() * 100)
    };
    setProjectsState((prev) => {
      const newState = {
        ...prev,
        selectedProjectID: newProject.id,
        projects: [...prev.projects, newProject]
      }
      return newState;
    });
  };

  const handleDeleteProject = () => {
    console.log('handle delete')
    const removeProject = projectsState.projects.find((project) => project.id === projectsState.selectedProjectID);
    if (removeProject) {
      const removeIdx = projectsState.projects.indexOf(removeProject);
      const newProjects = structuredClone(projectsState.projects);
      newProjects.splice(removeIdx, 1);
      setProjectsState((prev) => {
        const newState = {
          ...prev,
          selectedProjectID: undefined,
          projects: [...newProjects]
        };
        return newState;
      });
    }
  };

  const handleSaveTask = (newTask) => {
    console.log('saving tasks');
    const newTaskObj = {
      text: newTask,
      id: Math.round(Math.random() * 100),
      projectID: projectsState.selectedProjectID
    };
    setProjectsState((prev) => {
      return {
        ...prev,
        tasks: [newTaskObj, ...prev.tasks]
      }
    });
    console.log(projectsState.tasks)
  };

  const handleDeleteTask = (taskID) => {
    const newTasks = structuredClone(projectsState.tasks);
    const deleteTask = newTasks.find((task) => task.id === taskID);
    const removeIdx = newTasks.indexOf(deleteTask);
    newTasks.splice(removeIdx, 1);
    setProjectsState((prev) => {
      return {
        ...prev,
        tasks: [...newTasks]
      }
    })
  };

  const selectedProject = useMemo(() => {
    return projectsState.projects.find((project) => project.id === projectsState.selectedProjectID) ?? undefined
  }, [projectsState.selectedProjectID]);

  const projectTasks = useMemo(() => {
    return projectsState.tasks.filter((task) => task.projectID == projectsState.selectedProjectID) ?? []
  }, [projectsState.selectedProjectID, projectsState.tasks])

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onAddProject={handleAddNewProject}
        onSelectProject={handleSelectProject}
        selectedProjectID={projectsState.selectedProjectID}
        projects={projectsState.projects}
      />
      {projectsState.selectedProjectID === undefined && <NoProjectSelected onAddProject={handleAddNewProject} />}
      {projectsState.selectedProjectID < 0 && <NewProject onCancel={handleCancel} onSave={handleSave} />}
      {projectsState.selectedProjectID >= 0 && selectedProject &&
        <SelectedProject
          project={selectedProject}
          tasks={projectTasks}
          onDelete={handleDeleteProject}
          onSaveTask={handleSaveTask}
          onDeleteTask={handleDeleteTask}
        />
      }
    </main>
  );
};

export default App;
