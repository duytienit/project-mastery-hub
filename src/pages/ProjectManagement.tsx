
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, UserPlus, Plus, X, Trash, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'todo' | 'inProgress' | 'done';
  description: string;
  attachments: string[];
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  currentTask: string;
}

const ProjectManagement = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const isNewProject = location.search.includes('new=true');
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'mine'>('all');
  const [showTaskModal, setShowTaskModal] = useState(false);

  const members: Member[] = [
    {
      id: '1',
      name: 'Emily Thompson',
      avatar: 'https://public.readdy.ai/ai/img_res/4b87300b27ce7e0ade16a55e5664cd51.jpg',
      status: 'online',
      currentTask: 'UI Design Review'
    },
    {
      id: '2',
      name: 'Michael Anderson',
      avatar: 'https://public.readdy.ai/ai/img_res/df7db7e72405ab55d4ad7c231b5c3112.jpg',
      status: 'offline',
      currentTask: 'Backend API Integration'
    },
    {
      id: '3',
      name: 'Sarah Williams',
      avatar: 'https://public.readdy.ai/ai/img_res/ba0140d5ff4c31cb5e34b7197eb90ad9.jpg',
      status: 'online',
      currentTask: 'User Testing'
    }
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Implement User Authentication',
      assignee: 'Emily Thompson',
      dueDate: '2025-03-30',
      status: 'todo',
      description: 'Set up OAuth2 authentication system with support for multiple providers.',
      attachments: ['auth_specs.pdf', 'workflow.docx']
    },
    {
      id: '2',
      title: 'Design Dashboard Layout',
      assignee: 'Sarah Williams',
      dueDate: '2025-03-25',
      status: 'inProgress',
      description: 'Create responsive dashboard design with data visualization components.',
      attachments: ['dashboard_mockup.fig']
    },
    {
      id: '3',
      title: 'API Documentation',
      assignee: 'Michael Anderson',
      dueDate: '2025-03-28',
      status: 'done',
      description: 'Complete REST API documentation using OpenAPI specification.',
      attachments: ['api_docs.md']
    }
  ];

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);
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
          <Link to="/projects">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">
            {isNewProject ? "New Project Setup" : `Project Dashboard${projectId ? ` #${projectId}` : ''}`}
          </h1>
        </div>
        <Button className="bg-projectflow-green hover:bg-projectflow-green/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Members
        </Button>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            <div className="space-y-4">
              {members.map(member => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.currentTask}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
            <div className="space-y-3">
              {tasks
                .filter(task => new Date(task.dueDate) > new Date())
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map(task => (
                  <div key={task.id} className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-red-500">{task.dueDate}</p>
                  </div>
                ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <Button className="bg-projectflow-green hover:bg-projectflow-green/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setViewMode('all')}
                variant={viewMode === 'all' ? 'secondary' : 'outline'}
              >
                View All
              </Button>
              <Button
                onClick={() => setViewMode('mine')}
                variant={viewMode === 'mine' ? 'secondary' : 'outline'}
              >
                View Mine
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {['todo', 'inProgress', 'done'].map((status) => (
              <div key={status} className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  {status === 'todo' ? 'To Do' : status === 'inProgress' ? 'In Progress' : 'Done'}
                </h3>
                <div className="space-y-4">
                  {tasks
                    .filter(task => task.status === status)
                    .map(task => (
                      <div
                        key={task.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleTaskClick(task)}
                      >
                        <h4 className="font-medium mb-2">{task.title}</h4>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{task.assignee}</span>
                          <span>{task.dueDate}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Task Detail Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg w-[600px] p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedTask.title}</h2>
              <Button variant="ghost" size="icon" onClick={closeTaskModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Assignee:</span>
                <span>{selectedTask.assignee}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Due Date:</span>
                <span>{selectedTask.dueDate}</span>
              </div>
              <div>
                <h3 className="text-gray-600 mb-2">Description:</h3>
                <p className="text-gray-800">{selectedTask.description}</p>
              </div>
              <div>
                <h3 className="text-gray-600 mb-2">Attachments:</h3>
                <div className="space-y-2">
                  {selectedTask.attachments.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="text-gray-500">📄</div>
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button className="bg-projectflow-green hover:bg-projectflow-green/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectManagement;
