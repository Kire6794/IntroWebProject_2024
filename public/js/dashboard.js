/*
Group member’s name:
Sandra Vera Gomez
Erick Mulia Goycoolea
Ali Khudhair
Contribution in this file by Sandra Vera Gomez
*/

//Section session
let user = CheckLoggedUser();
console.log(user.role);
//Section session



//Section graph: Type of Studios
const selectorBar = `<div class="bar-g" style="{style-bar-g}">
            <div class="bar-g-content" style="{style-bar-g-content}">
                {value}
            </div>
        </div>`;
const tableSelector = `<table style="width: 100%;">
            <thead>
                <th>{graphTitle}</th>
            </thead>
            <tbody>
            <tr>
                <td>{graphLegend}</td>
            </tr>
            <tr>
                <td>{graphContent}</td>
            </tr>
            </tbody>
        </div>`;
const styleBarG = `height: {height}px; background-color: rgba({RGB}, 0.5); margin-right: 2px;`;
const styleBarGContent = `height: {height}px; margin-top: {marginTop}px;`;

const legendBar = `<tr>
                <td><div style="width: 10px; height: 10px; background-color: rgba({RGB}, 0.5);"></div></td>
                <td>{value}</td>
            </tr>`;

function randomRGB() {
    let randR = Math.floor(Math.random() * 256);
    let randG = Math.floor(Math.random() * 256);
    let randB = Math.floor(Math.random() * 256);
    return `${randR}, ${randG}, ${randB}`;
}

function drawGraph(dataGraph) {
    let content_bar = "";
    let content_tableLegend = "<table>";
    $.each(dataGraph.aData, function (i, obj) {
        let heightPerc = 2.5 * obj.percentage;
        let heightText = heightPerc - 20;
        let styleBarGR = styleBarG.replace("{height}", heightPerc).replace("{RGB}", obj.rgbC);
        let styleBarGContentR = styleBarGContent.replace("{height}", heightPerc).replace("{marginTop}", heightText);
        let selectorBarR = selectorBar.replace("{style-bar-g}", styleBarGR)
            .replace("{style-bar-g-content}", styleBarGContentR)
            .replace("{value}", obj.percentage + "%");
        content_bar = content_bar.concat(selectorBarR);
        let legendBarR = legendBar.replace("{value}", obj.name).replace("{RGB}", obj.rgbC);
        content_tableLegend = content_tableLegend.concat(legendBarR);
    });
    let tableSelectorMod = tableSelector.replace("{graphTitle}", dataGraph.name)
        .replace("{graphContent}", content_bar)
        .replace("{graphLegend}", content_tableLegend + "</table>");

    $(dataGraph.idGraph).html(tableSelectorMod);
}
//Section graph: Type of Studios
let aStudios = [];
let aPriceRange = [
    {
        name: "< 200",
        value: 0,
        percentage: 0
    },
    {
        name: "200 - 600",
        value: 0,
        percentage: 0
    },
    {
        name: "601 - 1000",
        value: 0,
        percentage: 0
    },
    {
        name: "> 1000",
        value: 0,
        percentage: 0
    }
];
let aStudioType = [];
let totalStudios = 0;
let lastStudiosAdded = [];

function getStudios() {
    aStudios = JSON.parse(localStorage.getItem(sessionStudios));
    totalStudios = aStudios.length;
}

function fillDataForGraph() {
    $.each(aStudios, function (i, studio) {
        if (studio.PricePerTerm < 200) {
            aPriceRange[0].value++;
        } else if (studio.PricePerTerm >= 200 && studio.PricePerTerm < 600) {
            aPriceRange[1].value++;
        } else if (studio.PricePerTerm >= 601 && studio.PricePerTerm < 1000) {
            aPriceRange[2].value++;
        } else if (studio.PricePerTerm >= 1000) {
            aPriceRange[3].value++;
        }
        let studioType = aStudioType.find((studioType) => studioType.Type == studio.Type);
        if (typeof studioType === 'undefined') {
            aStudioType.push({
                Type: studio.Type,
                value: 1,
                percentage: 0
            });
        } else {
            aStudioType.find((studioType) => studioType.Type == studio.Type).value++;
        }
    });
}

function updatePercentages() {
    $.each(aPriceRange, function (i, priceR) {
        priceR.percentage = Math.round((priceR.value / totalStudios) * 100);
    });

    $.each(aStudioType, function (i, studioT) {
        studioT.percentage = Math.round((studioT.value / totalStudios) * 100);
    });
}

function fillLastStudiosAdded() {
    lastStudiosAdded.push(aStudios[aStudios.length - 3]);
    lastStudiosAdded.push(aStudios[aStudios.length - 2]);
    lastStudiosAdded.push(aStudios[aStudios.length - 1]);
}

function LastStudiosAdded() {
    let htmlStudio = '';
    $.each(lastStudiosAdded, function (i, studio) {
        htmlStudio = htmlStudio.concat(`<li>${studio.Name} - ${studio.Address}</li>`)
    });
    $("#studio-list").html(htmlStudio);
}

//#region Carrousel
const img = ["../img/img1.jpg", "../img/img2.jpg", "../img/img3.jpg"];
let position = 0;

function getNext() {
    position++;
    if (position == img.length) position = 0;
    $("#im").attr("src", img[position])
    setTimeout(function () {
        getNext();
    }, 6000);
}

//#endregion

$(document).ready(function () {
    if (user.role == "renter") {
        document.getElementById('addStudio').style.display = 'none';
        document.getElementById('updateStudio').style.display = 'none';
    }
    getNext();
    getStudios();
    fillDataForGraph();
    updatePercentages();
    fillLastStudiosAdded()
    LastStudiosAdded();
    let dataGraphPriceRange = {
        idGraph: "#graph-table",
        name: "Price Range",
        aData: [
            { name: aPriceRange[0].name, percentage: aPriceRange[0].percentage, rgbC: randomRGB() },
            { name: aPriceRange[1].name, percentage: aPriceRange[1].percentage, rgbC: randomRGB() },
            { name: aPriceRange[2].name, percentage: aPriceRange[2].percentage, rgbC: randomRGB() },
            { name: aPriceRange[3].name, percentage: aPriceRange[3].percentage, rgbC: randomRGB() },
        ]
    }
    let dataGraphStudioType = {
        idGraph: "#graph-table-type",
        name: "Type of Studios",
        aData: []
    }
    $.each(aStudioType, function (i, studioT) {
        dataGraphStudioType.aData.push({ name: studioT.Type, percentage: studioT.percentage, rgbC: randomRGB() });
    });

    drawGraph(dataGraphPriceRange);
    drawGraph(dataGraphStudioType);


});

