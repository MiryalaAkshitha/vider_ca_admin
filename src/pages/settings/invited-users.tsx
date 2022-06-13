import { Box, Typography } from '@mui/material'
import Table from 'components/Table'

const inviteUsers = () => {
  return (
    <Box>
      <Table data={overDueData || []} columns={overDueColumns} loading={false} />
    </Box>
  )
}

export default inviteUsers

const overDueData = [
  {
    name: "shahid",
    mobileNumber: "87687809789",
    email: "shahid@janaspanddana.in",

  },
  {
    name: "shahid",
    mobileNumber: "87687809789",
    email: "shahid@janaspanddana.in",

  },
  {
    name: "shahid",
    mobileNumber: "87687809789",
    email: "shahid@janaspanddana.in",

  },

];

const overDueColumns = [
  {
    key: "name",
    title: "Name",
  },
  {
    key: "mobileNumber",
    title: "Mobile Number",
  },
  {
    key: "email",
    title: "Email",
  },

];