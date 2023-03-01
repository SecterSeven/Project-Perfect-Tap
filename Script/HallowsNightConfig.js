var config = require('MyBaseConfig');
var symbolGenerator = require("MainSymbolGenerator");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        config.SymbolAnimation = {
            "s1": "HallowsNightS1Anim",
            "s2": "HallowsNightS2Anim",
            "s3": "HallowsNightS3Anim",
            "s4": "HallowsNightS4Anim",
            "s5": "HallowsNightS5Anim",
            "s6": "HallowsNightS6Anim",
            "s7": "HallowsNightS7Anim",
            "s8": "HallowsNightS8Anim",
            "s9": "HallowsNightS9Anim",
            "s10": "HallowsNightS10Anim",
            "s11": "HallowsNightS11Anim",
            "c1": "HallowsNightScatterAnim",
            "w1": "HallowsNightWild",
            "w2": "HallowsNightWild2",
            "w3": "HallowsNightWild3",
            // "j1": "PiggyCommonJackpotAnim",
        };

        config.BlurSymbolAnimation = {
            "s1": "HallowsNightS1Anim",
            "s2": "HallowsNightS2Anim",
            "s3": "HallowsNightS3Anim",
            "s4": "HallowsNightS4Anim",
            "s5": "HallowsNightS5Anim",
            "s6": "HallowsNightS6Anim",
            "s7": "HallowsNightS7Anim",
            "s8": "HallowsNightS8Anim",
            "s9": "HallowsNightS9Anim",
            "s10": "HallowsNightS10Anim",
            "s11": "HallowsNightS11Anim",
            "c1": "HallowsNightScatterAnim",
            "w1": "HallowsNightWild",
            "w2": "HallowsNightWild2",
            "w3": "HallowsNightWild3",
            // "j1": "PiggyCommonJackpotAnim",
        };

        config.SLOTDETAILS = {
            MAX_PAYLINE: 20,
        };

        config.PAYLINEARR = [
            [4, 4, 4, 4, 4], //1
            [3, 3, 3, 3, 3], //2
            [2, 2, 2, 2, 2], //3
            [1, 1, 1, 1, 1], //4
            [4, 3, 2, 3, 4], //5
            [3, 2, 1, 2, 3], //6
            [1, 2, 3, 2, 1], //7
            [2, 3, 4, 3, 2], //8
            [4, 3, 4, 3, 4], //9
            [3, 2, 3, 2, 3], //10
            [2, 1, 2, 1, 2], //11
            [1, 2, 1, 2, 1], //12
            [2, 3, 2, 3, 2], //13
            [3, 4, 3, 4, 3], //14
            [4, 3, 3, 3, 4], //15
            [3, 2, 2, 2, 3], //16
            [2, 1, 1, 1, 2], //17
            [1, 2, 2, 2, 1], //18
            [2, 3, 3, 3, 2], //19
            [3, 4, 4, 4, 3], //20
            // [1, 2, 2, 2, 1], //21
            // [4, 3, 2, 3, 4], //22
            // [3, 2, 1, 2, 3], //23
            // [2, 3, 4, 3, 2], //24
            // [1, 2, 3, 2, 1], //25
        ];

        config.REELCLIMAX = {
            SYMBOL: ["c1"],
            PATTERN: [
                [true, true, true, true, true]
            ],
            MINCOUNT: [3],
            SOUNDSTOPINDEX: [0],
            COUNT: [0],
        };

        config.SymbolAnimationSound = {
            "c1": "0",
            "s1": "2",
            "s2": "2",
            "s3": "2",
            "s4": "2",
            "s5": "2",
            "s6": "2",
            "s7": "2",
            "s8": "2",
            "s9": "2",
            "s10": "2",
            "s11": "2",
            // "s6":"5",
            // "s7":"5",
            // "s8":"5",
        };

        config.REELSTOPDETAILS = {
            SYMBOL : ["c1","j1","b1"],
            PATTERN : [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],
            SOUNDSTOPINDEX : [0,0,0],
            COUNT : [0,0,0],
        };

        config.NUMBEROFROW = 4;
        config.resultNumber = 0;

        // symbolGenerator.GenerateSymbol = function(rowNum, colNum, symbolList){
        //     let symbolPattern = [];
        
        //     //symbolPattern = [["s1","s1","s1","s1","s1"],["s1","s1","s1","s1","s1"],["s1","s1","s1","s1","s1"],["s1","s1","s1","s1","s1"]]
        //     //symbolPattern = [["s2","s2","s2","s2","s2"],["s2","s2","s2","s2","s2"],["s2","s2","s2","s2","s2"],["s2","s2","s2","s2","s2"]]
        //     //symbolPattern = [["s3","s3","s3","s3","s3"],["s3","s3","s3","s3","s3"],["s3","s3","s3","s3","s3"],["s3","s3","s3","s3","s3"]]
        //     //symbolPattern = [["s4","s4","s4","s4","s4"],["s4","s4","s4","s4","s4"],["s4","s4","s4","s4","s4"],["s4","s4","s4","s4","s4"]]
        //     //symbolPattern = [["s5","s5","s5","s5","s5"],["s5","s5","s5","s5","s5"],["s5","s5","s5","s5","s5"],["s5","s5","s5","s5","s5"]]
        //     //symbolPattern = [["s6","s6","s6","s6","s6"],["s6","s6","s6","s6","s6"],["s6","s6","s6","s6","s6"],["s6","s6","s6","s6","s6"]]

        //     var data = {
        //         symbolList: symbolPattern,
        //     };
        //     return data;
        // };

        // symbolGenerator.GenerateFreeSymbol = function(rowNum, colNum, symbolList){
        //     let symbolPattern = [];
        
        //     // symbolPattern = [["s1","s2","s3","s4","s5"],["s6","s7","s8","s9","s10"],["f1","w1","c1","j1","j1"]]

        //     if (config.resultNumber == 1) {
        //         symbolPattern = [["s3","f1","s3","f2","s3"],["s3","f2","s3","f2","s3"],["s3","f2","s3","f2","s3"],["s3","f2","s3","f2","s3"]]
        //     } else if (config.resultNumber == 2) {
        //         symbolPattern = [["s4","s5","s4","s5","s4"],["s4","f3","s4","f3","s4"],["s4","f3","s4","f3","s4"],["s4","f3","s4","f3","s4"]]
        //     } else if (config.resultNumber == 3) {
        //         symbolPattern = [["s1","s1","s1","s1","s1"],["s1","s5","s1","s5","s1"],["s1","f8","s1","f8","s1"],["s1","f8","s1","f8","s1"]]
        //     } else if (config.resultNumber == 4) {
        //         symbolPattern = [["s7","s7","s7","s7","s7"],["s7","s1","s7","s1","s7"],["s7","s5","s7","s5","s7"],["f6","f6","f6","f6","f9"]]
        //     } else if (config.resultNumber == 5) {
        //         symbolPattern = [["s7","s7","s7","s7","s3"],["s7","s1","s7","s1","s3"],["s7","s5","s7","s5","s3"],["f6","f6","f6","f6","s3"]]
        //     } else if (config.resultNumber == 6) {
        //         symbolPattern = [["s4","s4","s4","s4","s4"],["s7","s7","s7","s7","f3"],["s7","s1","s7","s1","f3"],["s7","s5","s7","s5","f3"]]
        //     } else if (config.resultNumber == 7) {
        //         symbolPattern = [["s2","s2","s2","s2","s2"],["s2","s2","s2","s2","s4"],["s2","s2","s2","s2","f3"],["s2","s2","s2","s2","f3"]]
        //     } else if (config.resultNumber == 8) {
        //         symbolPattern = [["s1","s1","s1","s1","s1"],["s1","s1","s1","s1","s2"],["s1","s1","s1","s1","s4"],["s1","s1","s1","s1","f3"]]
        //     } else if (config.resultNumber == 9) {
        //         symbolPattern = [["s3","s3","s3","s3","s3"],["s3","s3","s3","s3","s1"],["s3","s3","s3","s3","s2"],["s3","s3","s3","s3","s4"]]
        //     } else {
        //         symbolPattern = [["s1","s1","s1","s1","s1"],["s1","s1","s1","s1","s1"],["s1","s1","s1","s1","s1"],["s1","s1","s1","s1","s1"]]
        //     }

        //     var data = {
        //         symbolList: symbolPattern,
        //     };
        //     return data;
        // };

        config.NORMALSYM = ["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","s11","w1","w2","c1","s1"];
        config.FREESYM = ["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","s11","w1","w2","s1"];
        

    
        config.symbolPayout = {
            SYMBOL : ["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","s11","w1","w2","w3"],
            PAYOUT : [
                {
                "3":200,
                "4":300,
                "5":500
                },
                {
                "3":150,
                "4":250,
                "5":400
                },
                {
                "3":100,
                "4":200,
                "5":300
                },
                {
                "3":100,
                "4":200,
                "5":250
                },
                {
                "3":50,
                "4":150,
                "5":200
                },
                {
                "3":50,
                "4":150,
                "5":200
                },
                {
                "3":50,
                "4":100,
                "5":150
                },
                {
                "3":50,
                "4":100,
                "5":150
                },
                {
                "3":100,
                "4":300,
                "5":5000
                },
                {
                "3":300,
                "4":500,
                "5":1000
                },
                {
                "3":500,
                "4":3000,
                "5":10000
                },
                {
                "3": 100,
                "4": 300,
                "5": 5000
                },
                {
                "3": 300,
                "4": 500,
                "5": 1000
                },
                {
                "3": 500,
                "4": 3000,
                "5": 10000
                },
                

            ],
        };
    },
});