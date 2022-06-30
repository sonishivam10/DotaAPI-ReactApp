import React from 'react';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matchData: [],
      offSet: 0,
      dataLimit: 100,
    };
  }

  componentDidMount(){
    document.title = "Dota API Data"
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    fetch('https://api.opendota.com/api/explorer?sql=select * from matches order by start_time desc limit ' + this.state.dataLimit + ' offset ' + this.state.offSet)
      .then(res => res.json())
      .then(data => {
        this.setState({ matchData: data.rows });
      })
      .catch(err => console.error(err));
  };

  render() {

    const columns = [
      { field: 'match_id', headerName: 'MatchID', headerClassName: 'super-app-theme--header', type: 'number', width: 130 },
      { field: 'start_time', headerName: 'StartTime', type: 'number', width: 130 },
      { field: 'duration', headerName: 'Duration', type: 'number', width: 130 },
      { field: 'first_blood_time', headerName: 'FirstBloodTime', type: 'number', width: 130 },
      { field: 'radiant_score', headerName: 'RadiantScore', type: 'number', width: 130 },
      { field: 'dire_score', headerName: 'DireScore', type: 'number', width: 130 },
    ];
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item >
            <h1> Dota Api Data </h1>
          </Grid>
          <Grid item >
            <TextField
              style={{ margin: 2 }}
              id="outlined-basic"
              label="Limit"
              variant="outlined"
              value={this.state.dataLimit}
              onChange={event => this.setState({ dataLimit: event.target.value })}
            />
            <TextField
              style={{ margin: 2 }}
              id="outlined-basic"
              label="OffSet"
              variant="outlined"
              value={this.state.offSet}
              onChange={event => this.setState({ offSet: event.target.value })}
            />
          </Grid>
          <Grid item  >
            <Button
              style={{ margin: 2, marginTop: 10 }}
              variant="contained"
              onClick={this.handleSubmit}
            >
              Load Data
            </Button>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', height: 400 }}>
          <Container maxWidth="md">
            <DataGrid
              sx={{
                boxShadow: 2,
                border: 2,
                m: 3,
                borderColor: 'primary.dark',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
              rows={this.state.matchData}
              columns={columns}
              getRowId={(row) => row.match_id}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </Container>
        </div>
      </div>

    );
  }
}

export default App;
