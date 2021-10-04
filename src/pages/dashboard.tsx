import { Button } from "@mui/material"

function Dashboard() {
  return (
    <div>
      <Button color="secondary" variant="contained">Cancel</Button>
      <br />
      <Button color="primary" sx={{ mt: 3 }} variant="contained">Submit</Button>
    </div>
  )
}

export default Dashboard
