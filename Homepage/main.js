//즉시 실행되는 함수 구문
// (()=>{
// })();

//(function(){       })();
(function () {

    let yOffset;
    let currentScene;
    let prevScrollHeight;
    let enterScene;

    const sceneinfo = [
        {
            //1번째 section
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,  //지금 섹션 화면의 스크롤의 max값
            objs: {
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            value: {
                videoImage: [],
                totalImage: 300,
                imageSequence: [0, 300, { start: 0, end: 1 }],
                canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translate_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translate_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translate_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translate_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_translate_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translate_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translate_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translate_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        {
            //2번째 section
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                // canvas: document.querySelector('#video-canvas-2'),
                // context:document.querySelector('#video-canvas-2').getContext('2d'),
                container: document.querySelector('#scroll-section-1')
            },
            value: {
                // videoImage:[],                
                // totalImage:300,
                // imageSequence:[0, 300, {start:0, end:1}],
                // canvas_opacity_in:[0,1,{start:0.9,end:1}],
            }
        },
        {
            //3번째 section
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,  //지금 섹션 화면의 스크롤의 max값
            objs: {

                canvas: document.querySelector('#video-canvas-2'),
                context: document.querySelector('#video-canvas-2').getContext('2d'),
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .main-message.a'),
                messageB: document.querySelector('#scroll-section-2 .desc-message.b'),
                messageC: document.querySelector('#scroll-section-2 .desc-message.c'),
                pinB: document.querySelector('#scroll-section-2 .pin.b'),
                pinC: document.querySelector('#scroll-section-2 .pin.c')
            },
            value: {
                videoImage: [],
                totalImage: 960,
                imageSequence: [0, 959, { start: 0, end: 1 }],
                canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
                canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
                messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                messageC_opacity_in: [0, 1, { start: 0.77, end: 0.82 }],
                messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
                messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translate_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translate_in: [30, 0, { start: 0.5, end: 0.55 }],
                messageC_translate_in: [30, 0, { start: 0.77, end: 0.82 }],
                messageA_translate_out: [0, -20, { start: 0.3, end: 0.35 }],
                messageB_translate_out: [0, -20, { start: 0.58, end: 0.63 }],
                messageC_translate_out: [0, -20, { start: 0.85, end: 0.9 }],
                pinB_scaleY_in: [0.5, 1, { start: 0.5, end: 0.55 }],
                pinC_scaleY_in: [0.5, 1, { start: 0.77, end: 0.82 }],
                pinB_scaleY_out: [1, 0.5, { start: 0.58, end: 0.63 }],
                pinC_scaleY_out: [1, 0.5, { start: 0.85, end: 0.9 }]
            }
        },
        {
            //4번째 section
            type: 'sticky',
            heightNum: 6,
            scrollHeight: 0,  //지금 섹션 화면의 스크롤의 max값
            objs: {
                caption : document.querySelector('.canvas-caption'),
                container: document.querySelector('#scroll-section-3'),
                canvas: document.querySelector('.blend-elem-canvas'),
                context: document.querySelector('.blend-elem-canvas').getContext('2d'),
                imagePath: ['../video/scenic.jpg', '../video/flzlfkd.jpg']
            },
            value: {
                endwindow: 0,
                videoImage: [],
                rectRx: [0, 0, { start: 0, end: 0 }],
                rectLx: [0, 0, { start: 0, end: 0 }],
                blendImage: [0, 0, { start: 0, end: 0 }],
                blendslide: [0, 0, { start: 0, end: 0 }],
                rectOpacity:[0,1,{start:0,end:0}],
                rectTranslate:[20,0,{start:0,end:0}],
            }
        }
    ];

    function setlayout() {
        for (let i = 0; i < sceneinfo.length; i++) {
            if (sceneinfo[i].type === 'sticky') {
                sceneinfo[i].scrollHeight = sceneinfo[i].heightNum * window.innerHeight;
            }
            else if (sceneinfo[i].type === 'normal') {
                sceneinfo[i].scrollHeight = sceneinfo[i].objs.container.offsetHeight;
            }
            sceneinfo[i].objs.container.style.height = `${sceneinfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;

        for (let i = 0; i < sceneinfo.length; i++) {
            totalScrollHeight += sceneinfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);

        const videoRatio = window.innerHeight / sceneinfo[0].objs.canvas.height;

        sceneinfo[0].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${videoRatio})`;
        sceneinfo[0].objs.context.drawImage(sceneinfo[0].value.videoImage[0], 0, 0);

        sceneinfo[2].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${videoRatio})`;
        sceneinfo[2].objs.context.drawImage(sceneinfo[2].value.videoImage[0], 0, 0);
    }

    function scrollAnimation() {
        const currentyOffset = yOffset - prevScrollHeight;
        const offsetRatio = currentyOffset / sceneinfo[currentScene].scrollHeight;
        const objs = sceneinfo[currentScene].objs;
        const values = sceneinfo[currentScene].value;
        const scrollHeight = sceneinfo[currentScene].scrollHeight;

        if(yOffset>44) {
            document.body.classList.add('local-nav-sticky');
        } else {
            document.body.classList.remove('local-nav-sticky');
        }

        switch (currentScene) {
            case 0:
                const imageIndex = parseInt(calculValue(currentyOffset, values.imageSequence));
                objs.context.drawImage(values.videoImage[imageIndex], 0, 0);
                objs.canvas.style.opacity = calculValue(currentyOffset, values.canvas_opacity_out);
                if (offsetRatio < 0.22) {
                    objs.messageA.style.opacity = calculValue(currentyOffset, values.messageA_opacity_in);
                    objs.messageA.style.transform = `translateY(${calculValue(currentyOffset, values.messageA_translate_in)}%)`;
                } else {
                    objs.messageA.style.opacity = calculValue(currentyOffset, values.messageA_opacity_out);
                    objs.messageA.style.transform = `translateY(${calculValue(currentyOffset, values.messageA_translate_out)}%)`;
                }

                if (offsetRatio < 0.42) {
                    objs.messageB.style.opacity = calculValue(currentyOffset, values.messageB_opacity_in);
                    objs.messageB.style.transform = `translateY(${calculValue(currentyOffset, values.messageB_translate_in)}%)`;
                } else {
                    objs.messageB.style.opacity = calculValue(currentyOffset, values.messageB_opacity_out);
                    objs.messageB.style.transform = `translateY(${calculValue(currentyOffset, values.messageB_translate_out)}%)`;
                }
                if (offsetRatio < 0.62) {
                    objs.messageC.style.opacity = calculValue(currentyOffset, values.messageC_opacity_in);
                    objs.messageC.style.transform = `translateY(${calculValue(currentyOffset, values.messageC_translate_in)}%)`;
                } else {
                    objs.messageC.style.opacity = calculValue(currentyOffset, values.messageC_opacity_out);
                    objs.messageC.style.transform = `translateY(${calculValue(currentyOffset, values.messageC_translate_out)}%)`;
                }
                if (offsetRatio < 0.82) {
                    objs.messageD.style.opacity = calculValue(currentyOffset, values.messageD_opacity_in);
                    objs.messageD.style.transform = `translateY(${calculValue(currentyOffset, values.messageD_translate_in)}%)`;
                } else {
                    objs.messageD.style.opacity = calculValue(currentyOffset, values.messageD_opacity_out);
                    objs.messageD.style.transform = `translateY(${calculValue(currentyOffset, values.messageD_translate_out)}%)`;
                }

                break;
            case 1:
                break;
            case 2:
                const imageIndex2 = parseInt(calculValue(currentyOffset, values.imageSequence));
                objs.context.drawImage(values.videoImage[imageIndex2], 0, 0);

                if (offsetRatio <= 0.5) {

                    objs.canvas.style.opacity = calculValue(currentyOffset, values.canvas_opacity_in);
                }
                else {
                    objs.canvas.style.opacity = calculValue(currentyOffset, values.canvas_opacity_out);
                }
                if (offsetRatio < 0.22) {
                    objs.messageA.style.opacity = calculValue(currentyOffset, values.messageA_opacity_in);
                    objs.messageA.style.transform = `translateY(${calculValue(currentyOffset, values.messageA_translate_in)}%)`;

                } else {
                    objs.messageA.style.opacity = calculValue(currentyOffset, values.messageA_opacity_out);
                    objs.messageA.style.transform = `translateY(${calculValue(currentyOffset, values.messageA_translate_out)}%)`;
                }
                if (offsetRatio < 0.57) {
                    objs.messageB.style.opacity = calculValue(currentyOffset, values.messageB_opacity_in);
                    objs.messageB.style.transform = `translateY(${calculValue(currentyOffset, values.messageB_translate_in)}%)`;
                    objs.pinB.style.transform = `scaleY(${calculValue(currentyOffset, values.pinB_scaleY_in)})`;
                } else {
                    objs.messageB.style.opacity = calculValue(currentyOffset, values.messageB_opacity_out);
                    objs.messageB.style.transform = `translateY(${calculValue(currentyOffset, values.messageB_translate_out)}%)`;
                    objs.pinB.style.transform = `scaleY(${calculValue(currentyOffset, values.pinB_scaleY_out)})`;
                }
                if (offsetRatio < 0.84) {
                    objs.messageC.style.opacity = calculValue(currentyOffset, values.messageC_opacity_in);
                    objs.messageC.style.transform = `translateY(${calculValue(currentyOffset, values.messageC_translate_in)}%)`;
                    objs.pinC.style.transform = `scaleY(${calculValue(currentyOffset, values.pinC_scaleY_in)})`;
                } else {
                    objs.messageC.style.opacity = calculValue(currentyOffset, values.messageC_opacity_out);
                    objs.messageC.style.transform = `translateY(${calculValue(currentyOffset, values.messageC_translate_out)}%)`;
                    objs.pinC.style.transform = `scaleY(${calculValue(currentyOffset, values.pinC_scaleY_out)})`;
                }
                break;

            case 3:
                const heightRatio = window.innerHeight / objs.canvas.height;
                const widthRatio = window.innerWidth / objs.canvas.width;
                let scaleRatio;

                scaleRatio = (heightRatio >= widthRatio) ? heightRatio : widthRatio;

                // if(heightRatio>widthRatio){
                //     canvasRatio=heightRatio;
                // } else {
                //     canvasRatio=widthRatio;
                // }

                objs.caption.style.opacity = 0;
                objs.canvas.style.transform = `scale(${scaleRatio})`;
                objs.context.drawImage(values.videoImage[0], 0, 0);

                const realwidth = document.body.offsetWidth / scaleRatio;
                const realheight = document.body.offsetHeight / scaleRatio;

                const whiteRect = realwidth * 0.15;

                values.rectLx[0] = (objs.canvas.width - realwidth) / 2;
                values.rectLx[1] = values.rectLx[0] - whiteRect;
                values.rectRx[0] = values.rectLx[0] + realwidth - whiteRect;
                values.rectRx[1] = values.rectRx[0] + whiteRect;

                if (!values.endwindow) {
                    values.endwindow = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * scaleRatio) / 2;
                    values.rectLx[2].start = window.innerHeight / 2 / sceneinfo[currentScene].scrollHeight;
                    values.rectLx[2].end = values.endwindow / sceneinfo[currentScene].scrollHeight;
                    values.rectRx[2].start = window.innerHeight / 2 / sceneinfo[currentScene].scrollHeight;
                    values.rectRx[2].end = values.endwindow / sceneinfo[currentScene].scrollHeight;
                }

                objs.context.fillStyle = 'white';
                objs.context.fillRect(parseInt(calculValue(currentyOffset, values.rectRx)), 0, parseInt(whiteRect), realheight);
                objs.context.fillRect(parseInt(calculValue(currentyOffset, values.rectLx)), 0, parseInt(whiteRect), realheight);

                if (offsetRatio < values.rectRx[2].end) {
                    objs.canvas.classList.remove('sticky');
                } else {
                    objs.canvas.classList.add('sticky');
                    objs.canvas.style.top = `${-((objs.canvas.height - objs.canvas.height * scaleRatio) / 2)}` + "px";

                    values.blendImage[0] = 0;
                    values.blendImage[1] = objs.canvas.height;
                    values.blendImage[2].start = values.rectRx[2].end;
                    values.blendImage[2].end = values.blendImage[2].start + 0.2;

                    let blendHeight = objs.canvas.height - calculValue(currentyOffset, values.blendImage);

                    objs.context.drawImage(values.videoImage[1],
                        0, blendHeight, objs.canvas.width, calculValue(currentyOffset, values.blendImage),
                        0, blendHeight, objs.canvas.width, calculValue(currentyOffset, values.blendImage));

                    if (offsetRatio > values.blendImage[2].end) {
                        objs.canvas.style.marginTop=0;
                        values.blendslide[0] = scaleRatio;
                        values.blendslide[1] = document.body.offsetWidth / objs.canvas.width / 1.5;
                        values.blendslide[2].start = values.blendImage[2].end;
                        values.blendslide[2].end = values.blendImage[2].end + 0.2;

                        objs.canvas.style.transform = `scale(${calculValue(currentyOffset, values.blendslide)})`;
                    }
                    if (offsetRatio > values.blendslide[2].end && values.blendslide[2].end > 0) {
                        objs.canvas.classList.remove('sticky');
                        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

                        values.rectOpacity[2].start = values.blendslide[2].end;
                        values.rectOpacity[2].end = values.blendslide[2].end+0.1;
                        values.rectTranslate[2].start = values.blendslide[2].end;
                        values.rectTranslate[2].end = values.blendslide[2].end+0.1;

                        objs.caption.style.opacity = calculValue(currentyOffset, values.rectOpacity);
                        objs.caption.style.transform = `translateY(${calculValue(currentyOffset, values.rectTranslate)}%)`;

                    }


                }
                break;

        }
    }

    function setImage() {
        let img;
        // canvas.drawImage(videoimage[0],0,0);
        for (let i = 0; i < sceneinfo[0].value.totalImage; i++) {
            img = new Image();
            img.src = `../video/001/IMG_${6726 + i}.JPG`;
            sceneinfo[0].value.videoImage.push(img);
        }

        for (let i = 0; i < sceneinfo[2].value.totalImage; i++) {
            img = new Image();
            img.src = `../video/002/IMG_${7027 + i}.JPG`;
            sceneinfo[2].value.videoImage.push(img);
        }

        for (let i of sceneinfo[3].objs.imagePath) {
            img = new Image();
            img.src = i;
            sceneinfo[3].value.videoImage.push(img);
        }
    }

    setImage();
    function calculValue(currentyOffset, value) {
        let rv;
        // 현재 씬에서 스크롤된 범위를 비율로 구하기
        let scrollHeight = sceneinfo[currentScene].scrollHeight;
        let scrollRatio = currentyOffset / scrollHeight;
        if (value.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const partStart = scrollHeight * value[2].start;
            const partEnd = scrollHeight * value[2].end;
            const partScrollHeight = partEnd - partStart;
            if (currentyOffset >= partStart && currentyOffset <= partEnd) {
                rv = (currentyOffset - partStart) / partScrollHeight * (value[1] - value[0]) + value[0];
            } else if (currentyOffset < partStart) {
                rv = value[0];
            } else if (currentyOffset > partEnd) {
                rv = value[1];
            }
        } else {
            rv = scrollRatio * (value[1] - value[0]) + value[0];

        }
        return rv;
    }

    // function calculValue(currentyOffset, value) {
    //     let scrollHeight = sceneinfo[currentScene].scrollHeight;
    //     let start = value[2].start;
    //     let end = value[2].end;
    //     let localStart = scrollHeight * start;
    //     let localEnd = scrollHeight * end;
    //     let localYoffset = currentyOffset - localStart;

    //     let part = localEnd - localStart;
    //     let Real;


    //     if (currentyOffset >= localStart && currentyOffset <= localEnd && (value[0]<value[1] || value[1]<0)) {
    //         Real = localYoffset / part * value[1];

    //     } else if (currentyOffset > localEnd) {
    //         Real = value[1];

    //     } else if (currentyOffset < localStart) {
    //         Real = value[0];
    //     }
    //     else {
    //         Real = (1 - (localYoffset / part)) * value[0];
    //     }
    //     return Real;

    // }

    function Loop() {
        prevScrollHeight = 0;
        enterScene = false;

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneinfo[i].scrollHeight;
        }

        if (yOffset >= sceneinfo[currentScene].scrollHeight + prevScrollHeight) {
            enterScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);

        }
        else if (yOffset < prevScrollHeight) {

            if (currentScene === 0) return;
            enterScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);

        }
        if (enterScene) return;

        scrollAnimation();
    }

    window.addEventListener('scroll', function () {
        yOffset = parseInt(pageYOffset);
        Loop();
    });

    window.addEventListener('load', function () {
        setlayout();
        document.body.classList.remove('before-load');  //classList : 클래스 제거나 추가할 수 있는 기능 -> 이전에 로드했던 기록을 지워라
        setlayout();
        sceneinfo[0].objs.context.drawImage(sceneinfo[0].value.videoImage[0], 0, 0);
        sceneinfo[2].objs.context.drawImage(sceneinfo[2].value.videoImage[0], 0, 0);

    });
    window.addEventListener('resize', function () {
        setlayout();
        sceneinfo[3].value.endwindow = 0;

    });
    //setlayout();
})();