
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  members: number;
  lastUpdated: string;
}

const Projects = () => {
  const navigate = useNavigate();
  
  const projects: Project[] = [
    {
      id: '1',
      title: 'Campus Mobile App',
      description: 'Developing a comprehensive mobile application for university campus services.',
      progress: 75,
      members: 5,
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      title: 'Research Paper AI Assistant',
      description: 'Building an AI-powered writing assistant for academic papers and research.',
      progress: 45,
      members: 3,
      lastUpdated: '1 day ago'
    },
    {
      id: '3',
      title: 'Virtual Lab Environment',
      description: 'Creating a virtual environment for conducting science experiments remotely.',
      progress: 30,
      members: 4,
      lastUpdated: '3 days ago'
    }
  ];

  const handleCreateProject = () => {
    navigate('/project/new?new=true');
  };

  const handleLogout = () => {
    // In a real app, we would clear authentication
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <h1 className="text-2xl font-bold text-projectflow-green">ProjectFlow</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/settings">
            <Button variant="ghost" className="text-gray-600" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Projects</h2>
            <p className="text-gray-600 mt-2">Manage and organize your academic projects</p>
          </div>
          <Button 
            className="bg-projectflow-green hover:bg-projectflow-green/90"
            onClick={handleCreateProject}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-projectflow-green h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{project.members} team members</span>
                    <span>Updated {project.lastUpdated}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/project/${project.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Enter Project
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default Projects;
