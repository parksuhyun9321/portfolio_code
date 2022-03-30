export default [
    {
        no:0,
        id:"nastyfact9321",
        pw:"dlstmxk2953@",
        myInfo:{
            profile:{
                userName:"박수현",
                birthday:"1994.07.11 29세",
                img : require("../img/myInfo/suhyun.png"),
            },
            resume:[
                {title:"경주공업고등학교 졸업",period:"2010.03 - 2013.02"},
                {title:"스마트플랫폼웹(UI/UX)개발 수료",period:"2019.12 - 2020.06"},
                {title:"JBRO company 사원",period:"2021.01 - 2021.11"},
                {title:"BESTICE 사원",period:"2022.12 - 2022.03"},
            ]
        },
        skill:[
            {name:"html5", alt:"적절한 태그 사용으로 웹표준과 접근성에 준수한 레이아웃을 구현합니다.",src:require("../img/skill/html5.svg")},
            {name:"css3", alt:"CSS 속성을 이해하며 디자인 시안에 따른 디자인을 구현할 수 있고 미디어 쿼리를 사용해 반응형 웹을 제작할 수 있습니다.",src:require("../img/skill/css3.svg")},
            {name:"sass", alt:"(SASS)SCSS를 이용해 효율적으로 CSS를 작성할수 있습니다.",src:require("../img/skill/sass.svg")},
            {name:"javascript", alt:"기본 문법을 이해 하고, 오픈소스를 활용 할 수 있습니다.",src:require("../img/skill/javascript.svg")},
            {name:"jquery", alt:"이벤트 메소드를 사용, 다양한 플러그인을 활용 할 수 있습니다.",src:require("../img/skill/jquery.svg")},
            {name:"vue", alt:"vue 로 제작한 사이트의 보수작업을 한 경력이 있고, vue를 사용할 수 있습니다.",src:require("../img/skill/vue.svg")},
            {name:"php", alt:"그누보드를 사용한 프로젝트를 통해 PHP를 접했습니다. PHP코드를 수정하고 코딩한 경험이 있습니다.",src:require("../img/skill/php.svg")},
        ],
        portfolio:[
            {
                portfolioImg:require("../img/portfolio/clapPortfolio.png"),
                title:"CLAPPORTFOLIO",
                kind:["HYBRID APP","RESPONSIVE"],
                percent:100,
                period:"2022.03",
                use:["HTML5 ","CSS3 ","JAVASCRIPT ","VUE "]
            },
            {
                portfolioImg:require("../img/portfolio/hmaid.png"),
                title:"렛츠에이치메이드 사이트 제작 (서비스종료)",
                kind:["MOBILE WEB ","ANDROID APP "],
                percent:95,
                period:"2021.03 ~ 2021.06",
                use:["HTML5 ","CSS3 ","JAVASCRIPT ","JQUERY ","PHP "],
                link:""
            },
            {
                portfolioImg:require("../img/portfolio/jbro.png"),
                title:"제이브로 컴퍼니 사이트 제작 ",
                kind:["PC WEB"],
                percent:10,
                period:"2021.09",
                use:["HTML5 ","CSS3 ","JQUERY "],
                link:"https://www.jbrocompany.com/"
            },
            {
                portfolioImg:require("../img/portfolio/edaeri.png"),
                title:"e대리 사이트 보수(제작 중단)",
                kind:["HYBRID APP","RESPONSIVE"],
                percent:5,
                period:"2022.01",
                use:["VUE"],
                link:"https://edaeri.com/"
            },
            {
                portfolioImg:require("../img/portfolio/steam.png"),
                title:"한국과학 창의재단 STEAM 교육 페이지 사이트 보수",
                kind:["PC WEB","RESPONSIVE"],
                percent:10,
                period:"2022.02",
                use:["HTML5 ","CSS3 ","JAVASCRIPT","JQUERY"],
                link:"https://steam.kofac.re.kr/"
            }
        ]
    },
 
]