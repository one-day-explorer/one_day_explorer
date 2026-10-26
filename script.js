/* ========================================
   ONE_DAY_EXPLORER
   Public Travel Map
======================================== */

// Add your visited countries and their story links here.

const visitedCountries = {
    Albania: {
        storyId: "story-albania",
        title: "Albania"
    },
    Austria: {
        storyId: "story-austria",
        title: "Austria"
    },
    Bahrain: {
        storyId: "story-bahrain",
        title: "Bahrain"
    },
    Belgium: {
        storyId: "story-belgium",
        title: "Belgium"
    },
    "Bosnia and Herzegovina": {
        storyId: "story-bosnia",
        title: "Bosnia and Herzegovina"
    },
    Croatia: {
        storyId: "story-croatia",
        title: "Croatia"
    },
    Czechia: {
        storyId: "story-czechia",
        title: "Czechia"
    },
    Denmark: {
        storyId: "story-denmark",
        title: "Denmark"
    },
    Finland: {
        storyId: "story-finland",
        title: "Finland"
    },
    France: {
    storyId: "story-france",
    title: "France",
},
    Germany: {
        storyId: "story-germany",
        title: "Germany"
    },
    Hungary: {
        storyId: "story-hungary",
        title: "Hungary"
    },
    Ireland: {
        storyId: "story-ireland",
        title: "Ireland"
    },
    Italy: {
        storyId: "story-italy",
        title: "Italy"
    },
    "Ivory Coast": {
        storyId: "story-ivory-coast",
        title: "Ivory Coast"
    },
    Kosovo: {
        storyId: "story-kosovo",
        title: "Kosovo"
    },
    Kuwait: {
        storyId: "story-kuwait",
        title: "Kuwait"
    },
    Kyrgyzstan: {
        storyId: "story-kyrgyzstan",
        title: "Kyrgyzstan"
    },
    Liechtenstein: {
        storyId: "story-liechtenstein",
        title: "Liechtenstein"
    },
    Luxembourg: {
        storyId: "story-luxembourg",
        title: "Luxembourg"
    },
    Malta: {
        storyId: "story-malta",
        title: "Malta"
    },
    Monaco: {
        storyId: "story-monaco",
        title: "Monaco"
    },
    Netherlands: {
        storyId: "story-netherlands",
        title: "Netherlands"
    },
    Oman: {
        storyId: "story-oman",
        title: "Oman"
    },
    Poland: {
        storyId: "story-poland",
        title: "Poland"
    },
    Portugal: {
        storyId: "story-portugal",
        title: "Portugal"
    },
    Romania: {
        storyId: "story-romania",
        title: "Romania"
    },
    Slovakia: {
        storyId: "story-slovakia",
        title: "Slovakia"
    },
    Slovenia: {
        storyId: "story-slovenia",
        title: "Slovenia"
    },
    Spain: {
        storyId: "story-spain",
        title: "Spain"
    },
    Sweden: {
        storyId: "story-sweden",
        title: "Sweden"
    },
    Switzerland: {
        storyId: "story-switzerland",
        title: "Switzerland"
    },
    "United Arab Emirates": {
        storyId: "story-united-arab-emirates",
        title: "United Arab Emirates"
    },
    "Vatican City": {
        storyId: "story-vatican-city",
        title: "Vatican City"
    }
};

const countryRegions = {
    Albania: "europe",
    Austria: "europe",
    Bahrain: "asia",
    Belgium: "europe",
    "Bosnia and Herzegovina": "europe",
    Croatia: "europe",
    Czechia: "europe",
    Denmark: "europe",
    Finland: "europe",
    France: "europe",
    Germany: "europe",
    Hungary: "europe",
    Ireland: "europe",
    Italy: "europe",
    "Ivory Coast": "africa",
    Kosovo: "europe",
    Kuwait: "asia",
    Kyrgyzstan: "asia",
    Liechtenstein: "europe",
    Luxembourg: "europe",
    Malta: "europe",
    Monaco: "europe",
    Netherlands: "europe",
    Oman: "asia",
    Poland: "europe",
    Portugal: "europe",
    Romania: "europe",
    Slovakia: "europe",
    Slovenia: "europe",
    Spain: "europe",
    Sweden: "europe",
    Switzerland: "europe",
    "United Arab Emirates": "asia",
    "Vatican City": "europe"
};

