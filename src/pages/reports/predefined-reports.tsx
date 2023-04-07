import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const linkStyle = {
  textDecoration: "none",
  };


function PredefinedReports() {
 
  return (
    <>
    <Box>
    <Box sx={{margin:"30px",fontSize:"30",fontWeight:600}}>
      User Reports
    </Box>
    <Box sx={{display:"flex",flexDirection:"column",marginLeft:"20px",gap:"20px"}}>
    {/* <a href="www.linkedin.com" target="_blank" rel="noopener noreferrer">
      bobbyhadz.com
    </a> */}
    <span style={{display:"flex"}}><StarBorderIcon/><Link to="/reports/status-wise-tasks"style={linkStyle} > Status-Wise Tasks</Link></span><Divider />
    <span style={{display:"flex"}}><StarBorderIcon/><Link to="/reports/service-category-status-wise-tasks" style={linkStyle}>Service Category Status-wise Tasks</Link></span> <Divider />
    <span style={{display:"flex"}}><StarBorderIcon/><Link to ="/reports/service-subcategory-wise-tasks" style={linkStyle}>Service Category & Sub-Category-Wise Tasks</Link></span><Divider />
    <span style={{display:"flex"}}><StarBorderIcon/><Link to="/reports/user-based-master-report" style={linkStyle}>User-Based Master Report</Link>
</span><Divider />
    <span style={{display:"flex"}}><StarBorderIcon/><Link to="/reports/over-due-tasks-report" style={linkStyle}>Overdue Tasks</Link>
</span><Divider />
    <span style={{display:"flex"}}><StarBorderIcon/><Link to="/reports/detailed-over-due-tasks-report" style={linkStyle}>Detailed Overdue Tasks</Link>
</span><Divider />
    <span style={{display:"flex"}}><StarBorderIcon/><Link to="/reports/efficiency-report" style={linkStyle}>Efficiency Report</Link>
</span><Divider />
    <span style={{display:"flex"}}><StarBorderIcon/><Link to="/reports/highest-task-completion-reports" style={linkStyle}>Highest No. of Tasks Completion</Link></span> <Divider />

    </Box>
    </Box>
    <Box>

    </Box>
    </>
  )
}

export default PredefinedReports;