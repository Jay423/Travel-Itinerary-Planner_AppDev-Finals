import React, { useState, useEffect } from 'react';
import './CityAutocomplete.css';

const cities = {
  "Afghanistan": ["Kabul", "Kandahar", "Herat"],
  "Albania": ["Tirana", "Durrës", "Vlorë"],
  "Algeria": ["Algiers", "Oran", "Constantine"],
  "Andorra": ["Andorra la Vella", "Escaldes-Engordany", "Encamp"],
  "Angola": ["Luanda", "Benguela", "Lobito"],
  "Antigua and Barbuda": ["St. John's", "All Saints", "Liberta"],
  "Argentina": ["Buenos Aires", "Córdoba", "Rosario"],
  "Armenia": ["Yerevan", "Gyumri", "Vanadzor"],
  "Australia": ["Sydney", "Melbourne", "Brisbane"],
  "Austria": ["Vienna", "Graz", "Linz"],
  "Azerbaijan": ["Baku", "Ganja", "Sumqayit"],
  "Bahamas": ["Nassau", "Freeport", "West End"],
  "Bahrain": ["Manama", "Riffa", "Muharraq"],
  "Bangladesh": ["Dhaka", "Chittagong", "Khulna"],
  "Barbados": ["Bridgetown", "Speightstown", "Oistins"],
  "Belarus": ["Minsk", "Gomel", "Vitebsk"],
  "Belgium": ["Brussels", "Antwerp", "Ghent"],
  "Belize": ["Belize City", "San Ignacio", "Orange Walk"],
  "Benin": ["Porto-Novo", "Cotonou", "Parakou"],
  "Bhutan": ["Thimphu", "Paro", "Punakha"],
  "Bolivia": ["La Paz", "Santa Cruz", "Cochabamba"],
  "Bosnia and Herzegovina": ["Sarajevo", "Banja Luka", "Mostar"],
  "Botswana": ["Gaborone", "Francistown", "Maun"],
  "Brazil": ["São Paulo", "Rio de Janeiro", "Brasília"],
  "Brunei": ["Bandar Seri Begawan", "Kuala Belait", "Seria"],
  "Bulgaria": ["Sofia", "Plovdiv", "Varna"],
  "Burkina Faso": ["Ouagadougou", "Bobo-Dioulasso", "Koudougou"],
  "Burundi": ["Bujumbura", "Gitega", "Ngozi"],
  "Cabo Verde": ["Praia", "Mindelo", "Santa Maria"],
  "Cambodia": ["Phnom Penh", "Siem Reap", "Battambang"],
  "Cameroon": ["Yaoundé", "Douala", "Garoua"],
  "Canada": ["Toronto", "Montreal", "Vancouver"],
  "Central African Republic": ["Bangui", "Bambari", "Berbérati"],
  "Chad": ["N'Djamena", "Moundou", "Sarh"],
  "Chile": ["Santiago", "Valparaíso", "Concepción"],
  "China": ["Beijing", "Shanghai", "Guangzhou"],
  "Colombia": ["Bogotá", "Medellín", "Cali"],
  "Comoros": ["Moroni", "Mutsamudu", "Fomboni"],
  "Congo (Congo-Brazzaville)": ["Brazzaville", "Pointe-Noire", "Dolisie"],
  "Democratic Republic of the Congo (Congo-Kinshasa)": ["Kinshasa", "Lubumbashi", "Mbuji-Mayi"],
  "Costa Rica": ["San José", "Limón", "Alajuela"],
  "Croatia": ["Zagreb", "Split", "Rijeka"],
  "Cuba": ["Havana", "Santiago de Cuba", "Camagüey"],
  "Cyprus": ["Nicosia", "Limassol", "Larnaca"],
  "Czech Republic (Czechia)": ["Prague", "Brno", "Ostrava"],
  "Denmark": ["Copenhagen", "Aarhus", "Odense"],
  "Djibouti": ["Djibouti City", "Ali Sabieh", "Tadjourah"],
  "Dominica": ["Roseau", "Portsmouth", "Marigot"],
  "Dominican Republic": ["Santo Domingo", "Santiago", "La Romana"],
  "Ecuador": ["Quito", "Guayaquil", "Cuenca"],
  "Egypt": ["Cairo", "Alexandria", "Giza"],
  "El Salvador": ["San Salvador", "Santa Ana", "San Miguel"],
  "Equatorial Guinea": ["Malabo", "Bata", "Ebebiyin"],
  "Eritrea": ["Asmara", "Keren", "Massawa"],
  "Estonia": ["Tallinn", "Tartu", "Narva"],
  "Eswatini (Swaziland)": ["Mbabane", "Manzini", "Lobamba"],
  "Ethiopia": ["Addis Ababa", "Dire Dawa", "Mekelle"],
  "Fiji": ["Suva", "Nadi", "Lautoka"],
  "Finland": ["Helsinki", "Espoo", "Tampere"],
  "France": ["Paris", "Marseille", "Lyon"],
  "Gabon": ["Libreville", "Port-Gentil", "Franceville"],
  "Gambia": ["Banjul", "Serekunda", "Brikama"],
  "Georgia": ["Tbilisi", "Batumi", "Kutaisi"],
  "Germany": ["Berlin", "Munich", "Frankfurt"],
  "Ghana": ["Accra", "Kumasi", "Tamale"],
  "Greece": ["Athens", "Thessaloniki", "Patras"],
  "Grenada": ["St. George's", "Gouyave", "Grenville"],
  "Guatemala": ["Guatemala City", "Quetzaltenango", "Escuintla"],
  "Guinea": ["Conakry", "Kankan", "Nzérékoré"],
  "Guinea-Bissau": ["Bissau", "Bafatá", "Gabú"],
  "Guyana": ["Georgetown", "Linden", "New Amsterdam"],
  "Haiti": ["Port-au-Prince", "Cap-Haïtien", "Gonaïves"],
  "Honduras": ["Tegucigalpa", "San Pedro Sula", "Choloma"],
  "Hungary": ["Budapest", "Debrecen", "Szeged"],
  "Iceland": ["Reykjavik", "Kopavogur", "Hafnarfjörður"],
  "India": ["New Delhi", "Mumbai", "Bangalore"],
  "Indonesia": ["Jakarta", "Surabaya", "Bandung"],
  "Iran": ["Tehran", "Mashhad", "Isfahan"],
  "Iraq": ["Baghdad", "Basra", "Erbil"],
  "Ireland": ["Dublin", "Cork", "Limerick"],
  "Israel": ["Jerusalem", "Tel Aviv", "Haifa"],
  "Italy": ["Rome", "Milan", "Naples"],
  "Jamaica": ["Kingston", "Montego Bay", "Portmore"],
  "Japan": ["Tokyo", "Osaka", "Nagoya"],
  "Jordan": ["Amman", "Zarqa", "Irbid"],
  "Kazakhstan": ["Nur-Sultan", "Almaty", "Shymkent"],
  "Kenya": ["Nairobi", "Mombasa", "Kisumu"],
  "Kiribati": ["South Tarawa", "Betio", "Bikenibeu"],
  "Kuwait": ["Kuwait City", "Hawalli", "Salmiya"],
  "Kyrgyzstan": ["Bishkek", "Osh", "Jalal-Abad"],
  "Laos": ["Vientiane", "Luang Prabang", "Pakse"],
  "Latvia": ["Riga", "Daugavpils", "Liepāja"],
  "Lebanon": ["Beirut", "Tripoli", "Sidon"],
  "Lesotho": ["Maseru", "Teyateyaneng", "Mafeteng"],
  "Liberia": ["Monrovia", "Gbarnga", "Kakata"],
  "Libya": ["Tripoli", "Benghazi", "Misrata"],
  "Liechtenstein": ["Vaduz", "Schaan", "Balzers"],
  "Lithuania": ["Vilnius", "Kaunas", "Klaipėda"],
  "Luxembourg": ["Luxembourg City", "Esch-sur-Alzette", "Differdange"],
  "Madagascar": ["Antananarivo", "Toamasina", "Antsirabe"],
  "Malawi": ["Lilongwe", "Blantyre", "Mzuzu"],
  "Malaysia": ["Kuala Lumpur", "George Town", "Johor Bahru"],
  "Maldives": ["Malé", "Addu City", "Fuvahmulah"],
  "Mali": ["Bamako", "Sikasso", "Mopti"],
  "Malta": ["Valletta", "Birkirkara", "Mosta"],
  "Marshall Islands": ["Majuro", "Ebeye", "Jaluit"],
  "Mauritius": ["Port Louis", "Beau Bassin-Rose Hill", "Vacoas-Phoenix"],
  "Mexico": ["Mexico City", "Guadalajara", "Monterrey"],
  "Micronesia": ["Palikir", "Weno", "Tofol"],
  "Moldova": ["Chișinău", "Tiraspol", "Bălți"],
  "Monaco": ["Monaco-Ville", "Monte Carlo", "Fontvieille"],
  "Mongolia": ["Ulaanbaatar", "Erdenet", "Darkhan"],
  "Montenegro": ["Podgorica", "Nikšić", "Herceg Novi"],
  "Morocco": ["Rabat", "Casablanca", "Marrakesh"],
  "Mozambique": ["Maputo", "Beira", "Nampula"],
  "Myanmar": ["Naypyidaw", "Yangon", "Mandalay"],
  "Namibia": ["Windhoek", "Walvis Bay", "Swakopmund"],
  "Nauru": ["Yaren", "Aiwo", "Baiti"],
  "Nepal": ["Kathmandu", "Pokhara", "Lalitpur"],
  "Netherlands": ["Amsterdam", "Rotterdam", "The Hague"],
  "New Zealand": ["Wellington", "Auckland", "Christchurch"],
  "Nicaragua": ["Managua", "León", "Masaya"],
  "Niger": ["Niamey", "Zinder", "Maradi"],
  "Nigeria": ["Abuja", "Lagos", "Kano"],
  "North Korea": ["Pyongyang", "Hamhung", "Chongjin"],
  "North Macedonia": ["Skopje", "Bitola", "Kumanovo"],
  "Norway": ["Oslo", "Bergen", "Trondheim"],
  "Oman": ["Muscat", "Salalah", "Sohar"],
  "Pakistan": ["Islamabad", "Karachi", "Lahore"],
  "Palau": ["Ngerulmud", "Koror", "Melekeok"],
  "Palestine": ["Ramallah", "Gaza City", "Hebron"],
  "Panama": ["Panama City", "Colón", "David"],
  "Papua New Guinea": ["Port Moresby", "Lae", "Mount Hagen"],
  "Paraguay": ["Asunción", "Ciudad del Este", "San Lorenzo"],
  "Peru": ["Lima", "Arequipa", "Trujillo"],
  "Philippines": ["Manila", "Quezon City", "Cebu City"],
  "Poland": ["Warsaw", "Krakow", "Gdańsk"],
  "Portugal": ["Lisbon", "Porto", "Braga"],
  "Qatar": ["Doha", "Al Rayyan", "Al Wakrah"],
  "Romania": ["Bucharest", "Cluj-Napoca", "Timișoara"],
  "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk"],
  "Rwanda": ["Kigali", "Huye", "Musanze"],
  "Saint Kitts and Nevis": ["Basseterre", "Charlestown", "Dieppe Bay Town"],
  "Saint Lucia": ["Castries", "Soufrière", "Vieux Fort"],
  "Saint Vincent and the Grenadines": ["Kingstown", "Georgetown", "Barrouallie"],
  "Samoa": ["Apia", "Vaitele", "Faleula"],
  "San Marino": ["San Marino", "Serravalle", "Borgo Maggiore"],
  "Sao Tome and Principe": ["São Tomé", "Trindade", "Guadalupe"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca"],
  "Senegal": ["Dakar", "Touba", "Thies"],
  "Serbia": ["Belgrade", "Novi Sad", "Niš"],
  "Seychelles": ["Victoria", "Anse Boileau", "Beau Vallon"],
  "Sierra Leone": ["Freetown", "Bo", "Kenema"],
  "Singapore": ["Singapore"],
  "Slovakia": ["Bratislava", "Košice", "Prešov"],
  "Slovenia": ["Ljubljana", "Maribor", "Celje"],
  "Solomon Islands": ["Honiara", "Auki", "Gizo"],
  "Somalia": ["Mogadishu", "Hargeisa", "Kismayo"],
  "South Africa": ["Pretoria", "Johannesburg", "Cape Town"],
  "South Korea": ["Seoul", "Busan", "Incheon"],
  "South Sudan": ["Juba", "Malakal", "Wau"],
  "Spain": ["Madrid", "Barcelona", "Valencia"],
  "Sri Lanka": ["Colombo", "Kandy", "Galle"],
  "Sudan": ["Khartoum", "Omdurman", "Port Sudan"],
  "Suriname": ["Paramaribo", "Lelydorp", "Nieuw Nickerie"],
  "Sweden": ["Stockholm", "Gothenburg", "Malmö"],
  "Switzerland": ["Bern", "Zurich", "Geneva"],
  "Syria": ["Damascus", "Aleppo", "Homs"],
  "Tajikistan": ["Dushanbe", "Khujand", "Kulob"],
  "Tanzania": ["Dodoma", "Dar es Salaam", "Mwanza"],
  "Thailand": ["Bangkok", "Chiang Mai", "Pattaya"],
  "Timor-Leste": ["Dili", "Baucau", "Maliana"],
  "Togo": ["Lomé", "Sokodé", "Kara"],
  "Tonga": ["Nuku'alofa", "Neiafu", "Pangai"],
  "Trinidad and Tobago": ["Port of Spain", "San Fernando", "Chaguanas"],
  "Tunisia": ["Tunis", "Sfax", "Sousse"],
  "Turkey": ["Ankara", "Istanbul", "Izmir"],
  "Turkmenistan": ["Ashgabat", "Turkmenabat", "Mary"],
  "Tuvalu": ["Funafuti", "Nanumea", "Nui"],
  "Uganda": ["Kampala", "Gulu", "Mbarara"],
  "Ukraine": ["Kyiv", "Kharkiv", "Odessa"],
  "United Arab Emirates": ["Abu Dhabi", "Dubai", "Sharjah"],
  "United Kingdom": ["London", "Manchester", "Birmingham"],
  "United States": ["Washington, D.C.", "New York City", "Los Angeles"],
  "Uruguay": ["Montevideo", "Salto", "Paysandú"],
  "Uzbekistan": ["Tashkent", "Samarkand", "Bukhara"],
  "Vanuatu": ["Port Vila", "Luganville", "Isangel"],
  "Vatican City": ["Vatican City"],
  "Venezuela": ["Caracas", "Maracaibo", "Valencia"],
  "Vietnam": ["Hanoi", "Ho Chi Minh City", "Da Nang"],
  "Yemen": ["Sana'a", "Aden", "Taiz"],
  "Zambia": ["Lusaka", "Kitwe", "Ndola"],
  "Zimbabwe": ["Harare", "Bulawayo", "Mutare"]
};

