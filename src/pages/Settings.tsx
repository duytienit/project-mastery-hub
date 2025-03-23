
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center">
        <div className="flex items-center space-x-4">
          <Link to="/projects">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Account Settings</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-3xl">
                  ET
                </div>
                <Button variant="outline">Change Avatar</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Emily Thompson" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="emily.thompson@university.edu" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue="Computer Science" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto bg-projectflow-green hover:bg-projectflow-green/90">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </main>
    </motion.div>
  );
};

export default Settings;
