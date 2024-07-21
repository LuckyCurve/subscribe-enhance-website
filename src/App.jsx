import { useEffect, useState } from 'react'
import './App.css'
import { Icon, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, ThemeProvider, CssBaseline, createTheme, TextField } from '@mui/material'

const url = import.meta.env.VITE_BASE_API_URL

function App() {
    const [black_list, set_black_list] = useState([])
    const [auth, setAuth] = useState("")
    const [host, setHost] = useState("")
    const [encode, setEncode] = useState("")

    useEffect(() => {
        init(set_black_list)
    }, [])

    const black_list_com = black_list.map((item, index) => {
        return <>
            <TableBody>
                <TableRow>
                    <TableCell align='center'>{index}</TableCell>
                    <TableCell align='center'>{item}</TableCell>
                    <TableCell align='center'>
                        <Button size='small' color='error' variant='contained' onClick={() => {
                            fetch(`${url}/delete?index=${index}&auth=${auth}`)
                                .then(res => res.text())
                                .then(resStr => console.log("delete response" + resStr))
                        }}>delete
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </>
    }
    )

    return (
        <>
            <Typography variant="h3">
                <Icon fontSize="large" color='primary'>settings</Icon>
                subscribe rules with black
            </Typography>
            <TextField label="Auth Param" value={auth} onChange={(event) => setAuth(event.target.value)} />
            <Table sx={{ maxWidth: 500 }} aria-label='proxy host'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>id</TableCell>
                        <TableCell align='center'>host</TableCell>
                        <TableCell align='center'>operate</TableCell>
                    </TableRow>
                </TableHead>
                {black_list_com}
            </Table>
            <TextField label="Host" value={host} onChange={(event) => setHost(event.target.value)} />
            <span>
                <Button size='large' color='success' variant='contained' onClick={() => {
                    fetch(`${url}/add?host=${host}&auth=${auth}`)
                        .then(res => res.text())
                        .then(resStr => console.log("add response" + resStr))
                }}>add</Button>
            </span>
            <hr />
            <br />
            <span>
                <TextField label="encode" value={encode} onChange={(event) => setEncode(event.target.value)} />
                <Button size='large' color='success' variant='contained' onClick={async () => {
                    await navigator.clipboard.writeText(encodeURIComponent(encode));
                }}>execute</Button>
            </span>
        </>
    )
}

function init(setValue) {
    fetch(`${url}/list`)
        .then((res) => res.json())
        .then(value => setValue(value))
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function DarkApp() {
    const app = App()

    return (<>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {app}
        </ThemeProvider>
    </>
    )
}