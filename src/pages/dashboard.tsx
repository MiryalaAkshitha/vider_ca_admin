import { Button } from "@mui/material"
import { http } from "api/http"
import { useEffect } from "react"

function Dashboard() {

  useEffect(() => {
    http.get('users').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <Button color="secondary" variant="contained">Cancel</Button>
      <br />
      <Button color="primary" sx={{ mt: 3 }} variant="contained">Submit</Button>
    </div>
  )
}

export default Dashboard
