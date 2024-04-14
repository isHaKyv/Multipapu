import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GameUnlocker() {
  const [gameName, setGameName] = useState('');
  const [gamePrice, setGamePrice] = useState('');
  const [gameAccount, setGameAccount] = useState('');
  const [gameTitles, setGameTitles] = useState([]);

  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const savedTitles = JSON.parse(localStorage.getItem('gameTitles'));
    if (savedTitles) {
      setGameTitles(savedTitles);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gameTitles', JSON.stringify(gameTitles));
  }, [gameTitles]);

  const handleAddGame = () => {
    const newGameTitles = [...gameTitles, { name: gameName, price: gamePrice, account: gameAccount, image: selectedImage }];
    setGameTitles(newGameTitles);
    setGameName('');
    setGamePrice('');
    setGameAccount('');
    setSelectedImage('');
  };

  const handleModifyGame = () => {
    const modifiedTitles = gameTitles.map(() => ({ name: gameName, price: gamePrice, account: gameAccount }));
    setGameTitles(modifiedTitles);
  };

  const handleDeleteGame = (index) => {
    const newGameTitles = [...gameTitles];
    newGameTitles.splice(index, 1);
    setGameTitles(newGameTitles);
  };

  return (
    <div>
      <div style={{ margin: '0', padding: '0', fontFamily: 'Arial, sans-serif', color: "#fff" }}>
        <div style={{ width: '100%', backgroundColor: '#D9D9D9', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#3E3E3E', border: 'none', color: 'white', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', marginRight: '10px' }}>Volver</button>
            </Link>
            <h1 style={{ textAlign: 'center', padding: '20px 0', fontSize: '40px', marginBottom: '20px', flex: 1 }}>Game Unlocker</h1>
            <div style={{ width: '100px' }}></div>
          </div>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            style={{ width: '300px', padding: '10px', fontSize: '16px', marginBottom: '20px', textAlign: 'center',}}
            placeholder="Nombre del juego"
          />
          <input
            type="text"
            value={gamePrice}
            onChange={(e) => setGamePrice(e.target.value)}
            style={{ width: '300px', padding: '10px', fontSize: '16px', marginBottom: '20px', textAlign: 'center',}}
            placeholder="Precio del juego"
          />
          <input
            type="text"
            value={gameAccount}
            onChange={(e) => setGameAccount(e.target.value)}
            style={{ width: '300px', padding: '10px', fontSize: '16px', marginBottom: '20px', textAlign: 'center',}}
            placeholder="Region del juego"
          />
          <input
            type="file"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            style={{ width: '300px', padding: '10px', fontSize: '16px', marginBottom: '20px', textAlign: 'center',}}placeholder="Imagen del dispositivo"
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              style={{ backgroundColor: '#3E3E3E', border: 'none', color: 'white', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', marginRight: '10px' }}
              onClick={handleAddGame}
            >
              Agregar
            </button>
            <button
              style={{ backgroundColor: '#3E3E3E', border: 'none', color: 'white', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px' }}
              onClick={handleModifyGame}
            >
              Modificar
            </button>
          </div>
          <table style={{ width: '90%', margin: '0 auto', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px',border: '1px solid #ccc' }}>Nombre</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Precio</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Region</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Imagen</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {gameTitles.map((game, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{game.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{game.price}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{game.account}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    {
                      game.image ? (
                        <img src={URL.createObjectURL(game.image)} alt={game.name} style={{ maxWidth: '100px' }} />
                      ) : (
                        'No image'
                      )
                    }
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    <button
                      style={{ backgroundColor: '#F44336', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                      onClick={() => handleDeleteGame(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GameUnlocker;