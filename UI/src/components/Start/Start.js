import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, CardContent, CardHeader, CardMedia, TextField } from '@material-ui/core'
import io from 'socket.io-client'
import './Start.scss'
import logo from '../../images/rook_logo.jpeg'

export const Start = () => {


    const [gameId, setGameId] = useState('')

    const socketRef = useRef()

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:5000")
        return () => socketRef.current.disconnect()
    })

    const handleCreateGame = () => {
        socketRef.current.emit("createGame")
    }

    const joinGame = (e) => {
      
    }

    const handleGameIdChange = (e) => {
        setGameId(e.target.value)
    }

    return (
        <div class='card-container'>
            <Card id="start_card" variant="elevation">
                <CardContent>
                    <div class="logo-container">
                        <CardMedia id="logo" component="img" image={logo}></CardMedia>
                    </div>
                    <div class="center-content">
                        <Button id="create_game_button" color="primary" variant="contained" onClick={handleCreateGame}>Create Game</Button>
                    </div>
                    <div className="center-text">
                        OR
                    </div>
                    <div class="center-content">
                        <Button type="submit" color="primary" variant="contained" onClick={joinGame}>Join</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}
