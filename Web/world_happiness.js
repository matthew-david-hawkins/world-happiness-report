// Scrollytelling JavaScript

// Save different parts of the page as D3.js objects. Using d3 for convenience
var main = d3.select('main')
var scrollySection = main.select('#scrollytelling');
var figure = scrollySection.select('figure');
var article = scrollySection.select('article');
var steps = scrollySection.selectAll('.step');

var imgV1 = d3.select('#imgV1');
var imgV2 = d3.select('#imgV2');
var imgV3 = d3.select('#imgV3');
var imgV4 = d3.select('#imgV4');
var imgV5 = d3.select('#imgV5');
var imgV6 = d3.select('#imgV6');
var imgV7 = d3.select('#imgV7');
var imgV8 = d3.select('#imgV8');

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
        .style('top', figureMarginTop + 'px');
    
    // 3. Calculate the necessary whitespace around the images
    imgMargin = (figure.node().getBoundingClientRect().width - imgV1.node().getBoundingClientRect().width) / 2

    imgV1.style('left', imgMargin + 'px')
    imgV2.style('left', imgMargin + 'px')
    imgV3.style('left', imgMargin + 'px')


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