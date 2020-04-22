// Leaflet JavaScript

var queryUrl = "https://s3.us-east-2.amazonaws.com/thrum.engineering.com/countries_happiness.geojson";

// Turn happiness into a color
function getColor(d) {
  return d < -4 ? '#aa0000' : // darkest red
         d < -2  ? '#b93d3d' : // second darkest red
         d < -1  ? '#c88686' : // light red
         d <  1  ? '#d9d9d9' : // grey
         d <  2   ? '#78add3' : // light blue
         d <  4   ? '#5082af' : // Darker blue
                    '#2b5c8a' ; // dark blue
}

// Add happiness leaflet layer
function style(feature) {
  return {
      fillColor: getColor(feature.properties.happiness),
      weight: 1, // line thickness
      opacity: 1, // border opacity
      color: 'black', // line color
      fillOpacity: 0.9 //
  };
}


// Get the country boundaries Geojson from S3
d3.json(queryUrl).then(function(countryData){
  
  // Set up initial map
  var API_KEY = "pk.eyJ1IjoibWdoYW50aSIsImEiOiJjazJwZGV3ZXkwMzR1M2N1aWZ1eWl3ZHptIn0.3OIgX5x7eRxF79LXza4rsg";
  var myMap = L.map('map').setView([37.8, -96], 4);

  // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //     maxZoom: 18,
  //     id: 'mapbox/light-v1',
  //     tileSize: 512,
  //     zoomOffset: -1,
  //     accessToken: API_KEY
  // }).addTo(myMap);

  // Add info overlay
  var info = L.control();

  info.onAdd = function (myMap) {
      this._div = L.DomUtil.create('div', 'leaflet-info'); // create a div with a class "info"
      this.update();
      return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function (props) {
      this._div.innerHTML = '<h4>Percent Change in Happiness</h4>' +  (props ?
          '<b>' + props.ADMIN + '</b><br />' + props.happiness.toFixed(1) + ' people / mi<sup>2</sup>'
          : 'Hover over a state');
  };

  info.addTo(myMap);

  var geojson;

  // Define highlight mouseout properties
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  // Define what happens to a highlighted country
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }

  // Zoom in a country
  function zoomToFeature(e) {
    myMap.fitBounds(e.target.getBounds());
  }

  // Attach event listeners
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
  }

  geojson = L.geoJson(countryData.features, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(myMap);



});


// Scrollytelling JavaScript

// Save different parts of the page as D3.js objects. Using d3 for convenience
var main = d3.select('main')
var scrollySection = main.select('#scrollytelling');
var figure = scrollySection.select('figure');
var article = scrollySection.select('article');
var steps = scrollySection.selectAll('.step');

// Remove the overflow:hidden css property on the div with id="outerWrapper" on squarespace. This prevents position:sticky from working on Squarespace
d3.select('#outerWrapper')
  .style('overflow', "visible")

// Set the innerWrapper width to 100% and margin to 0 for full screen images on SquareSpace.
d3.select('#innerWrapper')
  .style('width', "100%")
  .style('margin', "0px")
  .style('padding', "0px")

// Set the content padding to 0 for full screen images on SquareSpace.
d3.select('#content')
  .style('padding', "0px !important")
  .style('width', "100%")
  .style('margin', "0px")
  .attr("id", "content-thrum")

// Set the content margin to 0 for full screen images on SquareSpace.
d3.select('.main-content-wrapper')
  .style('margin', "0px")
  .style('padding', "0px")
  .style('width', "100%")

// Set the content margin to 0 for full screen images on SquareSpace.
d3.select('.sqs-block')
  .style('padding', "0px")
  .style('margin', "0px")
  .style('width', "100%")


// Set the content margin to 0 for full screen images on SquareSpace.
d3.select('.sqs-row')
  .style('padding', "0px")
  .style('margin', "0px")

var imgV1 = d3.select('#imgV1');
var imgV2 = d3.select('#imgV2');
var imgV3 = d3.select('#imgV3');
var imgV4 = d3.select('#imgV4');
var imgV5 = d3.select('#imgV5');
var imgV6 = d3.select('#imgV6');
var imgV7 = d3.select('#imgV7');
var imgV8 = d3.select('#imgV8');

// Set the aspect ratio of the images. width / height
aspect = 2.03889

// Create a scrollama object.
var myScrollama = scrollama();

// These needs to be constants to improve performance on mobile.
const stepH = Math.floor(window.innerHeight * 2.5);
const figureHeight = window.innerHeight * 1.0
const figureMarginTop = (window.innerHeight - figureHeight) / 2


