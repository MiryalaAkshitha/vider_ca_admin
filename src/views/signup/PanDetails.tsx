import { Box, Button, TextField } from "@mui/material";

const PanDetails = ({ state, setState }) => {
  const handleSubmit = () => {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  console.log(state);

  return (
    <>
      {state.category === "Company" && (
        <>
          <Box>
            <form onSubmit={handleSubmit}>
              <Box mt={2}>
                <TextField
                  sx={{ mt: 2 }}
                  label="Category"
                  size="small"
                  value={state.category}
                  name="Category"
                  required
                  fullWidth
                />
                <TextField
                  sx={{ mt: 2 }}
                  required
                  onChange={handleChange}
                  value={state.fullName}
                  label="Organisation name"
                  size="small"
                  name="legalName"
                  fullWidth
                />

                <TextField
                  required
                  onChange={handleChange}
                  value={state.tradeName}
                  sx={{ mt: 2 }}
                  label="Trade Name"
                  name="tradeName"
                  size="small"
                  fullWidth
                />
                <TextField
                  sx={{ mt: 2 }}
                  label="Constitution of Business"
                  value={state.constitutionOfBusiness}
                  size="small"
                  name="constitutionOfBusiness"
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  required
                  onChange={handleChange}
                  value={state.buildingName}
                  sx={{ mt: 2 }}
                  label="Building name"
                  name="buildingName"
                  size="small"
                  fullWidth
                />
                <TextField
                  required
                  onChange={handleChange}
                  value={state.street}
                  sx={{ mt: 2 }}
                  label="Street"
                  name="street"
                  size="small"
                  fullWidth
                />
                <TextField
                  required
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                  label="City"
                  name="city"
                  value={state.city}
                  size="small"
                  fullWidth
                />
                <TextField
                  required
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                  label="State"
                  name="state"
                  value={state.state}
                  size="small"
                  fullWidth
                />
                <TextField
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                  value={state.pinCode}
                  name="pinCode"
                  label="pincode"
                  size="small"
                  fullWidth
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 3 }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </>
      )}
      {state.category === "Individual" && (
        <Box>
          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <TextField
                sx={{ mt: 2 }}
                label="Category"
                size="small"
                value={state.category}
                name="Category"
                required
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                required
                onChange={handleChange}
                value={state.firstName}
                label="First Name"
                size="small"
                name="firstName"
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                required
                onChange={handleChange}
                value={state.middleName}
                label="Middle Name"
                size="small"
                name="middleName"
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                required
                onChange={handleChange}
                value={state.lastName}
                label="Last Name"
                size="small"
                name="lastName"
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                label="Trade Name"
                value={state.tradeName}
                size="small"
                name="tradeName"
                onChange={handleChange}
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                label="Constitution of Business"
                value={state.constitutionOfBusiness}
                size="small"
                name="constitutionOfBusiness"
                onChange={handleChange}
                fullWidth
              />
              <TextField
                required
                onChange={handleChange}
                value={state.buildingName}
                sx={{ mt: 2 }}
                label="Building name"
                name="buildingName"
                size="small"
                fullWidth
              />
              <TextField
                required
                onChange={handleChange}
                value={state.street}
                sx={{ mt: 2 }}
                label="Street"
                name="street"
                size="small"
                fullWidth
              />
              <TextField
                required
                onChange={handleChange}
                sx={{ mt: 2 }}
                label="City"
                name="city"
                value={state.city}
                size="small"
                fullWidth
              />
              <TextField
                required
                onChange={handleChange}
                sx={{ mt: 2 }}
                label="State"
                name="state"
                value={state.state}
                size="small"
                fullWidth
              />
              <TextField
                onChange={handleChange}
                sx={{ mt: 2 }}
                value={state.pinCode}
                name="pinCode"
                label="pincode"
                size="small"
                fullWidth
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      )}
    </>
  );
};
export default PanDetails;
