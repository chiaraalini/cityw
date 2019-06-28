var map, heatmap, dataFromSensors;
var dataNormalized;
var thresholdCo2 = 3000;//1500;
var thresholdPm10 = 200;//100;
var thresholdPm25 = 50;//25;
var PopupClassManager;
var popupContainer=[];
var popupPoint=[];
var sensoriTrovati = [];
var lp = 0;
var queryForJson = "Quartiere";
var ultimoFiltro = "Quartiere";
var interval;
var mappaQuartieri = [];
var gr = [
    'rgba(92, 237, 232, 0)',
    'rgba(200, 255, 224, 1)',
    'rgba(80, 204, 168, 1)',
    'rgba(240, 228, 44, 1)',
    'rgba(240, 178, 74, 1)',
    'rgba(243, 82, 85, 1)',
    'rgba(143, 2, 49, 1)'
];

function createMap() {

    //Colognola - San Tomaso de' Calvi - Villaggio degli Sposi - Carnovali - Grumello del Piano
    var q1 = [
        {lat: 45.676242, lng: 9.669605},
        {lat: 45.671363, lng: 9.669080},
        {lat: 45.670513, lng: 9.669694},
        {lat: 45.670215, lng: 9.670142},
        {lat: 45.669996, lng: 9.670928},
        {lat: 45.669874, lng: 9.671290},
        {lat: 45.669411, lng: 9.674142},
        {lat: 45.665872, lng: 9.669593},
        {lat: 45.665389, lng: 9.670132},
        {lat: 45.663620, lng: 9.667192},
        {lat: 45.662398, lng: 9.667954},
        {lat: 45.659001, lng: 9.663705},
        {lat: 45.658266, lng: 9.664703},
        {lat: 45.656721, lng: 9.662160},
        {lat: 45.655341, lng: 9.660593},
        {lat: 45.655025, lng: 9.659809},
        {lat: 45.656631, lng: 9.657976},
        {lat: 45.657620, lng: 9.656364},
        {lat: 45.661633, lng: 9.647130},
        {lat: 45.662027, lng: 9.646386}, //Grumello del piano
        {lat: 45.663703, lng: 9.642697},
        {lat: 45.664033, lng: 9.642663},
        {lat: 45.664329, lng: 9.641649},
        {lat: 45.664447, lng: 9.641040},
        {lat: 45.662190, lng: 9.638605},
        {lat: 45.661717, lng: 9.638639},
        {lat: 45.661174, lng: 9.637641},
        {lat: 45.658810, lng: 9.637185},
        {lat: 45.657983, lng: 9.636356},
        {lat: 45.658172, lng: 9.634919},
        {lat: 45.657818, lng: 9.634547},
        {lat: 45.658231, lng: 9.633972},
        {lat: 45.658739, lng: 9.634463},
        {lat: 45.659990, lng: 9.631994},
        {lat: 45.664152, lng: 9.634081},
        {lat: 45.664623, lng: 9.634991},
        {lat: 45.664499, lng: 9.634490},
        {lat: 45.665575, lng: 9.635123},
        {lat: 45.665899, lng: 9.634956},
        {lat: 45.666689, lng: 9.634224},
        {lat: 45.666759, lng: 9.633808},
        {lat: 45.666972, lng: 9.633729},
        {lat: 45.667875, lng: 9.634798},
        {lat: 45.669143, lng: 9.634606},
        {lat: 45.679616, lng: 9.63551},
        {lat: 45.673584, lng: 9.636005},
        {lat: 45.679535, lng: 9.637893},
        {lat: 45.681661, lng: 9.635540},
        {lat: 45.682482, lng: 9.632702},
        {lat: 45.682843, lng: 9.629911},
        {lat: 45.689279, lng: 9.630710},
        {lat: 45.685749, lng: 9.657947},
        {lat: 45.685735, lng: 9.660478},
        {lat: 45.687014, lng: 9.662513}, //Canovine
        {lat: 45.687033, lng: 9.662868},
        {lat: 45.688248, lng: 9.663068},
        {lat: 45.688651, lng: 9.664519},
        {lat: 45.691360, lng: 9.666417},
        {lat: 45.688041, lng: 9.672073},
        {lat: 45.686525, lng: 9.673534},
        {lat: 45.673093, lng: 9.673009},
        {lat: 45.677105, lng: 9.669838},
        {lat: 45.676242, lng: 9.669605}
    ];

    // Celadina - Viale Venezia - Malpensata - Boccaleone - Campagnola
    var q2 = [
        {lat: 45.688800, lng: 9.670820},
        {lat: 45.691464, lng: 9.679139},
        {lat: 45.691658, lng: 9.681940},
        {lat: 45.691196, lng: 9.687179},
        {lat: 45.690393, lng: 9.689824},
        {lat: 45.691312, lng: 9.692505},
        {lat: 45.701433, lng: 9.696528},
        {lat: 45.701433, lng: 9.696528},
        {lat: 45.702001, lng: 9.699676},
        {lat: 45.701069, lng: 9.703116},
        {lat: 45.699685, lng: 9.702219},
        {lat: 45.699045, lng: 9.705951},
        {lat: 45.698520, lng: 9.707598},
        {lat: 45.697603, lng: 9.708598},
        {lat: 45.698550, lng: 9.709182},
        {lat: 45.697882, lng: 9.710510},
        {lat: 45.696651, lng: 9.709832},
        {lat: 45.689513, lng: 9.710058},
        {lat: 45.695611, lng: 9.713315},
        {lat: 45.688639, lng: 9.713706},
        {lat: 45.687911, lng: 9.713393},
        {lat: 45.685013, lng: 9.706743},
        {lat: 45.680987, lng: 9.700219},
        {lat: 45.679687, lng: 9.702092},
        {lat: 45.677961, lng: 9.699830},
        {lat: 45.679116, lng: 9.697619},
        {lat: 45.676854, lng: 9.690902},
        {lat: 45.674135, lng: 9.685703},
        {lat: 45.671866, lng: 9.686819},
        {lat: 45.671268, lng: 9.686133},
        {lat: 45.667721, lng: 9.688804},
        {lat: 45.664324, lng: 9.678617},
        {lat: 45.670376, lng: 9.675415},
        {lat: 45.669411, lng: 9.674142}
    ];

    //Borgo Santa Caterina - Redona
    var q3 = [
        {lat: 45.702807, lng: 9.680334},
        {lat: 45.702220, lng: 9.681552},
        {lat: 45.705263, lng: 9.685756},
        {lat: 45.706375, lng: 9.688744},
        {lat: 45.704420, lng: 9.693858},
        {lat: 45.704927, lng: 9.694438},  //bandierina
        {lat: 45.701445, lng: 9.696504},
        {lat: 45.702004, lng: 9.699665},
        {lat: 45.701069, lng: 9.703148},
        {lat: 45.703678, lng: 9.704930},
        {lat: 45.703779, lng: 9.705929},
        {lat: 45.707635, lng: 9.708285},
        {lat: 45.710971, lng: 9.700836},
        {lat: 45.712859, lng: 9.703085},
        {lat: 45.715891, lng: 9.700591},
        {lat: 45.715828, lng: 9.699346},
        {lat: 45.716291, lng: 9.699517},
        {lat: 45.716178, lng: 9.694377},
        {lat: 45.714691, lng: 9.694472},
        {lat: 45.714948, lng: 9.689933},
        {lat: 45.716354, lng: 9.690272},
        {lat: 45.716920, lng: 9.687717},
        {lat: 45.715846, lng: 9.687231},
        {lat: 45.715914, lng: 9.686485},
        {lat: 45.714519, lng: 9.685142},

        {lat: 45.712967, lng: 9.685494},
        {lat: 45.711041, lng: 9.683565},

        {lat: 45.709780, lng: 9.682337},
        {lat: 45.707813, lng: 9.680527},
        {lat: 45.708376, lng: 9.678902},
        {lat: 45.708007, lng: 9.677397},
        {lat: 45.707745, lng: 9.676452},
        {lat: 45.706724, lng: 9.677326},
        {lat: 45.704306, lng: 9.677644},
        {lat: 45.702906, lng: 9.677782},
        {lat: 45.702807, lng: 9.680334}

    ];

    //Loreto - Longuelo - Santa Lucia - quartiere San Paolo
    var q4 = [
        {lat: 45.689858, lng: 9.626542},
        {lat: 45.687692, lng: 9.643388},
        {lat: 45.685727, lng: 9.658275},
        {lat: 45.685722, lng: 9.660482},
        {lat: 45.687000, lng: 9.662495},

        {lat: 45.688340, lng: 9.659912},

        {lat: 45.689495, lng: 9.660993},
        {lat: 45.692790, lng: 9.658745},
        {lat: 45.693157, lng: 9.660377},
        {lat: 45.693191, lng: 9.660715},
        {lat: 45.693156, lng: 9.661172},
        {lat: 45.692933, lng: 9.661231},
        {lat: 45.692955, lng: 9.661721},
        {lat: 45.694784, lng: 9.661895},
        {lat: 45.694919, lng: 9.663242},
        {lat: 45.699040, lng: 9.663295},
        {lat: 45.697229, lng: 9.661774},
        {lat: 45.699006, lng: 9.661127},
        {lat: 45.699996, lng: 9.657937},
        {lat: 45.701539, lng: 9.655915},
        {lat: 45.701481, lng: 9.654331},
        {lat: 45.702875, lng: 9.653587},
        {lat: 45.702996, lng: 9.653223},
        {lat: 45.702745, lng: 9.652434},
        {lat: 45.702034, lng: 9.651898},
        {lat: 45.700498, lng: 9.651351},
        {lat: 45.700489, lng: 9.650722},
        {lat: 45.699042, lng: 9.649033},
        {lat: 45.699103, lng: 9.648128},
        {lat: 45.697882, lng: 9.647621},
        {lat: 45.698707, lng: 9.644171},
        {lat: 45.692995, lng: 9.640402},
        {lat: 45.691856, lng: 9.637226},
        {lat: 45.696060, lng: 9.635117},
        {lat: 45.697501, lng: 9.635387},
        {lat: 45.698400, lng: 9.629344},
        {lat: 45.696540, lng: 9.628596},
        {lat: 45.696749, lng: 9.626562},
        {lat: 45.698525, lng: 9.626054},
        {lat: 45.697898, lng: 9.621896},
        {lat: 45.696540, lng: 9.623245},
        {lat: 45.696602, lng: 9.623721},
        {lat: 45.693038, lng: 9.624735},
        {lat: 45.692996, lng: 9.625170},
        {lat: 45.691339, lng: 9.625443},
        {lat: 45.691145, lng: 9.626674},
        {lat: 45.689858, lng: 9.626542}
    ];

    //Città alta
    var q5 = [
        {lat: 45.704226, lng: 9.671895},
        {lat: 45.707080, lng: 9.667346},
        {lat: 45.707098, lng: 9.662334},
        {lat: 45.708013, lng: 9.660843},
        {lat: 45.707075, lng: 9.658040},
        {lat: 45.706731, lng: 9.658101},
        {lat: 45.706366, lng: 9.658379},
        {lat: 45.704552, lng: 9.657338},
        {lat: 45.701795, lng: 9.661824},
        {lat: 45.700912, lng: 9.662107},
        {lat: 45.700900, lng: 9.662824},
        {lat: 45.701325, lng: 9.663218},
        {lat: 45.701825, lng: 9.664113},
        {lat: 45.703264, lng: 9.671243},
        {lat: 45.704226, lng: 9.671895}

    ];

    //Centro
    var q6 = [
        {lat: 45.687000, lng: 9.662495},  //partenza longuelo
        {lat: 45.688340, lng: 9.659912},
        {lat: 45.689495, lng: 9.660993},
        {lat: 45.692790, lng: 9.658745},
        {lat: 45.693157, lng: 9.660377},
        {lat: 45.693191, lng: 9.660715},
        {lat: 45.693156, lng: 9.661172},
        {lat: 45.692933, lng: 9.661231},
        {lat: 45.692955, lng: 9.661721},
        {lat: 45.694784, lng: 9.661895},
        {lat: 45.694919, lng: 9.663242},
        {lat: 45.699040, lng: 9.663295},
        {lat: 45.697229, lng: 9.661774},
        {lat: 45.699006, lng: 9.661127},


        {lat: 45.699996, lng: 9.657937},
        {lat: 45.701539, lng: 9.655915},
        {lat: 45.703353, lng: 9.659372},

        //da q5
        {lat: 45.704552, lng: 9.657338},
        {lat: 45.701795, lng: 9.661824},
        {lat: 45.700912, lng: 9.662107},
        {lat: 45.700900, lng: 9.662824},
        {lat: 45.701325, lng: 9.663218},
        {lat: 45.701825, lng: 9.664113},
        {lat: 45.703264, lng: 9.671243},
        {lat: 45.704226, lng: 9.671895},  //PTA SANT AGO

        //vado  a sta cate 45.707732, 9.676357
        {lat: 45.707745, lng: 9.676452},
        {lat: 45.706724, lng: 9.677326},
        {lat: 45.704306, lng: 9.677644},
        {lat: 45.702906, lng: 9.677782},
        {lat: 45.702807, lng: 9.680334},
        {lat: 45.702807, lng: 9.680334},
        {lat: 45.702220, lng: 9.681552},
        {lat: 45.705263, lng: 9.685756},
        {lat: 45.706375, lng: 9.688744},
        {lat: 45.704420, lng: 9.693858},
        {lat: 45.704927, lng: 9.694438},

        {lat: 45.701433, lng: 9.696528},
        {lat: 45.691312, lng: 9.692505},
        {lat: 45.690393, lng: 9.689824},
        {lat: 45.691196, lng: 9.687179},
        {lat: 45.691658, lng: 9.681940},
        {lat: 45.691464, lng: 9.679139},
        {lat: 45.688800, lng: 9.670820},
        {lat: 45.687014, lng: 9.662513}, //Canovine
        {lat: 45.688651, lng: 9.664519},
        {lat: 45.688248, lng: 9.663068},
        {lat: 45.687033, lng: 9.662868}
    ];

    //monterosso - valtesse
    var q7 = [
        {lat: 45.704226, lng: 9.671895},
        {lat: 45.707080, lng: 9.667346},
        {lat: 45.707098, lng: 9.662334},
        {lat: 45.708013, lng: 9.660843},
        {lat: 45.710403, lng: 9.659658},
        {lat: 45.711395, lng: 9.661408},
        {lat: 45.711833, lng: 9.660155},
        {lat: 45.712951, lng: 9.660224},
        {lat: 45.714312, lng: 9.659180},
        {lat: 45.717034, lng: 9.657579},
        {lat: 45.718492, lng: 9.657997},
        {lat: 45.722429, lng: 9.662035},
        {lat: 45.720727, lng: 9.666630},
        {lat: 45.723011, lng: 9.669346},
        {lat: 45.721358, lng: 9.672339},
        {lat: 45.719997, lng: 9.670947},
        {lat: 45.717129, lng: 9.677003},
        {lat: 45.719899, lng: 9.678466},
        {lat: 45.722038, lng: 9.677771},
        {lat: 45.723593, lng: 9.679512},
        {lat: 45.719605, lng: 9.688005},
        {lat: 45.716834, lng: 9.687376},

        {lat: 45.712967, lng: 9.685494},
        {lat: 45.711041, lng: 9.683565},
        {lat: 45.709780, lng: 9.682337},
        {lat: 45.707813, lng: 9.680527},

        {lat: 45.712967, lng: 9.685494},
        {lat: 45.711041, lng: 9.683565},
        {lat: 45.709780, lng: 9.682337},
        {lat: 45.707813, lng: 9.680527},
        {lat: 45.708376, lng: 9.678902},
        {lat: 45.708007, lng: 9.677397},
        {lat: 45.707745, lng: 9.676452},

        {lat: 45.704226, lng: 9.671895},

    ];

    var definizioneQuartieri = [q1, q2, q3, q4, q5, q6, q7];

    $(function () {
        window.initMap = function () {
            var points = getPoints();

            // now it IS a function and it is in global(() => {
            //dataSensors = getPoints();
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: {
                    lat: 45.6989,
                    lng: 9.67
                },
                mapTypeId: 'satellite'
            });

            heatmap = new google.maps.visualization.HeatmapLayer({
                data: points,
                map: map,
                gradient: gr,
                maxIntensity: 1,
                radius: 50
            });
            heatmap.set('gradient', heatmap.get('gradient') ? null : gr);
            heatmap.set('maxIntensity', 1);

            PopupClassManager = createPopupClass();
            /*
                for (var i = 0; i < points.length; i++) {
                    var cnt = document.createElement('div');
                    cnt.id = "content" + i;
                    cnt.innerHTML = dataNormalized.watchers[i].name + ": " + (points[i].weight / 1);
                    document.getElementById("content").appendChild(cnt);

                    var popup = new Popup(
                        points[i].location,
                        cnt);
                    popup.setMap(map);
                }

             */
            mappaQuartieri[0] = new google.maps.Polygon({
                paths: q1,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.20
            });
            mappaQuartieri[1] = new google.maps.Polygon({
                paths: q2,
                strokeColor: '#0000FF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#0000FF',
                fillOpacity: 0.35
            });
            mappaQuartieri[2] = new google.maps.Polygon({
                paths: q3,
                strokeColor: '#FF8800',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF8800',
                fillOpacity: 0.20
            });
            mappaQuartieri[3] = new google.maps.Polygon({
                paths: q4,
                strokeColor: '#00FF00',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#00FF00',
                fillOpacity: 0.20
            });
            mappaQuartieri[4] = new google.maps.Polygon({
                paths: q5,
                strokeColor: '#00FFFF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#00FFFF',
                fillOpacity: 0.20
            });
            mappaQuartieri[5] = new google.maps.Polygon({
                paths: q6,
                strokeColor: '#FF00FF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF00FF',
                fillOpacity: 0.20
            });
            mappaQuartieri[6] = new google.maps.Polygon({
                paths: q7,
                strokeColor: '#FFFF00',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FFFF00',
                fillOpacity: 0.20
            });

            applyFilter(points);

            interval = setInterval(function () {
                applyFilter(getPoints());
            }, 3000);
            /*interval = setTimeout(function () {
                applyFilter(getPoints());
            }, 3000);*/
        }

    });

    function countIntersection(latP1, longP1, polygon) {
        var intersections = 0;
        for (var side = 0; side < polygon.length - 1; side++) {
            if (areIntersecting(latP1 * 1.0,
                longP1 * 1.0,
                (latP1 * 1.0) + 3,
                longP1 * 1.0,
                polygon[side].lat * 1.0,
                polygon[side].lng * 1.0,
                polygon[side + 1].lat * 1.0,
                polygon[side + 1].lng * 1.0
            ) > 0) {
                intersections++;
            }
            // If yes, intersections++;
        }
        return intersections;
    }

    function getPoints() {
        var a = [];
        dataFromSensors = getJsonData(queryForJson);
        normalizeData();
        a = generatePointsForMap(ultimoFiltro);
        switch (queryForJson) {
            //per calcolare a quale quartiere appartengono i punti
            case "Quartiere":
                lp = 0;
                var intersections = 0;
                var sum_q = [0, 0, 0, 0, 0, 0, 0];
                var qta_q = [0, 0, 0, 0, 0, 0, 0];
                var mean_q = [0, 0, 0, 0, 0, 0, 0];
                for (var point = 0; point < a.length; point++) {
                    for (var q = 0; q < definizioneQuartieri.length; q++) {
                        intersections = countIntersection(a[point].location.lat(), a[point].location.lng(), definizioneQuartieri[q]);
                        if ((intersections & 1) == 1) {
                            sum_q[q] += 1 * a[point].weight;
                            qta_q[q]++;
                            break;
                        }
                    }
                }

                for (var q = 0; q < definizioneQuartieri.length; q++) {
                    if (mappaQuartieri[q] == null)
                        break;

                    qta_q[q] > 0 ? (mean_q[q] = sum_q[q] / qta_q[q]) : 0;
                    var color, m = mean_q[q];
                    if (m <= 0)
                        color = '#FFF'; //#FFFFFF
                    else if (m >= 1)
                        color = gr[6];
                    else if (m > 0.8)
                        color = gr[5];
                    else if (m > 0.6)
                        color = gr[4];
                    else if (m > 0.4)
                        color = gr[3];
                    else if (m > 0.2)
                        color = gr[2];
                    else
                        color = gr[1];

                    mappaQuartieri[q].setOptions({strokeColor: color, fillColor: color});
                }

                break;
            case "lastPoint":
                lp++;
                if (lp > 12) lp = 0;
                break;
            default:
                lp = 0;
        }
        return a;
    }

    window.generatePointsForMap = function (filter) {
        var i = 0;
        var a = [];

        if (queryForJson == "Quartiere") {
            filter = "Quartiere";
        }
        ultimoFiltro=filter;
        dataNormalized.watchers.forEach(function (w) {
            //if (dataFromSensors.watchers[i].status == 'ok') {
            var trovato = 0;
            var j = 0;
            for(j = 0; j < sensoriTrovati.length; j++){
                if(sensoriTrovati[j] == dataFromSensors.watchers[i].name){
                    trovato = 1;
                }
            }

            if(trovato == 0){
                sensoriTrovati[j] = ""+(dataFromSensors.watchers[i].name);
                var cnt = document.createElement('div');
                cnt.id = "sensore_"+dataFromSensors.watchers[i].name;
                cnt.style = "width:100%; padding: 5px;";
                cnt.className = "sensor_ok";
                cnt.innerHTML = ""+dataFromSensors.watchers[i].name;
                document.getElementById('legenda').appendChild(cnt);
            }
            else{
                if(dataFromSensors.watchers[i].status == "err"){
                    $('#sensore_'+dataFromSensors.watchers[i].name).removeClass("sensor_ok");
                    $('#sensore_'+dataFromSensors.watchers[i].name).addClass("sensor_error"); //
                }
            }

                var val = 0, valToPrint;
                switch (filter) {
                    case "pm10" :
                        val = w.aqi.pm10;
                        valToPrint = dataFromSensors.watchers[i].aqi.pm10;
                        break;
                    case "pm25" :
                        val = w.aqi.pm25;
                        valToPrint = dataFromSensors.watchers[i].aqi.pm25;
                        break;
                    case "co2" :
                        val = w.aqi.co2;
                        valToPrint = dataFromSensors.watchers[i].aqi.co2;
                        break;
                    default:
                        val = w.aqi.pm10 > w.aqi.pm25 ? w.aqi.pm10 : w.aqi.pm25;
                        val = w.aqi.co2 > val ? w.aqi.co2 : val;
                        valToPrint = val;
                        break;
                }
                var loc = new google.maps.LatLng(w.geoPoint[0], w.geoPoint[1]);
                a[i] = {location: loc, weight: (Math.round(val * 100) / 100) * 1};
                var cnt = document.getElementById("content" + i);
                if (cnt != null)
                    cnt.innerHTML = w.name + ": " + (Math.round(valToPrint * 100) / 100);
                i++;
            //}
        });
        return a;
    }

    function normalizeData() {
        dataNormalized = JSON.parse(JSON.stringify(dataFromSensors));

        dataNormalized.watchers.forEach(function (w) {
            w.aqi.co2 /= thresholdCo2;
            w.aqi.pm10 /= thresholdPm10;
            w.aqi.pm25 /= thresholdPm25;
        });
    }


    function getJsonData(query) {
        /*   new XmlHttpRequest();
           $.ajax({
               type: "GET",
               url: "",
               dataType: "JSON",
               success: function (risposta) {
                   $("div#risposta").html(risposta);
               },
               error: function () {
                   alert("Chiamata fallita!!!");
               }
           }
           window.location.reload(true);
           */

        var a = {
           // "status": "ok",
            "watchers": [
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.691792, 9.675592],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": "20"
                    }
                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.691148, 9.674278],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 40
                    }

                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.691890, 9.673334],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 30
                    }
                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.692396, 9.672830],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 30
                    }

                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.693425, 9.671559],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 30
                    }

                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.694212, 9.670765],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 30
                    }

                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.696324, 9.668273],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 20
                    }

                },
                {
                    "name": "w1",
                    "status": "err",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.699911, 9.674343],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 10
                    }

                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.698378, 9.677100],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 10
                    }

                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.697643, 9.680767],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 10
                    }

                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.696183, 9.682796],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 10
                    }

                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.694487, 9.677933],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 40
                    }

                },
                {
                    "name": "w1",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.692856, 9.678815],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 40
                    }

                },
                {
                    "name": "w2",
                    "status": "ok",
                    "timestamp": "2018-04-04 15:08:00",
                    "geoPoint": [45.692856, 9.658815],
                    "aqi": {
                        "co2": "1500",
                        "pm25": "16",
                        "pm10": 40
                    }

                }
            ]
        };
        switch (query) {
            case "scia", "Quartiere":
                return a;
            case "lastPoint":
                var b = {};
                b.watchers = [];
                b.watchers[0] = a.watchers[lp];
                //b.watchers[1] = a.watchers[lp+13]; // Vado a prendere i sensori w2
                return b;
        }
        return a;
        /*  {
             "name": "w2",
             "status": "ok",
             "timestamp": "2018-04-04 15:08:00",
             "geoPoint": [
                 "45.710",
                 "9.690"
             ],
             "aqi": {
                 "co2": "500",
                 "pm25": "24",
                 "pm10": "40"
             }
         },
         {
             "name": "w3",
             "status": "ok",
             "timestamp": "2018-04-04 15:08:00",
             "geoPoint": [
                 "45.700",
                 "9.655"
             ],
             "aqi": {
                 "co2": "1000",
                 "pm25": "8",
                 "pm10": "60"
             }
         }*/
    }


    var NO = -1;
    var COLLINEAR = 0;
    var YES = 1;

    function areIntersecting(v1x1, v1y1, v1x2, v1y2,
                             v2x1, v2y1, v2x2, v2y2) {
        var d1, d2;
        var a1, a2, b1, b2, c1, c2;

        v1x1 *= 1.0;
        v1y1 *= 1.0;
        v1x2 *= 1.0;
        v1y2 *= 1.0;
        v2x1 *= 1.0;
        v2y1 *= 1.0;
        v2x2 *= 1.0;
        v2y2 *= 1.0;

        // Convert vector 1 to a line (line 1) of infinite length.
        // We want the line in linear equation standard form: A*x + B*y + C = 0
        // See: http://en.wikipedia.org/wiki/Linear_equation
        a1 = v1y2 - v1y1;
        b1 = v1x1 - v1x2;
        c1 = (v1x2 * v1y1) - (v1x1 * v1y2);

        // Every point (x,y), that solves the equation above, is on the line,
        // every point that does not solve it, is not. The equation will have a
        // positive result if it is on one side of the line and a negative one
        // if is on the other side of it. We insert (x1,y1) and (x2,y2) of vector
        // 2 into the equation above.
        d1 = (a1 * v2x1) + (b1 * v2y1) + c1;
        d2 = (a1 * v2x2) + (b1 * v2y2) + c1;

        // If d1 and d2 both have the same sign, they are both on the same side
        // of our line 1 and in that case no intersection is possible. Careful,
        // 0 is a special case, that's why we don't test ">=" and "<=",
        // but "<" and ">".
        if (d1 > 0 && d2 > 0) return NO;
        if (d1 < 0 && d2 < 0) return NO;

        // The fact that vector 2 intersected the infinite line 1 above doesn't
        // mean it also intersects the vector 1. Vector 1 is only a subset of that
        // infinite line 1, so it may have intersected that line before the vector
        // started or after it ended. To know for sure, we have to repeat the
        // the same test the other way round. We start by calculating the
        // infinite line 2 in linear equation standard form.
        a2 = v2y2 - v2y1;
        b2 = v2x1 - v2x2;
        c2 = (v2x2 * v2y1) - (v2x1 * v2y2);

        // Calculate d1 and d2 again, this time using points of vector 1.
        d1 = (a2 * v1x1) + (b2 * v1y1) + c2;
        d2 = (a2 * v1x2) + (b2 * v1y2) + c2;

        // Again, if both have the same sign (and neither one is 0),
        // no intersection is possible.
        if (d1 > 0 && d2 > 0) return NO;
        if (d1 < 0 && d2 < 0) return NO;

        // If we get here, only two possibilities are left. Either the two
        // vectors intersect in exactly one point or they are collinear, which
        // means they intersect in any number of points from zero to infinite.
        if ((a1 * b2) - (a2 * b1) == 0.0) return COLLINEAR;

        // If they are not collinear, they must intersect in exactly one point.
        return YES;
    }

    //Aggiunta apis
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA4Gk_YLgDnjhUSggdBac5wEh190VwF6d8&libraries=visualization&' +
        'callback=initMap';
    document.body.appendChild(script);

    var style = document.createElement("style");
    style.innerHTML = '      /* The popup bubble styling. */\n' +
        '      .popup-bubble {\n' +
        '        /* Position the bubble centred-above its parent. */\n' +
        '        position: absolute;\n' +
        '        top: 0;\n' +
        '        left: 0;\n' +
        '        transform: translate(-50%, -100%);\n' +
        '        /* Style the bubble. */\n' +
        '        background-color: white;\n' +
        '        padding: 5px;\n' +
        '        border-radius: 5px;\n' +
        '        font-family: sans-serif;\n' +
        '        overflow-y: auto;\n' +
        '        max-height: 60px;\n' +
        '        box-shadow: 0px 2px 10px 1px rgba(0,0,0,0.5);\n' +
        '      }\n' +
        '      /* The parent of the bubble. A zero-height div at the top of the tip. */\n' +
        '      .popup-bubble-anchor {\n' +
        '        /* Position the div a fixed distance above the tip. */\n' +
        '        position: absolute;\n' +
        '        width: 100%;\n' +
        '        bottom: /* TIP_HEIGHT= */ 8px;\n' +
        '        left: 0;\n' +
        '      }\n' +
        '      /* This element draws the tip. */\n' +
        '      .popup-bubble-anchor::after {\n' +
        '        content: "";\n' +
        '        position: absolute;\n' +
        '        top: 0;\n' +
        '        left: 0;\n' +
        '        /* Center the tip horizontally. */\n' +
        '        transform: translate(-50%, 0);\n' +
        '        /* The tip is a https://css-tricks.com/snippets/css/css-triangle/ */\n' +
        '        width: 0;\n' +
        '        height: 0;\n' +
        '        /* The tip is 8px high, and 12px wide. */\n' +
        '        border-left: 6px solid transparent;\n' +
        '        border-right: 6px solid transparent;\n' +
        '        border-top: /* TIP_HEIGHT= */ 8px solid white;\n' +
        '      }\n' +
        '      /* JavaScript will position this div at the bottom of the popup tip. */\n' +
        '      .popup-container {\n' +
        '        cursor: auto;\n' +
        '        height: 0;\n' +
        '        position: absolute;\n' +
        '        /* The max width of the info window. */\n' +
        '        width: 200px;\n' +
        '      }\n' +
        '       .sensor_error { background-color: #f00;}\n'+
        '       .sensor_ok { background-color: #0f0;}';
    document.head.appendChild(style);

    var bs_css = document.createElement('link');
    bs_css.rel="stylesheet";
    bs_css.type="text/css";
    bs_css.href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
    bs_css.integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T";
    bs_css.crossOrigin="anonymous";
    document.head.appendChild(bs_css);

    var script_bss1 = document.createElement('script');
    script_bss1.type = 'text/javascript';
    script_bss1.src = 'https://code.jquery.com/jquery-3.3.1.slim.min.js';
    script_bss1.integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo';
    script_bss1.crossOrigin="anonymous";
    document.body.appendChild(script_bss1);

    var script_bss2 = document.createElement('script');
    script_bss2.type = 'text/javascript';
    script_bss2.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';
    script_bss2.integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1';
    script_bss2.crossOrigin="anonymous";
    document.body.appendChild(script_bss2);

    var script_bss3= document.createElement('script');
    script_bss3.type = 'text/javascript';
    script_bss3.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js';
    script_bss3.integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM';
    script_bss3.crossOrigin="anonymous";
    document.body.appendChild(script_bss3);

    var cnt = document.createElement('div');
    cnt.id = "popupDiv";
    cnt.innerHTML += "popup Div";
    document.body.appendChild(cnt);
}