function CountryAutocomplete({ onCountrySelect }) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const countries = [
    "Afghanistan",  
"Albania",  
"Algeria",  
"Andorra",  
"Angola",  
"Antigua and Barbuda",  
"Argentina",  
"Armenia",  
"Australia",  
"Austria",  
"Azerbaijan",  
"Bahamas",  
"Bahrain",  
"Bangladesh",  
"Barbados",  
"Belarus",  
"Belgium",  
"Belize",  
"Benin",  
"Bhutan",  
"Bolivia",  
"Bosnia and Herzegovina",  
"Botswana",  
"Brazil",  
"Brunei",  
"Bulgaria",  
"Burkina Faso",  
"Burundi",  
"Cabo Verde",  
"Cambodia",  
"Cameroon",  
"Canada",  
"Central African Republic",  
"Chad",  
"Chile",  
"China",  
"Colombia",  
"Comoros",  
"Congo (Congo-Brazzaville)",  
"Democratic Republic of the Congo (Congo-Kinshasa)",  
"Costa Rica",  
"Croatia",  
"Cuba",  
"Cyprus",  
"Czech Republic (Czechia)",  
"Denmark",  
"Djibouti",  
"Dominica",  
"Dominican Republic",  
"Ecuador",  
"Egypt",  
"El Salvador",  
"Equatorial Guinea",  
"Eritrea",  
"Estonia",  
"Eswatini (Swaziland)",  
"Ethiopia",  
"Fiji",  
"Finland",  
"France",  
"Gabon",  
"Gambia",  
"Georgia",  
"Germany",  
"Ghana",  
"Greece",  
"Grenada",  
"Guatemala",  
"Guinea",  
"Guinea-Bissau",  
"Guyana",  
"Haiti",  
"Honduras",  
"Hungary",  
"Iceland",  
"India",  
"Indonesia",  
"Iran",  
"Iraq",  
"Ireland",  
"Israel",  
"Italy",  
"Ivory Coast (Côte d'Ivoire)",  
"Jamaica",  
"Japan",  
"Jordan",  
"Kazakhstan",  
"Kenya",  
"Kiribati",  
"Kosovo",  
"Kuwait",  
"Kyrgyzstan",  
"Laos",  
"Latvia",  
"Lebanon",  
"Lesotho",  
"Liberia",  
"Libya",  
"Liechtenstein",  
"Lithuania",  
"Luxembourg",  
"Madagascar",  
"Malawi",  
"Malaysia",  
"Maldives",  
"Mali",  
"Malta",  
"Marshall Islands",  
"Mauritania",  
"Mauritius",  
"Mexico",  
"Micronesia (Federated States of)",  
"Moldova",  
"Monaco",  
"Mongolia",  
"Montenegro",  
"Morocco",  
"Mozambique",  
"Myanmar (Burma)",  
"Namibia",  
"Nauru",  
"Nepal",  
"Netherlands",  
"New Zealand",  
"Nicaragua",  
"Niger",  
"Nigeria",  
"North Korea",  
"North Macedonia",  
"Norway",  
"Oman",  
"Pakistan",  
"Palau",  
"Palestine",  
"Panama",  
"Papua New Guinea",  
"Paraguay",  
"Peru",  
"Philippines",  
"Poland",  
"Portugal",  
"Qatar",  
"Romania",  
"Russia",  
"Rwanda",  
"Saint Kitts and Nevis",  
"Saint Lucia",  
"Saint Vincent and the Grenadines",  
"Samoa",  
"San Marino",  
"Sao Tome and Principe",  
"Saudi Arabia",  
"Senegal",  
"Serbia",  
"Seychelles",  
"Sierra Leone",  
"Singapore",  
"Slovakia",  
"Slovenia",  
"Solomon Islands",  
"Somalia",  
"South Africa",  
"South Korea",  
"South Sudan",  
"Spain",  
"Sri Lanka",  
"Sudan",  
"Suriname",  
"Sweden",  
"Switzerland",  
"Syria",  
"Tajikistan",  
"Tanzania",  
"Thailand",  
"Timor-Leste (East Timor)",  
"Togo",  
"Tonga",  
"Trinidad and Tobago",  
"Tunisia",  
"Turkey",  
"Turkmenistan",  
"Tuvalu",  
"Uganda",  
"Ukraine",  
"United Arab Emirates",  
"United Kingdom",  
"United States",  
"Uruguay",  
"Uzbekistan",  
"Vanuatu",  
"Vatican City (Holy See)",  
"Venezuela",  
"Vietnam",  
"Yemen",  
"Zambia",  
"Zimbabwe"
  ];

  const handleInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setInputValue(query);

    const filtered = countries.filter(country =>
      country.toLowerCase().startsWith(query)
    );
    setFilteredCountries(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  const handleSuggestionClick = (country) => {
    setInputValue(country);
    setShowSuggestions(false);
    onCountrySelect(country); // Notify parent component
  };

  return (
    <div className="country-autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search country"
      />
      {showSuggestions && (
        <ul className="suggestions active">
          {filteredCountries.map(country => (
            <li key={country} onClick={() => handleSuggestionClick(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CityAutocomplete() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
    setInputValue('');
    setFilteredCities([]);
  };

  const handleInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setInputValue(query);

    if (selectedCountry) {
      const filtered = cities[selectedCountry].filter(city =>
        city.toLowerCase().startsWith(query)
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelection = (city) => {
    setInputValue(city);
    setFilteredCities([]);
  };

  return (
    <div className="city-autocomplete">
      <div className="autocomplete-container"> 
        <CountryAutocomplete onCountrySelect={handleCountrySelection} />
        <div> 
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search city"
            disabled={!selectedCountry}
          />
          {filteredCities.length > 0 && (
            <ul className="suggestions active">
              {filteredCities.map(city => (
                <li key={city} onClick={() => handleCitySelection(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CityAutocomplete;
