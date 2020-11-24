//즉시 실행되는 함수 구문
// (()=>{
// })();

//(function(){       })();
(function(){

    let yOffset;
    let currentScene;
    let prevScrollHeight;

    const sceneinfo = [
        {
            //1번째 section
            type : 'sticky',
            heightNum : 5,
            scrollHeight:0,  //지금 섹션 화면의 스크롤의 max값
            objs:{
                container:document.querySelector('#scroll-section-0'),
                messageA:document.querySelector('#scroll-section-0 .main-message.a'),
                messageB:document.querySelector('#scroll-section-0 .main-message.b'),
                messageC:document.querySelector('#scroll-section-0 .main-message.c'),
                messageD:document.querySelector('#scroll-section-0 .main-message.d')
            }
        },
        {
            //2번째 section
            type : 'normal',
            heightNum:5,
            scrollHeight:0,
            objs:{
                container:document.querySelector('#scroll-section-1')
            }
        },
        {
            //3번째 section
            type : 'sticky',
            heightNum : 5,
            scrollHeight:0,  //지금 섹션 화면의 스크롤의 max값
            objs:{
                container:document.querySelector('#scroll-section-2'),
                messageA:document.querySelector('#scroll-section-2 .main-message.a'),
                messageB:document.querySelector('#scroll-section-2 .desc-message.b'),
                messageC:document.querySelector('#scroll-section-2 .desc-message.c')
            }
        }
    ];

    function setlayout(){
        for(let i=0; i<sceneinfo.length;i++){
            if(sceneinfo[i].type==='sticky'){
                sceneinfo[i].scrollHeight=sceneinfo[i].heightNum * window.innerHeight;
            }
            else if(sceneinfo[i].type==='normal'){
                sceneinfo[i].scrollHeight=sceneinfo[i].objs.container.offsetHeight;
            }
            sceneinfo[i].objs.container.style.height=`${sceneinfo[i].scrollHeight}px`;
        }

        yOffset=window.pageYOffset;
        let totalScrollHeight=0;

        for(let i=0;i<sceneinfo.length;i++) {
            totalScrollHeight += sceneinfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }  
        document.body.setAttribute('id',`show-scene-${currentScene}`);      
    }

    function scrollAnimation() {
        const currentyOffset=yOffset-prevScrollHeight;
        console.log(currentyOffset);
    }

    function Loop() {
        prevScrollHeight=0;

        for(let i=0; i<currentScene;i++){
            prevScrollHeight += sceneinfo[i].scrollHeight;
        }

        if(yOffset>=sceneinfo[currentScene].scrollHeight+prevScrollHeight) {
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);

        }
        else if(yOffset < prevScrollHeight) {
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        scrollAnimation();
    }

    window.addEventListener('scroll',function(){
        yOffset=parseInt(pageYOffset);
        Loop();
    });        
    
    window.addEventListener('load',setlayout);
    window.addEventListener('resize',setlayout);

})();