function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 50);
}


function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 1);
}

function disegnaPopup(data){
    for (var i = 0; i <data.length; i++) {
        popupContainer[i] = document.createElement('div');
        popupContainer[i].id = "popupPunto" + i;
        popupContainer[i].innerHTML = (data[i].weight / 1);
        document.getElementById("popupDiv").appendChild(popupContainer[i]);

        popupPoint[i] = new PopupClassManager(
            data[i].location,
            popupContainer[i]);
        popupPoint[i].setMap(map);
    }
}

function cancellaPopup() {
    for (i=0; i<popupPoint.length; i++) {
        if (popupPoint[i]!=null){
            popupPoint[i].setMap(null);
            popupPoint[i] = null;

        }
        $('#popupPunto'+i).remove();
        popupContainer[i]=null;
    }

}

function applyFilter(dataToDisplay) {
    heatmap.setMap(null);
    var quartieriDaMostrare = null;
    cancellaPopup();
    switch (queryForJson) {
        case "Quartiere":
            quartieriDaMostrare = map;
            break;
        default:  //disegnare punti in generale
            heatmap.setData(dataToDisplay);
            heatmap.setMap(map);
            disegnaPopup(dataToDisplay);
    }

    for (var q = 0; q < mappaQuartieri.length; q++) {
        mappaQuartieri[q].setMap(quartieriDaMostrare);
    }
}

