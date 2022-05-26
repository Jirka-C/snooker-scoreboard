import React, {useState, useEffect} from 'react'
import strings from '../strings.CZ'
import { VscSaveAs, VscClose } from "react-icons/vsc";
import axios from 'axios';
import { Link } from 'react-router-dom';


function PlayersList() {

  const [playersList, setPlayersList] = useState([]);

  useEffect(() => {
    axios.get("http://api.cechmanek.com/players/")
    .then(response => {
        if(response.data){
          setPlayersList(response.data.players)
        }
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const savePlayer = (id) => {
    let player = document.getElementById(`player-${id}`).value;
    
    if(!player.length){
      return;
    }

		axios.post(`http://api.cechmanek.com/players/save/${id}`,
      JSON.stringify({player: player})
    )
    .then(response => {
      if(response.data){
        setPlayersList(response.data.players)
        document.getElementById(`player-0`).value = ""
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  const deletePlayer = (id) => {
    axios.get(`http://api.cechmanek.com/players/delete/${id}`)
    .then(response => {
      if(response.data){
        setPlayersList(response.data.players)
      }
    })
    .catch(error => {
      console.log(error)
    })    
  }

  return (
    <section className="playersList">
      <div className='playersList__button'>
        <Link to={`/`} className="button">{strings.ScoreBoard.back}</Link>
      </div>
      <div className='playersList__content'>
        {playersList.map(({id, player}) => 
          <div className='playersList__item' key={id}>
            <input id={`player-${id}`} className="playerPanel__name playerPanel__name--input" type="text" defaultValue={player}/>
            <VscSaveAs className='playersList__icon playersList__icon--save' onClick={() => savePlayer(id)} />
            <VscClose className='playersList__icon playersList__icon--delete' onClick={() => deletePlayer(id)} />
          </div>
        )}
        <div className='playersList__item'>
          <input id="player-0" className="playerPanel__name playerPanel__name--input" type={"text"} defaultValue={""} />
          <VscSaveAs className='playersList__icon playersList__icon--save' onClick={() => savePlayer(0)} />
        </div>
      </div>
    </section>
  )
}

export default PlayersList