function getCountryUrl(countryName) {
    const region = countryRegions[countryName];

    if (!region) return null;

    const slug = countryName
        .toLowerCase()
        .replaceAll(" ", "-");

    return `${region}/${slug}.html`;
}


function updateTravelStats() {
    const totalElement = document.getElementById("totalVisitedCount");

    const continentElements = {
        europe: document.getElementById("europeVisitedCount"),
        asia: document.getElementById("asiaVisitedCount"),
        africa: document.getElementById("africaVisitedCount"),
        northAmerica: document.getElementById("northAmericaVisitedCount"),
        southAmerica: document.getElementById("southAmericaVisitedCount"),
        oceania: document.getElementById("oceaniaVisitedCount"),
        antarctica: document.getElementById("antarcticaVisitedCount")
    };

    const continentOrder = [
        "europe",
        "asia",
        "africa",
        "northAmerica",
        "southAmerica",
        "oceania",
        "antarctica"
    ];

    const visitedCountryNames = Object.keys(visitedCountries);

    const countByContinent = (continent) =>
        visitedCountryNames.filter(
            (country) => countryRegions[country] === continent
        ).length;

    if (totalElement) {
        totalElement.textContent = visitedCountryNames.length;
    }

    continentOrder.forEach((continent) => {
        const element = continentElements[continent];

        if (element) {
            element.textContent = countByContinent(continent);
        }
    });
}


updateTravelStats();

const mapElement = document.getElementById("worldMap");
const countryInfo = document.getElementById("countryInfo");
const resetMapButton = document.getElementById("resetMap");

if (mapElement && countryInfo && resetMapButton) {
    initializeWorldMap();
}

async function initializeWorldMap() {
    if (typeof L === "undefined") {
        showMapMessage(
            "The map library could not be loaded. Please check your internet connection."
        );
        return;
    }

    const defaultView = {
        center: [20, 0],
        zoom: 2
    };

    const worldMap = L.map("worldMap", {
        center: defaultView.center,
        zoom: defaultView.zoom,
        minZoom: 2,
        maxZoom: 7,
        worldCopyJump: true
    });

    // Keep the current dark map style.
    L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
        {
            attribution:
                '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, ' +
                '&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, ' +
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 20
        }
    ).addTo(worldMap);

    let countriesLayer;

    let selectedContinent = "all";

    const continentBounds = {
    all: null,
    europe: [[34, -12], [72, 40]],
    asia: [[-11, 25], [80, 180]],
    africa: [[-35, -20], [38, 55]],
    northAmerica: [[5, -170], [83, -50]],
    southAmerica: [[-57, -82], [13, -34]],
    oceania: [[-50, 110], [0, 180]],
    antarctica: [[-90, -180], [-60, 180]]
};