// generic window resize listener event
function handleResize() {
    
    console.log("handling resize")
    // 1. update height of step elements
    steps.style('height', stepH + 'px');

    figure
        .style('height', figureHeight + 'px')
        .style('top', '0px');
    
    var innerWidth = document.body.clientWidth
    var imgMarginTop = (figureHeight - innerWidth / aspect) / 2

    imgV1.style('top', imgMarginTop + 'px')
    imgV2.style('top', imgMarginTop + 'px')
    imgV3.style('top', imgMarginTop + 'px')
    imgV4.style('top', imgMarginTop + 'px')
    imgV5.style('top', imgMarginTop + 'px')
    imgV6.style('top', imgMarginTop + 'px')
    imgV7.style('top', imgMarginTop + 'px')
    imgV8.style('top', imgMarginTop + 'px')

    // 3. tell scrollama to update new element dimensions
    myScrollama.resize();

}

// scrollama event handler
function handleStepChange(response) {
    
    switch(response.index) {
    case 0:
        // Set image to first version
        imgV1.style("opacity", "1")
        imgV2.style("opacity", "0")
        imgV3.style("opacity", "0")
        imgV4.style("opacity", "0")
        imgV5.style("opacity", "0")
        imgV6.style("opacity", "0")
        imgV7.style("opacity", "0")
        imgV8.style("opacity", "0")
        break;

    case 1:
        // Set image to second version
        imgV1.style("opacity", "1")
        imgV2.style("opacity", "1")
        imgV3.style("opacity", "0")
        imgV4.style("opacity", "0")
        imgV5.style("opacity", "0")
        imgV6.style("opacity", "0")
        imgV7.style("opacity", "0")
        imgV8.style("opacity", "0")
        break;

    case 2:
        // Set image to third version
        imgV1.style("opacity", "0")
        imgV2.style("opacity", "1")
        imgV3.style("opacity", "1")
        imgV4.style("opacity", "0")
        imgV5.style("opacity", "0")
        imgV6.style("opacity", "0")
        imgV7.style("opacity", "0")
        imgV8.style("opacity", "0")
        break;

        case 3:
        // Set image to 4th version
        imgV1.style("opacity", "0")
        imgV2.style("opacity", "0")
        imgV3.style("opacity", "1")
        imgV4.style("opacity", "1")
        imgV5.style("opacity", "0")
        imgV6.style("opacity", "0")
        imgV7.style("opacity", "0")
        break;

        case 4:
        // Set image to 5th version
        imgV1.style("opacity", "0")
        imgV2.style("opacity", "0")
        imgV3.style("opacity", "0")
        imgV4.style("opacity", "1")
        imgV5.style("opacity", "1")
        imgV6.style("opacity", "0")
        imgV7.style("opacity", "0")
        imgV8.style("opacity", "0")
        break;

        case 5:
        // Set image to 6th version
        imgV1.style("opacity", "0")
        imgV2.style("opacity", "0")
        imgV3.style("opacity", "0")
        imgV4.style("opacity", "0")
        imgV5.style("opacity", "1")
        imgV6.style("opacity", "1")
        imgV7.style("opacity", "0")
        imgV8.style("opacity", "0")
        break;

        case 6:
        // Set image to 6th version
        imgV1.style("opacity", "0")
        imgV2.style("opacity", "0")
        imgV3.style("opacity", "0")
        imgV4.style("opacity", "0")
        imgV5.style("opacity", "0")
        imgV6.style("opacity", "1")
        imgV7.style("opacity", "1")
        imgV8.style("opacity", "0")

        case 7:
        // Set image to 6th version
        imgV1.style("opacity", "0")
        imgV2.style("opacity", "0")
        imgV3.style("opacity", "0")
        imgV4.style("opacity", "0")
        imgV5.style("opacity", "0")
        imgV6.style("opacity", "0")
        imgV7.style("opacity", "1")
        imgV8.style("opacity", "1")
        break;

    default:
        // do nothing
    }

    // change the class of the step divs to indicate which step is active
    steps.classed('is-active', function (d, i) {
    return i === response.index;
    })

}

function init() {

    // 0. Display first image only once the all sizes are detected
    imgV1.style("opacity", "1")

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    myScrollama.setup({
    step: '.step',
    offset: figureHeight * 1.67 + "px",
    // set to true to see debug horizontal line
    debug: false,
    }).onStepEnter(handleStepChange)
    

    // setup resize event
    window.addEventListener('resize', handleResize);
}

// kick things off
init();