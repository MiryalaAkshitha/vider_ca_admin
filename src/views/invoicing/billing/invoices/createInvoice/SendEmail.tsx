import { Paper, TextField, Autocomplete, Grid, Box, Button } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";


const SendEmail = () => {

    const data = [
        { email: 'client@gmail.com' },
        { email: 'client@gmail.com' },
        { email: 'name@gmail.com' },
        { email: 'vider@vider.com' },
        { email: 'shahid@gmail.com' },
        { email: 'name@gmail.com' },

    ];

    return (
        <Box p={4} bgcolor="#F7F7F7" sx={{ height: "90vh" }}>
            <Paper sx={{ position: "relative", width: "900px", margin: "auto", padding: "30px", minHeight: "70vh" }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container mt={2}>
                            <Grid item xs={3}>
                                Select Client Email address
                            </Grid>
                            <Grid item xs={1}>
                                :
                            </Grid>
                            <Grid item xs={8}>
                                <Box>
                                    <NativeSelect fullWidth defaultValue="name@gmail.com">
                                        <option value="name@gmail.com">name@gmail.com</option>
                                        <option value="client@gmail.com">Client@gmail.com</option>
                                        <option value="hshg@gmail.com">hshg@gmail.com</option>
                                    </NativeSelect>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container mt={2}>
                            <Grid item xs={3}>
                                From
                            </Grid>
                            <Grid item xs={1}>
                                :
                            </Grid>
                            <Grid item xs={8}>
                                <Box>
                                    <NativeSelect fullWidth defaultValue="name@gmail.com">
                                        <option value="name@gmail.com">vider@vider.in</option>
                                        <option value="client@gmail.com">Client@gmail.com</option>
                                        <option value="hshg@gmail.com">hshg@gmail.com</option>
                                    </NativeSelect>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container mt={2}>
                            <Grid item xs={3}>
                                cc
                            </Grid>
                            <Grid item xs={1}>
                                :
                            </Grid>
                            <Grid item xs={8}>
                                <Box>
                                    <Autocomplete
                                        multiple
                                        id="size-small-standard-multi"
                                        size="small"
                                        options={data}
                                        getOptionLabel={(option) => option.email}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                            />
                                        )}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container mt={2}>
                            <Grid item xs={3}>
                                Subject
                            </Grid>
                            <Grid item xs={1}>
                                :
                            </Grid>
                            <Grid item xs={8}>
                                <Box>
                                    <TextField fullWidth id="standard-basic" variant="standard" />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container mt={2}>
                            <Grid item xs={3}>
                                Body
                            </Grid>
                            <Grid item xs={1}>
                                :
                            </Grid>
                            <Grid item xs={12}>
                                <Box mt={2}>
                                    <TextField
                                        fullWidth
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        placeholder="Write your body here…"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box mt={3}>
                        <input type="file" id="myfile" name="myfile" />
                    </Box>

                </Grid>
                <Box sx={{ position: "absolute", bottom: "0", left: "50px", padding: "20px" }}>
                    <Button size="large"
                        color="secondary"
                        variant="contained"
                        sx={{ marginRight: "25px" }}> Send Email</Button>
                    <Button size="large"
                        variant="contained"
                        color="inherit" >cancel</Button>
                </Box>

            </Paper>
        </Box >
    );
}
export default SendEmail