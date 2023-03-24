import './main.css';
import bangs from './img/bangs.png';
import search from './img/search.svg';
import cloud from './img/cloud.png';
import github from './img/GitHub.png';

function App() {
   const API_key = '**********';
   const url = 'http://api.openweathermap.org/data/2.5/weather?q=Kyiv';
   const cityElement = document.querySelector('.block__card__items__city');
   const dateElement = document.querySelector('.block__card__items__date');
   const temperatureElement = document.querySelector(
      '.block__card__temp__number'
   );
   const tempMaxElement = document.querySelector(
      '.block__card__max-low__title__number-max'
   );
   const tempMinElement = document.querySelector(
      '.block__card__max-low__title__number-low'
   );

   async function getWeatherData() {
      try {
         const response = await fetch(`${url}` + `&appid=${API_key}`);
         const {
            name: city,
            main: {
               temp: temperatureInKelvin,
               temp_max: tempMax,
               temp_min: tempMin,
            },
            dt: timestamp,
         } = await response.json();
         const temperatureInCelsius = temperatureInKelvin - 273.15;
         const date = new Date(timestamp * 1000);
         const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
         const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
         ];
         const formattedDate = `${days[date.getDay()]} ${
            date.getMonth() + 1
         }/${date.getDate()}/${date.getFullYear() % 100}`;

         return {
            city,
            date: formattedDate,
            temperature: temperatureInCelsius,
            tempMax: tempMax - 273.15,
            tempMin: tempMin - 273.15,
         };
      } catch (error) {
         console.log(error);
      }
   }

   getWeatherData().then(({ city, date, temperature, tempMax, tempMin }) => {
      tempMinElement.textContent = `${tempMin.toFixed(1)} C`;
      tempMaxElement.textContent = `${tempMax.toFixed(1)} C`;
      dateElement.textContent = date;
      temperatureElement.textContent = temperature.toFixed(1);
      cityElement.textContent = city;
   });

   return (
      <div className="main-screen">
         <img className="main-screen__img" src={bangs} />
         <div className="main-bg"></div>
         <header className="header">
            <div className="container">
               <nav className="header__nav">
                  <form className="header__nav__block">
                     <img className="header__nav__block__search" src={search} />
                     <input
                        className="header__nav__block__input"
                        type="text"
                        placeholder="Enter location"
                     />
                  </form>
               </nav>
            </div>
         </header>
         <main className="block">
            <div className="container">
               <section className="block__card">
                  <div className="block__card__items">
                     <h1 className="block__card__items__city"></h1>
                     <p className="block__card__items__date"></p>
                     <button className="block__card__items__heard-btn">
                        <svg
                           width="25"
                           height="22"
                           viewBox="0 0 25 22"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M21.2913 3.61183C20.7805 3.10083 20.1741 2.69547 19.5066 2.41891C18.8392 2.14235 18.1238 2 17.4013 2C16.6788 2 15.9634 2.14235 15.2959 2.41891C14.6285 2.69547 14.022 3.10083 13.5113 3.61183L12.4513 4.67183L11.3913 3.61183C10.3596 2.58013 8.96032 2.00053 7.50129 2.00053C6.04226 2.00053 4.64298 2.58013 3.61129 3.61183C2.5796 4.64352 2 6.04279 2 7.50183C2 8.96086 2.5796 10.3601 3.61129 11.3918L4.67129 12.4518L12.4513 20.2318L20.2313 12.4518L21.2913 11.3918C21.8023 10.8811 22.2076 10.2746 22.4842 9.60718C22.7608 8.93972 22.9031 8.22431 22.9031 7.50183C22.9031 6.77934 22.7608 6.06393 22.4842 5.39647C22.2076 4.72901 21.8023 4.12258 21.2913 3.61183V3.61183Z"
                              stroke-width="3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                           />
                           <defs>
                              <linearGradient
                                 id="paint0_linear_6_78"
                                 x1="12.4516"
                                 y1="2"
                                 x2="12.4516"
                                 y2="20.2318"
                                 gradientUnits="userSpaceOnUse"
                              >
                                 <stop stop-color="#ffff" />
                              </linearGradient>
                           </defs>
                        </svg>
                     </button>
                  </div>
                  <div className="block__card__temp">
                     <p className="block__card__temp__number">00&deg;C</p>
                     <img className="block__card__temp__img" src={cloud} />
                  </div>
                  <div className="wrapper">
                     <div className="block__card__max-low">
                        <p className="block__card__max-low__title">Highest</p>
                        <p className="block__card__max-low__title__number-max">
                           00
                        </p>
                     </div>
                     <div className="block__card__max-low">
                        <p className="block__card__max-low__title">Lowest</p>
                        <p className="block__card__max-low__title__number-low">
                           00
                        </p>
                     </div>
                  </div>
               </section>
            </div>
         </main>

         <footer className="footer">
            <div className="container">
               <div className="footer__container">
                  <img
                     className="footer__img"
                     src={github}
                     alt="GitHub Q-code"
                  />
               </div>
            </div>
         </footer>
      </div>
   );
}

export default App;
