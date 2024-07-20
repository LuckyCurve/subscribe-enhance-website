import {useEffect, useState} from 'react'
import './App.css'

const url = "http://localhost:8000"

function App() {
    const [black_list, set_black_list] = useState([])
    const [auth, setAuth] = useState("")
    const [host, setHost] = useState("")

    useEffect(() => {
        init(set_black_list)
    }, [])

    const black_list_com = black_list.map((item, index) => {
            return <>
                <tbody>
                <tr>
                    <td>{index}</td>
                    <td>{item}</td>
                    <td>
                        <button onClick={() => {
                            fetch(`${url}/delete?index=${index}&auth=${auth}`)
                                .then(res => res.text())
                                .then(resStr => console.log("delete response" + resStr))
                        }}>delete
                        </button>
                    </td>
                </tr>
                </tbody>
            </>
        }
    )

    return (
        <>

            <h1>subscribe rules with black</h1>
            <span>auth: <input type="text" value={auth} onChange={(event) => setAuth(event.target.value)}/></span>
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>host</th>
                    <th>operate</th>
                </tr>
                </thead>
                {black_list_com}
            </table>
            <span>
                host: <input type="text" value={host} onChange={(event) => setHost(event.target.value)}/>
                <button onClick={() => {
                    fetch(`${url}/add?host=${host}&auth=${auth}`)
                        .then(res => res.text())
                        .then(resStr => console.log("add response" + resStr))
                }}>add</button>
            </span>
        </>
    )
}

function init(setValue) {
    fetch(`${url}/list`)
        .then((res) => res.json())
        .then(value => setValue(value))
}

export default App