function filterPM25() {
    ultimoFiltro = "pm25";
    applyFilter(generatePointsForMap(ultimoFiltro));
}

function filterIqa() {
    ultimoFiltro = "iqa";
    applyFilter(generatePointsForMap(ultimoFiltro));
}

function filterPM10() {
    ultimoFiltro = "pm10";
    applyFilter(generatePointsForMap(ultimoFiltro));
}


function filterCO2() {
    ultimoFiltro = "co2";
    applyFilter(generatePointsForMap(ultimoFiltro));
}

function scia() {
    queryForJson = "scia";
    applyFilter(generatePointsForMap(ultimoFiltro));
}

function lastPoint() {
    queryForJson = "lastPoint";
    applyFilter(generatePointsForMap(ultimoFiltro));
}

function Quartiere() {
    heatmap.setMap(null);
    queryForJson = "Quartiere";
    applyFilter(generatePointsForMap(ultimoFiltro));
}


function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)',
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}


/**
 * Returns the Popup class.
 *
 * Unfortunately, the Popup class can only be defined after
 * google.maps.OverlayView is defined, when the Maps API is loaded.
 * This function should be called by initMap.
 */
function createPopupClass() {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content The bubble div.
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    function Popup(position, content) {
        this.position = position;

        content.classList.add('popup-bubble');
        // This zero-height div is positioned at the bottom of the bubble.
        var bubbleAnchor = document.createElement('div');
        bubbleAnchor.classList.add('popup-bubble-anchor');
        bubbleAnchor.appendChild(content);

        // This zero-height div is positioned at the bottom of the tip.
        this.containerDiv = document.createElement('div');
        this.containerDiv.classList.add('popup-container');
        this.containerDiv.appendChild(bubbleAnchor);

        // Optionally stop clicks, etc., from bubbling up to the map.
        // google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }

    // ES5 magic to extend google.maps.OverlayView.
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);

    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function () {
        this.getPanes().floatPane.appendChild(this.containerDiv);
    };

    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function () {
        if (this.containerDiv.parentElement) {
            this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
    };

    /** Called each frame when the popup needs to draw itself. */
    Popup.prototype.draw = function () {
        var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

        // Hide the popup when it is far out of view.
        var display =
            Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                'block' :
                'none';

        if (display === 'block') {
            this.containerDiv.style.left = divPosition.x + 'px';
            this.containerDiv.style.top = divPosition.y + 'px';
        }
        if (this.containerDiv.style.display !== display) {
            this.containerDiv.style.display = display;
        }
    };

    return Popup;
