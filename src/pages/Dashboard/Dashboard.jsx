import React, { useEffect, useState } from 'react';
import { emailService } from '../../services/email.service';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const allEmails = await emailService.getAllEmail();
      setEmails(allEmails);
    };

    fetchEmails();
  }, []);

  const totalEmails = emails.length;
  const readEmails = emails.filter(email => email.isRead).length;
  const unreadEmails = totalEmails - readEmails;
  const starredEmails = emails.filter(email => email.isStarred).length;
  const draftEmails = emails.filter(email => email.isDraft).length;
  const sentEmails = emails.filter(email => email.sentAt).length;  
  const trashEmails = emails.filter(email => email.removedAt).length;  

  // Data for chart
  const data = {
    labels: ['Read', 'Unread', 'Starred', 'Drafts', 'Sent', 'Trash'],
    datasets: [{
      data: [readEmails, unreadEmails, starredEmails, draftEmails, sentEmails, trashEmails],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }]
  };

  return (
    <div>
      <h1>Email Dashboard</h1>
      <div>
        <h2>Overview</h2>
        <p>Total Emails: {totalEmails}</p>
        <p>Read Emails: {readEmails}</p>
        <p>Unread Emails: {unreadEmails}</p>
        <p>Starred Emails: {starredEmails}</p>
        <p>Draft Emails: {draftEmails}</p>
        <p>Sent Emails: {sentEmails}</p>
        <p>Trash Emails: {trashEmails}</p>
      </div>
      <div style={{ width: '300px', height: '300px' }}>
        <h2>Email Statistics</h2>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
