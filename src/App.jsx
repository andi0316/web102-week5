import { useState, useEffect } from 'react';
import './App.css';
import CatCard from './components/CatCard';

const API_KEY = 'live_X7wG2sQ8VejEPGchhGBZrO7LFLD6QsO3xmhdBchjApT4xbZ4o2v7yMTMA0LaUzdJ';


function App() {

  const [cat, setCat] = useState(null);   //stores + updates cat :3
  const [banList, setBanList] = useState([]);    //stores + updates banlist (multifacted)

  //fetching the cats from the API
  const fetchCat = async () => {
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1', {
        headers: {
          'x-api-key': API_KEY,
        },
      });

      const data = await res.json();  //processing/parsing data
      const currCat = data[0];        //taking only first item in array

      //edge cases + skips banned breeds
      if (currCat.breeds == false || banList.includes(currCat.breeds[0].name) || banList.includes(currCat.breeds[0].origin)) {
        fetchCat();
        return;
      }

      setCat(currCat);
    } 
    
    catch (err) {
      console.error('How is this paw-ssible? Failed to retrieve kitties.', err);
    }
  };

  const toggleBan = (breed) => {
    setBanList((prev) =>     //accessing updated ban list
      prev.includes(breed) ? prev.filter((b) => b !== breed) : [...prev, breed]
    );
  };

  useEffect(() => {
    fetchCat();
  }, []);


  return (
    <div className="App">
      <div className='header'>
        <h1>Find Your Purrrr-fect Pair!</h1>
      </div>

      <button className="randomizer" onClick={fetchCat}>
        Discover a Cat
      </button>

      {cat && (
        <CatCard
          cat={cat}
          onBreedClick={() => toggleBan(cat.breeds[0].name)}
          onOriginClick={() => toggleBan(cat.breeds[0].origin)}
        />
      )}

      <div className="ban-list">
        <h3>Banned Breeds</h3>
        
        {banList.length === 0 ? (<p>None yet</p> ) : 
        (
          banList.map((breed) => (
            <p key={breed} onClick={() => toggleBan(breed)} className="selected">
              {breed}
            </p>
          ))
        )}
      </div>

    </div>
  );
}

export default App;
