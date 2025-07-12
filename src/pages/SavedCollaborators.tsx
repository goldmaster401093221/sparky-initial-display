
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Users, 
  Bookmark, 
  MessageSquare, 
  Database, 
  Ship, 
  FileText, 
  Wrench, 
  Settings,
  MoreHorizontal,
  Heart,
  Copy,
  Eye,
  Search,
  Menu
} from 'lucide-react';

const SavedCollaborators = () => {
  const [activeTab, setActiveTab] = useState('Saved');
  const [sortBy, setSortBy] = useState('Relevant');
  const [resultsPerPage, setResultsPerPage] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const sidebarItems = [
    { icon: Home, label: 'Home', active: false, route: '/' },
    { icon: Users, label: 'Dashboard', active: false, route: '/dashboard' },
    { icon: Users, label: 'Discover Collaborators', active: false, route: '/discover-collaborators' },
    { icon: Bookmark, label: 'Saved Collaborators', active: true, route: '/saved-collaborators' },
  ];

  const collaborationItems = [
    { icon: MessageSquare, label: 'Collaboration', active: false, route: '/collaboration' },
    { icon: MessageSquare, label: 'Chat', active: false, route: '/chat' },
    { icon: Database, label: 'Data Center', active: false, route: '/data-center' },
  ];

  const supportingServices = [
    { icon: Ship, label: 'Shipment', active: false, route: '/shipment' },
    { icon: FileText, label: 'Quotation', active: false, route: '/quotation' },
    { icon: Wrench, label: 'Equipment', active: false, route: '/equipment' },
  ];

  const collaborators = [
    {
      name: 'Kevin Rashy',
      role: 'Researcher Role',
      totalCollaborations: 12,
      rating: '4.8/5',
      skills: ['Idea', 'Proposal', 'Grant Application'],
      status: 'Best Match',
      statusType: 'contacted',
      collaborated: false
    },
    {
      name: 'Anna Krylova',
      role: 'Researcher Role',
      totalCollaborations: 24,
      rating: '4.9/5',
      skills: ['Equipment', 'Experiment'],
      status: 'Best Match',
      statusType: 'collaborated',
      collaborated: true
    },
    {
      name: 'Kevin Rashy',
      role: 'Researcher Role',
      totalCollaborations: 12,
      rating: '4.8/5',
      skills: ['Idea', 'Proposal', 'Grant Application'],
      status: '',
      statusType: 'contacted',
      collaborated: false
    },
    {
      name: 'Anna Krylova',
      role: 'Researcher Role',
      totalCollaborations: 24,
      rating: '4.9/5',
      skills: ['Equipment', 'Experiment'],
      status: '',
      statusType: 'none',
      collaborated: false
    },
    {
      name: 'Anna Krylova',
      role: 'Researcher Role',
      totalCollaborations: 24,
      rating: '4.9/5',
      skills: ['Equipment', 'Experiment'],
      status: '',
      statusType: 'none',
      collaborated: false
    }
  ];

  function AppSidebar() {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    return (
      <Sidebar className="border-r">
        <SidebarHeader className="border-b p-4 md:p-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs md:text-sm">A</span>
            </div>
            {!isCollapsed && <span className="font-semibold text-base md:text-lg">AIRCollab</span>}
          </div>
        </SidebarHeader>

        <SidebarContent className="p-2 md:p-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      className={`w-full ${
                        item.active 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <button
                        onClick={() => navigate(item.route)}
                        className="flex items-center space-x-3 w-full"
                      >
                        <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                        {!isCollapsed && <span className="text-xs md:text-sm truncate">{item.label}</span>}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {!isCollapsed && 'Collaborations'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {collaborationItems.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      className={`w-full ${
                        item.active 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <button
                        onClick={() => navigate(item.route)}
                        className="flex items-center space-x-3 w-full"
                      >
                        <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                        {!isCollapsed && <span className="text-xs md:text-sm truncate">{item.label}</span>}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {!isCollapsed && 'Supporting Services'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {supportingServices.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      className={`w-full ${
                        item.active 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <button
                        onClick={() => navigate(item.route)}
                        className="flex items-center space-x-3 w-full"
                      >
                        <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                        {!isCollapsed && <span className="text-xs md:text-sm truncate">{item.label}</span>}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t p-2 md:p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="w-full text-gray-700 hover:bg-gray-100"
              >
                <button
                  onClick={() => navigate('/settings')}
                  className="flex items-center space-x-3 w-full"
                >
                  <Settings className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-xs md:text-sm">Settings</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {!isCollapsed && (
            <div className="flex items-center space-x-3 mt-4 p-2 rounded-md">
              <Avatar className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                <AvatarFallback className="bg-gray-800 text-white text-xs md:text-sm">BM</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-xs md:text-sm font-medium text-gray-900 truncate">Bashair Mussa</div>
                <div className="text-xs text-gray-500 truncate">Researcher Role</div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-lg md:text-xl font-semibold text-gray-900">Saved Collaborators</h1>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm" className="text-xs md:text-sm">
                Sign Out
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 md:p-6">
            {/* Filter Tabs */}
            <div className="mb-4 md:mb-6">
              <div className="flex space-x-4 md:space-x-8 border-b border-gray-200 overflow-x-auto">
                {['Saved', 'Contacted'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 md:pb-4 text-sm font-medium whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-b-2 border-gray-900 text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Controls */}
            <div className="mb-4 md:mb-6">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
                
                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4 text-xs md:text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <span>Results per page</span>
                    <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
                      <SelectTrigger className="w-16 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <span className="hidden md:block">Total Results: 15</span>
                  <div className="flex items-center space-x-2">
                    <span>Sort</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-24 md:w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Relevant">Relevant</SelectItem>
                        <SelectItem value="Rating">Rating</SelectItem>
                        <SelectItem value="Collaborations">Collaborations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Card className="border border-gray-200">
                <Table>
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead className="text-gray-700 font-medium">Researcher</TableHead>
                      <TableHead className="text-center text-gray-700 font-medium">Total Collaborations</TableHead>
                      <TableHead className="text-center text-gray-700 font-medium">Ratings</TableHead>
                      <TableHead className="text-gray-700 font-medium">Research</TableHead>
                      <TableHead className="text-center text-gray-700 font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {collaborators.map((collaborator, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-14 h-14 flex-shrink-0">
                              <img 
                                src="/lovable-uploads/avatar2.jpg" 
                                className="w-full h-full object-cover rounded-full"
                                alt={collaborator.name}
                              />
                            </Avatar>
                            <div className="min-w-0">
                              <div className="font-medium text-gray-900 truncate">{collaborator.name}</div>
                              <div className="text-sm text-gray-500 truncate">{collaborator.role}</div>
                              <div className="flex items-center space-x-2 mt-1">
                                {collaborator.status && (
                                  <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7.2999 4.00016H10.5C11.0523 4.00016 11.5 4.44788 11.5 5.00015V6.05235C11.5 6.18295 11.4744 6.3123 11.4247 6.4331L9.8775 10.1905C9.80035 10.3779 9.61775 10.5001 9.41515 10.5001H1C0.72386 10.5001 0.5 10.2763 0.5 10.0001V5.00015C0.5 4.72402 0.72386 4.50016 1 4.50016H2.74092C2.90339 4.50016 3.05572 4.42123 3.14941 4.28851L5.8761 0.425678C5.94735 0.324743 6.08165 0.290989 6.19215 0.346242L7.0992 0.799755C7.625 1.06267 7.89655 1.65646 7.75155 2.22618L7.2999 4.00016Z" fill="white"/>
                                    </svg>
                                    <span>{collaborator.status}</span>
                                  </Badge>
                                )}
                                {collaborator.statusType === 'contacted' && (
                                  <Badge className="bg-blue-200 text-blue-600 text-xs px-2 py-1 rounded-lg">
                                    Contacted
                                  </Badge>
                                )}
                                {collaborator.statusType === 'collaborated' && (
                                  <Badge className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                    Collaborated
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">{collaborator.totalCollaborations}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">{collaborator.rating}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {collaborator.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center space-x-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Heart className="w-4 h-4 text-blue-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {collaborators.map((collaborator, index) => (
                <Card key={index} className="p-4 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12 flex-shrink-0">
                      <img 
                        src="/lovable-uploads/avatar2.jpg" 
                        className="w-full h-full object-cover rounded-full"
                        alt={collaborator.name}
                      />
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate">{collaborator.name}</h3>
                          <p className="text-sm text-gray-500 truncate">{collaborator.role}</p>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Heart className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Copy className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-2 space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {collaborator.status && (
                            <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                              <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.2999 4.00016H10.5C11.0523 4.00016 11.5 4.44788 11.5 5.00015V6.05235C11.5 6.18295 11.4744 6.3123 11.4247 6.4331L9.8775 10.1905C9.80035 10.3779 9.61775 10.5001 9.41515 10.5001H1C0.72386 10.5001 0.5 10.2763 0.5 10.0001V5.00015C0.5 4.72402 0.72386 4.50016 1 4.50016H2.74092C2.90339 4.50016 3.05572 4.42123 3.14941 4.28851L5.8761 0.425678C5.94735 0.324743 6.08165 0.290989 6.19215 0.346242L7.0992 0.799755C7.625 1.06267 7.89655 1.65646 7.75155 2.22618L7.2999 4.00016Z" fill="white"/>
                              </svg>
                              <span>{collaborator.status}</span>
                            </Badge>
                          )}
                          {collaborator.statusType === 'contacted' && (
                            <Badge className="bg-blue-200 text-blue-600 text-xs px-2 py-1 rounded-lg">
                              Contacted
                            </Badge>
                          )}
                          {collaborator.statusType === 'collaborated' && (
                            <Badge className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                              Collaborated
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Collaborations: <span className="font-medium">{collaborator.totalCollaborations}</span></span>
                          <span className="text-gray-600">Rating: <span className="font-medium">{collaborator.rating}</span></span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {collaborator.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-4 py-2">...</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SavedCollaborators;
