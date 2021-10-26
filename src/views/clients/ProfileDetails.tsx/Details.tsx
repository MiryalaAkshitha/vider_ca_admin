import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextFieldWithCopy from "./TextFieldWithCopy";

function Details({ data, setState }: any) {
  const handleChange = (e: any) => {
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box mt={5}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <TextField
            disabled
            label='Client Id'
            name='clientId'
            value={data?.clientId}
            fullWidth
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            select
            onChange={handleChange}
            value={data?.clientType ?? ""}
            InputLabelProps={{ shrink: true }}
            required
            name='clientType'
            label='Client Type'>
            <MenuItem value='company'>Company</MenuItem>
            <MenuItem value='individual'>Individual</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant='outlined'
            fullWidth
            required
            name='companyType'
            onChange={handleChange}
            size='small'
            value={data?.companyType || ""}
            InputLabelProps={{ shrink: true }}
            select
            label='Company Type'>
            <MenuItem value='Private Limited Company'>
              Private Limited Company
            </MenuItem>
            <MenuItem value='Public Limited Company'>
              Public Limited Company
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Display Name'
            name='displayName'
            onChange={handleChange}
            value={data?.displayName}
            fullWidth
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Authorized Person'
            name='authorizedPerson'
            onChange={handleChange}
            value=''
            fullWidth
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Role'
            name='role'
            onChange={handleChange}
            fullWidth
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldWithCopy
            label='Mobile Number'
            name='mobileNumber'
            value={data?.mobileNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldWithCopy
            label='Alternate Mobile Number'
            name='alternateMobileNumber'
            value={data?.alternateMobileNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldWithCopy
            label='Email'
            name='email'
            value={data?.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextFieldWithCopy
            label='Address'
            name='address'
            value={data?.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Client Manager'
            name='clientManager'
            value=''
            fullWidth
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label='Date of birth'
            name='dob'
            onChange={handleChange}
            value={data?.dob}
            fullWidth
            type='date'
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Status'
            name='active'
            onChange={(e) => {
              setState({
                ...data,
                active: e.target.value === "active" ? true : false,
              });
            }}
            fullWidth
            select
            value={data?.active ? "active" : "inactive"}
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: true }}>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Local Directory Path'
            name='localDirectoryPath'
            onChange={handleChange}
            value={data?.localDirectoryPath}
            fullWidth
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography color='primary' variant='subtitle2' sx={{ mb: 3 }}>
            Pan Details
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextFieldWithCopy
                    label='Pan Number'
                    name='panNumber'
                    value={data?.panNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Button color='primary' variant='outlined'>
                    Verify
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='First Name'
                disabled
                name='firstName'
                value={data?.firstName}
                fullWidth
                variant='outlined'
                size='small'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Middle Name'
                disabled
                name='middleName'
                value={data?.middleName}
                fullWidth
                variant='outlined'
                size='small'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Last Name'
                disabled
                name='lastName'
                value={data?.lastName}
                fullWidth
                variant='outlined'
                size='small'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography color='primary' variant='subtitle2' sx={{ mb: 3 }}>
            Accountant Details
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <TextFieldWithCopy
                label='Accountant Name'
                name='accountantName'
                value={data?.accountantName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextFieldWithCopy
                label='Accountant Mobile'
                name='accountantMobile'
                value={data?.accountantMobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextFieldWithCopy
                label='Accountant Email'
                name='accountantEmail'
                value={data?.accountantEmail}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Notes'
            name='notes'
            sx={{ mt: 2 }}
            onChange={handleChange}
            value={data?.notes}
            fullWidth
            placeholder='Write something here…'
            multiline
            rows={8}
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Details;