const continentNames = {
    all: "the world",
    europe: "Europe",
    asia: "Asia",
    africa: "Africa",
    northAmerica: "North America",
    southAmerica: "South America",
    oceania: "Oceania",
    antarctica: "Antarctica"
};

    function getCountryName(feature) {
        return (
            feature.properties?.name ||
            feature.properties?.ADMIN ||
            feature.properties?.NAME ||
            "Unknown country"
        );
    }

    function getCountryStyle(feature) {
        const countryName = getCountryName(feature);
        const visited = isVisited(countryName);

        return {
            color: visited ? "#a7e66e" : "#8fa59a",
            weight: visited ? 1.5 : 0.6,
            opacity: 1,
            fillColor: visited ? "#a7e66e" : "#24373b",
            fillOpacity: visited ? 0.7 : 0.2
        };
    }
    
    function normalizeCountryName(countryName) {
        const aliases = {
            "Côte d'Ivoire": "Ivory Coast",
            "Côte d’Ivoire": "Ivory Coast",
            "Cote d'Ivoire": "Ivory Coast",
            "Cote d’Ivoire": "Ivory Coast",
            "Czech Republic": "Czechia",
            "The Netherlands": "Netherlands",
            "Republic of Kosovo": "Kosovo",
            "Vatican": "Vatican City"
        };

        return aliases[countryName] || countryName;
    }

    function getVisitedCountry(countryName) {
        const normalizedName = normalizeCountryName(countryName);

        return visitedCountries[normalizedName] || null;
    }

    function isVisited(countryName) {
        return getVisitedCountry(countryName) !== null;
    }


    function showMapMessage(message) {
        mapElement.innerHTML = "";

        const status = document.createElement("p");
        status.className = "map-status";
        status.textContent = message;

        mapElement.appendChild(status);
    }

    try {
        countryInfo.textContent = "Loading country boundaries...";

        const response = await fetch(
            "https://raw.githubusercontent.com/datasets/geo-countries/main/data/countries.geojson"
        );

        if (!response.ok) {
            throw new Error("Country data could not be loaded.");
        }

        const worldData = await response.json();

        countriesLayer = L.geoJSON(worldData, {
            style: getCountryStyle,

            onEachFeature: function (feature, layer) {
                const countryName = getCountryName(feature);
                const visited = isVisited(countryName);

                if (visited) {
                    const story = getVisitedCountry(countryName);

                    layer.bindPopup(
                        `<strong>${story.title}</strong><br>` +
                        "Visited destination<br>" +
                        "Click to read my travel story."
                    );
                } else {
                    layer.bindPopup(`<strong>${countryName}</strong>`);
                }

                layer.on("mouseover", function () {
                    layer.setStyle({
                        color: visited ? "#d0ffa0" : "#a7e66e",
                        weight: visited ? 2.2 : 1.2,
                        fillColor: visited ? "#a7e66e" : "#426057",
                        fillOpacity: visited ? 0.9 : 0.4
                    });

                    layer.bringToFront();
                });

                layer.on("mouseout", function () {
                    countriesLayer.resetStyle(layer);
                });

                layer.on("click", function () {
                    if (visited) {
                        const story = getVisitedCountry(countryName);
                        const url = getCountryUrl(countryName);

                        if (story && url) {
                            window.location.href = url;
                        } else {
                            countryInfo.textContent =
                                "The page for this country has not been linked yet.";
                        }
                    } else {
                        countryInfo.textContent =
                            `${countryName} — no travel story available yet.`;

                        layer.openPopup();
                    }
                });
            }
        }).addTo(worldMap);

        countryInfo.textContent =
            "Select a country to explore it.";

        resetMapButton.addEventListener("click", function () {
            worldMap.setView(
                defaultView.center,
                defaultView.zoom
            );

            countryInfo.textContent =
                "Map view reset. Select a country to explore.";
        });

        } catch (error) {
            console.error("World map error:", error);

            showMapMessage(
                "The world map could not be loaded. Please check your connection and try again."
            );

            countryInfo.textContent = "Map unavailable.";
        }

        const continentFilterButtons = document.querySelectorAll(
    ".continent-filter-button"
);

continentFilterButtons.forEach((button) => {
    button.addEventListener("click", function () {
        selectedContinent = this.dataset.continent;

        continentFilterButtons.forEach((filterButton) => {
            const isActive = filterButton === this;

            filterButton.classList.toggle("is-active", isActive);
            filterButton.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });

        if (selectedContinent === "all") {
            worldMap.setView(defaultView.center, defaultView.zoom);
            countryInfo.textContent =
                "Showing all countries. Select a country to explore it.";
        } else {
            const bounds = continentBounds[selectedContinent];

            if (bounds) {
                worldMap.fitBounds(bounds, {
                    padding: [20, 20],
                    maxZoom: 5
                });
            }

            countryInfo.textContent =
                `Exploring ${continentNames[selectedContinent]}. Select a country to explore it.`;
        }

        worldMap.closePopup();
    });
});
}
