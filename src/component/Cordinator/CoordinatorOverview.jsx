'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Pie, Line } from 'recharts';
import { Bell, LogOut, Plus, FileText } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import Table from '../common/Table';
import DropdownMenu from '../common/DropdownMenu';
import ChartContainer from '../common/ChartContainer'; // Importing ChartContainer

// Mock data for demonstration purposes
const keyMetrics = {
  totalStudents: 500,
  totalCompanies: 50,
  totalJobOpenings: 75,
  totalApplications: 1200,
  pendingApplications: 30,
};

const recentActivities = [
  { type: 'Student Registration', description: 'New student John Doe registered', date: '2024-03-01', time: '10:30 AM' },
  { type: 'Job Listing Added', description: 'New job posted by TechCorp', date: '2024-03-01', time: '11:45 AM' },
  { type: 'Application Status Changed', description: 'Application for Jane Smith updated to "Interviewed"', date: '2024-03-02', time: '09:15 AM' },
];

const upcomingInterviews = [
  { candidateName: 'Alice Johnson', jobTitle: 'Software Engineer', date: '2024-03-05', time: '02:00 PM', type: 'Interview', status: 'Scheduled' },
  { candidateName: 'Bob Williams', jobTitle: 'Data Analyst', date: '2024-03-06', time: '10:30 AM', type: 'Test', status: 'Pending' },
];

const applicationData = [
  { name: 'Week 1', applications: 50 },
  { name: 'Week 2', applications: 75 },
  { name: 'Week 3', applications: 60 },
  { name: 'Week 4', applications: 90 },
];

const jobDistributionData = [
  { name: 'Software Engineer', value: 40 },
  { name: 'Data Analyst', value: 30 },
  { name: 'Product Manager', value: 20 },
  { name: 'UX Designer', value: 10 },
];

const placementTrendData = [
  { name: 'Jan', placements: 10 },
  { name: 'Feb', placements: 15 },
  { name: 'Mar', placements: 20 },
  { name: 'Apr', placements: 25 },
];

export default function CoordinatorOverview() {
  const [activeNavItem, setActiveNavItem] = useState('Overview');

  return (
    <div className="min-h-screen  bg-white w-full">
     

      <main className=" flex flex-col  h-screen   w-full space-y-6">
 
        {/* Key Metrics Section */}
        <section className="mb-8 grid gap-4 md:grid-cols-3 lg:grid-cols-5 p-5 ">
          {Object.entries(keyMetrics).map(([key, value]) => (
            <Card key={key}>
              <Card.Header className="flex flex-row items-center justify-between ">
                <Card.Title className="text-sm font-medium">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="text-2xl font-bold">{value}</div>
              </Card.Content>
            </Card>
          ))}
        </section>

        {/* Recent Activities Section */}
        <section className=" w-full p-5">
          <h2 className="mb-4 text-2xl font-semibold">Recent Activities</h2>
          <Table >
            <Table.Header>
              <Table.Row>
                <Table.Head>Activity Type</Table.Head>
                <Table.Head>Description</Table.Head>
                <Table.Head>Date</Table.Head>
                <Table.Head>Time</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {recentActivities.map((activity, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{activity.type}</Table.Cell>
                  <Table.Cell>{activity.description}</Table.Cell>
                  <Table.Cell>{activity.date}</Table.Cell>
                  <Table.Cell>{activity.time}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Button className="mt-4">View All Activities</Button>
        </section>

        {/* Upcoming Interviews Section */}
        <section className="p-5">
          <h2 className="mb-4 text-2xl font-semibold">Upcoming Interviews and Tests</h2>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Candidate Name</Table.Head>
                <Table.Head>Job Title</Table.Head>
                <Table.Head>Date</Table.Head>
                <Table.Head>Time</Table.Head>
                <Table.Head>Type</Table.Head>
                <Table.Head>Status</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {upcomingInterviews.map((interview, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{interview.candidateName}</Table.Cell>
                  <Table.Cell>{interview.jobTitle}</Table.Cell>
                  <Table.Cell>{interview.date}</Table.Cell>
                  <Table.Cell>{interview.time}</Table.Cell>
                  <Table.Cell>{interview.type}</Table.Cell>
                  <Table.Cell>{interview.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Button className="mt-4">Schedule New</Button>
        </section>

        {/* Quick Actions Section */}
        <section className="p-5">
          <h2 className="mb-4 text-2xl font-semibold">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button><Plus className="mr-2 h-4 w-4" /> Add New Student</Button>
            <Button><Plus className="mr-2 h-4 w-4" /> Add New Company</Button>
            <Button><Plus className="mr-2 h-4 w-4" /> Post New Job</Button>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button><FileText className="mr-2 h-4 w-4" /> Generate Reports</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>Placement Report</DropdownMenu.Item>
                <DropdownMenu.Item>Application Status Report</DropdownMenu.Item>
                <DropdownMenu.Item>Company Participation Report</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <Card.Header>
              <Card.Title>Applications Over Time</Card.Title>
            </Card.Header>
            <Card.Content>
              <ChartContainer title="Applications Over Time">
                <Bar data={applicationData} dataKey="applications" />
              </ChartContainer>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Job Application Distribution</Card.Title>
            </Card.Header>
            <Card.Content>
              <ChartContainer title="Job Application Distribution">
                <Pie data={jobDistributionData} dataKey="value" nameKey="name" />
              </ChartContainer>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Placement Trends</Card.Title>
            </Card.Header>
            <Card.Content>
              <ChartContainer title="Placement Trends">
                <Line data={placementTrendData} dataKey="placements" />
              </ChartContainer>
            </Card.Content>
          </Card>
        </section>
      </main>
    </div>
  );
}
